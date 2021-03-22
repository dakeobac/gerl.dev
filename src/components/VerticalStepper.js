import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Box,
  Avatar,
  FormLabel,
  FormGroup,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { CheckboxWithLabel } from "formik-material-ui";
import WebIcon from "@material-ui/icons/Web";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, boolean, date } from "yup";
import "yup-phone";
import { navigate } from "gatsby";
import loadable from "@loadable/component";

const LoadableCallOptions = loadable(() => import("./CallOptions"));

// initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pages: 1,
  designAndBranding: false,
  copywriting: false,
  timeFrame: "",
  message: "",
  cms: false,
  shop: false,
  data: false,
  call: false,
  date: new Date(),
};

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "auto",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
  step: {
    "&$completed": {
      color:
        theme.palette.type === "dark"
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
    },
    "&$active": {
      color:
        theme.palette.type === "dark"
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
    },
    "&$disabled": {},
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "&$alternativeLabel": {
      marginTop: 0,
    },
  },
}));

// encode data
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

// steps
function getSteps() {
  return [
    "Project Details",
    "Corporate Design",
    "Website Features",
    "Project Summary",
    "Personal Details",
  ];
}

const PersonalDetails = ({ theme, values, setFieldValue }) => {
  return (
    <>
      <Box>
        <FormLabel component="legend">Personal details</FormLabel>
        <FormGroup>
          <Field
            name="firstName"
            as={TextField}
            label="First name"
            margin="normal"
            variant="outlined"
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
          />
          <ErrorMessage name="firstName" />
          <Field
            name="lastName"
            as={TextField}
            label="Last name"
            margin="normal"
            variant="outlined"
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
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
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
          />
          <div>
            <ErrorMessage name="email" />
          </div>
        </FormGroup>
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
            color={theme.palette.type === "dark" ? "secondary" : "primary"}
          />

          {values.call && (
            <>
              <LoadableCallOptions
                values={values}
                setFieldValue={setFieldValue}
                theme={theme}
              />
            </>
          )}
        </FormGroup>
      </Box>
    </>
  );
};

const ProjectDetails = ({ theme }) => {
  return (
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
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
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
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
        >
          <MenuItem value="two weeks">Two weeks</MenuItem>
          <MenuItem value="one month">One month</MenuItem>
          <MenuItem value="two months">Two months</MenuItem>
          <MenuItem value="six months">Six months</MenuItem>
        </Field>
        <ErrorMessage name="timeFrame" />
      </FormGroup>
    </Box>
  );
};

const CorporateDesign = ({ theme, setFieldValue, updatePrice }) => {
  return (
    <Box marginTop={3}>
      <FormLabel component="legend">Corporate design</FormLabel>

      <FormGroup row>
        <Field
          onChange={(e) => updatePrice(setFieldValue, e)}
          component={CheckboxWithLabel}
          type="checkbox"
          name="designAndBranding"
          Label={{ label: "I need design and branding" }}
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
        />
        <Field
          onChange={(e) => updatePrice(setFieldValue, e)}
          component={CheckboxWithLabel}
          type="checkbox"
          name="copywriting"
          Label={{ label: "I need copywriting" }}
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
        />
      </FormGroup>
    </Box>
  );
};

const Features = ({ theme, setFieldValue, updatePrice }) => {
  return (
    <Box marginTop={3}>
      <FormLabel component="legend">Features</FormLabel>
      <FormGroup row>
        <Field
          onChange={(e) => updatePrice(setFieldValue, e)}
          component={CheckboxWithLabel}
          type="checkbox"
          name="cms"
          Label={{ label: "I need a content management system" }}
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
        />
        <Field
          component={CheckboxWithLabel}
          onChange={(e) => updatePrice(setFieldValue, e)}
          type="checkbox"
          name="shop"
          Label={{ label: "I need an online shop" }}
          color={theme.palette.type === "dark" ? "secondary" : "primary"}
        />
      </FormGroup>
    </Box>
  );
};

const Summary = ({ values, touched, errors, price }) => {
  return (
    <>
      <Box marginTop={3}>
        <FormLabel component="legend">Project Summary</FormLabel>
        <Typography component="p" variant="subtitle1" gutterBottom>
          {values.pages > 1 ? `You need ${values.pages} pages` : `one page.`} to
          be done in {values.timeFrame}. <br />
          {values.designAndBranding
            ? `You want me to create your design and branding for you.`
            : `You provide me with your own design and branding.`}{" "}
          <br />
          {values.copywriting
            ? `You need my copywriting services.`
            : `You provide me with the texts for your website.`}{" "}
          <br />
          {values.cms
            ? `Your website needs a content management system.`
            : `You website does not need a content management system.`}{" "}
          <br />
          {values.shop
            ? `Your website is an online shop.`
            : `Your website is not an online shop`}
        </Typography>
        <Typography
          component="p"
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
        >
          I estimate the cost of your project to be
        </Typography>
        <Typography component="h4" variant="h4" gutterBottom>
          approx. {price} €
        </Typography>
        {/* <pre>{JSON.stringify(values, null, 2)} </pre>
        <pre>{JSON.stringify(touched, null, 2)} </pre>
        <pre>{JSON.stringify(errors, null, 2)} </pre> */}
      </Box>
    </>
  );
};

function getStepContent(
  step,
  theme,
  values,
  setFieldValue,
  updatePrice,
  errors,
  touched,
  price
) {
  switch (step) {
    case 0:
      return <ProjectDetails theme={theme} />;
    case 1:
      return (
        <CorporateDesign
          theme={theme}
          values={values}
          setFieldValue={setFieldValue}
          updatePrice={updatePrice}
        />
      );
    case 2:
      return (
        <Features
          theme={theme}
          setFieldValue={setFieldValue}
          updatePrice={updatePrice}
        />
      );
    case 3:
      return (
        <Summary
          values={values}
          error={errors}
          touched={touched}
          price={price}
        />
      );
    case 4:
      return (
        <PersonalDetails
          theme={theme}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
    <div className={classes.root}>
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
          phone: string()
            .phone("DE", false, "Please enter a valid phone number number")
            .required("Please enter a phone number number"),
          pages: number()
            .required("Select a minimum of at least one page")
            .min(1)
            .max(100),
          call: boolean(),
          date: date().nullable(),
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
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
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
              navigate("/");
            });
        }}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form name="leads" data-netlify={true}>
            <input type="hidden" name="form-name" value="leads" />
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      classes: {
                        root: classes.step,
                        completed: classes.completed,
                        active: classes.active,
                        disabled: classes.disabled,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                  <StepContent>
                    <Typography>
                      {getStepContent(
                        index,
                        theme,
                        values,
                        setFieldValue,
                        updatePrice,
                        errors,
                        touched,
                        price
                      )}
                    </Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                          color={
                            theme.palette.type === "dark"
                              ? "secondary"
                              : "primary"
                          }
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          className={classes.button}
                          color={
                            theme.palette.type === "dark"
                              ? "secondary"
                              : "primary"
                          }
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Box>
                  <Typography component="p" variant="body1" gutterBottom>
                    Hi there, {values.firstName}! 👋 <br />
                    Thanks for your interest in my services.
                  </Typography>
                </Box>
                <Box marginTop={3}>
                  <FormLabel component="legend">
                    Your personal message
                  </FormLabel>

                  <Field
                    name="message"
                    as={TextField}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    label="Your message"
                    margin="normal"
                    color={
                      theme.palette.type === "dark" ? "secondary" : "primary"
                    }
                  />
                </Box>

                <FormGroup>
                  <Box marginTop={3}>
                    <FormLabel
                      component="legend"
                      style={{ marginBottom: "1rem" }}
                    >
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
                    To send a request now click submit
                  </Typography>
                </Box>
                <Box marginTop={3}>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    color={
                      theme.palette.type === "dark" ? "secondary" : "primary"
                    }
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </Box>
              </Paper>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
