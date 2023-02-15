import React, { useState } from "react";
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
import { z } from "zod";
const schema = z.object({
  fName: z.string(),
  lName: z.string(),
  email: z.string().email(),
  mobile: z.string().min(10).max(14),
  requestInstall: z.string().optional(),
  address: {
    unitNo: z.number().optional(),
    streetNo: z.number(),
    streetName: z.string(),
    suburb: z.string(),
    city: z.string(),
    state: z.string(),
    postCode: z.number().min(4),
    country: z.string(),
  },
  isUpstairs: z.string().optional(),
  floors: z.number().optional(),
  specialCondition: z.string().optional(),
  supplier: z.string(),
});

function QuotationForm() {
  const [openInstallDetail, setOpenInstallDetail] = useState(false);
  const [isUpstairs, setIsUpstairs] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fName: "",
      lName: "",
      mobile: "",
      email: "",
      requestInstall: "",
      address: {},
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
    field.onChange(option.target.value);
  };

  return (
    <Box sx={{ margin: "0 20%" }}>
      <form onSubmit={handleSubmit(handleSave)}>
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
              helperText={errors.fName ? errors.fName : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lName", { required: true })}
              label="Last name"
              fullWidth
              autoComplete="last name"
              error={!!errors.lName}
              helperText={errors.lName ? errors.lName : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              {...register("mobile", { required: true })}
              label="Mobile"
              fullWidth
              autoComplete="mobile"
              error={!!errors.mobile}
              helperText={errors.mobile ? errors.mobile : null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("email", { required: true })}
              label="Email"
              fullWidth
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email ? errors.email : null}
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
                <Typography variant="h6" gutterBottom mt={3}>
                  Installation Address
                </Typography>
                {/* <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="address1"
                      name="address1"
                      label="Address line 1"
                      fullWidth
                      autoComplete="Install address-line1"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address line 2"
                      fullWidth
                      autoComplete="Install address-line2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      autoComplete="shipping address-level2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="state"
                      name="state"
                      label="State/Province/Region"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      fullWidth
                      autoComplete="shipping postal-code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      label="Country"
                      fullWidth
                      autoComplete="shipping country"
                    />
                  </Grid>
                </Grid> */}
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <TextField
                      {...register("address.unitNo")}
                      label="Unit#"
                      fullWidth
                      autoComplete="Install unit number"
                      //   error={!!errors.address.unitNo}
                      //   helperText={
                      //     errors.address.unitNo
                      //       ? errors.address.unitNo
                      //       : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      {...register("address.streetNo")}
                      label="Street#"
                      fullWidth
                      autoComplete="Install street number"
                      //   error={!!errors.address.streetNo}
                      //   helperText={
                      //     errors.address.streetNo
                      //       ? errors.address.streetNo
                      //       : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      {...register("address.streetName")}
                      label="Street name"
                      fullWidth
                      autoComplete="Install street name"
                      //   error={!!errors.address.streetName}
                      //   helperText={
                      //     errors.address.streetName
                      //       ? errors.address.streetName
                      //       : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      {...register("address.suburb")}
                      label="Suburb"
                      fullWidth
                      autoComplete="Install suburb"
                      //   error={!!errors.address.suburb}
                      //   helperText={
                      //     errors.address.suburb
                      //       ? errors.address.suburb
                      //       : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      {...register("address.city")}
                      label="City"
                      fullWidth
                      autoComplete="Install city"
                      //   error={!!errors.address.city}
                      //   helperText={
                      //     errors.address.city ? errors.address.city : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register("address.state")}
                      label="State/Province/Region"
                      autoComplete="Install state"
                      fullWidth
                      //   error={!!errors.address.state}
                      //   helperText={
                      //     errors.address.state
                      //       ? errors.address.state
                      //       : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      {...register("address.postCode")}
                      label="Zip / Postal code"
                      fullWidth
                      autoComplete="Install postal-code"
                      //   error={!!errors.address.postCode}
                      //   helperText={
                      //     errors.address.postCode
                      //       ? errors.address.postCode
                      //       : null
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      {...register("address.country")}
                      label="Country"
                      fullWidth
                      autoComplete="Install country"
                      //   error={!!errors.address.country}
                      //   helperText={
                      //     errors.address.country
                      //       ? errors.address.country
                      //       : null
                      //   }
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
                          helperText={errors.floors ? errors.floors : null}
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
                        helperText={errors.supplier ? errors.supplier : null}
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

export default QuotationForm;
