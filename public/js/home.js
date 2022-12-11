const main = document.querySelector('.main');

fetch(
  `${genres_list_http}${new URLSearchParams({
    api_key: api_key,
  })}`
)
  .then((res) => res.json())
  .then((data) =>
    data.genres.forEach(({ id, name }) => fetchMoviesListByGenres(id, name))
  );

const fetchMoviesListByGenres = (id, genres) => {
  fetch(
    `${movie_genres_http}${new URLSearchParams({
      api_key: api_key,
      with_genres: id,
      page: Math.floor(Math.random() * 3) + 1,
    })}`
  )
    .then((res) => res.json())
    .then((data) => makeCategoryElement(`${genres}_movies`, data.results))
    .catch((err) => console.log(err));
};

const makeCategoryElement = (category, data) => {
  main.innerHTML += `
  <div class="movie-list">
  
    <button class="prev-btn">
        <img src="./public/img/prev.png" alt="previous button">
    </button>
    <h1 class="movie-category">${category.replace('_', ' ')}</h1>
    <div class="movie-container" id="${category}"></div>
    <button class="next-btn">
      <img src="./public/img/next.png" alt="next button">
    </button>
    
  </div>
  
  `;
  makeCards(category, data);
};

const makeCards = (id, data) => {
  const movieContainer = document.getElementById(id);

  data.forEach((item, i) => {
    const { backdrop_path, poster_path, title } = item;

    if (backdrop_path == null) {
      backdrop_path = poster_path;
      if (backdrop_path == null) {
        return;
      }
    }

    movieContainer.innerHTML += `
    <div class="movie">
      <img src="${img_url}${backdrop_path}" alt="poster">
      <p class="movie-title">${title}</p>
    </div>
    `;

    i == data.length - 1 ? setTimeout(() => setupScrooling(), 100) : null;
  });
};
