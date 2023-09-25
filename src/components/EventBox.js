import React from "react";

export default function EventBox(props){

    const darkName = props.darkName

    return(
        <div className={"event-box-container" + darkName}>
            {/* <img onClick={props.handleFormShow} className="event-box-img" src={require ("../images/uploadIcon.png")} alt="ghft"/> */}
            <img onClick={props.handleFormShow} className="event-box-img" src={props.eventFile} alt="Invalid File"/>
            <h3 className={"event-title"+darkName}>{props.eventTitle}</h3>
            <p className={"event-date"+darkName}>{props.eventDate}</p>
            <p className={"event-description"+darkName}>{props.eventDescription}</p>
        </div>
    )
}