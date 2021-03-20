import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Field, ErrorMessage } from "formik";

import MuiPhoneNumber from "material-ui-phone-number";

const DatePicker = ({values, setFieldValue} ) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Field
        name="phone"
        type="tel"
        style={{ width: "100%" }}
        as={MuiPhoneNumber}
        label="Phone number"
        defaultCountry={"de"}
        onChange={(e) => setFieldValue("phone", e)}
        autoFormat
        disableAreaCodes
        variant="outlined"
        color={theme.palette.type === "dark" ? "secondary" : "primary"}
        margin="normal"
      />
      <div>
        <ErrorMessage name="phone" />
        {/* Material Ui Date Picker */}
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={values.date}
          disablePast
          type="datetime-local"
          onChange={(e) => setFieldValue("date", e)}
          label="When can i call you?"
          showTodayButton
          fullWidth
          autoOk
          inputVariant="outlined"
          margin="normal"
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default DatePicker;
