import { ACTIONS_CREATORS } from "../actions/actions";
import { imageService } from "../../../../model/imageService";

function async_canvasDrawing(canvas) {
    return (dispatch, getState) => {
        (async () => {
            let header = getState().selectedStudy.niftiHeader
            let image = getState().selectedStudy.niftiImage
            let slice = getState().slider.sliderValue
            console.log(canvas)
            
            let imageData = imageService.drawCanvas(canvas, slice, header, image)
            dispatch(ACTIONS_CREATORS.CANVAS_DRAWING(imageData))
            // if (getState().selectedStudy.mask.niftiMaskHeader !== undefined && getState().selectedStudy.mask.niftiMaskImage) {
                // let maskHeader = getState().selectedStudy.mask.niftiMaskHeader
                // let maskImage = getState().selectedStudy.mask.niftiMaskImage
                // let maskImageData = imageService.drawCanvas(canvas, slice, maskHeader, image)
            // }
        })();
    }
}

export default async_canvasDrawing