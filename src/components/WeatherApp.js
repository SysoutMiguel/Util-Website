import React from "react";
import WeatherBox from "./WeatherBox";

export default function WeatherApp(props) {
  const darkName = props.darkName;
  const [weatherData, setWeatherData] = React.useState([]);
  const [zipCode, setZipCode] = React.useState("");
  const [coordinates, setCoordinates] = React.useState([]);
  const [dailyForecast, setDailyForecast] = React.useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const zipKey = process.env.REACT_APP_ZIP_KEY

  React.useEffect(() => {
    // This effect runs whenever weatherData is updated
    if (weatherData.timelines) {
      const newArr = weatherData.timelines.daily.map((day, index) => {
        return (
          // <h1 key={weatherData.timelines.daily.indexOf(day)}>
          //   {day.time + ": " + toFar(day.values.temperatureAvg)}
          // </h1>,
          <WeatherBox key={index} day={day} time={day.time} />
        );
      });
      setDailyForecast(newArr);
    }
  }, [weatherData]);
  // console.log(weatherData.timelines.daily[0].time)
  // <p className="source-requirent">Powered by Tomorrow.io</p>

  // AI assisted code where conditional of lon n lat is put in the
  // .then so that it only runs if the proomise was fulfilled
  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${zipKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoordinates(data);
        if (data.lon && data.lat) {
          console.log("coord:" + data.lat + " " + data.lon);
          fetch(
            `https://api.tomorrow.io/v4/weather/forecast?location=${data.lat},${data.lon}&apikey=${apiKey}`
          )
            .then((res) => res.json())
            .then((weatherData) => {
              setWeatherData(weatherData);
            });
        }
      });
  }

  return (
    <div className={"weather-container" + darkName}>
      <h1>Weather</h1>
      <div className={"weather-form-container"+darkName}>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="zip">Please enter your zip code:</label> */}
          <input
            onChange={(e) => setZipCode(e.target.value)}
            className="zip"
            type="text"
            placeholder="Zip Code"
          ></input>
          <div>
            <button className="submit-btn" type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
      <div className="forecast-container">
        {coordinates.name && (
          <h1 className="forecast-title">Name: {coordinates.name}</h1>
        )}
        <div className={"daily-forecast-container" + darkName}>
          {dailyForecast && dailyForecast}
        </div>
      </div>
      <button onClick={props.handleWeatherAppClick}>Exit</button>
    </div>
  );
}

// Replaced Code 9/17/2023 -- unused popFore() and onEvent Func

// function populateForecast() {
//   if (weatherData.timelines) {
//     const newArr = weatherData.timelines.daily.map((day) => {
//       return <h1>{day.time + ": " + toFar(day.values.temperatureAvg)}</h1>;
//     });
//     setDailyForecast(newArr);
//     return newArr;
//     console.log(dailyForecast);
//   }
// }

// This effect depends on the weatherData state
//  "Working" code issue with popFore and having to press submit
// twice to get weatherData and thrice to get populateForecast() working
//   function handleSubmit(event) {
//     event.preventDefault();
//     fetch(
//       `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`
//     )
//       .then((res) => res.json())
//       .then((data) => setCoordinates(data));
//     if (coordinates.lon && coordinates.lat) {
//       {
//         zipName = coordinates.name;
//         console.log("coord:" + coordinates.lat + " " + coordinates.lon);
//         fetch(
//           `https://api.tomorrow.io/v4/weather/forecast?location=${coordinates.lat},${coordinates.lon}&apikey=F3EbdqEYGjqFg6lvkqJBE10XrKHF5FqL`
//         )
//           .then((res) => res.json())
//           .then((data) => setWeatherData(data));
//       }
//       populateForecast()
//     }
//   }
