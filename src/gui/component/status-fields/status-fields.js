import React from "react";

function StatusFields({numberOfLayers, numberOfLayersDone, completionPercentage, processStatus, ...props}) {

    return(
        <div>
            {/* <div>
                <span>Количество слоёв изображения: {numberOfLayers}</span>
            </div>
            <div>
                <span>Количество обработанных слоёв изображения: {numberOfLayersDone}</span>
            </div>
            <div>
                <span>Процент выполнения: {completionPercentage}</span>
            </div> */}
            <div>
                <span>Статус процесса распознавания: {processStatus}</span>
            </div>
        </div>
    )

}

export default StatusFields