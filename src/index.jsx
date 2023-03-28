import './style.css'
import ReactDOM from 'react-dom/client'
import React from "react";
import { ConfiguratorProvider } from "./contexts/Configurator";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <> 
        <React.StrictMode>
            <ConfiguratorProvider>
                <App />
            </ConfiguratorProvider>
        </React.StrictMode>
    </>
)