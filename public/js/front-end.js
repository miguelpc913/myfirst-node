const selectors = {
    searchBar : document.querySelector("#search-bar"),
    form : document.querySelector("form"),
    weather : document.querySelector("#weather-container")
}

const getData = (location , callback) =>{
    fetch(`/weather?address=${location}`).then( response  =>{
    response.json().then(data =>{
        if(!data.hasOwnProperty("location")){
            callback(null , data.error);  
            console.log(data.error)
        }else{
            callback(data);
        }
    })
}) 
}

const render = ({location , precipProbability, temperature , weather } = {}) =>{
    selectors.weather.innerHTML = `
        <h5>${location}</h5>
        <div>
            <p>Precipitation probability: ${precipProbability}</p>
            <p>Temperature: ${temperature}</p>
            <p>Weather: ${weather}</p>
        </div>
    `;
}

selectors.form.addEventListener("submit", (e)=>{
    e.preventDefault();
    selectors.weather.innerHTML = "<h3>Loading......</h3>";
    const location = selectors.searchBar.value;
    getData(location , (data , error)=>{
        if(error){
            console.log(error);
            selectors.weather.innerHTML = `<h1>${error}</h1>`;
        }else{
            render(data);
        }
    });
})