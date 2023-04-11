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
    // Modification de la propriété display pour afficher la modal gallerie photo
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
       // Ajout de l'attribut data-id contenant l'ID de l'image
      img.setAttribute("data-id", work.id);
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
// Ajout d'un gestionnaire d'événement à l'icône de la corbeille pour supprimer une image
const bins = document.querySelectorAll(".bin");
bins.forEach(bin => {
  bin.addEventListener("click", function() {
    const id = this.parentNode.querySelector("img").getAttribute("data-id"); // récupère l'ID de l'image à partir de l'attribut data-id de l'image
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`, // ajoute le token d'authentification à l'en-tête de la requête
        "Content-Type": "application/json" // spécifie le type de contenu de la requête
      }
    })
    .then(response => {
      if (response.ok) {
        // Suppression réussie - retire l'image de la galerie
        const imageContainer = this.parentNode;
        imageContainer.remove();
         // Supprime également l'image de la page principale
         const mainImage = document.querySelector(`[data-id='${id}']`).parentNode;
         mainImage.remove();
      } else {
        // Erreur lors de la suppression
        console.log(`Erreur de suppression : ${response.status} - ${response.statusText}`);
        return response.json(); // convertit la réponse en objet JSON
      }
    })
    .then(data => {
      // traite les données renvoyées par l'API
      console.log(data);
    })
    .catch(error => console.log(`Erreur de suppression : ${error.message}`));
  });
});



      // ajout de l'image à la div gallery-modal

      const galleryModal = document.querySelector(".gallery-modal");
      galleryModal.appendChild(imgContainer);
    });
    
  });

// Récupération du bouton "Ajouter une photo" de la modal galerie photo
const addImageBtn = document.querySelector('#add-image');

// Récupération de la modal galerie photo et de la modal post
const modalGalerie = document.querySelector('#modal');
const modalPost = document.querySelector('#modal-post');

// Ajout d'un gestionnaire d'événement au clic sur le bouton "Ajouter une photo"
addImageBtn.addEventListener('click', () => {
  // Fermeture de la modal galerie photo
  modalGalerie.style.display = 'none';
  // Ouverture de la modal post
  modalPost.style.display = 'flex';
  
  // Récupérer l'icône "back"
const backButton = document.querySelector('#modal-post .back');

// Ajouter un écouteur d'événement pour le clic sur l'icône "back"
backButton.addEventListener('click', function() {
  // Fermer la modal post
  const modalPost = document.querySelector('#modal-post');
  modalPost.style.display = 'none';

  // Ouvrir la modal gallery
  const modalGallery = document.querySelector('#modal');
  modalGallery.style.display = 'flex';
});

// Récupérer l'icône "close" pour fermer la modal post
const closeButtonPost = document.querySelector('#modal-post .closepost');

// Ajouter un écouteur d'événement pour le clic sur l'icône "close"
closeButtonPost.addEventListener('click', function() {
  // Fermer la modal post
  const modalPost = document.querySelector('#modal-post');
  modalPost.style.display = 'none';
});

// Récupérer l'icône "close" pour fermer la modal gallery
const closeButtonGallery = document.querySelector('#modal .close');

// Ajouter un écouteur d'événement pour le clic sur l'icône "close"
closeButtonGallery.addEventListener('click', function() {
  // Fermer la modal gallery
  const modalGallery = document.querySelector('#modal');
  modalGallery.style.display = 'none';
});

  // Ajout d'un gestionnaire d'événement à l'élément window pour fermer la modal lorsqu'on clique en dehors de la fenêtre
  window.addEventListener("click", function(event) {
    // Sélection de l'élément modal
    const modal = document.getElementById("modal-post");
    if (event.target === modal) {
      // Modification de la propriété "display" pour masquer la modal
      modal.style.display = "none";
    }
  });
  
});

const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');

fileInput.onchange = () => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    imagePreview.style.display = 'block';
    imagePreview.setAttribute('src', reader.result);
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}

