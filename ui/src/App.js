import "./App.css";
import Movies from "./Add.js";
import MovieRow from "./MovieRow.js";
import Updater from "./Update.js";
import { useEffect, useState } from 'react';


function App() {
    const [selectedMovie, setSelectedMovie] = useState();
    const [movies, setMovies] = useState();


    //Effect to populate table
    useEffect(() => {
        populateMovieData();
    }, []);

    // function to gather the movie list
    async function populateMovieData() {
        const response = await fetch('http://localhost:4000/read');
        const data = await response.json();
        setMovies(data);
    }

    // makes a table of movies in the database
    const contents = movies === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        :
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Released</th>
                        <th>Rating</th>
                        <th>Changes</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => <MovieRow key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />)}
                </tbody>
            </table>
        </>
    return (
        <div className="App">
            <div id="title">
                List of Movie Recommendations
            </div>
            <header className="App-header">

                <div className="buttons">
                    <div className="App-row">
                        <div>
                            <Movies />
                        </div>
                        <div>
                            <Updater movie={selectedMovie} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="App-column">
                    The movies seen:
                    <div className="movieList">
                        {contents}
                    </div>
                </div>
            </header >
        </div >
    );

}

export default App;