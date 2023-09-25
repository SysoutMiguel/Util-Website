import Home from "./components/Home";
import React from "react";

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false)
  function handleDarkModeToggle(){
    setDarkMode((prevMode) => !prevMode)
    document.body.style.backgroundColor = darkMode ? "white" : "#292929"
  }

  return (
    <main className={darkMode ? "main-dark" : ""}>
      <div className="component-container">
        <Home
          darkMode = {darkMode}
          handleDarkModeToggle = {handleDarkModeToggle}
        />
        
      </div>
    </main>
  );
}
