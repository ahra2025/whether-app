// 436cab735d864ce3b8740332250805
// Sheeba05
// https://www.weatherapi.com/my/
// https://www.weatherapi.com/

// https://api.openweathermap.org/data/2.5/forecast?q={CITY_NAME}&appid={API_KEY}&units=metric
const API_KEY = "436cab735d864ce3b8740332250805";
const docs = document.getElementById("detail_card");
const img = document.getElementById("rainy_img_logo");
const forecastFourDays = document.getElementById("forecast_text");
function formSubmit() {
  const cityName = document.getElementById("searchbar_input_in")?.value;
  updateCard(cityName);
}

function updateCard(cityName) {
  if (cityName) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`;
    fetch(url)
      .then((response) => response?.json())
      .then((data) => {
        const img_url = data?.current?.condition?.icon;
        if (img_url) {
          img.src = `https:${img_url}`;
        }
        docs.innerHTML = `
         <h3 class="dashboard_main_heading">${data?.location?.name}</h3>
                <p class="dashboard_main_para">Temperature: ${data?.current?.temp_c}°C</p>
                <p class="dashboard_main_para">Wind: ${data?.current?.wind_mph}M/S</p>
                <p class="dashboard_main_para">Humidity: ${data?.current?.humidity}%</p>
           
          `;
      })
      .catch((error) => console?.error(error));
  } else {
    alert("Please enter city name");
  }
}

let latitude = null;
let longitude = null;

let dashboard_data = document.getElementById("dashboard_main");

function getLocation() {
  if (navigator?.geolocation) {
    navigator?.geolocation?.getCurrentPosition(
      geolocationSuccess,
      geolocationError
    );
  } else {
    dashboard_data.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function geolocationSuccess(position) {
  latitude = position?.coords?.latitude;
  longitude = position?.coords?.longitude;
  fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  )
    .then((response) => response?.json())
    .then((data) => {
      updateCard(data?.address?.state_district);
      forecastData(data?.address?.state_district);
    })
    .catch((error) => ("Error fetching address:", error));
}

function geolocationError() {
  alert("Sorry, no position available.");
}

function forecastData(cityName) {
  if (cityName) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5`;

    // const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response?.json())
      .then((data) => {
        const img_url = data?.current?.condition?.icon;
        if (img_url) {
          img.src = `https:${img_url}`;
        }
        forecastFourDays.innerHTML = `
                //  <h4 forecast_text_para>Date: ${data.date}</h4>
                <p class="forecast_text_para">Temperature: ${data?.current?.temp_c}°C</p>
                <p class="forecast_text_para">Wind: ${data?.current?.wind_mph}M/S</p>
                <p class="forecast_text_para">Humidity: ${data?.current?.humidity}%</p>
           
          `;
      })
      .catch((error) => console?.error(error));
  } else {
    // alert("Please enter city name");
  }
}
