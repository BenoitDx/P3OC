// Récupération des éléments HTML correspondant aux champs email et password
const emailInput = document.querySelector('input[name="E-mail"]');
const passwordInput = document.querySelector('input[name="password"]');

// Ajout d'un écouteur d'événement sur le bouton de connexion
const loginButton = document.querySelector('.buttonlog');
loginButton.addEventListener('click', () => {
    
  // Création du corps de la requête POST avec les informations saisies par l'utilisateur
  const requestBody = {
    email: emailInput.value,
    password: passwordInput.value
  };

  // Envoi de la requête POST vers le serveur
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (response.ok) {
      // Si la connexion est réussie, on redirige l'utilisateur vers la page index et on stocke le token dans la session
      response.json().then(data => {
        sessionStorage.setItem('token', data.token);
      });
      window.location.href = 'index.html';
    } else {
      // Si les identifiants sont incorrects, on affiche un message d'erreur
      alert('Erreur dans l identifiant ou le mot de passe');
    }
  })
  .catch(error => {
    // En cas d'erreur, on affiche un message dans la console
    console.error('Erreur:', error);
  });
});
