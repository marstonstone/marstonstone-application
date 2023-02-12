import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function QuotationForm() {
  const [openInstallDetail, setOpenInstallDetail] = useState(false);
  const [isUpstairs, setIsUpstairs] = useState(false);

  return (
    <Box sx={{ margin: "0 20%" }}>
      <Typography variant="h5" gutterBottom>
        Customer Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mobile"
            name="mobile"
            label="Mobile"
            fullWidth
            autoComplete="mobile"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="customer address-line1"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="customer address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="customer address-level2"
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
              name="installationRequest"
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
              <Grid container spacing={3}>
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
              </Grid>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>Upstairs ? </FormLabel>
                    <RadioGroup
                      row
                      name="installationRequest"
                      value={isUpstairs}
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
                        name="floorNo"
                        label="How many floors"
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default QuotationForm;
