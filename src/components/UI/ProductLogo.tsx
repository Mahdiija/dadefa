import "./ProductLogo.css";

export type ProductLogoName = "master" | "formula" | "cube" | "accounting";

interface ProductLogoProps {
  product: ProductLogoName;
  alt: string;
  className?: string;
}

export default function ProductLogo({ product, alt, className = "" }: ProductLogoProps) {
  return (
    <svg role="img" aria-label={alt} data-product={product} className={`product-logo ${className}`} focusable="false">
        <use href={`/brand/products/sprite.svg#${product}`} />
    </svg>
  );
}
