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

  // Ajout d'un écouteur d'événement au lien de connexion pour déconnecter l'utilisateur
  loginLink.addEventListener('click', () => {
    // Suppression du token de la session
    sessionStorage.removeItem('token');
    // Redirection de l'utilisateur vers la page de connexion
    window.location.href = 'login.html';
  });

  // Ajout d'un écouteur d'événement à l'élément modal-mod pour afficher la modal
  const modalMod = document.getElementById("modal-mod");
  modalMod.addEventListener("click", function() {
    // Sélection de l'élément modal
    const modal = document.getElementById("modal");
    // Modification de la propriété display pour afficher la modal gallerie photo
    modal.style.display = "flex";

    // Ajout d'un écouteurr d'événement au bouton close pour fermer la modal
    const close = document.querySelector(".close");
    close.addEventListener("click", function() {
      // Modification de la propriété "display" pour masquer la modal
      modal.style.display = "none";
    });
  });

  // Ajout d'un écouteur d'événement à l'élément window pour fermer la modal lorsqu'on clique en dehors de la fenêtre
  window.addEventListener("click", function(event) {
    // Sélection de l'élément modal
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      // Modification de la propriété "display" pour masquer la modal
      modal.style.display = "none";
    }
  });
}

// Récupérer les images depuis l'API
fetch("http://localhost:5678/api/works")
  // Extraire les données de réponse au format JSON
  .then(response => response.json()) 
  .then(data => {
    // Stocker toutes les images dans un tableau
    const images = [];

    // Créer un conteneur d'image pour chaque élément de données
    data.forEach(work => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("modal-image-container");

      // Ajouter l'image
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.setAttribute("data-id", work.id);
      imgContainer.appendChild(img);

      // Ajouter un bouton d'édition
      const editor = document.createElement('span');
      editor.innerHTML = "éditer";
      imgContainer.appendChild(editor);

      // Ajouter l'icône de la corbeille pour supprimer l'image
      const bin = document.createElement("img");
      bin.classList.add("bin");
      bin.src = "assets/icons/bin.png";
      bin.setAttribute("crossorigin", "anonymous");
      imgContainer.appendChild(bin);

      // Ajouter l'icône de déplacement
      const enlarge = document.createElement('img');
      enlarge.setAttribute('class', 'enlarge');
      enlarge.src = "assets/icons/Move.Png";
      imgContainer.appendChild(enlarge);

      // Ajouter un gestionnaire d'événements à l'icône de la corbeille pour supprimer l'image
      bin.addEventListener("click", function() {
        const id = this.parentNode.querySelector("img").getAttribute("data-id");
        // Envoyer une requête DELETE à l'API pour supprimer l'image
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
             // Ajouter le token d'authentification à l'en-tête de la requête
            "Authorization": `Bearer ${token}`,
             // Ajouter le token d'authentification à l'en-tête de la requête 
            "Content-Type": "application/json" 
          }
        })
        .then(response => {
          if (response.ok) {
            // Suppression réussie - retirer l'image de la galerie
            const imageContainer = this.parentNode;
            imageContainer.remove();

            // Retirer également l'image de la page principale
            const mainImage = document.querySelector(`[data-id='${id}']`).parentNode;
            mainImage.remove();
          } else {
            // Erreur lors de la suppression
            console.log(`Erreur de suppression : ${response.status} - ${response.statusText}`);
            return response.json(); // Convertir la réponse en objet JSON
          }
        })
        .then(data => {
          // Traiter les données renvoyées par l'API
          console.log(data);
        })
        .catch(error => console.log(`Erreur de suppression : ${error.message}`));
      });

      // Ajouter l'image à la div gallery-modal
      const galleryModal = document.querySelector(".gallery-modal");
      galleryModal.appendChild(imgContainer);
    });
  });
// Récupération du bouton "Ajouter une photo" de la modal galerie photo
const addImageBtn = document.querySelector('#add-image');

// Récupération de la modal galerie photo et de la modal post
const modalGalerie = document.querySelector('#modal');
const modalPost = document.querySelector('#modal-post');

// Ajout d'un écouteur d'événement au clic sur le bouton "Ajouter une photo"
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

// Récupération des éléments HTML
const imagePreview = document.getElementById('image-preview');
const openModalPost = document.querySelector("#add-image")
const modallPost = document.querySelector("#modal-post")
const fileInput = document.getElementById('file-input');
const addImage = document.querySelector('#form-img p');
const form = document.getElementById('form-post');
const titleInput = document.getElementById('form-title');
const categorySelect = document.getElementById('categories-form');
const imageInput = document.getElementById('file-input');
const submitButton = document.querySelector('#form-post button');

// Fonction pour vérifier si tous les champs sont remplis
function checkFields() {
  const title = titleInput.value;
  const category = categorySelect.value;
  const imageFile = imageInput.files[0];
  
  if (title.length === 0 || category === '' || !imageFile) {
    return false;
  } else {
    return true;
  }
}

// Écouteurs d'événements pour afficher la prévisualisation de l'image et vérifier si tous les champs sont remplis
openModalPost.addEventListener("click", (event) => {
  event.preventDefault()
  modalPost.style.display = "";
  modal.style.display = "none";
  
  // Affiche l'image dans le input-file
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      imagePreview.style.display = "";
      const fileSize = file.size / 1024 / 1024; // Conversion de la taille en Mo
      if (fileSize > 4) {
        alert('Le fichier sélectionné est trop volumineux. Veuillez sélectionner un fichier de moins de 4 Mo.');
      } else {
        addImage.style.display = "none";
        const imageUrl = URL.createObjectURL(file);
        imagePreview.src = imageUrl;
      }
    }
  });
});

// Écouteur d'événement pour envoyer les données du formulaire à l'API
form.addEventListener('submit', async function(event) {
  event.preventDefault(); 
  // Récupère les valeurs des inputs
  const title = titleInput.value;
  const category = categorySelect.value;
  const imageFile = imageInput.files[0];

  if (title.length === 0 || category === '' || !imageFile) {
    console.error('erreur');
    return;
  }
  
  // Objet FormData() envoie les données du formulaire à l'API
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('image', imageFile);

  const response = await fetch("http://localhost:5678/api/works", {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (response.ok) {
    // Ajoute le nouveau projet au tableau dWorks et ferme la modal
    let newWork = await response.json();
    dWorks.push(newWork);  
    displayWorks(dWorks);
    closeModal();
  }
});

// Écouteurs d'événements pour vérifier si tous les champs sont remplis
titleInput.addEventListener('input', function() {
  if (checkFields()) {
    submitButton.classList.add("green-button");
  } else {
    submitButton.classList.remove("green-button");
  }
});

categorySelect.addEventListener('change', function() {
  if (checkFields()) {
    submitButton.classList.add("green-button");
  } else {
    submitButton.classList.remove("green-button");
  }
});

imageInput.addEventListener('change', function() {
  if (checkFields()) {
    submitButton.classList.add("green-button");
  } else {
    submitButton.classList.remove("green-button");
  }
});

