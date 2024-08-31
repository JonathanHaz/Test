const imageContainer = document.getElementById('imageContainer');
const searchButton = document.getElementById('searchButton');
const loadMoreButton = document.getElementById('loadMoreButton');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalDetails = document.getElementById('modalDetails');
const closeModal = document.querySelector('.close');
const tags = document.querySelectorAll('.tag');

let searchTerm = '';
let page = 1;

searchButton.addEventListener('click', () => {
    searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        page = 1; 
        fetchImages();
    }
});

loadMoreButton.addEventListener('click', () => {
    page++;
    fetchImages();
});

tags.forEach(tag => {
    tag.addEventListener('click', () => {
        searchTerm = tag.getAttribute('data-tag');
        page = 1;
        fetchImages();
    });
});

//Normal Fetch
function fetchImages() {
    const url = `http://localhost:3000/api/images/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (page === 1) imageContainer.innerHTML = '';
            data.hits.forEach(hit => {
                const imageCard = document.createElement('div');
                imageCard.classList.add('image-card');
                imageCard.innerHTML = `
                    <img src="${hit.largeImageURL}" alt="${hit.tags}">
                    <div class="image-details">
                        <p><strong>Tags:</strong> ${hit.tags}</p>
                        <p><strong>User:</strong> ${hit.user}</p>
                        <p><strong>Likes:</strong> ${hit.likes}</p>
                    </div>
                    <i class="fas fa-heart favorite-icon"></i>
                `;
                imageCard.addEventListener('click', () => openModal(hit));
                imageContainer.appendChild(imageCard);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}

//Random
function fetchRandomImages() {
    const url = `http://localhost:3000/api/images/random?page=${page}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Random images data:', data);
            if (data && data.hits && Array.isArray(data.hits)) {
                if (page === 1) imageContainer.innerHTML = '';
                data.hits.forEach(hit => {
                    const imageCard = document.createElement('div');
                    imageCard.classList.add('image-card');
                    imageCard.innerHTML = `
                        <img src="${hit.largeImageURL}" alt="${hit.tags}">
                        <div class="image-details">
                            <p><strong>Tags:</strong> ${hit.tags}</p>
                            <p><strong>User:</strong> ${hit.user}</p>
                            <p><strong>Likes:</strong> ${hit.likes}</p>
                        </div>
                        <i class="fas fa-heart favorite-icon"></i>
                    `;
                    imageCard.addEventListener('click', () => openModal(hit));
                    imageContainer.appendChild(imageCard);
                });
            } else {
                console.error('Error: Unexpected data structure', data);
            }
        })
        .catch(error => console.error('Error fetching random images:', error));
}

//Modal
function openModal(imageData) {
    modal.style.display = "block";
    modalImage.src = imageData.largeImageURL;
    modalDetails.innerHTML = `
        <p><strong>Tags:</strong> ${imageData.tags}</p>
        <p><strong>User:</strong> ${imageData.user}</p>
        <p><strong>Likes:</strong> ${imageData.likes}</p>
        <p><strong>Views:</strong> ${imageData.views}</p>
        <p><strong>Downloads:</strong> ${imageData.downloads}</p>
    `;
    document.body.classList.add('no-scroll');
}

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove('no-scroll'); 
    }
});

window.addEventListener('DOMContentLoaded', () => {
    fetchRandomImages();
});
