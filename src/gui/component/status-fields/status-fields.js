import React from "react";

function StatusFields({numberOfLayers, numberOfLayersDone, completionPercentage, ...props}) {

    return(
        <div>
            <div>
                <span>{numberOfLayers}</span>
            </div>
            <div>
                <span>{numberOfLayersDone}</span>
            </div>
            <div>
                <span>{completionPercentage}</span>
            </div>
        </div>
    )

}

export default StatusFields