const { Genre, Movie, Actor } = require("./models");

/*
  Write a function that creates a new Genre in the database
  - currently, the genre table has 3 entries: Action, Comedy, and Drama
  - add one more Genre of your choice
  - duplicate entries are not allowed (try it to learn about errors)
*/
async function insertNewGenre() {
  const newGenre = Genre.build({name: "Horror"});
  await newGenre.save();
}

/*
  Write a function that creates a new Movie in the database
  - currently, there are 5 movies
  - add one more Movie of your choice.
  - the movie CANNOT be from year 2008 (try it to learn about errors)
*/
async function insertNewMovie() {
  // const newMovie = Movie.build({title: "Movie Title", year: 2013, genreId: 2});
  // await newMovie.save();
  // From the documentation: "Sequelize provides the create method, which combines
  // the build and save methods shown above into a single method"
  const newMovie = await Movie.create({title: "Movie Title", year: 2013, genreId: 2});
}

/*
  Write a function that returns the title of the movie with ID=2
*/
function getMovieWithId2() {
  // let movie2 = await Movie.findByPk(2);
  // return movie2.year;
  return Movie.findOne({ where: {id: 2} }).then(movie2 => {
    return movie2.title;
  })
}

/*
  Write a function that returns an array of all the actor names
*/
async function getAllActors() {
 const actorObjects = await Actor.findAll();
 return actorObjects.map(actorObject => {
  return actorObject.name;
 })
}

/*
  Write a function that returns an array of all the movie titles from 2008
*/
async function getAllMoviesFrom2008() {

  const movieObjects = await Movie.findAll({
    where: {
      year: 2008
    }
  });
  return movieObjects.map(movieObject => {
    return movieObject.title;
  })
}

/*
  Write a function that deletes the genre you added in the first function: insertNewGenre()
*/
async function deleteGenreYouAdded() {
  const genreToDelete = await Genre.findOne({ where: {name: "Horror"} });
  await genreToDelete.destroy();
}

/*
  Write a function that associates:
  - the actor "Rosario Dawson" with the movie "Eagle Eye"
  - the actor and movie record already exist in the database
  - add the association record to the database
*/
async function associateRosarioToEagleEye() {
  const rosario = await Actor.findOne({ where: {name: 'Rosario Dawson'} });
  const eagleEye = await Movie.findOne({ where: {title: 'Eagle Eye'} });
  rosario.addMovie(eagleEye);
}

/*
  Write a function that associates:
  - the actor "Robert Downey Jr." with the movie "Tropic Thunder"
  - the actor and movie record already exist in the database
  - add the association record to the database
*/
async function associateRobertToTropicThunder() {
  const rdj = await Actor.findOne({ where: {name: 'Robert Downey Jr.'} });
  const tropicThunder = await Movie.findOne({ where: {title: 'Tropic Thunder'} });
  rdj.addMovie(tropicThunder);
}

module.exports = {
  insertNewGenre,
  insertNewMovie,
  getMovieWithId2,
  getAllActors,
  getAllMoviesFrom2008,
  deleteGenreYouAdded,
  associateRosarioToEagleEye,
  associateRobertToTropicThunder,
};
