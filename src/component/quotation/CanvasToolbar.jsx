import {
  Toolbar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { padding } from "@mui/system";
import React, { useState, useEffect, useMemo } from "react";

const installOptions = [
  { label: "Under Mounted", value: "um" },
  { label: "Waterfall", value: "wf" },
  { label: "Flush Mounted", value: "fm" },
  { label: "Splash Back", value: "sp" },
];

const materialOptions = ["A", "B", "C", "D"];

function CanvasToolbar({ item, handleChange }) {
  const [selectedOptions, setSelectedOptions] = useState(item?.options ?? []);
  const [selectedMaterial, setSelectedMaterial] = useState("A");
  const isAllSelected =
    installOptions.length > 0 &&
    selectedOptions?.length === installOptions.length;

  const handleMultiSelectChange = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "all") {
      const updatedSelectedOption =
        selectedOptions?.length === installOptions?.length
          ? []
          : installOptions.map((item) => item.value);

      setSelectedOptions(updatedSelectedOption);

      return;
    }

    setSelectedOptions(value);
  };

  const handleMaterialChange = (event) => {
    handleChange({ ...item, material: event.target.value });
    setSelectedMaterial(event.target.value);
  };

  //update items selected options
  useEffect(() => {
    handleChange({ ...item, options: [...selectedOptions] });
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions(item?.options ?? []);
    setSelectedMaterial(item?.material ?? "A");
  }, [item]);

  return (
    <Toolbar style={{ paddingLeft: 0 }}>
      <TextField
        value={item?.width ?? "0"}
        type="number"
        label="width"
        onChange={(e) => {
          handleChange({ ...item, width: +e.target.value });
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ mr: 1 }}
      />
      <TextField
        value={item?.height ?? "0"}
        type="number"
        label="height"
        onChange={(e) => {
          handleChange({ ...item, height: +e.target.value });
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ mr: 1 }}
      />
      <FormControl variant="outlined" size="small">
        <InputLabel>Material</InputLabel>
        <Select
          label="Material"
          value={selectedMaterial}
          onChange={handleMaterialChange}
          sx={{ mr: 1 }}
        >
          {materialOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <MultiSelect
        selected={selectedOptions}
        handleMultiSelectChange={handleMultiSelectChange}
        isAllSelected={isAllSelected}
      />
    </Toolbar>
  );
}

const MultiSelect = ({ selected, handleMultiSelectChange, isAllSelected }) => {
  return (
    <FormControl sx={{ mr: 1 }}>
      <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleMultiSelectChange}
        renderValue={(selected) => selected.join(", ")}
      >
        <MenuItem value="all">
          <ListItemIcon>
            <Checkbox
              checked={isAllSelected}
              indeterminate={
                selected?.length > 0 && selected?.length < installOptions.length
              }
            />
          </ListItemIcon>
          <ListItemText primary="Select All" />
        </MenuItem>
        {installOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            <ListItemIcon>
              <Checkbox checked={selected?.indexOf(option.value) > -1} />
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CanvasToolbar;
