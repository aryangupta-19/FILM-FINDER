const key = "240e98ecc494fa2c188c7b85bb66e741"; // tmbd api key 
const baseUrl = "https://api.themoviedb.org/3";   // yeh documentation se milta hai generally 
const playBtn = document.getElementById("playBtn");

// GET GENRES (movie categories) 
const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const urlToFetch = `${baseUrl}${genreRequestEndpoint}?api_key=${key}`;

  // const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=240e98ecc494fa2c188c7b85bb66e741");
  // we are using fetch url again and again for movies genres etc..
  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse); 
      const genres = jsonResponse.genres;
      return genres;
    }
  }catch(e){
    console.error("Error in fetching genres!! " , e);
    return null;
  }
};

// const genres = getGenres();


// GET MOVIES
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie"; // endpoint changes from genreReq to discoverMovie
  const requestParams = `?api_key=${key}&with_genres=${selectedGenre}`;  // sending api key and selected genre in request
  // const urlToFetch = `${baseUrl}${discoverMovieEndpoint}?api_key=${key}&with_genres=${selectedGenre}`;
  const urlToFetch = `${baseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      // console.log(response);
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const movies = jsonResponse.results; // check response type in console and use results///
      return movies;
    }
  } catch (e) {
    // console.log(e);
    console.error("Error while finding movie... ", e);
    return null;
  }
};

// GET MOVIE INFO
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  // console.log(movieId);
  const movieEndpoint = `/movie/${movieId}`;  
  const urlToFetch = `${baseUrl}${movieEndpoint}?api_key=${key}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (e) {
    console.log(e);
  }
};

// SHOW RANDOM MOVIE
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  // now if any movies already displaying then remove it and show new movie 
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();  
  }

  const movies = await getMovies(); // awaited becoz getting info from api 
  const randomMovie = getRandomMovie(movies); // manual generation 
  const info = await getMovieInfo(randomMovie); // again from api 
  console.log(info); 
  displayMovie(info);
};

// INIT
// note getGeres returns a promise therfore .then can be implemented easily 
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;