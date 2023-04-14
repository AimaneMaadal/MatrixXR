import './style.css'
import ReactDOM from 'react-dom/client'
import React from "react";
import { ConfiguratorProvider } from "./contexts/Configurator";
import App from "./App.jsx";
import AR from "./AR.jsx";

const root = ReactDOM.createRoot(document.querySelector('#root'))

const urlParams = new URLSearchParams(window.location.search);
const view = urlParams.get('view');

root.render(
    <> 
        <React.StrictMode>
            <ConfiguratorProvider>
                {view ?
                    <AR />
                    :
                    <App />
                }
            </ConfiguratorProvider>
        </React.StrictMode>
    </>
)