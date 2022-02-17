import React, { useEffect, useState } from 'react'
import './style.css'
import dayimg from "./images/daytime.jpg"
import suncloud from "./images/sun-cloud.png"

function Weather() {

    const currentTime = new Date()
    const hours = currentTime.getHours()
    const theDate = currentTime.getDate()
    const theMonth = currentTime.getMonth() + 1
    const theFullYear = currentTime.getFullYear()


    const fireApi = () => {

        setCityInput(cityName)
        console.log(weatherApi.name);
        console.log(cityName);


    }

    const [weatherApi, setweatherApi] = useState("")
    const [cityName, setCityName] = useState("karachi")
    const [cityInput, setCityInput] = useState("karachi")

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=1a6ddfef12cd3a691866f28f0f34015a&units=metric`)
            .then((res) => res.json())
            .then((result) => {
                setweatherApi(result)
            })
            .catch((err) => {
                console.log(err, "Lmao Dead")
            })
    }, [cityInput])


    return (
        < div >
            <img className='bgImage' src={dayimg} alt="" />
            <div className='mainDiv'>
                <div className='inputDiv container'>
                    <input
                        placeholder='Enter Your City/Country'
                        type="text"
                        className="input-group form-control mx-2"
                        onChange={(e) => { setCityName(e.target.value) }} />

                    <button className='btn' onClick={fireApi}>Check</button>
                </div>

                <div className='midDiv'>

                    <div className='otherDiv'>
                        
                        <h5>Wind Speed</h5>
                        <h2>{weatherApi && weatherApi.wind && weatherApi.wind.speed}</h2>
                        <h5>Min/Max Temperature</h5>
                        <h2>{weatherApi && weatherApi.main.temp_min}/{weatherApi && weatherApi.main.temp_max}°C</h2>
                    </div>
                    <div className='forecastDiv'>
                        <h2 className='countryName my-0'>{weatherApi && weatherApi.name}</h2>
                        <h6 style={{ marginBottom: "20px" }}>{theDate}/{theMonth}/{theFullYear}</h6>
                        <img width={"20%"} className='cloudImage' src={suncloud} alt="" />
                        <h1 className='temp my-0'>{weatherApi && weatherApi.main && weatherApi.main.temp}°C</h1>
                        <h3 >- - - - - - - - - - - - -</h3>
                        <h6>{weatherApi &&
                            weatherApi.weather &&
                            weatherApi.weather[0] &&
                            weatherApi.weather[0].main}
                        </h6>
                    </div>
                    <div className='otherDiv'>
                    
                        <h5>Humidity</h5>
                        <h2 className='siders' style={{marginBottom : "40px"} }>{weatherApi && weatherApi.main && weatherApi.main.humidity}%</h2>
                        <h5>Pressure</h5>
                        <h2 className='siders'>{weatherApi && weatherApi.main && weatherApi.main.pressure} PS</h2>


                    </div>

                </div>

            </div>

        </div>
    )
}

export default Weather
