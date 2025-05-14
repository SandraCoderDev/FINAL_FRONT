document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById("product-container");

    fetch('https://api.nasa.gov/planetary/apod?api_key=e261vxdzVcoNziGFLdOSH7RBabecy4sfPu3UvBBH') 
        .then(response => response.json())
        .then(data => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="productos">
                    <div class="personaje-image"> 
                        <img src="${data.url}" alt="${data.title}">
                    </div>
                    <h2 class="nombre-title"> <b> Título - </b>${data.title}</h2>
                    <p class="especie-price"> <b> Descripción - </b>${data.explanation}</p>
                    <p class="status-price"> <b> Fecha - </b>${data.date}</p>
                </div>
            `;
            productContainer.appendChild(productCard);
        })
        .catch(error => console.error('Error:', error));
});



