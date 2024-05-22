import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FileInput from '../../component/file-input/file-input'
import Slider from "../../component/slider/slider";
import Plot from "../../component/plot/plot";
import StatusFields from "../../component/status-fields/status-fields";
import Column from "../../component/column/column";
import * as nifti from 'nifti-reader-js'
import { asyncGetStatus } from "../../../api/request";
import { asyncGetResult } from "../../../api/request";
import { asyncPostFile } from "../../../api/request";
import { useProcessStudyDispatcher, useStudyIdListener, useStatusDispatcher, useStatusListener, useResultDispatcher,
useFileUploadDispatcher, useSliderValuesListener, useImageDispatcher, useImageListener, useStudyListener,
useFileUploadedListener, useSliderMovementDispatcher,
useStudiesListener,
useStudiesIdListener} from "../../../vm/redux/api";
import Tile from "../../composition/tile/tile";


function MainPage() {

    // const sec = document.getElementById('myPloter')

    const navigate = useNavigate();

    const canvas = document.getElementById('myPlot')

    const fileUploaded = useFileUploadedListener()

    const canvasDrawing = useImageDispatcher()

    const imageData = useImageListener()

    useEffect(() => {
        if (fileUploaded === true) {
            canvasDrawing(canvas)
        }
    }, [fileUploaded, canvasDrawing, canvas])

    const study = useStudyListener()

    const studies = useStudiesListener()

    const studyId = useStudyIdListener()

    const studiesId = useStudiesIdListener()

    const processingStatus = useStatusListener()

    const slider = useSliderValuesListener()

    const sliderMovementDispatcher = useSliderMovementDispatcher()

    const processStudy = useProcessStudyDispatcher()

    const getStatus = useStatusDispatcher()

    const getResult = useResultDispatcher()

    const fileUpload = useFileUploadDispatcher()

    const TileMas = []

    studies.map((value) => TileMas.push(<Tile fileName={value.name} onDblClick={() => {navigate("/view")}}></Tile>))

console.log(studyId, processingStatus, slider, study, studies, imageData, canvas)

    return (
        <div>
            <FileInput onChange={(event) => { fileUpload(event.target.files[0])}} onSubmit={(event) => {
                event.preventDefault()
                processStudy(event.target)}}></FileInput>
            <div>
                <Plot width="128" height="128" id="myPlot"></Plot>
                {/* <Plot id="myPloter"></Plot> */}
            </div>
            <div>
                <Slider min="1" max={slider.maxSliderValue} value={slider.sliderValue} onChange={(event) => sliderMovementDispatcher(canvas, event.target.value)} 
                id="myRange"></Slider>
            </div>
            <div>
                <button name="Status" onClick={getStatus}>Status</button>
                <StatusFields numberOfLayers={processingStatus.numberOfLayers} numberOfLayersDone={processingStatus.numberOfLayersDone} 
                completionPercentage={processingStatus.completionPercentage}></StatusFields>
            </div>
            <div>
                <button name="Get" onClick={getResult}>Result</button>
            </div>
            <div>
                {/* <Tile id={studiesId[0]}  onDblClick={() => {navigate("/view")}}></Tile> */}
                <Column value={TileMas}></Column>
            </div>
        </div>
    )
}

export default MainPage