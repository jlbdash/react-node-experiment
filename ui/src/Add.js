import "./App.css";

function Movies(props) {

const onSubmit = (event) => {
    // prevent the form from doing it's normal job, we want to do everything async
    event.preventDefault();
    // make a fetch request
    fetch("http://localhost:4000/movies", {
      method: "POST",
      body: JSON.stringify(movie),
    }).then(() => {
      props.onChange();
      setMovie(defaultMovie);
    });
  };

    return (
        <>
            Add to the List!

            <form name="handlemovie" id="handlemovie" onSubmit={onSubmit}>
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
