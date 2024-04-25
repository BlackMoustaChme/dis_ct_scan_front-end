import React from "react";

function Plot({width, height, ...props}) {

    return(
        <canvas {...props} width={width} height={height} ></canvas>
    )
}

export default Plot