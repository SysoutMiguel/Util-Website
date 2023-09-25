import React from "react";
import EventBox from "./EventBox";

export default function EventShowcase(props) {
  const handleFormShow = props.handleFormShow;
  const darkName = props.darkName;
  const [displayEvents, setDisplayEvents] = React.useState([1]);
  // const eventBoxes = displayEvents.map((event, index) => {
  //   return (
  //     <EventBox
  //       key={index}
  //       darkName={darkName}
  //       handleFormShow={handleFormShow}
  //       eventTitle={"click above to add event"}
  //       eventFile={require ("../images/uploadIcon.png")}
  //     />
  //   );
  // });

  const populateEvents = props.events.map((event, index) => {
    return (
      <EventBox 
      key={index}
      darkName={darkName}
      eventTitle={event.eventTitle}
      eventDate={event.eventDate}
      eventDescription={event.eventDescription}
      eventFile ={event.eventFile}
      handleFormShow={handleFormShow}

      />
    )
  })
  const containerRef = React.useRef(null);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 210; // Adjust the scroll amount as needed
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 210; // Adjust the scroll amount as needed
    }
  };
  return (
    <div className={"showcase-container" + darkName}>
      <h1>Event Showcase</h1>
      <div className="scrolling-box">
        <button onClick={scrollLeft}>{"<"}</button>
        <div className={"events-container" + darkName} ref={containerRef}>
        {/* {(props.events && props.events.length > 0) ? populateEvents : eventBoxes} */}
        {populateEvents}
        
        </div>
        <button onClick={scrollRight}>{">"}</button>
      </div>
      <button onClick={props.handleEventShowcaseClick}>Exit</button>
    </div>
  );
}
