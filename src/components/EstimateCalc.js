import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  FormGroup,
  FormLabel,
  Button,
  Avatar,
} from "@material-ui/core";
import WebIcon from "@material-ui/icons/Web";
import { object, string, number, boolean, date } from "yup";
import "yup-phone";
import { CheckboxWithLabel } from "formik-material-ui";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Form, Formik, Field, ErrorMessage } from "formik";
import loadable from "@loadable/component";

const LoadableDatePicker = loadable(() => import("./DatePicker"));

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  pages: 1,
  designAndBranding: false,
  copywriting: false,
  timeFrame: "",
  message: "",
  cms: false,
  shop: false,
  data: false,
  call: false,
  dateAndTime: new Date(),
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
}));

const EstimateCalc = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [price, setPrice] = useState(900);

  const prices = {
    cms: 600,
    shop: 1000,
    designAndBranding: 700,
    copywriting: 500,
  };

  function updatePrice(setFieldValue, event) {
    const { name, checked } = event.target;
    setFieldValue(name, checked);
    if (checked) {
      setPrice((price) => price + prices[name]);
    } else {
      setPrice((price) => price - prices[name]);
    }
  }

  return (
    <Box my={4}>
      <Box
        marginBottom={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Avatar className={classes.avatar}>
          <WebIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Get an estimate for your website
        </Typography>
      </Box>

      <Formik
        validationSchema={object({
          firstName: string()
            .required("Please enter your first name")
            .min(2)
            .max(25),
          lastName: string()
            .required("Please enter your last name")
            .min(2)
            .max(25),
          email: string().required("Please enter your email address"),
          phoneNumber: string()
            .phoneNumber("DE", false, "Please enter a valid phone number number")
            .required("Please enter a phone number number"),
          pages: number()
            .required("Select a minimum of at least one page")
            .min(1)
            .max(100),
          call: boolean(),
          dateAndTime: date().nullable(),
          data: boolean().oneOf(
            [true],
            "Please confirm that you allow me to contact you with the data you provided"
          ),
          timeFrame: string().required(
            "Please select a time frame for the completion of your project"
          ),
        })}
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "leads", ...values }),
          })
            .then(() => {
              formikHelpers.resetForm();
            })
            .catch(() => {
              alert("Oops, something went wrong submitting the form...");
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
        }}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form name="leads" data-netlify={true}>
            <Box>
              <FormLabel component="legend">Personal details</FormLabel>
              <FormGroup>
                <Field
                  name="firstName"
                  as={TextField}
                  label="First name"
                  margin="normal"
                  variant="outlined"
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <ErrorMessage name="firstName" />
                <Field
                  name="lastName"
                  as={TextField}
                  label="Last name"
                  margin="normal"
                  variant="outlined"
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <ErrorMessage name="lastName" />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  fullWidth
                  label="Email address"
                  margin="normal"
                  variant="outlined"
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <div>
                  <ErrorMessage name="email" />
                </div>
              </FormGroup>
            </Box>

            <Box marginTop={3}>
              <FormLabel component="legend">Project details</FormLabel>
              <FormGroup>
                <Field
                  name="pages"
                  type="number"
                  as={TextField}
                  label="How many pages?"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <ErrorMessage name="pages" />

                <Field
                  name="timeFrame"
                  as={TextField}
                  select
                  fullWidth
                  label="What is your time frame?"
                  variant="outlined"
                  margin="normal"
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                >
                  <MenuItem value={0}>Two weeks</MenuItem>
                  <MenuItem value={1}>One month</MenuItem>
                  <MenuItem value={2}>Two months</MenuItem>
                  <MenuItem value={3}>Six months</MenuItem>
                </Field>
                <ErrorMessage name="timeFrame" />
              </FormGroup>
            </Box>

            <Box marginTop={3}>
              <FormLabel component="legend">Corporate design</FormLabel>

              <FormGroup row>
                <Field
                  onChange={(e) => updatePrice(setFieldValue, e)}
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="designAndBranding"
                  Label={{ label: "I need design and branding" }}
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <Field
                  onChange={(e) => updatePrice(setFieldValue, e)}
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="copywriting"
                  Label={{ label: "I need copywriting" }}
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
              </FormGroup>
            </Box>
            <Box marginTop={3}>
              <FormLabel component="legend">Features</FormLabel>
              <FormGroup row>
                <Field
                  onChange={(e) => updatePrice(setFieldValue, e)}
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="cms"
                  Label={{ label: "I need a content management system" }}
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <Field
                  component={CheckboxWithLabel}
                  onChange={(e) => updatePrice(setFieldValue, e)}
                  type="checkbox"
                  name="shop"
                  Label={{ label: "I need an online shop" }}
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
              </FormGroup>
            </Box>
            <Box marginTop={3}>
              <FormLabel component="legend">Your personal message</FormLabel>

              <Field
                name="message"
                as={TextField}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                label="Your message"
                margin="normal"
                color={theme.palette.type === "dark" ? "secondary" : "primary"}
              />
            </Box>
            <Box marginTop={3}>
              <FormLabel component="legend">
                Can I call you in order to make an offer?
              </FormLabel>
              <FormGroup>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="call"
                  Label={{
                    label: "I want to receive a call",
                  }}
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />

                {values.call && <LoadableDatePicker values={values} setFieldValue={setFieldValue} />}
              </FormGroup>
            </Box>
            <FormGroup>
              <Box marginTop={3}>
                <FormLabel component="legend" style={{ marginBottom: "1rem" }}>
                  Accept the terms and conditions
                </FormLabel>

                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="data"
                  Label={{
                    label:
                      "I agree to the processing of my data for the purposes of receiving an offer by gerl.dev",
                  }}
                  color={
                    theme.palette.type === "dark" ? "secondary" : "primary"
                  }
                />
                <div>
                  <ErrorMessage name="data" />
                </div>
              </Box>
            </FormGroup>
            <Box marginTop={3}>
              <Typography component="h4" variant="h4" gutterBottom>
                approx. {price} €
              </Typography>
              <Typography component="p" variant="body1" gutterBottom>
                To send a request now click submit
              </Typography>
            </Box>
            <Box marginTop={3}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                color={theme.palette.type === "dark" ? "secondary" : "primary"}
              >
                Submit
              </Button>
            </Box>
            {/* <pre>{JSON.stringify(values, null, 2)} </pre>
            <pre>{JSON.stringify(touched, null, 2)} </pre>
            <pre>{JSON.stringify(errors, null, 2)} </pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EstimateCalc;
