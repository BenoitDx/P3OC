
fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
   
    const imageUrls = data.map(work => work.imageUrl);

    const imageElements = imageUrls.map(url => {
      const img = document.createElement("img");
      img.src = url;
      return img;
    });

    const imageContainer = document.querySelector(".gallery");
    imageElements.forEach(img => {
      imageContainer.appendChild(img);
    });
  })
  .catch(error => console.error(error));