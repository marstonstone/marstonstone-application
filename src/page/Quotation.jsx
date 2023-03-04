import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { StepLabel, Stepper, Step } from '@mui/material';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import DrawPad from '../component/quotation/DrawPad';
import ReviewQuotation from '../component/quotation/ReviewQuotation';
import QuotationForm from '../component/quotation/QuotationForm';
import { cacheOrder } from '../redux/slices/orderSlice';

function Quotation() {
  const [activeStep, setActiveStep] = useState(0);
  const [boxWidth, setBoxWidth] = useState(1000);
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order.order);

  const handleNext = (data) => {
    console.log('next');

    //handle data from drawing pad save to redux
    if (data) {
      dispatch(cacheOrder({ ...order, canvas: data }));
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step, handleBack, handleNext) => {
    switch (step) {
      case 0:
        return (
          <Box ml={20} mr={20}>
            <QuotationForm handleBack={handleBack} handleNext={handleNext} activeStep={step} />
          </Box>
        );
      case 1:
        return (
          <Box ml={20} mr={20}>
            <DrawPad handleBack={handleBack} handleNext={handleNext} activeStep={step} boxWidth={boxWidth} />
          </Box>
        );
      case 2:
        return (
          <Box ml={10} mr={10}>
            <ReviewQuotation handleBack={handleBack} handleNext={handleNext} activeStep={step} />
          </Box>
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        ml={10}
        mr={10}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: boxWidth,
          width: '100%',
        }}
      >
        <QuotationHeader />
        <QuotationStepper activeStep={activeStep} />
      </Box>
      {getStepContent(activeStep, handleBack, handleNext)}
    </Box>
  );
}

const QuotationHeader = () => {
  return (
    <Typography variant="h2" align="center" fontWeight={500} sx={{ margin: '50px 0' }}>
      Quotation
    </Typography>
  );
};

const steps = ['Information', 'Details', 'Review your order'];
const QuotationStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} sx={{ padding: '20px', marginBottom: '20px' }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Quotation;
