import React from "react";

export default function WeatherBox(props) {
  const weatherCodeMax = props.day.values.weatherCodeMax;
  const currentDay = props.day.values;
  const darkName = props.darkName;

  function toFar(celsius) {
    return Math.floor(celsius * 1.8 + 32);
  }
  function formatDateString(inputDateString) {
    const date = new Date(inputDateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className={"weather-box-container"}>
      <div className="date-container">
        <h1 className="date">{formatDateString(props.time)}</h1>

      </div>
      <h3>Temperature: {toFar(currentDay.temperatureAvg)}</h3>
      <h4>Feels Like: {toFar(currentDay.temperatureApparentAvg)}</h4>
      <p>Max: {toFar(currentDay.temperatureMax)}</p>
      <p>Min: {toFar(currentDay.temperatureMin)}</p>
    </div>
  );
}
