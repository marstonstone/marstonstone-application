import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import QuotationForm from "../component/quotation/QuotationForm";

function Quotation() {
  return (
    <>
      <QuotationHeader />
      <QuotationForm />
    </>
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

export default Quotation;
