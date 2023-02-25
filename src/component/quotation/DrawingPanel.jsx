import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Image, Transformer } from "react-konva";
import useImage from "use-image";
import sink1 from "./images/sink1.png";
import sink2 from "./images/sink2.png";
import stove1 from "./images/stove1.png";
import stove2 from "./images/stove2.png";
import { ImageList } from "./images/images";
import { reactNativeDarkTokens } from "@aws-amplify/ui";

const URLImage = ({
  image,
  handleDragStart,
  handleDragEnd,
  handleDragMove,
  handleResize,
  onSelect,
  isSelected,
}) => {
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
      //   x={image.x}
      //   y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
      transformable
      onSelect={true}
      onTransformEnd={handleTransform}
      isSelected
      //   onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      //   onTransform={handleResize}
    />
  );
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

const DrawingPanel = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);

  //   const dragUrl = React.useRef();
  //   const dragImage = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [rects, setRects] = React.useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const selectedShapeRef = useRef(null);

  //   const handleDragStart = () => {
  //     setIsDragging(true);
  //   };

  //   const handleDragEnd = (e) => {
  //     setIsDragging(false);
  //     if (selectedShapeRef.current) {
  //       const shapeType =
  //         selectedShapeRef.current.getAttribute("data-shape-type");
  //       switch (shapeType) {
  //         case "rect":
  //           setRect({
  //             ...rect,
  //             x: e.target.x(),
  //             y: e.target.y(),
  //           });
  //           break;
  //         case "circle":
  //           // handle circle drop
  //           break;
  //         // add more shape types here
  //         default:
  //           break;
  //       }
  //     }
  //   };

  //   const handleDragMove = (e) => {
  //     if (isDragging) {
  //       const stage = e.target.getStage();
  //       const pointerPos = stage.getPointerPosition();
  //       const x = Math.max(pointerPos.x - rect.width / 2, 0);
  //       const y = Math.max(pointerPos.y - rect.height / 2, 0);
  //       setRect({
  //         ...rect,
  //         x,
  //         y,
  //       });
  //     }
  //   };

  //   const handleShapeSelect = (e) => {
  //     selectedShapeRef.current = e.target;
  //   };

  //   const handleResize = (e) => {
  //     setRect({
  //       ...rect,
  //       width: e.target.width(),
  //       height: e.target.height(),
  //     });
  //   };
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  useEffect(() => {
    console.log("images", images);
  }, [images]);
  useEffect(() => {
    console.log("rects", rects);
  }, [rects]);

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
                id: e.target.id,
                src: e.target.src,
                width: e.target.width,
                height: e.target.height,
              };
              setIsDragging(imgTemp);
            }}
          />
        );
      })}
      {rectangles.map((rect) => {
        return (
          <div
            style={{
              width: rect.width,
              height: rect.height,
              backgroundColor: rect.fill,
              cursor: "move",
            }}
            data-shape-type="rect"
            draggable="true"
            onDragStart={(e) => {
              let imgTemp = {
                type: "shape",
                id: rect.id,
                src: rect.id,
                width: rect.width,
                height: rect.height,
              };
              setIsDragging(imgTemp);
            }}
          />
        );
      })}
      {/* <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          cursor: "move",
        }}
        data-shape-type="rect"
        draggable="true"
        onDragStart={(e) => {
          let imgTemp = {
            id: "square1",
            src: "something",
            width: e.target.clientWidth,
            height: e.target.clientHeight,
          };
          setIsDragging(imgTemp);
        }}
      />
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          cursor: "move",
        }}
        data-shape-type="circle"
        draggable="true"
        onDragStart={(e) => {
          console.log(e);
          let imgTemp = {
            id: "square2",
            src: "something else",
            width: e.target.clientWidth,
            height: e.target.clientHeight,
          };
          setIsDragging(imgTemp);
        }}
      /> */}
      <div
        onDrop={(e) => {
          e.preventDefault();
          console.log(e);
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          if (isDragging.type === "image") {
            setImages(
              images.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  ...isDragging,
                },
              ])
            );
          } else {
            setRects(
              rects.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  ...isDragging,
                },
              ])
            );
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            ref={stageRef}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{ border: "1px solid grey" }}
          >
            <Layer>
              {images.map((image) => {
                return (
                  <URLImage
                    image={image}
                    // onSelect={() => {
                    //   setSelectImage(image);
                    // }}
                    // isSelected={image === selectImage}
                    // handleDragStart={handleDragStart}
                    // handleDragEnd={handleDragEnd}
                    // handleDragMove={handleDragMove}
                    // handleResize={handleResize}
                  />
                );
              })}
            </Layer>
            <Layer>
              {rectangles.map((rect) => {
                return (
                  <Rectangle
                    key={rect.id}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                      selectShape(rect.id);
                    }}
                    onChange={(newAttrs) => {
                      const rects = rectangles.slice();
                      rects[reactNativeDarkTokens.id] = newAttrs;
                      setRectangles(rects);
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default DrawingPanel;
