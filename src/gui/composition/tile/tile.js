import React from "react";
import FileInput from "../../component/file-input/file-input";
import FileForm from "../../component/file-form/file-form";
import StatusFields from "../../component/status-fields/status-fields";
import FileInfo from "../../component/file-info/file-info";

function Tile({onDblClick, onClick, fileName, fileSize, fileType, numberOfLayers, numberOfLayersDone, completionPercentage, id}) {

    return (
        <>
            <fieldset onDoubleClick={onDblClick} onClick={onClick}>
                <span>{id}</span>
                <FileInfo fileName={fileName} fileSize={fileSize} fileType={fileType}></FileInfo>
                <StatusFields numberOfLayers={numberOfLayers} numberOfLayersDone={numberOfLayersDone} 
                completionPercentage={completionPercentage}></StatusFields>
                {/* <button onClick={onView}>View</button> */}
                {/* <button onClick={}>Get Result</button> */}
            </fieldset>
        </>
    )

}

export default Tile