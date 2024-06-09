import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useResultDispatcher, useStatusDispatcher, useStudiesIdListener, useStudiesNameListener } from "../../../vm/redux/api";
import HistoryTile from "../../composition/history-tile/history-tile";
import Column from "../../component/column/column";

function HistoryPage() {

    const navigate = useNavigate();

    const studiesId = useStudiesIdListener()

    const studiesNames = useStudiesNameListener()

    const getStatus = useStatusDispatcher()

    const getResult = useResultDispatcher()

    // const fileUpload = 

    const infoValue = {
        id: "",
        name: "",
    } 

    const info = []

    studiesId.map((firstValue) => {infoValue.id = firstValue
        studiesNames.map((secondValue) => {
        infoValue.name = secondValue
        })
        info.push(infoValue)})

    console.log(info)

    const HistoryTileMas = []

    info.map((value) => HistoryTileMas.push(<HistoryTile id={value.id} fileName={value.name} 
        OnResultButton={() => getResult(value.id)}  onStatusButton={() => getStatus(value.id)}></HistoryTile>))

    return (
        <div>
            <Column value={HistoryTileMas}></Column>
        </div>
    )
}

export default HistoryPage