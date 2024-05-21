import "./App.css";

function Updater(props) {
    const movie = props.movie;

    if (movie === undefined) {
        return <>
            Update a Movie!
            <form id="plainmovie" >
                <input type="hidden" name="id" id="id" value={0} />
                <label>Title: <input type="text" name="name" id="name" disabled /> </label> <br />
                <label>Genre: <input type="text" name="genre" id="genre" disabled /></label> <br />
                <label>Release Date: <input type="text" name="date" id="date" disabled /></label> <br />
                <label>Rating: <input type="text" name="rating" id="rating" disabled /></label> <br />
                <input type="submit" value="Update" disabled />
            </form>
        </>;
    }

    return (
        <>
            Update a Movie!
            <form name="updatemovie" id="updatemovie" method="POST" action="http://localhost:4000/movie/{movie.id}"  >
                <input type="hidden" name="id" id="id" value={movie.id} />
                <label>Title: <input type="text" name="name" id="name" defaultValue={movie.name} /> </label> <br />
                <label>Genre: <input type="text" name="genre" id="genre" defaultValue={movie.genre} /></label> <br />
                <label>Release Date: <input type="text" name="date" id="date" defaultValue={movie.date} /></label> <br />
                <label>Rating: <input type="text" name="rating" id="rating" defaultValue={movie.rating} /></label> <br />
                <input type="submit" value="Update" />
            </form>
        </>
    );
}

export default Updater;
