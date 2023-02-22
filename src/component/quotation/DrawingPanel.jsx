import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";
import sink1 from "./images/sink1.png";
import sink2 from "./images/sink2.png";
import stove1 from "./images/stove1.png";
import stove2 from "./images/stove2.png";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const DrawingPanel = () => {
  const [rect, setRect] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });

  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const selectedShapeRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    if (selectedShapeRef.current) {
      const shapeType =
        selectedShapeRef.current.getAttribute("data-shape-type");
      switch (shapeType) {
        case "rect":
          setRect({
            ...rect,
            x: e.target.x(),
            y: e.target.y(),
          });
          break;
        case "circle":
          // handle circle drop
          break;
        // add more shape types here
        default:
          break;
      }
    }
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      const stage = e.target.getStage();
      const pointerPos = stage.getPointerPosition();
      const x = Math.max(pointerPos.x - rect.width / 2, 0);
      const y = Math.max(pointerPos.y - rect.height / 2, 0);
      setRect({
        ...rect,
        x,
        y,
      });
    }
  };

  const handleShapeSelect = (e) => {
    selectedShapeRef.current = e.target;
  };

  const handleResize = (e) => {
    setRect({
      ...rect,
      width: e.target.width(),
      height: e.target.height(),
    });
  };

  return (
    <div>
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <img
        alt="sink2"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <img
        alt="stove1"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <img
        alt="stove2"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <img
        alt="sink1"
        src={sink1}
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "red",
            cursor: "move",
          }}
          data-shape-type="rect"
          draggable
          onDragStart={handleShapeSelect}
        />
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "blue",
            cursor: "move",
          }}
          data-shape-type="circle"
          draggable
          onDragStart={handleShapeSelect}
        />
      </div> */}

        <div style={{ flex: 1 }}>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            ref={stageRef}
            style={{ border: "1px solid grey" }}
          >
            <Layer>
              {images.map((image) => {
                return <URLImage image={image} />;
              })}
            </Layer>
            {/* <Layer>
              <Rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                onTransform={handleResize}
                transformable
              />
            </Layer> */}
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default DrawingPanel;
