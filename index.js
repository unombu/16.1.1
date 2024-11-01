async function fetchAnime() {
    try {
        const response = await fetch('https://kitsu.io/api/edge/anime?filter[categories]=psychological');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response)
        
        // Convertimos la respuesta a JSON
        const data = await response.json();
        console.log(data); // Muestra los datos recibidos
        
        displayAnime(data.data); // Asegúrate de utilizar data.data para acceder a los resultados

    } catch (error) {
        console.error('Error al obtener los anime:', error);
        document.getElementById('anime').innerHTML = 'Error al cargar anime';
    }
}

function displayAnime(animeList) {
    const container = document.getElementById('anime');
    if (!animeList || animeList.length === 0) {
        container.innerHTML = 'No se encontraron animes.';
        return;
    }

    animeList.forEach(anime => {
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime-card');
        animeDiv.innerHTML = `
            <div class="card m-3" style="width: 18rem;">
                <img src="${anime.attributes.posterImage.small}" class="card-img-top" alt="ImgNotFound">
                <div class="card-body">
                    <h3 class="card-title">${anime.attributes.canonicalTitle}</h3>
                    <p class="card-text">${anime.attributes.synopsis || 'No hay sinopsis disponible.'}</p>
                    <p class="card-text muted">Fecha de lanzamiento: ${anime.attributes.startDate || 'Fecha no disponible'}</p>
                </div>
            </div>
        `;
        container.appendChild(animeDiv);
    });
}

fetchAnime();