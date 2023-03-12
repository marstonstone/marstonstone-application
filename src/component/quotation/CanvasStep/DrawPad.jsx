import React, { useState } from 'react';
import ButtonSection from '../ButtonSection';
import Canvas from './Canvas';
import { Box } from '@mui/material';

function DrawPad({ handleNext, handleBack, activeStep, boxWidth }) {
  const [canvasData, setCanvasData] = useState({});
  return (
    <>
      <Box>
        <Canvas boxWidth={boxWidth} setCanvasData={setCanvasData} />
      </Box>

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
