import { SessionStorage } from '../P3_Modules/sessionStorage.js'
import { Slider } from '../P3_Modules/slider.js'
import { Ajax } from '../P3_Modules/requêteJSON.js'

document.getElementById('erreur').value = ''

// Instanciation des class

SessionStorage()
const diaporama = new Slider()
diaporama.lectureAuto()
diaporama.pauseDiapo()
diaporama.lectureDiapo()
const requêteAjax = new Ajax()
