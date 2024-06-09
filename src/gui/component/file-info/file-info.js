import React from "react";
function FileInfo({fileName, fileSize, fileType, numberOfLayers, ...props}) {

    return (
        <div>
            <span>Название: {fileName}  </span>
            {/* <span>Размер: {fileSize}    </span>
            <span>Тип: {fileType}   </span> */}
            <div>
                <span>Количество слоёв: {numberOfLayers}</span>
            </div>
        </div>
    )

}
export default FileInfo