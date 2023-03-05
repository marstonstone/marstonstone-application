import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Stage, Layer, Rect, Transformer, Image, Text } from 'react-konva';
import { ImageList } from './images/images';
import useImage from 'use-image';
import {
  Button,
  TextField,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from '@mui/material';
import CanvasToolbar from './CanvasToolbar';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';

const moveItemToTop = (item) => {
  const selectedShape = item;
  selectedShape.moveToTop();
  selectedShape.getLayer().batchDraw();
};

const getRatioForItem = (maxWidth) => {
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

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, ratio, setSelectedItem }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          //   moveItemToTop(e.target);
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: +Math.max(5, node.width() * scaleX).toFixed(0),
            height: +Math.max(node.height() * scaleY).toFixed(0),
          });
        }}
      />
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              setSelectedItem((prev) => ({
                ...prev,
                width: +newBox.width.toFixed(0),
                height: +newBox.height.toFixed(0),
              }));

              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <Text
            text={`W: ${shapeProps.width * ratio}, H: ${shapeProps.height * ratio}`}
            fill={'black'}
            x={shapeRef.current.x()}
            y={shapeRef.current.y() - 20}
            fontSize={15}
          />
        </>
      )}
    </React.Fragment>
  );
};

const ImageItem = ({ imageProps, isSelected, onSelect, onChange, ratio, setSelectedItem }) => {
  const [img] = useImage(imageProps.src);
  const imgRef = React.useRef();
  const trRef = React.useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={imgRef}
        {...imageProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...imageProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          moveItemToTop(e.target);
        }}
        onTransformEnd={(e) => {
          //change scale, x, y, width, height, when transforming
          const node = imgRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...imageProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: +Math.max(5, node.width() * scaleX).toFixed(0),
            height: +Math.max(node.height() * scaleY).toFixed(0),
          });
        }}
      />
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              setSelectedItem((prev) => ({
                ...prev,
                width: +newBox.width.toFixed(0),
                height: +newBox.height.toFixed(0),
              }));
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <Text
            text={`W: ${imageProps.width * ratio}, H: ${imageProps.height * ratio}`}
            fill={'black'}
            x={imgRef.current.x()}
            y={imgRef.current.y() - 20}
            fontSize={15}
          />
        </>
      )}
    </React.Fragment>
  );
};

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

const DrawingPanel = ({ boxWidth, setCanvasData }) => {
  const order = useSelector((state) => state.order.order);

  const [rectangleList, setRectangleList] = useState(initialRectangles);
  const [selectedItem, setSelectedItem] = useState(null);
  const [images, setImages] = useState(order?.canvas?.objects ?? []);
  const stageRef = useRef();
  const [rects, setRects] = useState(order?.canvas?.shapes ?? []);
  const [isDragging, setIsDragging] = useState(false);
  const [itemNo, setItemNo] = useState('1');
  const [maxWidth, setMaxWidth] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  //update Canvas data to be saved to redux
  useEffect(() => {
    setCanvasData((prev) => ({ ...prev, objects: [...images], shapes: [...rects] }));
  }, [images, rects]);

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
    //    moveItemToTop(e.target);
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
  useEffect(() => {
    console.log('maxWidth', maxWidth);
  }, [maxWidth]);

  const memoisedToolbar = useMemo(() => {
    // if (!selectedItem) return;
    return (
      <CanvasToolbar
        item={selectedItem}
        handleChange={handleUpdateItem}
        setIsFocused={setIsFocused}
        setSelectedItem={setSelectedItem}
      />
    );
  }, [selectedItem, images, rects]);

  return (
    <div>
      <TextField
        value={maxWidth}
        type="number"
        label="Maximum width"
        fullWidth
        helperText="please enter the maximum length of you project"
        onChange={(e) => {
          setMaxWidth(e.target.value);
        }}
      />

      <Divider style={{ margin: '20px' }}>Canvas</Divider>
      <Button onClick={handleClear} variant="contained">
        Clear
      </Button>
      {/* Start Canvas */}

      <Grid container mt={2}>
        {/* Resource Section */}
        <Grid item xs={2}>
          {
            <ResourcesSection
              ImageList={ImageList}
              rectangleList={rectangleList}
              itemNo={itemNo}
              setIsDragging={setIsDragging}
            />
          }
        </Grid>
        {/* Canvas Section */}
        <Grid item xs={10}>
          <>
            {/* Canvas Toolbar */}
            {memoisedToolbar}
            {/* Canvas */}
            <div
              onDrop={handleOnDrop}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <Stage
                width={boxWidth}
                height={window.innerHeight}
                ref={stageRef}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                style={{ border: '1px solid grey' }}
              >
                <Layer>
                  {rects.map((rect, i) => {
                    return (
                      <>
                        <Rectangle
                          key={i}
                          shapeProps={rect}
                          isSelected={rect.id === selectedItem?.id}
                          onSelect={(e) => handleStoneSelect(e, rect)}
                          setSelectedItem={setSelectedItem}
                          onChange={(newAttrs) => {
                            console.log('onchange newAttrs', newAttrs);
                            const rectTemp = rects.slice();
                            rectTemp[i] = newAttrs;
                            setRects(rectTemp);
                          }}
                          onDragStart={(e) => {
                            let rectTemp = rects.find((rec) => rec.id === rect.id);

                            setIsDragging(rectTemp);
                          }}
                          ratio={getRatioForItem(+maxWidth)}
                        />
                      </>
                    );
                  })}
                  {images.map((image, i) => {
                    return (
                      <ImageItem
                        key={i}
                        imageProps={image}
                        isSelected={image.id === selectedItem?.id}
                        setSelectedItem={setSelectedItem}
                        onSelect={(e) => handleImageSelect(e, image)}
                        onChange={(newAttrs) => {
                          const imageTemp = images.slice();
                          imageTemp[i] = newAttrs;
                          setImages(imageTemp);
                        }}
                        onDragStart={(e) => {
                          let imageTemp = images.find((img) => img.id === image.id);
                          setIsDragging(imageTemp);
                        }}
                        ratio={getRatioForItem(+maxWidth)}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </div>
          </>
        </Grid>
      </Grid>
    </div>
  );
};

const ResourcesSection = ({ ImageList, rectangleList, itemNo, setIsDragging }) => {
  return (
    <Box mr={3}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Objects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Grid container spacing={2}>
              {ImageList.map((img) => (
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: '100%',
                      paddingTop: '100%',
                      position: 'relative',
                    }}
                  >
                    <img
                      key={img.id}
                      id={img.id}
                      src={img.src}
                      draggable="true"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
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
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography>Shapes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Grid container spacing={2}>
              {rectangleList.map((rectItem) => (
                <Grid item xs={6}>
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
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DrawingPanel;
