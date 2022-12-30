import { Timer } from '../P3_Modules/timer.js'
const timer = new Timer()

export function SessionStorage () {
  const nomUtilisateur = document.getElementById('name')
  const prenomUtilisateur = document.getElementById('prenom')
  const formResa = document.querySelector('.confirmation_resa')

  if (window.localStorage.getItem('nom') && window.localStorage.getItem('prenom')) {
    nomUtilisateur.value = window.localStorage.getItem('nom')
    prenomUtilisateur.value = window.localStorage.getItem('prenom')
  }
  if (window.sessionStorage.getItem('reservation')) {
    window.sessionStorage.getItem('reservation', formResa.style.visibility = 'visible')
  }
  if (window.sessionStorage.getItem('timer')) {
    window.sessionStorage.getItem('timer', timer.counterResa)
    timer.start()
  }
}
