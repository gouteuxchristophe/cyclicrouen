export class Slider {
  constructor () {
    // Variables diaporama
    this.prevButton = document.querySelector('.prev_diapo') // Bouton précédent
    this.pauseButton = document.querySelector('.pause_diapo') // Bouton pause
    this.nextButton = document.querySelector('.next_diapo') // Bouton suivant
    this.diapo = document.querySelectorAll('.item') // Bloc diaporama
    this.diapoLength = this.diapo.length // Longueur du diapo
    this.counter = 0
    this.diapo[this.counter].classList.add('active') // Ajout d'une classe active
    this.diapoInterval = setInterval(this.lectureAuto, 5000) // Durée interval image
    this.lecture = true
    this.eventListener()
  }

  eventListener () {
    this.prevButton.onclick = () => { // Slide précédent
      this.diapo[this.counter].classList.remove('active')
      this.counter--

      if (this.counter < 0) {
        this.counter = this.diapoLength - 1
      }
      this.diapo[this.counter].classList.add('active')
    }

    this.nextButton.onclick = () => { // Slide suivant
      this.lectureAuto()
    }

    this.pauseButton.onclick = () => { // Bouton Pause Lecture
      if (this.lecture) {
        this.pauseDiapo()
      } else {
        this.lectureDiapo()
      }
    }

    document.addEventListener('keydown', (e) => { // Gestion du clavier
      if (e.keyCode === 37) { // Précédent
        this.prevButton.onclick()
      } else if (e.keyCode === 39) { // Suivant
        this.nextButton.onclick()
      } else if (e.keyCode === 19) { // Pause
        this.pauseButton.onclick()
      }
    })
  }

  lectureAuto () { // Lecture automatique du slide
    this.diapo[this.counter].classList.remove('active')
    this.counter++

    if (this.counter >= this.diapoLength) {
      this.counter = 0
    }
    this.diapo[this.counter].classList.add('active')
  }

  pauseDiapo () { // Pause diaporama
    this.pauseButton.innerHTML = '<i class="fas fa-play"></i>'
    this.lecture = false
    clearInterval(this.diapoInterval)
  }

  lectureDiapo () { // Reprise après pause
    this.pauseButton.innerHTML = '<i class="fas fa-pause"></i>'
    this.lecture = true
    this.diapoInterval = setInterval(this.lectureAuto.bind(this), 5000)
  }
}
