import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import { Transformer, Image, Text } from 'react-konva';

const ImageComponent = ({
  imageProps,
  isSelected,
  onSelect,
  onChange,
  plottingScale,
  setSelectedItem,
  moveItemToTop,
}) => {
  const [img] = useImage(imageProps.src);
  const imgRef = React.useRef();
  const trRef = React.useRef();
  const [scaledWidth, setScaledWidth] = useState(imageProps.width * plottingScale);
  const [scaledHeight, setScaledHeight] = useState(imageProps.height * plottingScale);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  //Update width and height when images changes
  useEffect(() => {
    setScaledWidth(imageProps.width * plottingScale);
    setScaledHeight(imageProps.height * plottingScale);
  }, [imageProps]);

  return (
    <React.Fragment>
      <Image
        image={img}
        onClick={onSelect}
        onTap={onSelect}
        ref={imgRef}
        {...imageProps}
        draggable
        onDragOver={(e) => {
          console.log(e);
        }}
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
            x={imgRef.current.x()}
            y={imgRef.current.y() - 20}
            fontSize={15}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default ImageComponent;
