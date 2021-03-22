import React from "react";
import { Box } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MuiPhoneNumber from "material-ui-phone-number";
import { ErrorMessage } from "formik";


const CallOptions = ({ values, setFieldValue, theme }) => {
  return (
    <Box>
      <MuiPhoneNumber
        name="phone"
        type="tel"
        value={values.phone}
        label="Phone number"
        onlyCountries={["de"]}
        defaultCountry={"de"}
        disableAreaCodes
        onChange={(e) => setFieldValue("phone", e)}
        autoFormat
        variant="outlined"
        color={theme.palette.type === "dark" ? "secondary" : "primary"}
        margin="normal"
        style={{ width: "100%" }}
      />
      <div>
        <ErrorMessage name="phone" />
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={values.date}
          disablePast
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

export default CallOptions;
