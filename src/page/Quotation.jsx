import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { StepLabel, Stepper, Step } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import QuotationForm from "../component/quotation/QuotationForm";
import DrawPad from "../component/quotation/DrawPad";
import ReviewQuotation from "../component/quotation/ReviewQuotation";
import { enum as zodEnum, number, object, string, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = object({
  fName: string()
    .min(2, "Please enter a valid first name")
    .max(32, "First name must be less than 100 characters"),
  lName: string()
    .min(2, "Please enter a valid first name")
    .max(32, "First name must be less than 100 characters"),
  email: string().email(),
  mobile: string()
    .startsWith("04", "Mobile number should start with '04'")
    .min(10)
    .max(14),
  address: object({
    unitNo: string().optional(),
    streetNo: string().optional(),
    streetName: string().optional(),
    suburb: string().min(3, "Please enter a Suburb").optional(),
    city: string().optional(),
    state: string().optional(),
    postCode: string().optional(),
    country: string().optional(),
  }).optional(),
  isUpstairs: zodEnum(["yes", "no"]).optional(),
  floors: string().min(1, "Please input a valid floor number").optional(),
  specialCondition: string().optional(),
  supplier: zodEnum(["Lavi Stone", "B", "C", "D"]),
});

function Quotation() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({
    defaultValues: {
      fName: "",
      lName: "",
      mobile: "",
      email: "",
      // requestInstall: "",
      // address: {
      //   unitNo: "",
      //   streetNo: "",
      //   streetName: "",
      //   suburb: "",
      //   city: "",
      //   state: "",
      //   postCode: "",
      //   country: "",
      // },
      // isUpstairs: "",
      // floors: "",
      // specialCondition: "",
      supplier: "Lavi Stone",
    },
    resolver: zodResolver(schema),
  });

  const handleNext = () => {
    console.log("next");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data) => {
    console.log(12345, data);
    handleNext();
  };

  console.log(methods.formState.errors);

  const getStepContent = (step, methods, onSubmit, handleBack, handleNext) => {
    switch (step) {
      case 0:
        return (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <QuotationForm />
              <ButtonSection
                handleBack={handleBack}
                handleNext={handleNext}
                handleSaveForm={true}
                activeStep={step}
              />
            </form>
          </FormProvider>
        );
      case 1:
        return (
          <>
            <DrawPad />
            <ButtonSection
              handleBack={handleBack}
              handleNext={handleNext}
              activeStep={step}
            />
          </>
        );
      case 2:
        return (
          <>
            <ReviewQuotation />
            <ButtonSection
              handleBack={handleBack}
              handleNext={handleNext}
              activeStep={step}
            />
          </>
        );
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Box sx={{ margin: "0 20%" }}>
      <QuotationHeader />
      <QuotationStepper activeStep={activeStep} />
      {getStepContent(activeStep, methods, onSubmit, handleBack, handleNext)}
    </Box>
  );
}

const QuotationHeader = () => {
  return (
    <Typography
      variant="h2"
      align="center"
      fontWeight={500}
      sx={{ margin: "50px 0" }}
    >
      Quotation
    </Typography>
  );
};

const steps = ["Information", "Details", "Review your order"];
const QuotationStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} sx={{ margin: "50px 0" }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const ButtonSection = ({
  handleNext,
  activeStep,
  handleBack,
  handleSaveForm,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", mt: 3, mb: 3 }}>
      <Button
        variant="outlined"
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        Back
      </Button>
      {handleSaveForm ? (
        <Button type="submit" variant="contained" sx={{ ml: "auto" }}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      ) : (
        <Button variant="contained" onClick={handleNext} sx={{ ml: "auto" }}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      )}
    </Box>
  );
};

export default Quotation;
