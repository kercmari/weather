import { weather_data } from './data.js';



let loadDayForecastData = () => {

    let [guayaquil, ambato, tema] = weather_data;
    let {city, date, maxtemperature, cloudiness, wind,rainfall,mintemperature,forecast_today,forecast_week, ...others} = guayaquil;
	let cityHTML = document.getElementById("city");
    cityHTML.innerText = city
    let datHTML = document.getElementById("date");
    datHTML.innerText = date
    let maxtemperatureHTML = document.getElementById("maxtemperature");
    maxtemperatureHTML.innerText = maxtemperature
    let mintemperatureHTML = document.getElementById("mintemperature");
    mintemperatureHTML.innerText = mintemperature
    let cloudinessHTML = document.getElementById("cloudiness");
    cloudinessHTML.innerText = cloudiness
    let windHTML = document.getElementById("wind");
    windHTML.innerText = wind
    let rainfallHTML = document.getElementById("rainfall");
    rainfallHTML.innerText = rainfall

    let [obj1, obj2] = forecast_today;
    //Datos internos
    let late_iconHTML = document.getElementById("late_icon");
    late_iconHTML.innerText = obj1.icon
    let late_temperatureHTML = document.getElementById("late_temperature");
    late_temperatureHTML.innerText = obj1.temperature
    let late_forecastHTML = document.getElementById("late_forecast");
    late_forecastHTML.innerText = obj1.forecast
    let late_textHTML = document.getElementById("late_text");
    late_textHTML.innerText = obj1.text
    
    let night_iconHTML = document.getElementById("night_icon");
    night_iconHTML.innerText = obj2.icon
    let night_temperatureHTML = document.getElementById("night_temperature");
    night_temperatureHTML.innerText = obj2.temperature
    let night_forecastHTML = document.getElementById("night_forecast");
    night_forecastHTML.innerText = obj2.forecast
    let night_textHTML = document.getElementById("night_text");
    night_textHTML.innerText = obj2.text
    
}

let loadWeekForecastData = (search) => {
  let foundCity = weather_data.find((element)=>{
    return element.city.toLowerCase() == search.toLowerCase()
  })
  let {city, date, maxtemperature, cloudiness, wind,rainfall,mintemperature,forecast_today,forecast_week, ...others} = foundCity;
    var lista = document.getElementById('list-group');
    lista.innerHTML= '';
    forecast_week.forEach((item)=> {
      var nuevoLi = document.createElement('li');
      nuevoLi.className = 'list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg';

      nuevoLi.innerHTML = `
        <div class="d-flex flex-column">
          <h6 class="mb-1 text-dark font-weight-bold text-sm">${item.text}</h6>
          <span class="text-xs">${item.date}</span>
        </div>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-dark mx-2">${item.temperature.max}</span> |
          <span class="text-dark mx-2">${item.temperature.min}</span>
          <div class="ms-4"><i class="material-icons fs-2 me-1 ${item.icon}">water_drop</i></div>
        </div>
      `;

      lista.appendChild(nuevoLi);
    });
	
}
function locadCityNames(selector, cities){
cities.forEach((item)=>{
  let option = document.createElement('option');
  option.value = item;
  option.text = item;
  option.classList.add('dropdown-item')
  selector.appendChild(option)
})
}
document.addEventListener('DOMContentLoaded', function(){
  loadDayForecastData();
  let loadSelector = document.getElementById('dropdownMenuButton');
  let listCity = weather_data.map(function(obj){
    return obj.city;
  })
  if (loadSelector){
    locadCityNames(loadSelector, listCity)
    loadSelector.addEventListener('change', ()=>{
      let selectCity = loadSelector.value;
      loadWeekForecastData(selectCity);
    })
  }
  let loadButton = document.getElementById('loadinfo');
  if (loadButton){
    loadButton.addEventListener('click', function(){
      loadWeekForecastData();
    })
  }
})



