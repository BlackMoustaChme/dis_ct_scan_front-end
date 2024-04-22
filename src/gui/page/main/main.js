import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FileInput from '../../component/file-input/file-input'
import Slider from "../../component/slider/slider";
import * as nifti from 'nifti-reader-js'
import { asyncGetStatus } from "../../../api/request";
import { asyncGetResult } from "../../../api/request";
import { asyncPostFile } from "../../../api/request";


function MainPage() {
    function readNIFTI(name, data) {
        var canvas = document.getElementById('myCanvas');
        var slider = document.getElementById('myRange');
        var niftiHeader, niftiImage;
        console.log(canvas.height)

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
            drawCanvas(canvas, slider.value, niftiHeader, niftiImage);
        };

        // // draw slice
        drawCanvas(canvas, slider.value, niftiHeader, niftiImage);
    }

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

        console.log(typedData)

        // offset to specified slice
        var sliceSize = cols * rows;
        var sliceOffset = sliceSize * slice;

        // draw pixels
        for (var row = 0; row < rows; row++) {
            var rowOffset = row * cols;

            for (var col = 0; col < cols; col++) {
                var offset = sliceOffset + rowOffset + col;
                var value = typedData[offset];

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
                canvasImageData.data[(rowOffset + col) * 4] = value & 0xFF;
                canvasImageData.data[(rowOffset + col) * 4 + 1] = value & 0xFF;
                canvasImageData.data[(rowOffset + col) * 4 + 2] = value & 0xFF;
                canvasImageData.data[(rowOffset + col) * 4 + 3] = 0xFF;
            }
        }

        ctx.putImageData(canvasImageData, 0, 0);
    }

    function makeSlice(file, start, length) {
        var fileType = (typeof File);

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

    async function getHandle() {
        asyncGetStatus("e2e5ecb9-3048-4721-a906-1c7898e7662b").then((value)=> console.log(value))
    }

    async function statusHandle() {
        asyncGetResult("e2e5ecb9-3048-4721-a906-1c7898e7662b").then((value)=> console.log(value))
    }

    async function postHandle(event) {
        event.preventDefault()
        asyncPostFile(event.target).then((value)=> console.log(value))
    }

console.log(nifti)

    return (
        <div>
            <FileInput onChange={(event) => handleFileSelect(event)} onSubmit={(event) => postHandle(event)}></FileInput>
            {/* <Slider></Slider> */}
            <div><canvas id="myCanvas" width="128" height="128"></canvas></div>
            <div>
            <input type="range" min="1" max="100" defaultValue="50" class="slider" id="myRange"></input>
            </div>
            <div>
                <button name="Status" onClick={statusHandle}></button>
            </div>
            <div>
                <button name="Get" onClick={getHandle}></button>
            </div>
        </div>

    )

}

export default MainPage