import React from "react";
import FileInput from "../../component/file-input/file-input";
import FileForm from "../../component/file-form/file-form";
import StatusFields from "../../component/status-fields/status-fields";
import FileInfo from "../../component/file-info/file-info";

function Tile({onStatusButton, OnResultButton, onDblClick, onClick, fileName, processStatus, numberOfLayers, id}) {

    return (
        <>
            <fieldset onDoubleClick={onDblClick} onClick={onClick}>
                <span>Id: {id}</span>
                <FileInfo fileName={fileName} numberOfLayers={numberOfLayers}></FileInfo>
                <StatusFields processStatus={processStatus}></StatusFields>
                <button onClick={onStatusButton}>Status</button>
                <button onClick={OnResultButton}>Get Result</button>
            </fieldset>
        </>
    )

}

export default Tile