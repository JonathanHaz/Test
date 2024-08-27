const apiKey = "42079125-1909400cd5615db78c9c2cb93";
const searchButton = document.getElementById('searchButton');
const loadMoreButton = document.getElementById('loadMoreButton');
const imageContainer = document.getElementById('imageContainer');


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
                
                    </div>
                    <i class="fas fa-heart favorite-icon"></i>
                `;
                imageContainer.appendChild(imageCard);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}

