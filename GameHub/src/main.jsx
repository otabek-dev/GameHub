import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router.jsx'
import "bootstrap/dist/css/bootstrap.css";
import "./assets/global.css";
import styles from "./main.module.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />

      <div className={styles.frameBlock}></div>
      <iframe
          width="100vh"
          height="100vh"
          src="https://www.youtube.com/embed/yNcH2PuiHw8?controls=0&autoplay=1&mute=1"
          title="background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen>
      </iframe>
  </React.StrictMode>
);
