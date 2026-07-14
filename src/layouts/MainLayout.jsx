import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/navBar/Navbar";
import Footer from "../components/layout/footer/Footer";

import "./mainLayout.css";

const MainLayout = () => {
  return (
    <>
      <header>
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
