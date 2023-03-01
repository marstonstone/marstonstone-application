import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Image, Text } from "react-konva";
import { ImageList } from "./images/images";
import useImage from "use-image";
import { Button, TextField, Grid } from "@mui/material";
import ToolBar from "./ToolBar";

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

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  ratio,
  setSelectedItem,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [currentWidth, setCurrentWidth] = useState(shapeProps.width);
  const [currentHeight, setCurrentHeight] = useState(shapeProps.height);

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
              setCurrentWidth(newBox.width.toFixed(0));
              setCurrentHeight(newBox.height.toFixed(0));
              setSelectedItem((prev) => ({
                ...prev,
                width: newBox.width.toFixed(0),
                height: newBox.height.toFixed(0),
              }));

              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <Text
            text={`W: ${currentWidth * ratio}, H: ${currentHeight * ratio}`}
            fill={"black"}
            x={shapeRef.current.x()}
            y={shapeRef.current.y() - 20}
            fontSize={15}
          />
        </>
      )}
    </React.Fragment>
  );
};

const ImageItem = ({
  imageProps,
  isSelected,
  onSelect,
  onChange,
  ratio,
  setSelectedItem,
}) => {
  const [img] = useImage(imageProps.src);
  const imgRef = React.useRef();
  const trRef = React.useRef();
  const [currentWidth, setCurrentWidth] = useState(imageProps.width);
  const [currentHeight, setCurrentHeight] = useState(imageProps.height);

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
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
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
              setCurrentWidth(newBox.width.toFixed(0));
              setCurrentHeight(newBox.height.toFixed(0));
              setSelectedItem((prev) => ({
                ...prev,
                width: newBox.width.toFixed(0),
                height: newBox.height.toFixed(0),
              }));
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <Text
            text={`W: ${currentWidth * ratio}, H: ${currentHeight * ratio}`}
            fill={"black"}
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
    fill: "#D9CAB3",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "#6D9886",
    id: "rect2",
  },
];

const DrawingPanel = ({ boxWidth }) => {
  const [rectangleList, setRectangleList] = useState(initialRectangles);
  const [selectedItem, setSelectedItem] = useState(null);
  const [images, setImages] = useState([]);
  const stageRef = useRef();
  const [rects, setRects] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [itemNo, setItemNo] = useState(1);
  const [maxWidth, setMaxWidth] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedItem(null);
    }
  };

  const handleImageSelect = (e, image) => {
    // const itemId = e.target.id();
    moveItemToTop(e.target);
    console.log("selectedId", image);
    setSelectedItem(image);
  };

  const handleStoneSelect = (e, stone) => {
    //    moveItemToTop(e.target);
    // const itemId = e.target.id();
    console.log("selectedId", stone);
    setSelectedItem(stone);
  };

  //delete single item in key down
  useEffect(() => {
    const handleDelete = (event) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        selectedItem
      ) {
        setImages((prev) =>
          prev.filter((image) => image.id !== selectedItem?.id)
        );
        setRects((prev) => prev.filter((rect) => rect.id !== selectedItem?.id));
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleDelete);
    return () => {
      window.removeEventListener("keydown", handleDelete);
    };
  }, [selectedItem]);

  //clear the stage
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
    // add image
    if (isDragging.type === "image") {
      setImages(
        images.concat([
          {
            x,
            y,
            ...isDragging,
          },
        ])
      );
      setItemNo((prev) => prev + 1);
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
      setItemNo((prev) => prev + 1);
    }
  };

  const handleUpdateItem = (updatedItem) => {
    console.log(updatedItem);
    if (updatedItem?.type === "image") {
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
    console.log("images", images);
  }, [images]);
  useEffect(() => {
    console.log("rectangles sample", rectangleList);
  }, [rectangleList]);
  useEffect(() => {
    console.log("rects", rects);
  }, [rects]);
  useEffect(() => {
    console.log("isDragging", isDragging);
  }, [isDragging]);
  useEffect(() => {
    console.log("maxWidth", maxWidth);
  }, [maxWidth]);

  return (
    <div>
      <Button onClick={handleClear}>Clear</Button>
      <Grid container>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <ToolBar item={selectedItem} handleChange={handleUpdateItem} />
        </Grid>
        <Grid item xs={2}>
          {ImageList.map((img) => {
            return (
              <img
                key={img.id}
                id={img.id}
                alt="lion"
                src={img.src}
                draggable="true"
                onDragStart={(e) => {
                  let imgTemp = {
                    type: "image",
                    id: itemNo,
                    src: e.target.src,
                    width: e.target.width,
                    height: e.target.height,
                  };
                  setIsDragging(imgTemp);
                }}
              />
            );
          })}
          {rectangleList.map((rectItem) => {
            return (
              <div
                style={{
                  width: rectItem.width,
                  height: rectItem.height,
                  backgroundColor: rectItem.fill,
                  cursor: "move",
                }}
                data-shape-type="rect"
                draggable="true"
                onDragStart={(e) => {
                  let rectTemp = rectangleList.find(
                    (rec) => rec.id === rectItem.id
                  );
                  rectTemp.id = itemNo;
                  setIsDragging(rectTemp);
                }}
              />
            );
          })}
        </Grid>
        <Grid item xs={10}>
          {" "}
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
              style={{ border: "1px solid grey" }}
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
                          console.log("onchange newAttrs", newAttrs);
                          const rectTemp = rects.slice();
                          rectTemp[i] = newAttrs;
                          setRects(rectTemp);
                        }}
                        onDragStart={(e) => {
                          let rectTemp = rects.find(
                            (rec) => rec.id === rect.id
                          );

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
                        let imageTemp = images.find(
                          (img) => img.id === image.id
                        );
                        setIsDragging(imageTemp);
                      }}
                      ratio={getRatioForItem(+maxWidth)}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DrawingPanel;
