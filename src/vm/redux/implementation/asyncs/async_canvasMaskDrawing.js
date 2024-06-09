import { ACTIONS_CREATORS } from "../actions/actions";
import { imageService } from "../../../../model/imageService";

function async_canvasMaskDrawing(canvas) {
    return (dispatch, getState) => {
        (async () => {
            let slice = getState().slider.sliderValue
            // console.log(getState().selectedStudy.mask.niftiMaskHeader, getState().selectedStudy.mask.niftiMaskImage)
            if (getState().selectedStudy.mask.maskData !== null) {
                let maskData = getState().selectedStudy.mask.maskData
                let header = getState().selectedStudy.mask.niftiMaskHeader
                let image = getState().selectedStudy.mask.niftiMaskImage
                let maskImageData = imageService.drawMaskedCanvas(canvas, slice, header, image, maskData)
            }
            else {
                console.log("no mask")
            }
        })();
    }
}

export default async_canvasMaskDrawing