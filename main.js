document.querySelector('.autocomplete').addEventListener('keydown', function(e) {
// Enter is pressed
    if (e.keyCode == 13) { searchWeather(); }

});


const input = document.querySelector('.autocomplete');

const options = {
 types: ['(cities)'],
       componentRestrictions: {
         country: "us"
       }
};
const autocomplete = new google.maps.places.Autocomplete(input, options); 


document.querySelector('.autocomplete').addEventListener('keydown', function(e) {
// Enter is pressed
  if (e.keyCode == 13) { searchWeather(); }


});


async function searchWeather() {
const weatherKey = config.weather_key;
const searchTerm = input.value;
const split = searchTerm.split(',');

const city = split[0];

    let response = await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
        params: {
          q: city,
          appid: weatherKey,
          units: 'imperial'
        }
      });

      if (response.data.Error){
        return [];
    }else{
      drawWeather(response.data);
    }
 
};

function drawWeather(d){
  const farenheit = Math.round((d.main.temp)*1);
  const feelsLike = Math.round((d.main.feels_like)*1);
  const icon = d.weather[0].icon;
  const iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";

  document.getElementById('weather').innerHTML = `
  <div class="card">
    <img id="icon" src="${iconUrl}" alt="Card image cap">
    <div class="card-body">
      <h3 id="description">${d.weather[0].description}</h3>
      <h2 id="temp">${farenheit}${'&deg;'}</h2>
      <div id="feelsLike">
      <h3>Feels Like:</h3>
     <h4> ${feelsLike}${'&deg;'}</h4>
      </div>
      <h4 id="location">${d.name}</h4>
    </div>
  `;

}