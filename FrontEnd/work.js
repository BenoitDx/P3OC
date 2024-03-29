// Adresse de récupération des images
fetch("http://localhost:5678/api/works")
  // Extraction des données de réponse au format JSON   
  .then(response => response.json())
  .then(data => {
    // création d'un tableau pour stocker toutes les images
    const images = [];

    // boucle sur les données reçues pour créer les éléments HTML correspondants
    data.forEach(work => {
      // création d'une div image container
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");

      // création de l'élément image
      const img = document.createElement("img");
      img.src = work.imageUrl;

      // Ajout de l'attribut data-id contenant l'ID de l'image
      img.setAttribute("data-id", work.id);
      imgContainer.appendChild(img);

      // création d'une div title
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = work.title;
      imgContainer.appendChild(title);

      // stockage des images dans le tableau images en fonction de leur catégorie
      if (work.category.name === "Objets") {
        images.push({element: imgContainer, category: "objets"});
      } else if (work.category.name === "Appartements") {
        images.push({element: imgContainer, category: "appartements"});
      } else if (work.category.name === "Hotels & restaurants") {
        images.push({element: imgContainer, category: "hotels"});
      }
    });
    
    // ajout des images à la div gallery
    const imageContainer = document.querySelector(".gallery");
    images.forEach(image => {
      imageContainer.appendChild(image.element);
    });
    
    // affichage d'un message dans la console pour indiquer que la requête et la création sont ok
    console.log("Données récupérées !");

    // création de 4 boutons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const button1 = document.createElement("button");
    button1.textContent = "Tous";
    buttonContainer.appendChild(button1);

    const button2 = document.createElement("button");
    button2.textContent = "Objets";
    buttonContainer.appendChild(button2);

    const button3 = document.createElement("button");
    button3.textContent = "Appartements";
    buttonContainer.appendChild(button3);

    const button4 = document.createElement("button");
    button4.textContent = "Hôtels & restaurants";
    buttonContainer.appendChild(button4);

    // ajout des boutons à la div "bouton-filtre"
    const boutonFiltre = document.querySelector(".bouton-filtre");
    boutonFiltre.appendChild(buttonContainer);

    // filtre
    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach(button => {
      button.addEventListener("click", function(event) {
        event.preventDefault(); 

        // suppression de toutes les images de la galerie
        imageContainer.innerHTML = "";

        // ajout des images en fonction de la catégorie sélectionnée
        if (button.textContent === "Tous") {
          images.forEach(image => {
            imageContainer.appendChild(image.element);
          });
        } else if (button.textContent === "Objets") {
          images.filter(image => image.category === "objets").forEach(image => {
            imageContainer.appendChild(image.element);
          });
        } else if (button.textContent === "Appartements") {
          images.filter(image => image.category === "appartements").forEach(image => {
            imageContainer.appendChild(image.element);
          });
          } else if (button.textContent === "Hôtels & restaurants") {
            images.filter(image => image.category === "hotels").forEach(image => {
              imageContainer.appendChild(image.element);
            });
          }
  
          // ajout de la classe "active" au bouton cliqué
          buttons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
        });
      });
    });
  
