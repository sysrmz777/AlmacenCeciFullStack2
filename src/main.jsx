import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./estilo.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ToastProvider>
            <ProductosProvider>
                <CarritoProvider>
                    <App />
                </CarritoProvider>
            </ProductosProvider>
        </ToastProvider>
    </BrowserRouter>
);
