// import pages
import * as Sentry from "@sentry/browser";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById("react-app") as HTMLElement);
root.render(
  <div className="bg-black h-screen tracking-tighter">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
    </style>

    <App />
  </div>
);
