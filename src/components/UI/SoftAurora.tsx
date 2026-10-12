import { useEffect, useRef, type CSSProperties } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./SoftAurora.css";

interface SoftAuroraProps {
  color1: string;
  color2: string;
  brightness?: number;
  speed?: number;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uOctaveDecay;
uniform float uLayerOffset;
uniform float uColorSpeed;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;
varying vec2 vUv;
#define TAU 6.28318

vec3 gradientHash(vec3 p) {
  p = vec3(dot(p, vec3(127.1, 311.7, 234.6)), dot(p, vec3(269.5, 183.3, 198.3)), dot(p, vec3(169.5, 283.3, 156.9)));
  vec3 h = fract(sin(p) * 43758.5453123);
  float phi = acos(2.0 * h.x - 1.0);
  float theta = TAU * h.y;
  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
}

float quinticSmooth(float t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;
  float fx = floor(x); float fy = floor(y); float fz = floor(pz);
  float cx = ceil(x); float cy = ceil(y); float cz = ceil(pz);
  vec3 g000 = gradientHash(vec3(fx, fy, fz));
  vec3 g100 = gradientHash(vec3(cx, fy, fz));
  vec3 g010 = gradientHash(vec3(fx, cy, fz));
  vec3 g110 = gradientHash(vec3(cx, cy, fz));
  vec3 g001 = gradientHash(vec3(fx, fy, cz));
  vec3 g101 = gradientHash(vec3(cx, fy, cz));
  vec3 g011 = gradientHash(vec3(fx, cy, cz));
  vec3 g111 = gradientHash(vec3(cx, cy, cz));
  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));
  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));
  float sx = quinticSmooth(x - fx);
  float sy = quinticSmooth(y - fy);
  float sz = quinticSmooth(pz - fz);
  float lx00 = mix(d000, d100, sx);
  float lx10 = mix(d010, d110, sx);
  float lx01 = mix(d001, d101, sx);
  float lx11 = mix(d011, d111, sx);
  float ly0 = mix(lx00, lx10, sy);
  float ly1 = mix(lx01, lx11, sy);
  return amplitude * mix(ly0, ly1, sz);
}

float auroraGlow(float t, vec2 shift) {
  vec2 uv = gl_FragCoord.xy / uResolution.y + shift;
  float noiseVal = 0.0;
  float freq = uNoiseFreq;
  float amp = uNoiseAmp;
  vec2 samplePos = uv * uScale;
  for (float i = 0.0; i < 3.0; i += 1.0) {
    noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);
    amp *= uOctaveDecay;
    freq *= 2.0;
  }
  float yBand = uv.y * 10.0 - uBandHeight * 10.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float time = uSpeed * 0.4 * uTime;
  vec2 shift = uEnableMouse ? (uMouse - 0.5) * uMouseInfluence : vec2(0.0);
  float glow1 = auroraGlow(time, shift);
  float glow2 = auroraGlow(time + uLayerOffset, shift);
  vec3 first = cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3,0.20,0.20));
  vec3 second = cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(2.0,1.0,0.0), vec3(0.5,0.20,0.25));
  vec3 color = 0.99 * glow1 * first * uColor1 + 0.99 * glow2 * second * uColor2;
  color *= uBrightness;
  float alpha = clamp(length(color), 0.0, 0.72);
  gl_FragColor = vec4(color, alpha);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export default function SoftAurora({
  color1,
  color2,
  brightness = 0.75,
  speed = 0.6,
}: SoftAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorsRef = useRef({ color1, color2, brightness, speed });
  colorsRef.current = { color1, color2, brightness, speed };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [1, 1, 1] },
      uSpeed: { value: speed },
      uScale: { value: 1.5 },
      uBrightness: { value: brightness },
      uColor1: { value: hexToRgb(color1) },
      uColor2: { value: hexToRgb(color2) },
      uNoiseFreq: { value: 2.5 },
      uNoiseAmp: { value: 1.0 },
      uBandHeight: { value: 0.5 },
      uBandSpread: { value: 1.0 },
      uOctaveDecay: { value: 0.1 },
      uLayerOffset: { value: 0.7 },
      uColorSpeed: { value: 1.0 },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uMouseInfluence: { value: 0.0 },
      uEnableMouse: { value: false },
    };
    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / Math.max(gl.canvas.height, 1)];
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frame = 0;
    let previousColor1 = color1;
    let previousColor2 = color2;
    let nextColor1 = hexToRgb(color1);
    let nextColor2 = hexToRgb(color2);
    const update = (timestamp: number) => {
      frame = requestAnimationFrame(update);
      const latest = colorsRef.current;
      if (latest.color1 !== previousColor1) {
        nextColor1 = hexToRgb(latest.color1);
        previousColor1 = latest.color1;
      }
      if (latest.color2 !== previousColor2) {
        nextColor2 = hexToRgb(latest.color2);
        previousColor2 = latest.color2;
      }
      uniforms.uTime.value = timestamp * 0.001;
      uniforms.uSpeed.value = latest.speed;
      uniforms.uBrightness.value = latest.brightness;
      for (let i = 0; i < 3; i++) {
        uniforms.uColor1.value[i] += (nextColor1[i] - uniforms.uColor1.value[i]) * 0.025;
        uniforms.uColor2.value[i] += (nextColor2[i] - uniforms.uColor2.value[i]) * 0.025;
      }
      renderer.render({ scene: mesh });
    };
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="soft-aurora-container"
      style={{ "--soft-aurora-color": color1 } as CSSProperties}
    />
  );
}
