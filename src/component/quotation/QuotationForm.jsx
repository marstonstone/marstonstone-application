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

function QuotationForm() {
  const [openInstallDetail, setOpenInstallDetail] = useState("no");
  const [isUpstairs, setIsUpstairs] = useState("no");
  const [supplier, setSupplier] = useState("Lavi Stone");
  const methods = useFormContext();

  const unregisterKeys = ["address", "isUpstairs", "supplier", "floors"];

  const {
    register,
    reset,
    control,
    unregister,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = methods;
  console.log("errors", errors);

  // const handleSave = (formValue) => {
  //   console.log(formValue);
  // };
  useEffect(() => {
    if (openInstallDetail === "no") {
      unregister(unregisterKeys);
    }
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const { field } = useController({ name: "supplier", control });
  const supplierSet = ["Lavi Stone", "B", "C", "D"];

  const handleSelectChange = (option) => {
    // console.log(option);
    setSupplier(option.target.value);
    // console.log("option", option.target.value);
    field.onChange(option.target.value);
    // field.onChange(option);
  };

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
      <FormControl>
        <FormLabel>Request for Installation</FormLabel>
        <RadioGroup
          row
          {...register("requestInstall")}
          value={openInstallDetail}
          onChange={(e) => {
            unregister(unregisterKeys);

            setOpenInstallDetail(e.target.value);
          }}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {openInstallDetail === "yes" ? (
        <>
          {" "}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Installation Address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                // type="number"
                {...register("address.unitNo", { required: true })}
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
                {...register("address.suburb", {
                  required: true,
                })}
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
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Upstairs ? </FormLabel>
                <RadioGroup
                  row
                  value={isUpstairs}
                  {...register("isUpstairs")}
                  onChange={(e) => {
                    unregister("floors");
                    setIsUpstairs(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {isUpstairs === "yes" ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    id="floorNo"
                    {...register("floors")}
                    label="How many floors"
                    error={!!errors.floors}
                    helperText={errors.floors?.message ?? null}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel mb={2}>Supplier </FormLabel>
          <Select
            {...register("supplier", { required: true })}
            value={supplier}
            // value={field.value}
            label="Supplier"
            onChange={handleSelectChange}
            error={!!errors.supplier}
            helperText={errors.supplier?.message ?? null}
          >
            {supplierSet.map((supplier) => {
              return <MenuItem value={supplier}>{supplier}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      {/* </form> */}
    </Box>
  );
}

export default QuotationForm;
