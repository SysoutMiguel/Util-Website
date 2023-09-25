import React from "react";

export default function Welcome(props) {
  const [spanTextsActive, setSpanTextsActive] = React.useState(false);

  const darkName = props.darkName;
  const spanTextsClassName = `back-text${darkName} ${
    spanTextsActive ? "active" : ""
  }`;

  function handleSpanTextsClick() {
    setSpanTextsActive((prevActive) => !prevActive);
  }
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleSpanTextsClick();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="welcome-container">
      <h1 className={"home-body-welcome" + darkName}>Welcome</h1>
      <div className={spanTextsClassName}>
        <span className={spanTextsActive ? "active" : ""}>U</span>
        <span className={spanTextsActive ? "active" : ""}>T</span>
        <span className={spanTextsActive ? "active" : ""}>I</span>
        <span className={spanTextsActive ? "active" : ""}>L</span>
        <span className={spanTextsActive ? "active" : ""}>S</span>
      </div>
    </div>
  );
}
