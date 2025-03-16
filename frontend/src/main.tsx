import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PhotoWall from "./pages/PhotoWall.tsx";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhotoWall />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
