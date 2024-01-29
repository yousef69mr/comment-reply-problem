import { lazy, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ToasterProvider from "./components/providers/toaster-provider";
const CommentSectionPage = lazy(() =>
  import("./components/pages/comment-page")
);

function App() {
  return (
    <>
      <CommentSectionPage />
      <ToasterProvider />
    </>
  );
}

export default App;
