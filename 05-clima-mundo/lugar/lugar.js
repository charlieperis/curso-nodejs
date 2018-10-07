const axios = require('axios');

//para generar la KEY de google maps: https://developers.google.com/maps/documentation/geocoding/start
//Mi Key de Google Maps = AIzaSyDDkcZoSmImDAdqQriU9OWO96hbQgMyScY

//console.log(direccion);

const getLugarLatLng = async(direccion) => {

    let encodeURL = encodeURI(direccion); //codifica la url (o nombre de la ciudad que introducimos por comando) para que no de error

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=AIzaSyDDkcZoSmImDAdqQriU9OWO96hbQgMyScY`)

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No existe el lugar ${direccion}`);
    }

    //console.log(JSON.stringify(resp.data, undefined, 2)); //Obtiene todos los elementos del json y lo formatea para que se vea mejor "resp.data, undefined -sirve ara rremplazar por otros datos-", 2 -es el espacioado en el formateo del json-

    let location = resp.data.results[0]; //definimos la location para recorrer el array que devuelve google maps
    let coors = location.geometry.location; //reutilizamos location y eguimos reccoriendo el array hasta encontrar los datos que necesitamos

    //console.log(`Lugar: ${location.formatted_address}`);
    //console.log(`Latitud: ${latitud.lat}`);
    //console.log(`Longitud: ${longitud.lng}`);

    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }

}


module.exports = {
    getLugarLatLng
}