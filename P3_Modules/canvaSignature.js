import { Formulaire } from '../P3_Modules/formulaire.js'
const formulaire = new Formulaire()

export class CanvaSignature {
  constructor () {
    this.canvas = document.querySelector('.canvas')
    this.ctx = this.canvas.getContext('2d')
    this.drag = false
    this.ctx.fillStyle = 'white' // Couleur de fond
    this.ctx.strokeStyle = 'black' // Couleur du trait
    this.annulationButton = document.getElementById('annulation')
    this.validationButton = document.getElementById('validation')
    this.clearButton = document.getElementById('reset')
    this.canvaRempli = false
    this.eventCanva()
  }

  eventCanva () {
    this.canvas.onmousedown = (event) => { // Condition de début du dessin
      this.drag = true
      this.canvaRempli = false
      this.ctx.beginPath()
      this.ctx.moveTo(event.offsetX, event.offsetY)
    }
    this.canvas.onmousemove = (event) => { // Poursuite du dessin
      if (this.drag) {
        this.ctx.lineTo(event.offsetX, event.offsetY)
        this.ctx.stroke()
      }
    }
    this.canvas.onmouseup = () => { // Fin du dessin
      this.drag = false
      this.canvaRempli = true
    }

    this.canvas.addEventListener('touchstart', (e) => {
      var touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft
      var touchY = e.touches[0].pageY - e.touches[0].target.offsetTop
      this.drag = true
      this.ctx.beginPath()
      this.ctx.moveTo(touchX, touchY)
    })

    this.canvas.addEventListener('touchmove', (e) => {
      var touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft
      var touchY = e.touches[0].pageY - e.touches[0].target.offsetTop
      if (this.drag) {
        this.ctx.lineTo(touchX, touchY)
        this.ctx.stroke()
      }
    })

    this.canvas.addEventListener('touchend', (e) => {
      this.drag = false
      this.canvaRempli = true
    })

    this.clearButton.onclick = (e) => { // Nettoyage de la zone Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    this.annulationButton.onclick = (e) => { // Bouton annulation
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      formulaire.blocSignature.style.visibility = 'hidden'
      window.location.reload()
    }
  }
}
