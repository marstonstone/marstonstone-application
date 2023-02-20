import React from "react";
import { Box, Button } from "@mui/material";

function ButtonSection({ handleBack, handleNext, activeStep, handleSaveForm }) {
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
          {activeStep === activeStep.length - 1 ? "Finish" : "Next"}
        </Button>
      ) : (
        <Button variant="contained" onClick={handleNext} sx={{ ml: "auto" }}>
          {activeStep === activeStep.length - 1 ? "Finish" : "Next"}
        </Button>
      )}
    </Box>
  );
}

export default ButtonSection;
