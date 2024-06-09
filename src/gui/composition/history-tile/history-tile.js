import React from "react";
import FileInput from "../../component/file-input/file-input";
import StatusFields from "../../component/status-fields/status-fields";
import FileInfo from "../../component/file-info/file-info";

function HistoryTile({onInput, onStatusButton, OnResultButton, onDblClick, onClick, fileName, numberOfLayers, id, processStatus}) {

    return (
        <>
            <fieldset onDoubleClick={onDblClick} onClick={onClick}>
                <span>Id: {id}</span>
                <FileInfo fileName={fileName} numberOfLayers={numberOfLayers}></FileInfo>
                <input name="file" type="file" onChange={onInput}></input>
                <StatusFields processStatus={processStatus} ></StatusFields>
                <button onClick={onStatusButton}>Status</button>
                <button onClick={OnResultButton}>Get Result</button>
            </fieldset>
        </>
    )

}

export default HistoryTile