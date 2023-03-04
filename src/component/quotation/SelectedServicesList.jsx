import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
//not use
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const installOptions = [
  { label: "Under Mounted", value: "um" },
  { label: "Waterfall", value: "wf" },
  { label: "Flush Mounted", value: "fm" },
  { label: "Splash Back", value: "sp" },
];

export default function SelectedServicesList({ item, handleInstallOptions }) {
  console.log(item?.options);
  const [checked, setChecked] = useState([]);
  const [options, setOptions] = useState(installOptions);
  const [selectedOption, setSelectedOptions] = useState(
    item?.options?.length > 0 ? item?.options : []
  );

  const leftChecked = intersection(checked, options);
  const rightChecked = intersection(checked, selectedOption);

  useEffect(() => {
    setOptions(
      installOptions.filter(
        (installOption) =>
          !item?.options?.some(
            (option) => option?.value === installOption.value
          )
      )
    );
    setSelectedOptions(item?.options?.length > 0 ? item?.options : []);
    setChecked(item?.options?.length > 0 ? item?.options : []);
  }, [item?.options]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(value, newChecked);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  //move selected Options to chosen
  const handleCheckedRight = () => {
    setSelectedOptions(selectedOption.concat(leftChecked));
    setOptions(not(options, leftChecked));
    setChecked(union(checked, leftChecked));
  };

  //move selected options to left
  const handleCheckedLeft = () => {
    setOptions(options.concat(rightChecked));
    setSelectedOptions(not(selectedOption, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  useEffect(() => {
    console.log(selectedOption);
    handleInstallOptions(selectedOption);
  }, [selectedOption]);

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.label}-label`;

          return (
            <ListItem
              key={value.label}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.label}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList("Options", options)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Chosen", selectedOption)}</Grid>
    </Grid>
  );
}
