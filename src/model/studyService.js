import { asyncGetResult } from "../api/request";
import { asyncGetStatus } from "../api/request";
import { asyncPostFile } from "../api/request";
import * as nifti from 'nifti-reader-js'

function _makeSlice(file, start, length) {
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

function _readNIFTI(name, data) {
    // var canvas = document.getElementById('myCanvas');
    // var slider = document.getElementById('myRange');
    // var plot = document.getElementById('myPlot')
    var niftiHeader, niftiImage;
    console.log(data)

    // parse nifti
    if (nifti.isCompressed(data)) {
        data = nifti.decompress(data);
    }

    if (nifti.isNIFTI(data)) {
        niftiHeader = nifti.readHeader(data);
        niftiImage = nifti.readImage(niftiHeader, data);
    }

    // set up slider
    var slices = niftiHeader.dims[3];
    // console.log("header", niftiHeader)
    // console.log("img", niftiImage)
    // console.log("Slices", slices)
    let max = slices - 1;
    let value = Math.round(slices / 2);

    let slider = {
        maxSliderValue: max,
        sliderValue: value
    }

    let fileInfo = {
        slider: slider,
        header: niftiHeader,
        image: niftiImage
    }
    // slider.oninput = function() {
        // drawCanvas(canvas, slider.value, niftiHeader, niftiImage);
        // drawCanvas(plot, slider.value, niftiHeader, niftiImage);
    // };

    // // draw slice
    // drawCanvas(canvas, slider.value, niftiHeader, niftiImage);
    // drawCanvas(plot, slider.value, niftiHeader, niftiImage);
    return fileInfo
}

export const studyService = {

    readFile(file, callback) {
        var blob = _makeSlice(file, 0, file.size);
        console.log(blob)
        var reader = new FileReader();
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                callback(_readNIFTI(file.name, evt.target.result))
            }
        };

        reader.readAsArrayBuffer(blob);
    },

    async postStudy(data) {
        let response = await asyncPostFile(data)
        switch (response.getStatus()) {
            case 200:
                return response.getBody()
            case 400:
                console.log(response.getBody())
                return null
            default:
                return Promise.reject()
        }
    },

    async getResult(id) {
        let response = await asyncGetResult(id)
        switch (response.getStatus()) {
            case 200:
                return response.getBody()
            case 400:
                return response.getBody()
            default:
                return Promise.reject()
        }
    },

    async getStatus(id) {
        let response = await asyncGetStatus(id)
        switch (response.getStatus()) {
            case 200:
                return response.getBody()
            case 400:
                return response.getBody()
            default:
                return Promise.reject()
        }
    },


}


