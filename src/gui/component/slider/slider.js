import React from "react";

function Slider({min, max, value, onInput, ...props}) {

    return(
        <input {...props} type="range" min={min} max={max} value={value} onInput={onInput}></input>
    )

}

export default Slider