import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Image } from "react-konva";
import { ImageList } from "./images/images";
import useImage from "use-image";
import Button from "@mui/material/Button";

const moveItemToTop = (item) => {
  const selectedShape = item;
  selectedShape.moveToTop();
  selectedShape.getLayer().batchDraw();
};
const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

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
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const ImageItem = ({ imageProps, isSelected, onSelect, onChange }) => {
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
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
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

const Temp = () => {
  const [rectangleList, setRectangleList] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);
  const [images, setImages] = useState([]);
  const stageRef = useRef();
  const [rects, setRects] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [itemNo, setItemNo] = useState(1);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleItemSelect = (e) => {
    moveItemToTop(e.target);
    const itemId = e.target.id();
    console.log("selectedId", itemId);
    selectShape(itemId);
  };

  const handleStoneSelect = (e) => {
    //    moveItemToTop(e.target);
    const itemId = e.target.id();
    console.log("selectedId", itemId);
    selectShape(itemId);
  };

  //delete single item in key down
  useEffect(() => {
    const handleDelete = (event) => {
      console.log(event.key);
      if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
        console.log(images.filter((image) => image.id !== selectedId));
        console.log(rects.filter((rect) => rect.id !== selectedId));
        setImages((prev) => prev.filter((image) => image.id !== selectedId));
        setRects((prev) => prev.filter((rect) => rect.id !== selectedId));
        selectShape(null);
      }
    };

    window.addEventListener("keydown", handleDelete);
    return () => {
      window.removeEventListener("keydown", handleDelete);
    };
  }, [selectedId]);

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
    console.log(x, y);
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
      console.log("drag rect in stage");
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

  return (
    <div>
      <Button onClick={handleClear}>Clear</Button>
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
      <div
        onDrop={handleOnDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{ border: "1px solid grey" }}
        >
          <Layer>
            {rects.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={handleStoneSelect}
                  onChange={(newAttrs) => {
                    const rectTemp = rects.slice();
                    rectTemp[i] = newAttrs;
                    setRects(rectTemp);
                  }}
                  onDragStart={(e) => {
                    let rectTemp = rects.find((rec) => rec.id === rect.id);

                    setIsDragging(rectTemp);
                  }}
                />
              );
            })}
            {images.map((image, i) => {
              return (
                <ImageItem
                  key={i}
                  imageProps={image}
                  isSelected={image.id === selectedId}
                  onSelect={handleItemSelect}
                  onChange={(newAttrs) => {
                    const imageTemp = images.slice();
                    imageTemp[i] = newAttrs;
                    setImages(imageTemp);
                  }}
                  onDragStart={(e) => {
                    let imageTemp = images.find((img) => img.id === image.id);
                    setIsDragging(imageTemp);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Temp;
