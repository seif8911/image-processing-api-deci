const gallery = document.getElementById('gallery');
const resizeForm = document.getElementById('resizeForm');
const imageNameInput = document.getElementById('imageNameInput');
const resizeResult = document.getElementById('resizeResult');

document
  .getElementById('uploadForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Image uploaded successfully');
      loadGallery();
    } else {
      alert('Failed to upload image');
    }
  });

async function loadGallery() {
  const response = await fetch('/api/images/list');
  const images = await response.json();
  gallery.innerHTML = '';
  images.forEach(image => {
    const thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('thumbnail');
    thumbnailElement.addEventListener('click', () => {
      imageNameInput.value = image; // Auto-fill the input with the selected image filename
      resizeForm.style.display = 'block';
    });
    const imgElement = document.createElement('img');
    imgElement.src = `/assets/images/full/${image}.jpg`;
    thumbnailElement.appendChild(imgElement);
    gallery.appendChild(thumbnailElement);
  });
}

resizeForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const imageName = imageNameInput.value;
  const width = document.getElementById('widthInput').value;
  const height = document.getElementById('heightInput').value;

  const response = await fetch(
    `/api/images?filename=${imageName}&width=${width}&height=${height}`
  );
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  if (response.ok) {
    resizeResult.innerHTML = `Your Resized Image is here: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;

    // Display the image itself
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    resizeResult.appendChild(imgElement);
  } else {
    resizeResult.textContent = `Failed to resize image: ${response.statusText}`;
  }
});

loadGallery();
