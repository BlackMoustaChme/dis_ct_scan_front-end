import { asyncGetResult } from "../api/request";
import { asyncGetStatus } from "../api/request";
import { asyncPostFile } from "../api/request";

export const studyService = {

    makeSlice(file, start, length) {
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


