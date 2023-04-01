// Script de vérification et connextion // 



// Récuperer les information saisie //  
const emailInput = document.querySelector('input[name="E-mail"]');
const passwordInput = document.querySelector('input[name="password"]');

// clic sur le bouton connextion //
const loginButton = document.querySelector('.buttonlog');
loginButton.addEventListener('click', () => {
    
  // requete vers serveur // 
  const requestBody = {
    email: emailInput.value,
    password: passwordInput.value
  };
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (response.ok) {
      // Si connexion reussi redirige vers la page index //
      response.json().then(data => {
        // stockage du token dans la session
        sessionStorage.setItem('token', data.token);
      });
      window.location.href = 'index.html';
    } else {
      // Si erreur d'identifiant affiche un message //
      alert('Identifiants ou mots de passe invalides. Veuillez réessayer.');
    }
  })
  
  // Erreurs // 
  .catch(error => {
    console.error('Erreur:', error);
  });
});
