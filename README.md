# Modern Weather App

A responsive weather application built with React that provides real-time weather information for any city in the world.

![Weather App Screenshot](./src/Components/images/daytime.jpg)

## Features

- **Real-Time Weather Data**: Get current weather conditions for any city worldwide
- **Dynamic Weather Icons**: Weather icons that change based on current conditions
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: User-friendly error messages for invalid city names or API issues
- **Clean UI**: Beautiful, minimalist interface with blur effects and smooth transitions
- **Detailed Weather Info**: 
  - Current Temperature
  - Min/Max Temperature
  - Wind Speed
  - Humidity
  - Pressure
  - Weather Conditions

## Technologies Used

- React.js
- OpenWeatherMap API
- CSS3 with Flexbox
- Bootstrap for UI components

## API Documentation

### OpenWeatherMap API Integration
This project utilizes the OpenWeatherMap API to fetch real-time weather data. Here's how it's implemented:

#### Endpoint Used
```
GET https://api.openweathermap.org/data/2.5/weather
```

#### Query Parameters
- `q`: City name and country code (e.g., London,GB)
- `units`: Set to 'metric' for Celsius
- `appid`: Your API key

#### Data Retrieved
- Current temperature
- Weather conditions
- Wind speed
- Humidity levels
- Atmospheric pressure
- Min/Max temperatures

#### Sample API Call
```javascript
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
```

For more details, visit [OpenWeatherMap API Documentation](https://openweathermap.org/api)

## Access link
- https://weather-react-bmj.web.app/


## Usage

1. Enter a city name in the search bar (e.g., "London,GB" or "Tokyo,JP")
2. Press Enter or click the Check button
3. Toggle between Celsius and Fahrenheit using the temperature unit buttons


## Future Enhancements

- 5-day weather forecast
- Geolocation support
- Weather maps integration
- Additional weather data (UV index, sunrise/sunset times)
- Time-based background images
- Weather alerts and notifications
- City autocomplete suggestions
- Multiple location saving
- Historical weather data

## Acknowledgments
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)


## Author
Umar Habib

## Contact
- GitHub: [@umarshaikh27](https://github.com/umarshaikh27)
- LinkedIn: [Umar Habib](www.linkedin.com/in/umar-habib-417729275)
