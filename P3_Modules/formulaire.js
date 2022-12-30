export class Formulaire {
  constructor () {
    this.reservationButton = document.getElementById('reservation_button')
    this.erreur = document.getElementById('erreur')
    this.blocSignature = document.querySelector('.signature')
    this.nomUtilisateur = document.getElementById('name')
    this.prenomUtilisateur = document.getElementById('prenom')
    this.adresseStation = document.getElementById('adresse_station')
    this.formResa = document.getElementById('formulaire_reservation')
    this.regex = /^[A-Za-z]{1}[a-z -]*$/
    this.erreurForm()
  }

  erreurForm () {
    this.reservationButton.onclick = (e) => { // Vérification des données utilisateurs et message d'erreur
      if (this.nomUtilisateur.value === '' && this.prenomUtilisateur.value === '') {
        e.preventDefault()
        this.erreur.value = 'Merci de renseigner votre Nom et Prénom'
      } else if (this.nomUtilisateur.value === '') {
        e.preventDefault()
        this.erreur.value = 'Merci de renseigner votre Nom'
      } else if (this.prenomUtilisateur.value === '') {
        e.preventDefault()
        this.erreur.value = 'Merci de renseigner votre Prénom'
      } else if (this.adresseStation.value === '') {
        this.erreur.value = 'Merci de choisir une station'
      } else if (this.nomUtilisateur.value.length < 2) {
        e.preventDefault()
        this.erreur.value = 'Nom incorrect (2 caractère minimum)'
      } else if (!this.regex.test(this.nomUtilisateur.value)) {
        e.preventDefault()
        this.erreur.value = 'Format du nom incorrect (Pas de symboles)'
      } else if (this.prenomUtilisateur.value.length < 2) {
        e.preventDefault()
        this.erreur.value = 'Prénom incorrect (2 caractère minimum)'
      } else if (!this.regex.test(this.prenomUtilisateur.value)) {
        e.preventDefault()
        this.erreur.value = 'Format du prénom incorrect (Pas de symboles)'
      } else {
        this.blocSignature.style.visibility = 'visible'
        this.erreur.value = ''
        window.localStorage.setItem('nom', this.nomUtilisateur.value)
        window.localStorage.setItem('prenom', this.prenomUtilisateur.value)
      }
    }
  }
}
