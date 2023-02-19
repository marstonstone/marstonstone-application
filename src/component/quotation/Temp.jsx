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
import { useForm, useController } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { enum as zodEnum, number, object, string, boolean } from "zod";
const schema = object({
  fName: string(),
  lName: string(),
  email: string().email(),
  mobile: string().min(10).max(14),
  requestInstall: zodEnum(["yes", "no"]),
  address: {
    unitNo: number().optional(),
    streetNo: number(),
    streetName: string(),
    suburb: string(),
    city: string(),
    state: string(),
    postCode: number().min(4),
    country: string(),
  },
  isUpstairs: zodEnum(["yes", "no"]),
  floors: number().optional(),
  specialCondition: string().optional(),
  supplier: zodEnum(["A", "B", "C", "D"]),
});

function Temp() {
  const [openInstallDetail, setOpenInstallDetail] = useState(false);
  const [isUpstairs, setIsUpstairs] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      fName: "",
      lName: "",
      mobile: "",
      email: "",
      requestInstall: "",
      address: {
        unitNo: "",
        streetNo: "",
        streetName: "",
        suburb: "",
        city: "",
        state: "",
        postCode: "",
        country: "",
      },
      isUpstairs: "",
      floors: "",
      specialCondition: "",
      supplier: "",
    },
    resolver: zodResolver(schema),
  });
  console.log("errors", errors);
  const { field } = useController({ name: "supplier", control });
  const supplierSet = ["A", "B", "C", "D"];
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
    } = formValue?.address;
    const singleLineAddress = `${unitNo}/${streetNo} ${streetName} ${suburb} ${city} ${state} ${postCode} ${country}`;
    console.log(singleLineAddress);
  };
  const handleSelectChange = (option) => {
    // console.log(option);
    // field.onChange(option.target.value);
    field.onChange(option);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box sx={{ margin: "0 20%" }}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Typography variant="h5" gutterBottom>
          Customer Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("fName")}
              label="First name"
              fullWidth
              autoComplete="first name"
              error={!!errors.fName}
              helperText={errors.fName?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("lName")}
              label="Last name"
              fullWidth
              autoComplete="last name"
              error={!!errors.lName}
              helperText={errors.lName?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("mobile")}
              label="Mobile"
              fullWidth
              autoComplete="mobile"
              error={!!errors.mobile}
              helperText={errors.mobile?.message ?? null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("email")}
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel>Request for Installation</FormLabel>
              <RadioGroup
                row
                {...register("requestInstall")}
                value={openInstallDetail}
                onChange={(e) => {
                  setOpenInstallDetail(e.target.value);
                }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {openInstallDetail === "yes" ? (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Installation Address
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <TextField
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
                      {...register("address.suburb")}
                      label="Suburb"
                      fullWidth
                      autoComplete="Install suburb"
                      error={!!errors?.address?.suburb}
                      helperText={errors?.address?.suburb?.message ?? null}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
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
                      required
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
                      required
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
                          setIsUpstairs(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
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
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel mb={2}>Supplier </FormLabel>
                      <Select
                        value={supplierSet.find(
                          ({ value }) => value === field.value
                        )}
                        label="Supplier"
                        onChange={handleSelectChange}
                        error={!!errors.supplier}
                        helperText={errors.supplier?.message ?? null}
                      >
                        {supplierSet.map((supplier) => {
                          return (
                            <MenuItem value={supplier}>{supplier}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            ) : (
              <></>
            )}
            <Button type="submit">Next</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Temp;
