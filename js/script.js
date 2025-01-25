let pageNumber = 1;
let personajesList = [];
const containerPj = document.getElementById('character-list');


window.onload = function () {
    retriveData();
};


function retriveData() {
    
    personajesList = [];

    
    fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            
            data.results.forEach(element => {
                let newPj = {
                    name: element.name,
                    species: element.species,
                    image: element.image,
                };
                personajesList.push(newPj);
            });

            
            containerPj.innerHTML = "";

            
            personajesList.forEach(item => {
                const card = document.createElement('li');
                card.innerHTML = `
                    <h2 class="nombre">${item.name}</h2>
                    <p class="especie">Species: ${item.species}</p>
                    <img class="imagen" src="${item.image}" alt="${item.name}" width="150">
                `;
                card.className = "pjInfo";
                containerPj.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con el fetch:', error);
        });
}


const nextPageButton = document.getElementById("next-page");

nextPageButton.onclick = () => {
    pageNumber++; 
    retriveData(); 
    console.log(`Página actual: ${pageNumber}`);
};
const prevPageButton = document.getElementById("prev-page");

prevPageButton.onclick = () => {
    if (pageNumber == 1 ) {console.log('pagina 0 no existe')}
    else {pageNumber--; 
        retriveData(); 
        console.log(`Página actual: ${pageNumber}`)
    };
};

