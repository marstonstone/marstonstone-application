import React from "react";
import ButtonSection from "./ButtonSection";
// import AddressForm from "./AddressForm";

function DrawPad({ handleNext, handleBack, activeStep }) {
  return (
    <>
      {/* <AddressForm /> */}
      <ButtonSection
        handleBack={handleBack}
        handleNext={handleNext}
        activeStep={activeStep}
      />
    </>
  );
}

export default DrawPad;
