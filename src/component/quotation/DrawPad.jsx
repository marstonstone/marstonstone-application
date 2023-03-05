import React, { useState } from 'react';
import ButtonSection from './ButtonSection';
import DrawingPanel from './DrawingPanel';

function DrawPad({ handleNext, handleBack, activeStep, boxWidth }) {
  const [canvasData, setCanvasData] = useState({});
  return (
    <>
      <DrawingPanel boxWidth={boxWidth} setCanvasData={setCanvasData} />
      <ButtonSection
        handleBack={handleBack}
        handleNext={() => {
          handleNext(canvasData);
        }}
        activeStep={activeStep}
      />
    </>
  );
}

export default DrawPad;
