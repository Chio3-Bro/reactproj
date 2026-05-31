import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";

async function enableMocking() {
  // Увімкнути моки для dev та preview (production build)
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
