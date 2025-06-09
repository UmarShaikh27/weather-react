import React, { useEffect, useState } from 'react'
import './style.css'
import dayimg from "./images/daytime.jpg"
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'

function Weather() {
    const currentTime = new Date()
    const theDate = currentTime.getDate()
    const theMonth = currentTime.getMonth() + 1
    const theFullYear = currentTime.getFullYear()

    const [weatherApi, setweatherApi] = useState(null)
    const [cityName, setCityName] = useState("karachi")
    const [cityInput, setCityInput] = useState("karachi")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isCelsius, setIsCelsius] = useState(true)

    const getWeatherIcon = (weatherMain) => {
        switch(weatherMain?.toLowerCase()) {
            case 'clear': return <WiDaySunny className="weather-icon" />;
            case 'clouds': return <WiCloud className="weather-icon" />;
            case 'rain': return <WiRain className="weather-icon" />;
            case 'snow': return <WiSnow className="weather-icon" />;
            case 'thunderstorm': return <WiThunderstorm className="weather-icon" />;
            case 'mist':
            case 'fog':
                return <WiFog className="weather-icon" />;
            default: return <WiDaySunny className="weather-icon" />;
        }
    }

    const convertTemp = (temp) => {
        if (!isCelsius) {
            return ((temp * 9/5) + 32).toFixed(1);
        }
        return temp;
    }

    const fireApi = () => {
        if (!cityName.trim()) {
            setError("Please enter a city name")
            return
        }
        setCityInput(cityName)
        setError("")
    }

    useEffect(() => {
        const fetchWeather = async () => {
            setIsLoading(true)
            setError("")
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=1a6ddfef12cd3a691866f28f0f34015a&units=metric`)
                const data = await response.json()

                if (data.cod === "404") {
                    setError("City not found. Please check the city name and try again.")
                    setweatherApi(null)
                } else {
                    setweatherApi(data)
                }
            } catch (err) {
                setError("Failed to fetch weather data. Please try again.")
                setweatherApi(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchWeather()
    }, [cityInput])

    return (
        <div>
            <img className='bgImage' src={dayimg} alt="" />
            <div className='mainDiv'>
                <div className='inputDiv container'>
                    <input
                        placeholder='Enter Your City/Country'
                        type="text"
                        className="input-group form-control mx-2"
                        value={cityName}
                        onChange={(e) => { setCityName(e.target.value) }}
                        onKeyPress={(e) => { if (e.key === 'Enter') fireApi() }}
                    />
                    <button className='btn' onClick={fireApi} disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Check'}
                    </button>
                </div>

                <div className="unit-toggle mt-2">
                    <button 
                        className={`btn btn-sm ${isCelsius ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setIsCelsius(true)}
                    >
                        °C
                    </button>
                    <button 
                        className={`btn btn-sm ms-2 ${!isCelsius ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setIsCelsius(false)}
                    >
                        °F
                    </button>
                </div>

                {error && (
                    <div className="alert alert-danger mx-auto mt-3" style={{ width: '40%' }}>
                        {error}
                    </div>
                )}

                {weatherApi && !error && (
                    <div className='midDiv'>
                        <div className='otherDiv'>
                            <h5>Wind Speed</h5>
                            <h2>{weatherApi.wind?.speed} m/s</h2>
                            <h5>Min/Max Temperature</h5>
                            <h2>{convertTemp(weatherApi.main?.temp_min)}/{convertTemp(weatherApi.main?.temp_max)}°{isCelsius ? 'C' : 'F'}</h2>
                        </div>
                        <div className='forecastDiv'>
                            <h2 className='countryName my-0'>{weatherApi.name}, {weatherApi.sys?.country}</h2>
                            <h6 style={{ marginBottom: "20px" }}>{theDate}/{theMonth}/{theFullYear}</h6>
                            <div style={{ fontSize: '5rem', color: '#F0DFAD' }}>
                                {getWeatherIcon(weatherApi.weather?.[0]?.main)}
                            </div>
                            <h1 className='temp my-0'>{convertTemp(weatherApi.main?.temp)}°{isCelsius ? 'C' : 'F'}</h1>
                            <h3>- - - - - - - - - - - - -</h3>
                            <h6>{weatherApi.weather?.[0]?.main} - {weatherApi.weather?.[0]?.description}</h6>
                        </div>
                        <div className='otherDiv'>
                            <h5>Humidity</h5>
                            <h2 className='siders' style={{marginBottom : "40px"}}>{weatherApi.main?.humidity}%</h2>
                            <h5>Pressure</h5>
                            <h2 className='siders'>{weatherApi.main?.pressure} hPa</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Weather
