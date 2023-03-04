import React from "react";
import ButtonSection from "./ButtonSection";
import DrawingPanel from "./DrawingPanel";
// import Temp from "./DrawingPanel";

function DrawPad({ handleNext, handleBack, activeStep, boxWidth }) {
  return (
    <>
      <DrawingPanel boxWidth={boxWidth} />
      <ButtonSection
        handleBack={handleBack}
        handleNext={handleNext}
        activeStep={activeStep}
      />
    </>
  );
}

export default DrawPad;
