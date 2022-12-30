import { Carte } from '../P3_Modules/carte.js'
import { TypeMarker } from '../P3_Modules/typeMarker.js'
const cartePrincipal = new Carte()
const styleMarqueur = new TypeMarker()
const $ = window.$ // Exception JQuery

// Variable URL Jc Decaux
const urlJcDecaux = 'https://api.jcdecaux.com/vls/v1/stations?contract=rouen&apiKey=73c5c3343f107817d4daf1941d546dd53f6ef060'

// Requête JSON et traitement
export function Ajax () {
  $(document).ready(function () {
    $.getJSON(urlJcDecaux, function (donneesStationsVelo) {
      const initialValue = 0
      let marker = null

      const totalVelo = donneesStationsVelo.reduce(function (total, currentValue) { // Calcul total vélo
        return total + currentValue.bike_stands
      }, initialValue)

      const totalVeloDispo = donneesStationsVelo.reduce(function (total, currentValue) { // Calcul total vélo dispo
        return total + currentValue.available_bikes
      }, initialValue)

      document.querySelector('.diapo_content0').innerHTML = 'Cyclic ' + donneesStationsVelo[1].contract_name
      document.querySelector('.diapo_content1').innerHTML = totalVelo + ' vélos' + '...'
      document.querySelector('.diapo_content2').innerHTML = ' ...' + 'dont ' + totalVeloDispo + ' disponibles'
      document.querySelector('.diapo_content3').innerHTML = 'répartis sur ' + donneesStationsVelo.length + ' stations !'
      document.querySelector('.diapo_content4').innerHTML = 'Sélectionnez votre station Cyclic'
      document.querySelector('.diapo_content5').innerHTML = 'Remplissez le formulaire de réservation'
      document.querySelector('.diapo_content6').innerHTML = 'Signez et roulez !'

      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition(function (position) {
          const latPosition = position.coords.latitude
          const lngPosition = position.coords.longitude
          marker = cartePrincipal.L.marker([latPosition, lngPosition], { icon: styleMarqueur.positionMarker }).addTo(cartePrincipal.carteVille)
        })
      }
      donneesStationsVelo.forEach(function (donneeStation) {
        if (donneeStation.status.indexOf('OPEN') !== -1) {
          if (donneeStation.available_bikes < 3) {
            marker = cartePrincipal.L.marker([donneeStation.position.lat, donneeStation.position.lng], { icon: styleMarqueur.orangeMarker }).addTo(cartePrincipal.carteVille)
          } else {
            marker = cartePrincipal.L.marker([donneeStation.position.lat, donneeStation.position.lng], { icon: styleMarqueur.greenMarker }).addTo(cartePrincipal.carteVille)
          }
          marker.on('click', function () { // Définition du click sur le marqueur
            document.getElementById('reservation_button').style.opacity = '1' // Autorisation réservation
            document.getElementById('numero_station').value = donneeStation.number // Numéro de la station
            document.getElementById('adresse_station').value = donneeStation.address // Adresse de la station
            document.getElementById('total_nbre_velo').value = donneeStation.bike_stands // Nombre de la vélo dans la station
            document.getElementById('total_velo_dispo').value = donneeStation.available_bikes // Nombre de vélo disponible
            document.getElementById('erreur').value = '' // Pas d'erreur
          })
        }
        if (donneeStation.status.indexOf('CLOSE') !== -1 || donneeStation.available_bikes === 0) {
          marker = cartePrincipal.L.marker([donneeStation.position.lat, donneeStation.position.lng], { icon: styleMarqueur.redMarker }).addTo(cartePrincipal.carteVille)
          marker.on('click', function () { // Définition du click sur le marqueur
            document.getElementById('reservation_button').style.opacity = '0' // Refus réservation
            document.getElementById('numero_station').value = donneeStation.number // Numéro de la station
            document.getElementById('adresse_station').value = donneeStation.address // Adresse de la station
            document.getElementById('total_nbre_velo').value = donneeStation.bike_stands // Nombre de la vélo dans la station
            document.getElementById('total_velo_dispo').value = donneeStation.available_bikes // Nombre de vélo disponible
            document.getElementById('erreur').value = 'Station Fermée' // Message d'erreur
          })
        }
      })
    })
  })
}
