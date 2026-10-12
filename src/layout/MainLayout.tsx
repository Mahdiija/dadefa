import { useEffect } from "react";
import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import { Outlet, useLocation } from "react-router";
import "./MainLayout.css";

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="main-layout relative isolate min-h-screen bg-app-bg text-text-main transition-colors duration-500">
      <div className="main-layout__cloud" aria-hidden="true" />
      <div className="main-layout__cloud main-layout__cloud--top" aria-hidden="true" />
      <Header />
      <main className="relative z-10 flex-1 w-full">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
