const apiKey = "API_KEY";
const platformId = 7; // nintendo switch platform ID
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platformId}&ordering=-rating&page_size=50&key=${apiKey}`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {

    console.log(data);
    const randomGame =
      data.results[Math.floor(Math.random() * data.results.length)];

    const gameApiUrl = `https://api.rawg.io/api/games/${randomGame.id}?key=${apiKey}`;
    fetch(gameApiUrl)
      .then((response) => response.json())
      .then((gameData) => {

        // Limiter la longueur de la description au deuxième point dans la phrase
        const firstTwoSentences =
          gameData.description_raw.substring(
            0,
            gameData.description_raw.indexOf(
              ".",
              gameData.description_raw.indexOf(".") + 1
            )
          ) + ".";
          
        document.querySelector(".gameDescription").innerHTML =
          firstTwoSentences;
      });

    const randomScreenshot =
      randomGame.short_screenshots[
        Math.floor(Math.random() * randomGame.short_screenshots.length)
      ];

      const bg123 = randomGame.background_image;

    console.log(randomGame.name);

    document.querySelector(".bgimage").innerHTML = `<img src="${bg123}" class="bgimage2" alt="background image of a video game">`;
    document.querySelector(".h1HOMEname").innerHTML = `${randomGame.name}`;

    const dispo2 = randomGame.parent_platforms.map((parent_platforms) => parent_platforms.platform.name);

    // Limiter le nombre de plateformes à 3
    const limitePlateformes = 3;
    const plateformesTronquees = dispo2.slice(0, limitePlateformes);
    
    // Vérifier si d'autres plateformes ont été omises
    const plusDePlateformes = dispo2.length > limitePlateformes;
    
    // Créer la chaîne résultante
    const resultString = plateformesTronquees.join(", ") + (plusDePlateformes ? ", ..." : "");
        const genreList = randomGame.genres.map((genre) => genre.name).join(", ");
    document.querySelector(".genre").innerHTML = `<p>Genres : ${genreList}</p>`;
    
    document.querySelector(".dispo").innerHTML = `<p>Available on : ${resultString}</p>`;

  })
  .catch((error) => {
    console.error(error);
  });

  
// article
const API_KEY = "API_KEY";
const baseUrl = "https://api.rawg.io/api";
  
let platformIdjeux = 4; // Par défaut, PC platform ID

// Fonction pour récupérer les jeux en fonction de l'ID de plateforme donné
function getGamesByPlatform(platformId) {
  fetch(`${baseUrl}/games?platforms=${platformId}&ordering=-added&page_size=20&key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const games = data.results;
      const gridParent2 = document.querySelector(".gridParent2");
      gridParent2.innerHTML = ""; // Efface les jeux existants avant d'afficher les nouveaux
      games.forEach((game) => {
        const card = createGameCard(game);
        gridParent2.appendChild(card);
      });
    })
    .catch((error) => console.log(error));
}

const selectFilter = document.getElementById("selectFilter"); 
selectFilter.addEventListener("change", function () {
  const selectedPlatform = selectFilter.value;
  if (selectedPlatform === "Playstation") {
    platformIdjeux = 187;
  } else if (selectedPlatform === "Xbox") {
    platformIdjeux = 14;
  } else if (selectedPlatform === "Nintendo") {
    platformIdjeux = 7;
  } else if (selectedPlatform === "MobileIOS") {
    platformIdjeux = 3; 
  } else if (selectedPlatform === "Android") {
    platformIdjeux = 21;
  } else {
    platformIdjeux = 4; // Par défaut, PC platform ID
  }
  // Charger les jeux en fonction de la plateforme sélectionnée
  getGamesByPlatform(platformIdjeux);
});

// Charger les jeux pour la plateforme "PC" lors du chargement initial de la page
getGamesByPlatform(platformIdjeux);


//function createGameCard
const svgplus = `<svg class="svgplus" width="64px" height="64px"
 viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="0.672" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.46997 10.74L12 14.26L15.53 10.74" stroke="#ffffff" stroke-width="0.672" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

const crossGC = `<svg class="crossGCsvg" width="64px" height="64px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

function createGameCard(game) {
  const background = game.background_image;

  // Créer l'élément image
  const img = new Image();
  img.alt = game.name;
  img.classList.add("imgcard");
  img.src = background;
  
  // Créer la div gameContainer, la card
  const div = document.createElement("div");
  div.classList.add("gameContainer");
  div.appendChild(img);

  //div ou sera stocké le nom du jeu et le svgplus
  const divline = document.createElement("div");
  divline.classList.add("line");
  divline.innerHTML = `${svgplus}`;
  div.appendChild(divline);

  // Créer l'élément h4 pour le nom du jeu
  const h5 = document.createElement("h5");
  h5.innerText = game.name;
  divline.appendChild(h5);


  const articlegl = document.querySelector(".article");
  const grandCard = document.querySelector(".grandCard");
  const svgPlus = div.querySelector(".svgplus");

  svgPlus.onclick = function () {
    const apiKey = "API_KEY";
    const gameApiUrl = `https://api.rawg.io/api/games/${game.id}?key=${apiKey}`;
    fetch(gameApiUrl)
      .then((response) => response.json())
      .then((gameData) => {
        const descriptionRaw = gameData.description_raw;
        const background = gameData.background_image;
        let genresStr2 = game.genres.map((genres) => genres.name).join(", ");
        let platformsStr = game.parent_platforms
          .map((parent_platforms) => parent_platforms.platform.name)
          .join(", ");

        grandCard.style.visibility = "visible";
        grandCard.innerHTML = ` <div class="imgbtnratGC">
    <img alt="${game.name}" class="imgcard2" src="${background}">

    <div class="icons">
    <a target="blank" href="https://www.youtube.com/results?search_query=${game.name}"><img class="yticon icon" src="imgs/yticon.png" alt=""></a>
    <a target="blank" href="https://www.twitch.tv/directory/game/${game.name}"><img class="twitchicon icon" src="imgs/twitchicon.png" alt=""></a>
    <a target="blank" href="https://kick.com/categories/games/${game.name}"><img class="kickicon icon" src="imgs/kickicon.png" alt=""></a>

      </div>
      <p class="ratingGC">${game.rating.toFixed(1)}/5</p>

      <p class="crossGC">${crossGC}</p>
      </div>
      <h1 class="GCname">${game.name}</h1>
      <p class="descGC">${descriptionRaw}</p>
      <div class="genreetdispo">
      <p class="genredispoGC">Genres : ${genresStr2}</p>
      <p class="genredispoGC">Available on : ${platformsStr}</p>
      </div>
      <div class="relupGC">
      <p class="releasedGC">Released ${new Date(game.released).toLocaleDateString()}</p>
      <p class="updatedGC">Updated ${new Date(game.updated).toLocaleDateString()}</p>
      </div>`;
      });

    document.body.style.overflowY = "hidden";
    articlegl.style.filter = "opacity(0.5)";
    
  };

  return div;
}

const articlegl = document.querySelector(".article");
const grandCard = document.querySelector(".grandCard");
const homediscover = document.querySelector(".homediscover");

grandCard.addEventListener("click", (click) => {
  document.body.style.overflowY = "scroll";
  articlegl.style.filter = "none";
  grandCard.style.visibility = "hidden";
  homediscover.style.opacity = "1";
});


