import React from "react";

function Plot({title, width, height, ...props}) {

    return(
        <>
        <div>{title}</div>
        <canvas {...props} width={width} height={height} onMouse></canvas>
        </>
    )
}

export default Plot