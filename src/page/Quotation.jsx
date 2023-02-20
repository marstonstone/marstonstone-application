import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { StepLabel, Stepper, Step } from "@mui/material";
import { Box, Button } from "@mui/material";
// import { useForm, FormProvider } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";

import QuotationForm from "../component/quotation/QuotationForm";
import DrawPad from "../component/quotation/DrawPad";
import ReviewQuotation from "../component/quotation/ReviewQuotation";
import { enum as zodEnum, number, object, string, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { cacheOrder } from "../redux/slices/orderSlice";
import QuotationForms from "../component/quotation/QuotationForms";

function Quotation() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    console.log("next");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step, handleBack, handleNext) => {
    switch (step) {
      case 0:
        return (
          <QuotationForms
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={step}
          />
        );
      case 1:
        return (
          <>
            <DrawPad
              handleBack={handleBack}
              handleNext={handleNext}
              activeStep={step}
            />
          </>
        );
      case 2:
        return (
          <>
            <ReviewQuotation
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
      {getStepContent(activeStep, handleBack, handleNext)}
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
