import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/navBar/Navbar";
import Footer from "../components/layout/footer/Footer";

import "./mainLayout.css";

const MainLayout = () => {
  return (
    <>
      <header style={{ position: "fixed", width: "100%", zIndex: "5" }}>
        <Navbar />
      </header>

      <main className="main_style">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
