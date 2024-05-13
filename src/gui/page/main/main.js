import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FileInput from '../../component/file-input/file-input'
import Slider from "../../component/slider/slider";
import Plot from "../../component/plot/plot";
import StatusFields from "../../component/status-fields/status-fields";
import * as nifti from 'nifti-reader-js'
import { asyncGetStatus } from "../../../api/request";
import { asyncGetResult } from "../../../api/request";
import { asyncPostFile } from "../../../api/request";
import { useProcessStudyDispatcher, useStudyIdListener, useStatusDispatcher, useStatusListener, useResultDispatcher,
useFileUploadDispatcher, useSliderValuesListener } from "../../../vm/redux/api";


function MainPage() {
    function readNIFTI(name, data) {
        // var canvas = document.getElementById('myCanvas');
        var slider = document.getElementById('myRange');
        var plot = document.getElementById('myPlot')
        var niftiHeader, niftiImage;
        console.log(data)

        // parse nifti
        console.log(nifti);
        if (nifti.isCompressed(data)) {
            data = nifti.decompress(data);
        }

        if (nifti.isNIFTI(data)) {
            niftiHeader = nifti.readHeader(data);
            niftiImage = nifti.readImage(niftiHeader, data);
        }

        // set up slider
        var slices = niftiHeader.dims[3];
        console.log("header", niftiHeader)
        console.log("img", niftiImage)
        console.log("Slices", slices)
        slider.max = slices - 1;
        slider.value = Math.round(slices / 2);
        slider.oninput = function() {
            // drawCanvas(canvas, slider.value, niftiHeader, niftiImage);
            drawCanvas(plot, slider.value, niftiHeader, niftiImage);
        };

        // // draw slice
        // drawCanvas(canvas, slider.value, niftiHeader, niftiImage);
        drawCanvas(plot, slider.value, niftiHeader, niftiImage);
    }
// Отображение
    function drawCanvas(canvas, slice, niftiHeader, niftiImage) {
        // get nifti dimensions
        var cols = niftiHeader.dims[1];
        var rows = niftiHeader.dims[2];

        // set canvas dimensions to nifti slice dimensions
        canvas.width = cols;
        canvas.height = rows;

        // make canvas image data
        var ctx = canvas.getContext("2d");
        var canvasImageData = ctx.createImageData(canvas.width, canvas.height);

        // convert raw data to typed array based on nifti datatype
        var typedData;

        if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_UINT8) {
            typedData = new Uint8Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_INT16) {
            typedData = new Int16Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_INT32) {
            typedData = new Int32Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_FLOAT32) {
            typedData = new Float32Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_FLOAT64) {
            typedData = new Float64Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_INT8) {
            typedData = new Int8Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_UINT16) {
            typedData = new Uint16Array(niftiImage);
        } else if (niftiHeader.datatypeCode === nifti.NIFTI1.TYPE_UINT32) {
            typedData = new Uint32Array(niftiImage);
        } else {
            return;
        }

        // console.log(typedData)

        // offset to specified slice
        var sliceSize = cols * rows;
        var sliceOffset = sliceSize * slice;

        // draw pixels
        for (var row = 0; row < rows; row++) {
            var rowOffset = row * cols;

            for (var col = 0; col < cols; col++) {
                var offset = sliceOffset + rowOffset + col;
                var value = typedData[offset];
                // console.log("cycle", offset, value)

                /* 
                   Assumes data is 8-bit, otherwise you would need to first convert 
                   to 0-255 range based on datatype range, data range (iterate through
                   data to find), or display range (cal_min/max).
                   
                   Other things to take into consideration:
                     - data scale: scl_slope and scl_inter, apply to raw value before 
                       applying display range
                     - orientation: displays in raw orientation, see nifti orientation 
                       info for how to orient data
                     - assumes voxel shape (pixDims) is isometric, if not, you'll need 
                       to apply transform to the canvas
                     - byte order: see littleEndian flag
                */
            //    console.log(value & 0xFF)
                canvasImageData.data[(rowOffset + col) * 4] = value ;
                canvasImageData.data[(rowOffset + col) * 4 + 1] = value ;
                canvasImageData.data[(rowOffset + col) * 4 + 2] = value ;
                canvasImageData.data[(rowOffset + col) * 4 + 3] = 0xFF;

            }
        }
        console.log("canvasImageData", canvasImageData)
        ctx.putImageData(canvasImageData, 0, 0);
    }

    function makeSlice(file, start, length) {
        var fileType = (typeof File);

        console.log(fileType)

        if (fileType === 'undefined') {
            return function () {};
        }

        if (File.prototype.slice) {
            return file.slice(start, start + length);
        }

        if (File.prototype.mozSlice) {
            return file.mozSlice(start, length);
        }

        if (File.prototype.webkitSlice) {
            return file.webkitSlice(start, length);
        }

        return null;
    }

    function readFile(file) {
        var blob = makeSlice(file, 0, file.size);
        console.log(file)
        var reader = new FileReader();

        reader.onloadend = function (evt) {
            if (evt.target.readyState === FileReader.DONE) {
                readNIFTI(file.name, evt.target.result);
            }
        };

        reader.readAsArrayBuffer(blob);
    }

    function handleFileSelect(evt) {
        var files = evt.target.files;
        readFile(files[0]);
    }

    useEffect(() => {}, [])

    const studyId = useStudyIdListener()

    const processingStatus = useStatusListener()

    const slider = useSliderValuesListener()

    const processStudy = useProcessStudyDispatcher()

    const getStatus = useStatusDispatcher()

    const getResult = useResultDispatcher()

    const fileUpload = useFileUploadDispatcher()

console.log(studyId, processingStatus, slider)

    return (
        <div>
            <FileInput onChange={(event) => {handleFileSelect(event); fileUpload(event.target.files[0])}} onSubmit={(event) => {
                event.preventDefault()
                processStudy(event.target)}}></FileInput>
            <div>
                <Plot width="128" height="128" id="myPlot"></Plot>
            </div>
            <div>
                <Slider min="1" max="100" defaultValue="50" id="myRange"></Slider>
            </div>
            <div>
                <button name="Status" onClick={getStatus}>Status</button>
                <StatusFields numberOfLayers={processingStatus.numberOfLayers} numberOfLayersDone={processingStatus.numberOfLayersDone} 
                completionPercentage={processingStatus.completionPercentage}></StatusFields>
            </div>
            <div>
                <button name="Get" onClick={getResult}>Result</button>
            </div>
        </div>

    )

}

export default MainPage