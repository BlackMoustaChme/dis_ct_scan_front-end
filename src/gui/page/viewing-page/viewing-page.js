import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Plot from "../../component/plot/plot";
import Slider from "../../component/slider/slider";
import { useSelectedStudyListener, useStudySelectedListener, useImageDispatcher, useSliderValuesListener, useSliderMovementDispatcher, useMaskedImageDispatcher, useIsAuthorizedListener, useSliderIncreaseDispatcher, useSliderDecreaseDispatcher } from "../../../vm/redux/api";

function ViewingPage() {

    function drawZoom(event, canvas) {
        // console.log(event, canvas)
        const smoothedZoomCtx = document
          .getElementById("smoothed-zoom")
          .getContext("2d");
        smoothedZoomCtx.imageSmoothingEnabled = true;
      
        const pixelatedZoomCtx = document
          .getElementById("pixelated-zoom")
          .getContext("2d");
        pixelatedZoomCtx.imageSmoothingEnabled = false;
      
        const zoom = (ctx, x, y) => {
            // console.log(canvas)
            // console.log(Math.min(Math.max(0, x - 5), 1040 - 10),
            // Math.min(Math.max(0, y - 5), canvas.height - 10))
          ctx.drawImage(
            canvas,
            Math.min(Math.max(0, x - 5), 1040 - 10),
            Math.min(Math.max(0, y - 5), canvas.height - 10),
            25,
            25,
            0,
            0,
            200,
            200,
          );
        };

        let screenLog1 = document.querySelector("#screen-log1");

        let screenLog2 = document.querySelector("#screen-log2");

        screenLog1.innerText = `
            Client X/Y: ${event.clientX - 10}, ${event.clientY - 50}`;

        screenLog2.innerText = `
            Client X/Y: ${event.clientX - 10}, ${event.clientY - 50}`;
      
        // canvas.addEventListener("mousemove", (event) => {
          const x = event.clientX - 10;
          const y = event.clientY - 50;
          zoom(smoothedZoomCtx, x, y);
          zoom(pixelatedZoomCtx, x, y);
        // });
      }

      function drawCoords(event, canvas) {

        let screenLog1 = document.querySelector("#screen-log1");

        let screenLog2 = document.querySelector("#screen-log2");

        screenLog1.innerText = `
            Client X/Y: ${event.clientX - 14 - canvas.width}, ${event.clientY - 50}`;

        screenLog2.innerText = `
            Client X/Y: ${event.clientX - 14 - canvas.width}, ${event.clientY - 50}`;
        }

    const navigate = useNavigate();

    const studyPlot = document.getElementById('studyPlot')

    const maskedStudyPlot = document.getElementById('maskedStudyPlot')

    const studySelected = useStudySelectedListener()

    const slider = useSliderValuesListener()

    const isAuth = useIsAuthorizedListener()

    const canvasDrawing = useImageDispatcher()

    const canvasMaskDrawing = useMaskedImageDispatcher()

    const sliderMovementDispatcher = useSliderMovementDispatcher()

    useEffect(() => {
        if (studySelected) {
            const studyPlot = document.getElementById('studyPlot')
            const maskedStudyPlot = document.getElementById('maskedStudyPlot')
            canvasDrawing(studyPlot)
            canvasMaskDrawing(maskedStudyPlot)
        }
        if(!isAuth){
            navigate('/authorization');
        }
    }, [studySelected, canvasDrawing, studyPlot, canvasMaskDrawing, maskedStudyPlot, isAuth, navigate])

    const study = useSelectedStudyListener()

    const sliderIncrease = useSliderIncreaseDispatcher()

    const sliderDecrease = useSliderDecreaseDispatcher()

    const ticksMas = []

    if (study.mask.maskData !== null) {
        study.mask.maskData.map((value) => ticksMas.push(value.slice_idx))
    }

    var tex = `${slider.sliderValue} ${slider.maxSliderValue}`

    console.log(study, slider, ticksMas)

    return (
        <>
            <div>
                <div>
                    <button onClick={() => navigate('/main')}>MainPage</button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <Plot width="128" height="128" onMouseDown={(event) => {drawZoom(event, studyPlot)}} id="studyPlot" title={"Оригинальное изображение"}></Plot>
                            </td>
                            <td>
                            <Plot width="128" height="128" onMouseDown={(event) => {drawCoords(event, maskedStudyPlot)}} id="maskedStudyPlot" title={"Изображение с найденными патологиями"}></Plot>                                 
                            </td>
                            <td align="center">
                                <div><p id="screen-log1"></p></div>
						    <canvas id="smoothed-zoom" width="200" height="200"></canvas>
					        </td>
					        <td align="center">
                                <div><p id="screen-log2"></p></div>
						    <canvas id="pixelated-zoom" width="200" height="200"></canvas>
					        </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div>
            <Slider min="1" max={slider.maxSliderValue} val={slider.sliderValue} 
                onInput={(event) => {sliderMovementDispatcher(studyPlot, maskedStudyPlot, event.target.value)
            }}
            onMinusButtonClick={() => sliderDecrease(studyPlot, maskedStudyPlot, slider.sliderValue)}
            onPlusButtonClick={() => sliderIncrease(studyPlot, maskedStudyPlot, slider.sliderValue)}
            markersValue={ticksMas}          
                id="studyPlotRange"></Slider>
                {/* <Slider></Slider> */}
            </div>
        </>
    )

}

export default ViewingPage