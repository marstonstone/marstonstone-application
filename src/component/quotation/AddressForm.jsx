import React from "react";
import Grid from "@mui/material/Grid";
import { enum as zodEnum, number, object, string, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useForm, useController, useFormContext } from "react-hook-form";
import { Box, Button } from "@mui/material";

// const addressSchema = object({
//   address: {
//     unitNo: number().optional(),
//     streetNo: number().optional(),
//     streetName: string().optional(),
//     suburb: string(),
//     city: string().optional(),
//     state: string().optional(),
//     postCode: number().min(6).optional(),
//     country: string().optional(),
//   },
// });
function AddressForm({ register, errors }) {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useFormContext({
  //     defaultValues: {
  //       address: {
  //         unitNo: "",
  //         streetNo: "",
  //         streetName: "",
  //         suburb: "",
  //         city: "",
  //         state: "",
  //         postCode: "",
  //         country: "",
  //       },
  //     },
  //     resolver: zodResolver(addressSchema),
  //   });

  //   const {
  //     register,
  //     formState: { errors },
  //   } = useFormContext();

  console.log("register", register);
  console.log("errors", errors);

  //   const handleSave = (formValue) => {
  //     console.log(formValue);
  //     let {
  //       unitNo,
  //       streetNo,
  //       streetName,
  //       suburb,
  //       city,
  //       state,
  //       postCode,
  //       country,
  //     } = formValue;
  //     const singleLineAddress = `${unitNo}/${streetNo} ${streetName} ${suburb} ${city} ${state} ${postCode} ${country}`;
  //     console.log(singleLineAddress);
  //   };
  return (
    // <form onSubmit={handleSubmit(handleSave)}>
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            // type="number"
            {...register("address.unitNo")}
            label="Unit#"
            fullWidth
            autoComplete="Install unit number"
            error={!!errors?.address?.unitNo}
            helperText={errors?.address?.unitNo?.message ?? null}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            // type="number"
            {...register("address.streetNo")}
            label="Street#"
            fullWidth
            autoComplete="Install street number"
            error={!!errors?.address?.streetNo}
            helperText={errors?.address?.streetNo?.message ?? null}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register("address.streetName")}
            label="Street name"
            fullWidth
            autoComplete="Install street name"
            error={!!errors?.address?.streetName}
            helperText={errors?.address?.streetName?.message ?? null}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register("address.suburb", { required: true })}
            label="Suburb"
            fullWidth
            autoComplete="Install suburb"
            error={!!errors?.address?.suburb}
            helperText={errors?.address?.suburb?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("address.city")}
            label="City"
            fullWidth
            autoComplete="Install city"
            error={!!errors?.address?.city}
            helperText={errors?.address?.city?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("address.state")}
            label="State/Province/Region"
            autoComplete="Install state"
            fullWidth
            error={!!errors?.address?.state}
            helperText={errors?.address?.state?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // type="number"
            {...register("address.postCode")}
            label="Zip / Postal code"
            fullWidth
            autoComplete="Install postal-code"
            error={!!errors?.address?.postCode}
            helperText={errors?.address?.postCode?.message ?? null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("address.country")}
            label="Country"
            fullWidth
            autoComplete="Install country"
            error={!!errors?.address?.country}
            helperText={errors?.address?.country?.message ?? null}
          />
        </Grid>
      </Grid>
      <Button type="submit">save</Button>
    </>

    // </form>
  );
}

export default AddressForm;
