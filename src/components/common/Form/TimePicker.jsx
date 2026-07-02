import React from "react";
import Input from "../Input";

export default function TimePicker({ label, ...props }) {
  return <Input type="time" label={label} {...props} />;
}
