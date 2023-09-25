import React from "react";

export default function EventForm(props) {
  const darkName = props.darkName;

  const [formData, setFormData] = React.useState({
    eventTitle: "",
    eventDate: "",
    eventDescription: "",
    eventFile: null,
  });

  const [fileUrl, setFileUrl] = React.useState("");

  function handleChange(event) {
    const { name, value, type } = event.target;
    if (type === "file") {
      const file = event.target.files[0];
      if (file) {
        const eventTitle = formData.eventTitle;
        const fileName = `${eventTitle}_${file.name}`;
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setFormData((prevData) => ({
          ...prevData,
          eventFile: file,
        }));
        localStorage.setItem(fileName, url);
        //localStorage.getItem(eventTitle_eventFile)
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newEvent = {
      eventTitle: formData.eventTitle,
      eventDate: formData.eventDate,
      eventDescription: formData.eventDescription,
      eventFile: fileUrl,
    };
    props.addEvent(newEvent);
    props.handleFormShow();
    console.log(formData);
  }

  return (
    <div className={"event-form-container" + darkName}>
      <h1>Create Event</h1>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div className="title-input">
          <label htmlFor="form-event-title">Title</label>
          <input
            className="form-event-title"
            type="text"
            placeholder="Event Title..."
            name="eventTitle"
            onChange={handleChange}
            value={formData.eventTitle}
          ></input>
        </div>

        <div className="date-input">
          <label htmlFor="form-event-date">Date</label>
          <input
            className="form-event-date"
            type="text"
            placeholder="Event Date..."
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          ></input>
        </div>

        <div className="description-input">
          <label htmlFor="form-event-description">Description</label>
          <input
            className="form-event-description"
            type="text"
            placeholder="Event Description..."
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
          ></input>
        </div>
        <div className="file-container">
          <div className="file-input">
            {" "}
            <input type="file" onChange={handleChange} name="eventFile"></input>
            {fileUrl && <img src={fileUrl} alt="Selected file" />}
          </div>

          <button className="create-event-btn" type="submit">Create Event</button>
        </div>
        <button onClick={props.handleFormShow}>exit</button>
      </form>
    </div>
  );
}
