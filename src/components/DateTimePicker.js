import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


const CallDate = ({values, setFieldValue} ) => {
  const theme = useTheme();
  
  return (
    <Box>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={values.dateAndTime}
          disablePast
          onChange={(e) => setFieldValue("dateAndTime", e)}
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

export default CallDate
