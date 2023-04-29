import React, { useState } from 'react';
import Moveable from 'react-moveable'

function ImgMoveable() {
    // state variables for image position, size, and rotation
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
    const [rotation, setRotation] = useState(0);

    // event handler for image drag
    const handleDrag = ({
        target,
        beforeDelta,
        left,
        top,
        dist,
        transform,
    }) => {
        const newX = imagePosition.x + dist[0];
        const newY = imagePosition.y + dist[1];
        setImagePosition({ x: newX, y: newY });
        target!.style.transform = transform;
    };

    // event handler for image resize
    const handleResize = ({
        target,
        width,
        height,
        delta,
    }) => {
        const newWidth = imageSize.width + delta[0];
        const newHeight = imageSize.height + delta[1];
        setImageSize({ width: newWidth, height: newHeight });
        target!.style.width = `${newWidth}px`;
        target!.style.height = `${newHeight}px`;
    };
    
    return (
        <div className='container'>
            <Moveable
                target={document.querySelector(".target")}
                container={null}
                origin={true}

                /* Resize event edges */
                edge={false}

                /* draggable */
                draggable={true}
                throttleDrag={0}
                onDragStart={({ target, clientX, clientY }) => {
                    console.log("onDragStart", target);
                }}
                onDrag={handleDrag}
                onDragEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onDragEnd", target, isDrag);
                }}

                keepRatio={false}

                resizable={true}
                throttleResize={0}
                onResizeStart={({ target, clientX, clientY }) => {
                    console.log("onResizeStart", target);
                }}
                onResize={handleResize}
                onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onResizeEnd", target, isDrag);
                }}

                rotatable={true}
                throttleRotate={0}
                onRotateStart={({ target, clientX, clientY }) => {
                    console.log("onRotateStart", target);
                }}
                onRotate={({
                    target,
                    delta, dist,
                    transform,
                    clientX, clientY,
                }) => {
                    console.log("onRotate", dist);
                    target!.style.transform = transform;
                }}
                onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onRotateEnd", target, isDrag);
                }}
               
                pinchable={true}
                onPinchStart={({ target, clientX, clientY, datas }) => {
                    // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                    console.log("onPinchStart");
                }}
                onPinch={({ target, clientX, clientY, datas }) => {
                    // pinch event occur before drag, rotate, scale, resize
                    console.log("onPinch");
                }}
                onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
                    // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                    console.log("onPinchEnd");
                }}

            />
            <img className='target' src="https://via.placeholder.com/200x200.png?text=Move+me!" alt="moveable" />


        </div>
    );
}

export default ImgMoveable;
