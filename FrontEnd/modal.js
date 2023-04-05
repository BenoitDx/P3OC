// Vérification si l'utilisateur est connecté en lisant le token stocké en session
const token = sessionStorage.getItem('token');

if (token) {
  // Si l'utilisateur est connecté, on cache les boutons de filtre
  const boutonFiltre = document.querySelector(".bouton-filtre");
  boutonFiltre.style.display = "none";

  // Si l'utilisateur est connecté, login devient logout
  const loginLink = document.getElementById('loginLink');
  loginLink.textContent = 'logout';

  // Si l'utilisateur est connecté, on affiche le bandeau de modification
  const divModeEdition = document.querySelector('.mode-edition');
  divModeEdition.style.display = 'flex';

  // Si l'utilisateur est connecté, on affiche les boutons de modification
  const elements = document.querySelectorAll('.hide-edition');
  elements.forEach((element) => {
    element.classList.remove('hide-edition');
  });

  // Ajout d'un gestionnaire d'événement au lien de connexion pour déconnecter l'utilisateur
  loginLink.addEventListener('click', () => {
    // Suppression du token de la session
    sessionStorage.removeItem('token');
    // Redirection de l'utilisateur vers la page de connexion
    window.location.href = 'login.html';
  });

  // Ajout d'un gestionnaire d'événement à l'élément modal-mod pour afficher la modal
  const modalMod = document.getElementById("modal-mod");
  modalMod.addEventListener("click", function() {
    // Sélection de l'élément modal
    const modal = document.getElementById("modal");
    // Modification de la propriété display pour afficher la modal
    modal.style.display = "flex";

    // Ajout d'un gestionnaire d'événement au bouton close pour fermer la modal
    const close = document.querySelector(".close");
    close.addEventListener("click", function() {
      // Modification de la propriété "display" pour masquer la modal
      modal.style.display = "none";
    });
  });

  // Ajout d'un gestionnaire d'événement à l'élément window pour fermer la modal lorsqu'on clique en dehors de la fenêtre
  window.addEventListener("click", function(event) {
    // Sélection de l'élément modal
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      // Modification de la propriété "display" pour masquer la modal
      modal.style.display = "none";
    }
  });
}

// Adresse de récupération des images //
fetch("http://localhost:5678/api/works")
  // Extraction des données de réponse au format JSON   
  .then(response => response.json())
  .then(data => {
    // création d'un tableau pour stocker toutes les images
    const images = [];
    data.forEach(work => {
      // création d'une div image container
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("modal-image-container");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      imgContainer.appendChild(img);
      // création d'un bouton Editer
      const editor = document.createElement('span');
      editor.innerHTML = "éditer";
      imgContainer.appendChild(editor);
      // création logo trash 
      const bin = document.createElement("img");
      bin.classList.add("bin");
      bin.src = "assets/icons/bin.png";
      bin.setAttribute("crossorigin", "anonymous");
      imgContainer.appendChild(bin);
      // création logo mouve
      const enlarge = document.createElement('img');
      enlarge.setAttribute('class', 'enlarge');
      enlarge.src = "assets/icons/Move.Png";
      imgContainer.appendChild(enlarge);
      // ajout de l'image à la div gallery-modal
      const galleryModal = document.querySelector(".gallery-modal");
      galleryModal.appendChild(imgContainer);
    });
  });

