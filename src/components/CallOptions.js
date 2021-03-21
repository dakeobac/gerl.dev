import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { ErrorMessage } from "formik";

import MuiPhoneNumber from "material-ui-phone-number";

import CallDate from "./DateTimePicker";

const CallOptions = ({ values, setFieldValue }) => {
  const theme = useTheme();

  return (
    <Box>
      <MuiPhoneNumber
        name="phoneNumber"
        type="tel"
        value={values.phone}
        label="Phone number"
        onlyCountries={["de"]}
        defaultCountry={"de"}
        disableAreaCodes
        onChange={(e) => setFieldValue("phoneNumber", e)}
        autoFormat
        variant="outlined"
        color={theme.palette.type === "dark" ? "secondary" : "primary"}
        margin="normal"
        style={{ width: "100%" }}
      />
      <CallDate
        values={values}
        theme={theme}
        setFieldValue={setFieldValue}
      />

      <div>
        <ErrorMessage name="phone" />
      </div>
    </Box>
  );
};

export default CallOptions;
