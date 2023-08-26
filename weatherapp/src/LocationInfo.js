import React from "react";

export default function LocationInfo(props) {
  return (
    <div>
      {props.info.latitude} and {props.info.longitude}
    </div>
  );
}
