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
      imgContainer.classList.add("image-container");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      imgContainer.appendChild(img);
      // création d'une div title
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = work.title;
      imgContainer.appendChild(title);
      // stockage des image dans le tableau images en fonction de sa cat
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
    // mesage pour indiquée que la requête et la création son ok dans la console nav
    console.log("Données récupérées !");
    // Création de 4 Boutons
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

    const boutonFiltre = document.querySelector(".bouton-filtre");
    boutonFiltre.appendChild(buttonContainer);

    // ajout de filtre
    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach(button => {
      button.addEventListener("click", function() {
        // suppression de toutes les images de la galerie
        imageContainer.innerHTML = "";
        // ajout des images en fonction de la catégorie 
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
      });
    });
  });

