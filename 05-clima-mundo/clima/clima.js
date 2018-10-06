const axios = require('axios');

const getClima = async(lat, lng) => {

    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=7d03b568b830237171d2c7a870b22bbf`)

    return resp.data;
}


module.exports = {
    getClima
}