import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@mui/material";
import SelectedServicesList from "./SelectedServicesList";

function ToolBar({ item, handleChange }) {
  console.log(item);
  const [udpateData, setUpdateData] = useState({});
  //   console.log(onChange(item));
  const handleInstallOptions = (selectedOptions) => {
    let updatedItem = { ...item, options: [...selectedOptions] };
    handleChange(updatedItem);
  };

  return (
    <div>
      <Grid container spacing={2} mt={3}>
        <Typography>Width:</Typography>
        <Grid item xs={2}>
          <TextField
            value={item?.width ?? ""}
            type="number"
            label="width"
            onChange={(e) => {
              handleChange({ ...item, width: +e.target.value });
            }}
            // InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Typography>Height:</Typography>
        <Grid item xs={2}>
          <TextField
            value={item?.height ?? ""}
            type="number"
            label="height"
            onChange={(e) => {
              handleChange({ ...item, height: +e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Install Options :</Typography>
          <SelectedServicesList
            item={item}
            handleInstallOptions={handleInstallOptions}
          />
        </Grid>
        {/* <Grid item xs={2}>
          <TextField
            value={item?.um ?? ""}
            label="Under Mounted:"
            onChange={(e) => {
              handleChange({ ...item, um: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            value={item?.wf ?? ""}
            label="Waterfall"
            onChange={(e) => {
              handleChange({ ...item, wf: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            value={item?.fm ?? ""}
            label="Flush Mounted"
            onChange={(e) => {
              handleChange();
            }}
          />
        </Grid>
        <Grid item xs={2}>
          {" "}
          <TextField
            value={item?.sp ?? ""}
            label="Splash Back"
            onChange={(e) => {
              handleChange({ ...item, sp: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={2}></Grid> */}
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
