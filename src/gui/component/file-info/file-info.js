import React from "react";
function FileInfo({fileName, fileSize, fileType, ...props}) {

    return (
        <div>
            <span>Название: {fileName}  </span>
            <span>Размер: {fileSize}    </span>
            <span>Тип: {fileType}   </span>
        </div>
    )

}
export default FileInfo