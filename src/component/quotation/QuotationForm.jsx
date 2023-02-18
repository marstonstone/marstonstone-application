import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toast } from "react-toastify";
import { useForm, useController, useFormContext } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { enum as zodEnum, number, object, string, boolean } from "zod";
import AddressForm from "./AddressForm";
const schema = object({
  fName: string()
    .min(2, "Please enter a valid first name")
    .max(32, "First name must be less than 100 characters"),
  lName: string()
    .min(2, "Please enter a valid first name")
    .max(32, "First name must be less than 100 characters"),
  email: string().email(),
  mobile: string()
    .startsWith("04", "Mobile number should start with '04'")
    .min(10)
    .max(14),
});

function QuotationForm({ handleSubmit }) {
  const {
    register,
    control,
    // handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext({
    defaultValues: {
      fName: "",
      lName: "",
      mobile: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });
  console.log("errors", errors);

  const handleSave = (formValue) => {
    console.log(formValue);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box>
      {/* <form onSubmit={handleSubmit(handleSave)}> */}
      <Typography variant="h5" gutterBottom>
        Customer Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("fName", { required: true })}
            label="First name"
            fullWidth
            autoComplete="first name"
            error={!!errors.fName}
            helperText={errors.fName?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("lName", { required: true })}
            label="Last name"
            fullWidth
            autoComplete="last name"
            error={!!errors.lName}
            helperText={errors.lName?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("mobile", { required: true })}
            label="Mobile"
            fullWidth
            autoComplete="mobile"
            error={!!errors.mobile}
            helperText={errors.mobile?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("email", { required: true })}
            label="Email"
            fullWidth
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message ?? null}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom mt={4}>
        Installation Detial
      </Typography>
      {/* <AddressForm handleSubmit={handleSubmit} /> */}
      <Button type="submit">Next</Button>
      {/* </form> */}
    </Box>
  );
}

export default QuotationForm;
