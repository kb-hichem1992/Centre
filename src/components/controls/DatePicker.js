import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

export default function DatePicker(props) {
  const { label, value, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="YYYY-MM-DD"
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
}
