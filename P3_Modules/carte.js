export class Carte {
  constructor (donneesStationsVelo) {
    this.latCarte = 49.4431 // Latitude carte
    this.lngCarte = 1.0993 // Longitude carte
    this.L = window.L
    this.carteVille = this.L.map('carte_ville').setView([this.latCarte, this.lngCarte], 13)
    this.tuileCarte = this.L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxzoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiY2hyaXM3NmciLCJhIjoiY2s4NDdncno5MDBhbDNmcW9laTl5d2Q5NyJ9.FYuRdsPKT1Bos6V49XIWvw'
    })
    this.tuileCarte.addTo(this.carteVille)
  }
}
