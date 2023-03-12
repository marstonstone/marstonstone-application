import React, { useState, useEffect } from 'react';

import { Rect, Transformer, Text } from 'react-konva';

const RectComponent = ({ shapeProps, isSelected, onSelect, onChange, plottingScale, setSelectedItem }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [scaledWidth, setScaledWidth] = useState(shapeProps.width * plottingScale);
  const [scaledHeight, setScaledHeight] = useState(shapeProps.height * plottingScale);

  useEffect(() => {
    setScaledWidth(shapeProps.width * plottingScale);
    setScaledHeight(shapeProps.height * plottingScale);
  }, [shapeProps]);

  useEffect(() => {
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
              setScaledWidth(+(newBox.width * plottingScale).toFixed(0));
              setScaledHeight(+(newBox.height * plottingScale).toFixed(0));
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
            text={` ${scaledWidth} x ${scaledHeight}`}
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

export default RectComponent;
