import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Stage, Layer, Rect, Transformer, Image, Text } from 'react-konva';
import { ImageList } from '../images/images';
import useImage from 'use-image';
import { Button, TextField, Grid, Divider } from '@mui/material';
import CanvasToolbar from './CanvasToolbar';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import ResourcesSection from './ResourcesSection';
import ImageComponent from './KonvaComponent/ImageComponent';
import RectComponent from './KonvaComponent/RectComponent';

const moveItemToTop = (item) => {
  const selectedShape = item;
  selectedShape.moveToTop();
  selectedShape.getLayer().batchDraw();
};

const getPlottingScale = (maxWidth) => {
  let ratio = 1;
  if (maxWidth <= 1000) {
    return ratio;
  } else if (maxWidth <= 2000) {
    ratio = 2;
  } else if (maxWidth <= 3000) {
    ratio = 3;
  } else if (maxWidth <= 4000) {
    ratio = 4;
  } else if (maxWidth <= 5000) {
    ratio = 5;
  } else if (maxWidth <= 6000) {
    ratio = 6;
  } else {
    ratio = 1;
  }

  return ratio;
};

// now you may want to make it visible even on small screens
// we can just scale it

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: '#D9CAB3',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: '#6D9886',
    id: 'rect2',
  },
];

const Canvas = ({ boxWidth, setCanvasData }) => {
  //order state from redux
  const order = useSelector((state) => state.order.order);

  // static canvas dimensions used for scaling ratio
  const stageWidth = 1000,
    stageHeight = 700;
  // dynamic canvas dimensions
  const [stageDimensions, setStageDimensions] = useState({
    width: stageWidth,
    height: stageHeight,
    scale: 1,
  });

  const [rectangleList, setRectangleList] = useState(initialRectangles);
  const [selectedItem, setSelectedItem] = useState(null);
  const [images, setImages] = useState(order?.canvas?.objects ?? []);
  const stageRef = useRef();
  const containerRef = useRef();
  const [rects, setRects] = useState(order?.canvas?.shapes ?? []);
  const [isDragging, setIsDragging] = useState(false);
  const [itemNo, setItemNo] = useState('1');
  const [maxWidth, setMaxWidth] = useState(order?.canvas?.maxWidth ?? null);
  const [plottingScale, setPlottingScale] = useState(order?.canvas?.plottingScale ?? 1);
  const [isFocused, setIsFocused] = useState(false);

  // useEffect(() => {
  //   console.log(stageDimensions);
  // }, [stageDimensions]);

  //update Canvas data to be saved to redux
  useEffect(() => {
    setCanvasData((prev) => ({ ...prev, objects: [...images], shapes: [...rects], plottingScale, maxWidth }));
  }, [images, rects, plottingScale, maxWidth]);

  // add eventListener for every window resize to call handleResize function
  useEffect(() => {
    handleCanvasResize();
    window.addEventListener('resize', handleCanvasResize, false);
    return () => window.addEventListener('resize', handleCanvasResize, false);
  }, []);

  // function to handle resize of canvas dimensions based on window width or when sidebar is closed or opened
  const handleCanvasResize = () => {
    console.log(containerRef);
    // console.log('inner width', window.innerWidth);
    let sceneWidth = window.innerWidth - 700;
    console.log(sceneWidth);
    let scale = sceneWidth / stageWidth;
    console.log(scale);
    setStageDimensions({
      width: stageWidth * scale,
      height: stageHeight * scale,
      scale: scale,
    });
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedItem(null);
      setIsFocused(false);
    }
  };

  const handleImageSelect = (e, image) => {
    // const itemId = e.target.id();
    moveItemToTop(e.target);
    console.log('selectedId', image);
    setSelectedItem(image);
  };

  const handleStoneSelect = (e, stone) => {
    // moveItemToTop(e.target);
    console.log('selectedId', stone);
    setSelectedItem(stone);
  };

  //Delete single item in key down
  useEffect(() => {
    const handleDelete = (event) => {
      if (isFocused) {
        console.log(isFocused);
        return;
      } else {
        if ((event.key === 'Delete' || event.key === 'Backspace') && selectedItem) {
          setImages((prev) => prev.filter((image) => image.id !== selectedItem?.id));
          setRects((prev) => prev.filter((rect) => rect.id !== selectedItem?.id));
          setSelectedItem(null);
        }
      }
    };
    window.addEventListener('keydown', handleDelete);
    return () => {
      window.removeEventListener('keydown', handleDelete);
    };
  }, [selectedItem, isFocused]);

  //clear the Canvas
  const handleClear = (item) => {
    setImages([]);
    setRects([]);
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    // get current point position and set item placement point
    stageRef.current.setPointersPositions(e);
    const x = stageRef.current.getPointerPosition(e).x - isDragging.width / 2;
    const y = stageRef.current.getPointerPosition(e).y - isDragging.height / 2;
    console.log(isDragging);
    // add image
    if (isDragging.type === 'image') {
      setImages(
        images.concat([
          {
            x,
            y,
            ...isDragging,
          },
        ])
      );
      setItemNo((prev) => (+prev + 1).toString());
    } else {
      setRects(
        rects.concat([
          {
            ...isDragging,
            x,
            y,
          },
        ])
      );
      setItemNo((prev) => (+prev + 1).toString());
    }
  };

  const handleUpdateItem = (updatedItem) => {
    console.log('updatedItem', updatedItem);
    if (updatedItem?.id === selectedItem?.id) {
      // setSelectedItem(updatedItem);
    }
    if (updatedItem?.type === 'image') {
      const updatedItems = images.map((img) => {
        if (img.id === updatedItem.id) {
          return { ...updatedItem };
        }
        return img;
      });
      setImages(updatedItems);
    } else {
      const updatedItems = rects.map((rect) => {
        if (rect.id === updatedItem.id) {
          return { ...updatedItem };
        }
        return rect;
      });

      setRects(updatedItems);
    }
  };

  // when sidebar state changes this function is being called
  const resizeCanvasOnSidebarChange = () => {
    // wait for sidebar animation to complete
    setTimeout(() => {
      handleCanvasResize();
    }, 420);
  };

  useEffect(() => {
    console.log('images', images);
  }, [images]);
  useEffect(() => {
    console.log('rectangles sample', rectangleList);
  }, [rectangleList]);
  useEffect(() => {
    console.log('rects', rects);
  }, [rects]);
  useEffect(() => {
    console.log('isDragging', isDragging);
  }, [isDragging]);

  const memoisedToolbar = useMemo(() => {
    // if (!selectedItem) return;
    return (
      <CanvasToolbar
        item={selectedItem}
        handleChange={handleUpdateItem}
        setIsFocused={setIsFocused}
        setSelectedItem={setSelectedItem}
        plottingScale={plottingScale}
      />
    );
  }, [selectedItem, images, rects]);

  return (
    <Box>
      <TextField
        value={maxWidth}
        type="number"
        label="Maximum width"
        fullWidth
        helperText="please enter the maximum length of you project"
        onChange={(e) => {
          setMaxWidth(e.target.value);
          setPlottingScale(getPlottingScale(+e.target.value));
        }}
        onFocus={() => setIsFocused(true)}
      />

      <Divider style={{ margin: '20px' }}>Canvas</Divider>
      <Button onClick={handleClear} variant="contained">
        Clear
      </Button>
      {/* Start Canvas */}

      {/* Resource Section */}

      <ResourcesSection
        ImageList={ImageList}
        rectangleList={rectangleList}
        itemNo={itemNo}
        setIsDragging={setIsDragging}
      />

      {/* Canvas Toolbar */}
      {memoisedToolbar}
      {/* Canvas */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <div
          ref={containerRef}
          onDrop={handleOnDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <Stage
            width={stageDimensions.width}
            height={stageDimensions.height}
            scaleX={stageDimensions.scale}
            scaleY={stageDimensions.scale}
            ref={stageRef}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{ border: '1px solid grey' }}
          >
            <Layer>
              {rects.map((rect, i) => {
                return (
                  <RectComponent
                    key={i}
                    shapeProps={rect}
                    isSelected={rect.id === selectedItem?.id}
                    onSelect={(e) => handleStoneSelect(e, rect)}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                    onChange={(newAttrs) => {
                      console.log('onchange newAttrs', newAttrs);
                      let updatedItem = {
                        ...newAttrs,
                        scaledWidth: newAttrs.width * plottingScale,
                        scaledHeight: newAttrs.height * plottingScale,
                      };
                      const rectTemp = rects.slice();
                      rectTemp[i] = updatedItem;
                      setRects(rectTemp);
                    }}
                    onDragStart={(e) => {
                      let rectTemp = rects.find((rec) => rec.id === rect.id);
                      setIsDragging(rectTemp);
                    }}
                    plottingScale={plottingScale}
                  />
                );
              })}
              {images.map((image, i) => {
                return (
                  <ImageComponent
                    key={i}
                    imageProps={image}
                    isSelected={image.id === selectedItem?.id}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    onSelect={(e) => handleImageSelect(e, image)}
                    onChange={(newAttrs) => {
                      let updatedItem = {
                        ...newAttrs,
                        scaledWidth: newAttrs.width * plottingScale,
                        scaledHeight: newAttrs.height * plottingScale,
                      };
                      const imageTemp = images.slice();
                      imageTemp[i] = updatedItem;
                      setImages(imageTemp);
                    }}
                    onDragStart={(e) => {
                      let imageTemp = images.find((img) => img.id === image.id);
                      setIsDragging(imageTemp);
                    }}
                    plottingScale={plottingScale}
                    moveItemToTop={moveItemToTop}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </Box>
  );
};

// const ResourcesSection = ({ ImageList, rectangleList, itemNo, setIsDragging }) => {
//   return (
//     <Box mr={3}>
//       <Accordion defaultExpanded={true}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
//           <Typography>Objects</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Box>
//             <Grid container spacing={2}>
//               {ImageList.map((img) => (
//                 <Grid item xs={6}>
//                   <Box
//                     sx={{
//                       width: '100%',
//                       paddingTop: '100%',
//                       position: 'relative',
//                     }}
//                   >
//                     <img
//                       key={img.id}
//                       alt="item"
//                       id={img.id}
//                       src={img.src}
//                       draggable="true"
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                       }}
//                       onDragStart={(e) => {
//                         let imgTemp = {
//                           type: 'image',
//                           id: itemNo,
//                           src: e.target.src,
//                           width: e.target.naturalWidth,
//                           height: e.target.naturalHeight,
//                         };
//                         setIsDragging(imgTemp);
//                       }}
//                     />
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion defaultExpanded={true}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
//           <Typography>Shapes</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Box>
//             <Grid container spacing={2}>
//               {rectangleList.map((rectItem) => (
//                 <Grid item xs={6}>
//                   <Box
//                     sx={{
//                       width: '100%',
//                       paddingTop: '100%',
//                       position: 'relative',
//                     }}
//                   >
//                     <div
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         backgroundColor: rectItem.fill,
//                         cursor: 'move',
//                       }}
//                       data-shape-type="rect"
//                       draggable="true"
//                       onDragStart={(e) => {
//                         let rectTemp = rectangleList.find((rec) => rec.id === rectItem.id);
//                         rectTemp.id = itemNo;
//                         setIsDragging(rectTemp);
//                       }}
//                     />
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </AccordionDetails>
//       </Accordion>
//     </Box>
//   );
// };

export default Canvas;
