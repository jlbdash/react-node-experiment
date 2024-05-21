import "./App.css";

function Movies() {



    return (
        <>
            Add to the List!

            <form name="handlemovie" id="handlemovie" method="POST" action="http://localhost:4000/movies">
                <label>Title: <input type="text" name="name" id="name" required /> </label> <br />
                <label>Genre: <input type="text" name="genre" id="genre" required /></label> <br />
                <label>Release Date: <input type="text" name="date" id="date" required /></label> <br />
                <label>Rating: <input type="text" name="rating" id="rating" required /></label> <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    );

}

export default Movies;
