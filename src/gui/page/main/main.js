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
useStudiesIdListener,
useSelectedStudyDispatcher,
useIsHistoryPresentListener,
useIsAuthorizedListener,
useLogoutDispatcher,
useStudyPostedListener,
useSliderMovementDispatcher2,
useStudyPostMessageListener} from "../../../vm/redux/api";
import Tile from "../../composition/tile/tile";
import { probe } from "../../../api/server_sent_events";
import { userService } from "../../../model/userService";



function MainPage() {

    // const sec = document.getElementById('myPloter')

    const navigate = useNavigate();

    const fileUploaded = useFileUploadedListener()

    const studyPosted = useStudyPostedListener()

    const idInstance = useStudyIdListener()

    const imageData = useImageListener()

    const isAuth = useIsAuthorizedListener()

    useEffect(() => {
        if(!isAuth) {
            navigate('/authorization');
        }
        // if(studyPosted) {
        //     getStatus(idInstance);
        // }
    }, [isAuth, navigate])

    const study = useStudyListener()

    const studies = useStudiesListener()

    const studyId = useStudyIdListener()

    const studiesId = useStudiesIdListener()

    const processStatus = useStatusListener()

    // const slider = useSliderValuesListener()

    const isHistoryPresent = useIsHistoryPresentListener()

    const studyPostMessage = useStudyPostMessageListener()

    // const sliderMovementDispatcher = useSliderMovementDispatcher2()

    const processStudy = useProcessStudyDispatcher()

    const getStatus = useStatusDispatcher()

    const getResult = useResultDispatcher()

    const fileUpload = useFileUploadDispatcher()

    const studySelect = useSelectedStudyDispatcher()

    const logout = useLogoutDispatcher()

    const TileMas = []

    studies.map((value) => TileMas.push(<Tile id={value.id} fileName={value.name} onStatusButton={() => {getStatus(value.id)}} OnResultButton={() => getResult(value.id)} 
    onDblClick={() => { studySelect(value.id) ; navigate("/view")}} 
    numberOfLayers={value.slider.maxSliderValue} processStatus={value.processStatus}></Tile>))

console.log(studyId, processStatus, study, studies, imageData, studiesId)

    return (
        <div>
            <button onClick={() => logout()}>Log out</button>
            {isHistoryPresent === true && <button onClick={()=>navigate("/history")}>History Page</button>}
            <FileInput onChange={(event) => { fileUpload(event.target.files[0])}} onSubmit={(event) => {
                event.preventDefault()
                processStudy(event.target)}}></FileInput>
            <div>
                <span>{studyPostMessage}</span>
                <Column value={TileMas}></Column>
            </div>
            <button onClick={()=> localStorage.clear()}>Clear History</button>
            {/* <button onClick={()=> userService.userInfo()}>userInfo</button> */}
            {/* <span>{processStatus}</span> */}
            {/* <Slider min="1" max={slider.maxSliderValue} value={slider.sliderValue} 
                onChange={(event) => {sliderMovementDispatcher(event.target.value)
            }}  
                id="studyPlotRange"></Slider> */}
        </div>
    )
}

export default MainPage