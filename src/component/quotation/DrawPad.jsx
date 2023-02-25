import React from "react";
import ButtonSection from "./ButtonSection";
import DrawingPanel from "./DrawingPanel";
import Temp from "./Temp";

function DrawPad({ handleNext, handleBack, activeStep }) {
  return (
    <>
      {/* <DrawingPanel /> */}
      <Temp />
      <ButtonSection
        handleBack={handleBack}
        handleNext={handleNext}
        activeStep={activeStep}
      />
    </>
  );
}

export default DrawPad;
