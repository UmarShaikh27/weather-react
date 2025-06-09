import React, { useEffect, useState } from 'react'
import './style.css'
import dayimg from "./images/backgrounds/daytime.jpg"
import nightimg from "./images/backgrounds/night.jpg"
import morningimg from "./images/backgrounds/morning.jpg"
import eveningimg from "./images/backgrounds/evening.jpg"
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiNightClear, WiNightCloudy } from 'react-icons/wi'

function Weather() {
    const [weatherApi, setweatherApi] = useState(null)
    const [cityName, setCityName] = useState("karachi")
    const [cityInput, setCityInput] = useState("karachi")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [localTime, setLocalTime] = useState(new Date())
      const getWeatherIcon = (weatherMain, hours) => {
        const isNight = hours < 6 || hours >= 18;
        
        switch(weatherMain?.toLowerCase()) {
            case 'clear':
                return isNight ? <WiNightClear /> : <WiDaySunny />;
            case 'clouds':
                return isNight ? <WiNightCloudy /> : <WiCloud />;
            case 'rain':
                return <WiRain />;
            case 'snow':
                return <WiSnow />;
            case 'thunderstorm':
                return <WiThunderstorm />;
            case 'mist':
            case 'fog':
            case 'haze':
                return <WiFog />;
            default:
                return isNight ? <WiNightClear /> : <WiDaySunny />;
        }
    };

    const getBackgroundImage = (hours) => {
        if (hours >= 5 && hours < 12) {
            return morningimg; // Morning: 5 AM to 11:59 AM
        } else if (hours >= 12 && hours < 17) {
            return dayimg; // Day: 12 PM to 4:59 PM
        } else if (hours >= 17 && hours < 20) {
            return eveningimg; // Evening: 5 PM to 7:59 PM
        } else {
            return nightimg; // Night: 8 PM to 4:59 AM
        }
    };

    const calculateLocalTime= (timezone) => {
        const localTime = new Date();
        const utc = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
        return new Date(utc + (1000 * timezone));
    };

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
                    // Calculate local time using timezone offset from API
                    const cityLocalTime = calculateLocalTime(data.timezone);
                    setLocalTime(cityLocalTime);
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

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div>
            <img 
                className='bgImage' 
                src={getBackgroundImage(localTime.getHours())} 
                alt="weather background" 
            />
            <div className='mainDiv'>
                <div className='inputDiv container'>
                    <input
                        placeholder='Enter city,country (e.g., London,GB)'
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

                {error && (
                    <div className="alert alert-danger mx-auto mt-3" style={{ width: '40%' }}>
                        {error}
                    </div>
                )}

                {weatherApi && !error && (
                    <div className='midDiv'>
                        <div className='otherDiv'>
                            <h5>Wind Speed</h5>
                            <h2>{weatherApi.wind?.speed}</h2>
                            <h5>Min/Max Temperature</h5>
                            <h2>{weatherApi.main?.temp_min}/{weatherApi.main?.temp_max}°C</h2>
                        </div>                        <div className='forecastDiv'>
                            <h2 className='countryName my-0'>{weatherApi.name}, {weatherApi.sys?.country}</h2>                            <h6 style={{ marginBottom: "20px" }}>
                                Local Time: {formatTime(localTime)}
                            </h6>
                            <div style={{ fontSize: '5rem', color: '#F0DFAD' }}>
                                {getWeatherIcon(weatherApi.weather?.[0]?.main, localTime.getHours())}
                            </div>
                            <h1 className='temp my-0'>{weatherApi.main?.temp}°C</h1>
                            <h3>- - - - - - - - - - - - -</h3>
                            <h6>{weatherApi.weather?.[0]?.main}</h6>
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
