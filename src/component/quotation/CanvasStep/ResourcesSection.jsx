import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Image = styled('img')({
  width: '100%',
  height: '100%',
  //   objectFit: 'cover',
});

const ImageList = styled(List)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
  gap: 16,
  marginBottom: 16,
});

const StyledBottomNavigation = styled(BottomNavigation)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const ResourcesContainer = styled(Box)({
  //   height: '100%',
  display: 'flex',
  //   //   justifyContent: 'flex-end',
  marginRight: '30px',
});

export const ResourcesSection = ({ ImageList: imageList, rectangleList, itemNo, setIsDragging }) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <ResourcesContainer>
      <Box>
        <StyledBottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(event.target);
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value="Images" label="Images" icon={<RestoreIcon />} />
          <BottomNavigationAction value="Shapes" label="Shapes" icon={<FavoriteIcon />} />
          <BottomNavigationAction value="Resize" label="Resize" icon={<FavoriteIcon />} />
        </StyledBottomNavigation>
      </Box>

      {value === 'Images' ? (
        <ImageSection imageList={imageList} itemNo={itemNo} setIsDragging={setIsDragging} />
      ) : (
        <></>
      )}
      {value === 'Shapes' ? (
        <ShapeSection rectangleList={rectangleList} itemNo={itemNo} setIsDragging={setIsDragging} />
      ) : (
        <></>
      )}
      {/* 
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Objects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={2} gap={8}>
            {imageList.map((item) => (
              <ImageListItem key={item.img}>
                <Image
                  src={item.src}
                  alt={item.label}
                  draggable="true"
                  onDragStart={(e) => {
                    let imgTemp = {
                      type: 'image',
                      id: itemNo,
                      src: e.target.src,
                      width: e.target.naturalWidth,
                      height: e.target.naturalHeight,
                    };
                    setIsDragging(imgTemp);
                  }}
                />
                <ImageListItemBar title={item.label} sx={{ height: '15px' }} />
              </ImageListItem>
            ))}
          </ImageList>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Shapes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={2} gap={8}>
            {rectangleList.map((rectItem) => (
              <Box
                sx={{
                  width: '100%',
                  paddingTop: '100%',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: rectItem.fill,
                    cursor: 'move',
                  }}
                  data-shape-type="rect"
                  draggable="true"
                  onDragStart={(e) => {
                    let rectTemp = rectangleList.find((rec) => rec.id === rectItem.id);
                    rectTemp.id = itemNo;
                    setIsDragging(rectTemp);
                  }}
                />
              </Box>
            ))}
          </ImageList>
        </AccordionDetails>
      </Accordion> */}
      {/* <ShapeSection rectangleList={rectangleList} itemNo={itemNo} setIsDragging={setIsDragging} />
      <ImageSection imageList={imageList} itemNo={itemNo} setIsDragging={setIsDragging} /> */}
    </ResourcesContainer>
  );
};

const ImageSection = ({ imageList, itemNo, setIsDragging }) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionDetails>
        <ImageList cols={2} gap={8}>
          {imageList.map((item) => (
            <ImageListItem key={item.img}>
              <Image
                src={item.src}
                alt={item.label}
                draggable="true"
                onDragStart={(e) => {
                  let imgTemp = {
                    type: 'image',
                    id: itemNo,
                    src: e.target.src,
                    width: e.target.naturalWidth,
                    height: e.target.naturalHeight,
                  };
                  setIsDragging(imgTemp);
                }}
              />
              <ImageListItemBar title={item.label} sx={{ height: '15px' }} />
            </ImageListItem>
          ))}
        </ImageList>
      </AccordionDetails>
    </Accordion>
  );
};

const ShapeSection = ({ rectangleList, itemNo, setIsDragging }) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionDetails>
        <ImageList cols={2} gap={8}>
          {rectangleList.map((rectItem) => (
            <Box
              sx={{
                width: '100%',
                paddingTop: '100%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: rectItem.fill,
                  cursor: 'move',
                }}
                data-shape-type="rect"
                draggable="true"
                onDragStart={(e) => {
                  let rectTemp = rectangleList.find((rec) => rec.id === rectItem.id);
                  rectTemp.id = itemNo;
                  setIsDragging(rectTemp);
                }}
              />
            </Box>
          ))}
        </ImageList>
      </AccordionDetails>
    </Accordion>
  );
};

export default ResourcesSection;
