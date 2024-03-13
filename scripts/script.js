import variables from "./variables.js";

const {search, container, input, error404, weatherBox, weatherDetails, image, temperature, humidity, description, wind} = variables


search.addEventListener('click', () => {
    const city = input.value
    if (city === '') return
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=f2cc519d51fe5cd6022f0c3916b980f7`).then((response) => response.json()).then(json => {
        
        if (json.cod === "404") {
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fade-in')
            return
        }
        error404.style.display = 'none'
        error404.classList.remove('fade-in')

        switch(json.weather[0].main) {
            case 'Clouds': image.src = './images/cloud.png'
                break;

            case 'Clear': image.src = './images/clear.png'
                break;

            case 'Snow': image.src = './images/snow.png'
                break;

            case 'Rain': image.src = './images/rain.png'
                break;

            case 'Haze': image.src = './images/haze.svg'
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`

        humidity.innerText = `${json.main.humidity}%`

        description.innerHTML = `${json.weather[0].description}`
        console.log(wind)
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

        weatherBox.style.display = 'block'
        weatherDetails.style.display = 'flex'

        weatherBox.classList.add('fade-in')
        weatherDetails.classList.add('fade-in')
        container.style.height = '590px'
    })
})