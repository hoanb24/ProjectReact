import React from "react";
import "./App.css";
import "./bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { router } from "./routes";
import { CartProvider } from "react-use-cart";
import "./responsive.css";
function App() {
  const renderRoutes = (routes) =>
    routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>{renderRoutes(router)}</Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
