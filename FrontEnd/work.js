// Adresse de récupération des images //
fetch("http://localhost:5678/api/works")
// Extraction des données de réponse au format JSON   
.then(response => response.json())
  .then(data => {
    const imageElements = data.map(work => {
      // création d'une div image container// 
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      imgContainer.appendChild(img);
      // création d'une div title // 
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = work.title;
      imgContainer.appendChild(title);
      return imgContainer;
    });
// Ajout des images a la div gallery // 
    const imageContainer = document.querySelector(".gallery");
    imageElements.forEach(img => {
      imageContainer.appendChild(img);
    });
// mesage pour indiquée que la requête et la création son ok dans la console nav  // 
    console.log("Données récupérées !");
  })
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
  