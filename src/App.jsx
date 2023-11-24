import { Navbar } from "./components/Navbar";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import AddNewMovie from "./components/AddNewMovie";
import { moviesData } from "./data";
import { useState } from "react";

function App() {
  // state to manage movies to be displayed
  const [myMovies, setMyMovies] = useState(moviesData);

  // state to manage state of filter button.
  const [clearFilterBtnState, setClearFilterBtnState] = useState(false);

  // state to manage display of movies when being filtered
  const [unFiltered, setUnFiltered] = useState(myMovies);

  // This function is triggered when the clear filter button is clicked. it sets myMovies to unfiltered and sets filterBtnState to false
  const clearFilterFunc = () => {
    setMyMovies(unFiltered);
    setClearFilterBtnState(false);
  };

  // create new state variable and assign the movies to it
  return (
    <div className="mb-8">
      {/* display navbar */}

      <Navbar />

      <div className="shadow-md shadow-orange-950 sticky top-[67px] flex flex-col-reverse sm:flex-row justify-around gap-2 my-0.5 place-items-center bg-white opacity-100 z-10 py-2 rounded-br-3xl">
        {/* render & pass props to filter component */}
        <Filter
          setMyMovies={setMyMovies} // Component needs to able to setMyMovies
          myMovies={myMovies}
          clearFilterBtnState={clearFilterBtnState}
          setClearFilterBtnState={setClearFilterBtnState}
          unFiltered={unFiltered}
        />

        {/* render & pass props to AddMovie component - contains the modal and button to add new movie*/}
        <AddNewMovie
          setMyMovies={setMyMovies}
          clearFilterBtnState={clearFilterBtnState}
          setUnFiltered={setUnFiltered}
        />
      </div>

      {/* display movie list based on specified filter or no-filter */}
      {myMovies.length === 0 ? (
        <div className="text-center p-24 text-3xl shadow-orange-950">
          Search did not return any result. Try again
        </div>
      ) : (
        <MovieList myMovies={myMovies} />
      )}
    </div>
  );
}

export default App;
