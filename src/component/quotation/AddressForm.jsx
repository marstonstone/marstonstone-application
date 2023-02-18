import React from "react";
import Grid from "@mui/material/Grid";
import { enum as zodEnum, number, object, string, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useForm, useController } from "react-hook-form";
import { Box, Button } from "@mui/material";

const addressSchema = object({
  unitNo: number().optional(),
  streetNo: number().optional(),
  streetName: string().optional(),
  suburb: string(),
  city: string().optional(),
  state: string().optional(),
  postCode: number().min(6).optional(),
  country: string().optional(),
});
function AddressForm({ handleSubmit }) {
  console.log(handleSubmit);
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      unitNo: "",
      streetNo: "",
      streetName: "",
      suburb: "",
      city: "",
      state: "",
      postCode: "",
      country: "",
    },
    resolver: zodResolver(addressSchema),
  });
  console.log("errors", errors);

  const handleSave = (formValue) => {
    console.log(formValue);
    let {
      unitNo,
      streetNo,
      streetName,
      suburb,
      city,
      state,
      postCode,
      country,
    } = formValue;
    const singleLineAddress = `${unitNo}/${streetNo} ${streetName} ${suburb} ${city} ${state} ${postCode} ${country}`;
    console.log(singleLineAddress);
  };
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            {...register("unitNo")}
            label="Unit#"
            fullWidth
            autoComplete="Install unit number"
            error={!!errors?.unitNo}
            helperText={errors?.unitNo?.message ?? null}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register("streetNo")}
            label="Street#"
            fullWidth
            autoComplete="Install street number"
            error={!!errors?.streetNo}
            helperText={errors?.streetNo?.message ?? null}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register("streetName")}
            label="Street name"
            fullWidth
            autoComplete="Install street name"
            error={!!errors?.streetName}
            helperText={errors?.streetName?.message ?? null}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register("suburb")}
            label="Suburb"
            fullWidth
            autoComplete="Install suburb"
            error={!!errors?.suburb}
            helperText={errors?.suburb?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            {...register("city")}
            label="City"
            fullWidth
            autoComplete="Install city"
            error={!!errors?.city}
            helperText={errors?.city?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("state")}
            label="State/Province/Region"
            autoComplete="Install state"
            fullWidth
            error={!!errors?.state}
            helperText={errors?.state?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            {...register("postCode")}
            label="Zip / Postal code"
            fullWidth
            autoComplete="Install postal-code"
            error={!!errors?.postCode}
            helperText={errors?.postCode?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            {...register("country")}
            label="Country"
            fullWidth
            autoComplete="Install country"
            error={!!errors?.country}
            helperText={errors?.country?.message ?? null}
          />
        </Grid>
      </Grid>
      <Button type="submit">save</Button>
    </form>
  );
}

export default AddressForm;
