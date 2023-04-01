// Vérification si l'utilisateur est connecté en lisant le token stocké en session
const token = sessionStorage.getItem('token');
if (token) {
  // Si l'utilisateur est connecté, on supprime les boutons de filtre
  const boutonFiltre = document.querySelector(".bouton-filtre");
  boutonFiltre.style.display = "none";

  // Si l'utilisateur est connecté, login devient logout
  const loginLink = document.getElementById('loginLink');
  loginLink.textContent = 'logout';

  // Ajouter un gestionnaire d'événement au lien de connexion pour déconnecter l'utilisateur
  loginLink.addEventListener('click', () => {
    // Supprimer le token de la session
    sessionStorage.removeItem('token');
    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = 'login.html';
  });
}
