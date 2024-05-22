import { ACTIONS_CREATORS } from "../actions/actions";
import { imageService } from "../../../../model/imageService";

function async_sliderMovement(canvas, value) {
    return (dispatch, getState) => {
        (async () => {
            let header = getState().study.niftiHeader
            let image = getState().study.niftiImage
            let slider = getState().slider
            console.log(value)
            slider.sliderValue = value
            let imageData = imageService.drawCanvas(canvas, value, header, image)
            dispatch(ACTIONS_CREATORS.SLIDER_MOVEMENT(imageData, slider))
        })();
    }
}

export default async_sliderMovement