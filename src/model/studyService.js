import { asyncGetResult } from "../api/request";
import { asyncGetStatus } from "../api/request";
import { asyncPostFile } from "../api/request";
import { serverSentEvents } from "../api/server_sent_events";
import * as nifti from 'nifti-reader-js'
import * as fflate from 'fflate'
import { userService } from "./userService";

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
    var niftiHeader, niftiImage;
    console.log(data)

    // parse nifti
    if (nifti.isCompressed(data)) {
        data = fflate.decompressSync(new Uint8Array(data)).buffer
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

    console.log(niftiHeader)

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

    const window_center = -600
    const window_width = 1200

    let typedDataProcessed = []

    for (var i = 0; i < typedData.length; i++) {
        typedDataProcessed[i] = (typedData[i] - (window_center - window_width / 2)) / window_width * 255
        if (typedDataProcessed[i] < 0) {
            typedDataProcessed[i] = 0
        } 
        else if (typedDataProcessed[i] > 255) {
            typedDataProcessed[i] = 255
        } 
    }

    niftiImage = new Uint8Array(typedDataProcessed)

    console.log(name.split('.')[0])

    let fileInfo = {
        slider: slider,
        name: name,
        header: niftiHeader,
        image: niftiImage
    }

    return fileInfo
}

export const studyService = {

    sseConnectionsMap: new Map(),

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
        let response = await asyncPostFile(data, userService.getToken())
        let answer = {
            value: null,
            message: null
        }
        switch (response.getStatus()) {
            case 200:
                console.log(response.getBody())
                answer.value = response.getBody().data.file_hash
                answer.message = response.getBody().description
                console.log(answer)
                return answer
                // return response.getBody()
            case 401:
                console.log(response.getBody())
                answer.value = response.getBody().data.file_hash
                answer.message = response.getBody().description
                return answer
            case 422:
                console.log(response.getBody())
                return null
            default:
                return Promise.reject()
        }
    },

    async getResult(id) {
        let response = await asyncGetResult(id)
        let bodyInfo = null
        switch (response.getStatus()) {
            case 200:
                console.log(response.getBody())
                bodyInfo = response.getBody()
                let data = JSON.parse(bodyInfo.data)
                console.log(data.masks_data)
                let maskData = data.masks_data
                return maskData
            case 422:
                console.log(response.getBody())
                return response.getBody()
            default:
                return Promise.reject()
        }
    },

    async getStatus(id) {
        let response = await asyncGetStatus(id)
        switch (response.getStatus()) {
            case 200:
                console.log(response.getBody())
                return response.getBody()
            case 422:
                console.log(response.getBody())
                return response.getBody()
            default:
                return Promise.reject()
        }
    },

    initializeStatusSSE(id) {
        // console.log("status step 2")
        let statusSrc = serverSentEvents.studyStatusSource(id)
        this.sseConnectionsMap.set(id, statusSrc)
    },

    getStatusSSE(id, callback) {
        // console.log("status step 5")
        serverSentEvents.SSEReceive(this.sseConnectionsMap.get(id), callback)
    },

    closeStatusSSE(id) {
        // console.log("status step 8",this.sseConnectionsMap)
        serverSentEvents.SSEClose(this.sseConnectionsMap.get(id))
        this.sseConnectionsMap.delete(id)
    }


}


