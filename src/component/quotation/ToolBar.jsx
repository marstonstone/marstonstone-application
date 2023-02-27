import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@mui/material";

function ToolBar({ item, onChange }) {
  console.log(item);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            value={item?.width ?? ""}
            type="number"
            label="width"
            onChange={(e) => {
              onChange();
            }}
            // InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            value={item?.height ?? ""}
            type="number"
            label="height"
            onChange={(e) => {
              onChange();
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            value={item?.um ?? ""}
            type="number"
            label="Under Mounted:"
            onChange={(e) => {
              onChange();
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            value={item?.wf ?? ""}
            type="number"
            label="Waterfall"
            onChange={(e) => {
              onChange();
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            value={item?.fm ?? ""}
            type="number"
            label="Flush Mounted"
            onChange={(e) => {
              onChange();
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            value={item?.sp ?? ""}
            type="number"
            label="Splash Back"
            onChange={(e) => {
              onChange();
            }}
          />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {/* <Typography>Width:</Typography> */}

      {/* <Typography>Height:</Typography> */}

      {/* <Typography>Under Mounted :</Typography> */}

      {/* <Typography>Waterfall:</Typography> */}

      {/* <Typography>Flush Mounted:</Typography> */}

      {/* <Typography>Splash Back:</Typography> */}
    </div>
  );
}

export default ToolBar;
