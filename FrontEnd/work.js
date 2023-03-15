const gallery = document.querySelector('.gallery');

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    data.forEach(image => {
      const figure = document.createElement('figgure');
      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.title;
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = image.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  })
  .catch(error => console.error(error));