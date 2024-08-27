const apiKey = "42079125-1909400cd5615db78c9c2cb93";
const searchButton = document.getElementById('searchButton');
const loadMoreButton = document.getElementById('loadMoreButton');
const imageContainer = document.getElementById('imageContainer');
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

function fetchImages() {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}&image_type=photo&page=${page}&per_page=10`;
    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            console.log( data ); 
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
