fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    const imageElements = data.map(work => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      imgContainer.appendChild(img);
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = work.title;
      imgContainer.appendChild(title);
      return imgContainer;
    });

    const imageContainer = document.querySelector(".gallery");
    imageElements.forEach(img => {
      imageContainer.appendChild(img);
    });

    console.log("Données récupérées !");
  })
