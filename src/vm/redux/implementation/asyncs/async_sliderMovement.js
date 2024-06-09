import { ACTIONS_CREATORS } from "../actions/actions";
import { imageService } from "../../../../model/imageService";

function async_sliderMovement(canvas, maskCanvas, value) {
    return (dispatch, getState) => {
        (async () => {
            let header = getState().selectedStudy.niftiHeader
            let image = getState().selectedStudy.niftiImage
            let slider = getState().slider
            console.log(value)
            if (value > 0 && value < slider.maxSliderValue) {
                slider.sliderValue = value
            }
            else if (value < 1) {
                value = 1
                slider.sliderValue = value
            }
            else if (value >= slider.maxSliderValue) {
                value = slider.maxSliderValue
                slider.sliderValue = value
            }
            let imageData = imageService.drawCanvas(canvas, value, header, image)
            if (getState().selectedStudy.mask.niftiMaskHeader !== null && getState().selectedStudy.mask.niftiMaskImage !== null 
            && maskCanvas !== null) {
                let maskHeader = getState().selectedStudy.mask.niftiMaskHeader
                let maskImage = getState().selectedStudy.mask.niftiMaskImage
                let maskData = getState().selectedStudy.mask.maskData
                let maskImageData = imageService.drawMaskedCanvas(maskCanvas, value, maskHeader, maskImage, maskData)
            }
            dispatch(ACTIONS_CREATORS.SLIDER_MOVEMENT(imageData, slider))
        })();
    }
}

function async_sliderMovement2(value) {
    return (dispatch, getState) => {
        (async () => {
            let slider = getState().slider
            // console.log(value)
            slider.sliderValue = value
            dispatch(ACTIONS_CREATORS.SLIDER_MOVEMENT(null, slider))
        })();
    }
}

export {async_sliderMovement, async_sliderMovement2}