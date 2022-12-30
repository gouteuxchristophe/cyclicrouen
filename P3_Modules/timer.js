import { CanvaSignature } from '../P3_Modules/canvaSignature.js'
import { Formulaire } from '../P3_Modules/formulaire.js'
const canva = new CanvaSignature()
const form = new Formulaire()

export class Timer {
  constructor () {
    this.annulationResa = document.getElementById('annul_resa')
    this.counterResa = 1200
    this.intervalId = null
    this.confirmResa = document.querySelector('.confirmation_resa')
    this.confirmationContent = document.getElementById('confirmation_resa_content')
    this.timer = document.getElementById('timer')
    this.validationButton = document.getElementById('validation')
    this.depart()
    this.annulation()
    this.counterResa = window.sessionStorage.getItem('timer', this.counterResa)
  }

  start () {
    this.intervalId = window.setInterval(this.bip.bind(this), 1000)
  }

  bip () {
    if (window.sessionStorage.getItem('timer', this.counterResa)) {
      this.counterResa--
      if (this.counterResa === 0) {
        this.finish()
      } else {
        this.minute = Math.floor(this.counterResa / 60)
        this.seconde = this.counterResa - this.minute * 60
        if (this.seconde < 10) { this.secondString = '0' + this.seconde } else { this.secondString = this.seconde }
        this.timer.value = this.minute + ' minutes et ' + this.secondString + ' secondes'
        window.sessionStorage.setItem('timer', this.counterResa)
      }
    } else {
      this.counterResa = 1200
      this.counterResa--
      if (this.counterResa === 0) {
        this.finish()
      } else {
        this.minute = Math.floor(this.counterResa / 60)
        this.seconde = this.counterResa - this.minute * 60
        this.timer.value = this.minute + ' minutes et ' + this.seconde + ' secondes'
        window.sessionStorage.setItem('timer', this.counterResa)
      }
    }
  }

  finish () {
    clearInterval(this.intervalId)
    form.reservationButton.style.opacity = '1'
    form.erreur.value = 'Réservation Annulée'
    this.confirmResa.style.visibility = 'hidden'
  }

  annulation () {
    this.annulationResa.onclick = (e) => {
      this.finish()
      form.reservationButton.style.display = 'inline-block'
      window.sessionStorage.removeItem('reservation')
      window.sessionStorage.removeItem('timer')
      window.location.reload()
    }
  }

  depart () {
    this.validationButton.onclick = (e) => {
      if (canva.canvaRempli === true) {
        canva.ctx.restore()
        this.start()
        this.confirmResa.style.visibility = 'visible'
        this.confirmationContent.value = form.adresseStation.value
        form.blocSignature.style.visibility = 'hidden'
        form.reservationButton.style.visibility = 'hidden'
        window.sessionStorage.setItem('reservation', form.formResa.style.visibility = 'visible')
      } else {
        window.alert('Veuillez signer')
      }
    }
  }
}
