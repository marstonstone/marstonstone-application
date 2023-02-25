import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Image } from "react-konva";
import { ImageList } from "./images/images";
import useImage from "use-image";
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
          moveItemToTop(e.target);
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

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const [transform, setTransform] = useState({
    x: image.x,
    y: image.y,
    scaleX: 1,
    scaleY: 1,
  });
  const handleTransform = (event) => {
    const node = event.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    console.log("999", event.target);
    setTransform({
      ...transform,
      x: node.x(),
      y: node.y(),
      scaleX: scaleX,
      scaleY: scaleY,
    });
  };
  return (
    <Image
      image={img}
      x={transform.x}
      y={transform.y}
      scaleX={transform.scaleX}
      scaleY={transform.scaleY}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
      transformable
      onTransformEnd={handleTransform}
    />
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
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
  const [itemNo, setItemNo] = useState(0);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleShapeSelect = (e) => {
    moveItemToTop(e.target);
    // const selectedShape = e.target;
    // selectedShape.moveToTop();
    // selectedShape.getLayer().batchDraw();
    const itemId = e.target.id();
    console.log("selectedId", itemId);
    selectShape(itemId);
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
              console.log(rectTemp);
              setIsDragging(rectTemp);
            }}
          />
        );
      })}
      <div
        onDrop={(e) => {
          e.preventDefault();
          console.log(e);
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          if (isDragging.type === "image") {
            console.log({ ...stageRef.current.getPointerPosition() });

            setImages(
              images.concat([
                {
                  ...stageRef.current.getPointerPosition(),
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
                  x: stageRef.current.getPointerPosition().x,
                  y: stageRef.current.getPointerPosition().y,
                },
              ])
            );
            setItemNo((prev) => prev + 1);
          }
        }}
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
                  onSelect={handleShapeSelect}
                  onChange={(newAttrs) => {
                    const rectTemp = rects.slice();
                    rectTemp[i] = newAttrs;
                    setRects(rectTemp);
                  }}
                  onDragStart={(e) => {
                    let rectTemp = rects.find((rec) => rec.id === rect.id);
                    console.log(rectTemp);
                    setIsDragging(rectTemp);
                  }}
                />
              );
            })}
            {images.map((image, i) => {
              return (
                <URLImage
                  key={i}
                  image={image}
                  shapeProps={image}
                  isSelected={image.id === selectedId}
                  onSelect={() => {
                    selectShape(image.id);
                  }}
                  onChange={(newAttrs) => {
                    const imgTemp = images.slice();
                    imgTemp[i] = newAttrs;
                    setImages(imgTemp);
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
