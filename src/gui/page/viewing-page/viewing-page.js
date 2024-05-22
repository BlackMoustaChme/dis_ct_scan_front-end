import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Plot from "../../component/plot/plot";
import Slider from "../../component/slider/slider";

function ViewingPage() {

    const navigate = useNavigate();

    useEffect(() => {}, [])

    return (
        <>
            <div>
                <Plot></Plot>
                <Plot></Plot>
            </div>
            <div>
                <Slider></Slider>
                <Slider></Slider>
            </div>
        </>
    )

}

export default ViewingPage