import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import { BlogPostRoute } from "../pages/BlogPost";
import { routes } from "./routes";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* Artículos publicados después del último build: se cargan en el navegador */}
        <Route path="/blog/:slug" element={<BlogPostRoute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
