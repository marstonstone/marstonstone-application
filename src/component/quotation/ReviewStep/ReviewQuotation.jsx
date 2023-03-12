import React from 'react';
import ButtonSection from '../ButtonSection';

function ReviewQuotation({ handleNext, handleBack, activeStep }) {
  return (
    <div>
      ReviewQuotation
      <ButtonSection handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} />
    </div>
  );
}

export default ReviewQuotation;
