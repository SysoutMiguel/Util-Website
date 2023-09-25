import React from "react";
import Counter from "./Counter";
import WeatherApp from "./WeatherApp";
// import WeatherBox from "./WeatherBox";
import EventShowcase from "./EventShowcase";
import EventForm from "./EventForm";
import Welcome from "./Welcome";
import Tenzies from "../tenzies-components/Tenzies";
import Quizzical from "../quizzical-components/Quizzical";

export default function Home(props) {
  const [counterActive, setCounterActive] = React.useState(false);
  const [weatherAppActive, setWeatherAppActive] = React.useState(false);
  const [eventShowcaseActive, setEventShowcaseActive] = React.useState(false);
  const [tenziesAppActive, setTenziesAppActive] = React.useState(false);
  const [formShow, setFormShow] = React.useState(false);
  const [quizzicalAppActive, setQuizzicalAppActive] = React.useState(false);

  const defaultEvent = {
    eventTitle: "Click above to add event",
    eventDate: "",
    eventDescription: "",
    eventFile: require("../images/uploadIcon.png"),
  };

  const darkName = props.darkMode ? "-dark" : "";

  const [events, setEvents] = React.useState([defaultEvent]);

  function addEvent(newEvent) {
    const isDuplicate = events.some(
      (event) => event.eventTitle === newEvent.eventTitle
    );
    if (!isDuplicate) {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } else {
      alert("Event with the same title already exists.");
    }
  }

  function handleFormShow() {
    setFormShow((prevShow) => !prevShow);
  }

  function handleQuizzicalAppClick() {
    if (counterActive) {
      handleCounterClick();
    } else if (eventShowcaseActive) {
      handleEventShowcaseClick();
    } else if (formShow) {
      handleFormShow();
    } else if (weatherAppActive) {
      handleWeatherAppClick();
    } else if (tenziesAppActive) {
      handleTenziesAppClick();
    }

    setQuizzicalAppActive((prevActive) => !prevActive);
  }

  function handleTenziesAppClick() {
    if (counterActive) {
      handleCounterClick();
    } else if (eventShowcaseActive) {
      handleEventShowcaseClick();
    } else if (formShow) {
      handleFormShow();
    } else if (weatherAppActive) {
      handleWeatherAppClick();
    }

    setTenziesAppActive((prevActive) => !prevActive);
  }

  function handleWeatherAppClick() {
    if (counterActive) {
      handleCounterClick();
    } else if (eventShowcaseActive) {
      handleEventShowcaseClick();
    } else if (formShow) {
      handleFormShow();
    } else if (tenziesAppActive) {
      handleTenziesAppClick();
    } else if (quizzicalAppActive) {
      handleQuizzicalAppClick();
    }
    setWeatherAppActive((prevActive) => !prevActive);
  }

  function handleCounterClick() {
    if (weatherAppActive) {
      handleWeatherAppClick();
    } else if (eventShowcaseActive) {
      handleEventShowcaseClick();
    } else if (formShow) {
      handleFormShow();
    } else if (tenziesAppActive) {
      handleTenziesAppClick();
    } else if (quizzicalAppActive) {
      handleQuizzicalAppClick();
    }
    setCounterActive((prevActive) => !prevActive);
  }

  function handleEventShowcaseClick() {
    if (weatherAppActive) {
      handleWeatherAppClick();
    } else if (counterActive) {
      handleCounterClick();
    } else if (formShow) {
      handleFormShow();
    } else if (tenziesAppActive) {
      handleTenziesAppClick();
    } else if (quizzicalAppActive) {
      handleQuizzicalAppClick();
    }
    setEventShowcaseActive((prevShowcase) => !prevShowcase);
  }

  return (
    <div className={"home-container" + darkName}>
      <div className={"header-container" + darkName}>
        <h1>Website Title</h1>
        <ul className={"header-list" + darkName}>
          <li onClick={handleWeatherAppClick}>
            <a href="#">Weather</a>
          </li>
          <li onClick={handleCounterClick}>
            <a href="#">Counter</a>
          </li>
          <li onClick={handleEventShowcaseClick}>
            <a href="#">Event Showcase</a>
          </li>
          <li onClick={handleTenziesAppClick}>
            <a href="#">Tenzies</a>
          </li>

          <li onClick={handleQuizzicalAppClick}>
            <a href="#">Quizzical</a>
          </li>
          <li>
            <label className="dark-mode-switch">
              <input type="checkbox" onChange={props.handleDarkModeToggle} />
              <span className="slider" />
            </label>
          </li>
        </ul>
      </div>

      <section className={"body-container" + darkName}>
        {!weatherAppActive &&
          !counterActive &&
          !eventShowcaseActive &&
          !tenziesAppActive &&
          !quizzicalAppActive && <Welcome darkName={darkName} />}

        {tenziesAppActive &&
          !counterActive &&
          !weatherAppActive &&
          !eventShowcaseActive &&
          !quizzicalAppActive && <Tenzies />}

        {weatherAppActive &&
          !counterActive &&
          !eventShowcaseActive &&
          !quizzicalAppActive && (
            <WeatherApp
              darkName={darkName}
              handleWeatherAppClick={handleWeatherAppClick}
            />
          )}

        {counterActive &&
          !weatherAppActive &&
          !eventShowcaseActive &&
          !quizzicalAppActive && (
            <Counter
              darkName={darkName}
              handleCounterClick={handleCounterClick}
            />
          )}

        {eventShowcaseActive &&
          !formShow &&
          !weatherAppActive &&
          !counterActive &&
          !quizzicalAppActive && (
            <EventShowcase
              darkName={darkName}
              handleEventShowcaseClick={handleEventShowcaseClick}
              handleFormShow={handleFormShow}
              events={[...events]}
            />
          )}

        {quizzicalAppActive &&
          !eventShowcaseActive &&
          !weatherAppActive &&
          !counterActive &&
          !tenziesAppActive && <Quizzical darkName={darkName} />}

        {formShow && (
          <EventForm
            darkName={darkName}
            handleFormShow={handleFormShow}
            addEvent={addEvent}
          />
        )}
        {/* </div> */}
      </section>
    </div>
  );
}
