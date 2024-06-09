import React from "react";

function Slider({min, max, val, onInput, onMinusButtonClick, onPlusButtonClick, markersValue, ...props}) {

    return(
        <>
            <button onClick={onMinusButtonClick}>-</button>
            <input {...props} type="range" min={min} max={max} onInput={onInput} list="markers"></input>
            <button onClick={onPlusButtonClick}>+</button>
            <div>
                <span>{val}/{max}</span>
            </div>
            {markersValue !== undefined && 
                <datalist id="markers">
                    {markersValue.map((markersValue)=>
                        <option value={markersValue}></option>
                    )}
                </datalist>}
        </>
    )

}

export default Slider