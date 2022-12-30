export class TypeMarker {
  constructor () {
    this.L = window.L
    this.redMarker = new this.L.Icon({ // Marqueur rouge
      iconUrl: '../P3_05_Images/marqueurs/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
    this.orangeMarker = new this.L.Icon({ // Marqueur orange
      iconUrl: '../P3_05_Images/marqueurs/marker-icon-2x-orange.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
    this.greenMarker = new this.L.Icon({ // Marqueur vert
      iconUrl: '../P3_05_Images/marqueurs/marker-icon-2x-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
    this.positionMarker = new this.L.Icon({
      iconUrl: '../P3_05_Images/marqueurs/walkingtour.png',
      iconSize: [32, 37],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
  }
}
