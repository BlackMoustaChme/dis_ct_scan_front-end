import { ACTIONS_CREATORS } from "../actions/actions";
import { imageService } from "../../../../model/imageService";

function async_canvasDrawing(canvas) {
    return (dispatch, getState) => {
        (async () => {
            let header = getState().study.niftiHeader
            let image = getState().study.niftiImage
            let slice = getState().slider.sliderValue
            let imageData = imageService.drawCanvas(canvas, slice, header, image)
            dispatch(ACTIONS_CREATORS.CANVAS_DRAWING(imageData))
        })();
    }
}

export default async_canvasDrawing