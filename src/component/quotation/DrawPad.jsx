import React from "react";
import ButtonSection from "./ButtonSection";
import DrawingPanel from "./DrawingPanel";

function DrawPad({ handleNext, handleBack, activeStep }) {
  return (
    <>
      <DrawingPanel />
      <ButtonSection
        handleBack={handleBack}
        handleNext={handleNext}
        activeStep={activeStep}
      />
    </>
  );
}

export default DrawPad;
