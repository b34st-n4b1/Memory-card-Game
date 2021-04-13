import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import "./Medium.css";
import { Link } from "react-router-dom";
import { getRecords } from "../../backend/Getrecords";

const url = "https://pokeres.bastionbot.org/images/pokemon";

const Medium = () => {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  let [errScore, setErrScore] = useState(0);
  let [timeElapsed, setTimElapsed] = useState(0);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState();
  let endTime, totalTime;

  const pokemons = [
    { id: 1, name: "balbasaur" },
    { id: 8, name: "wartotle" },
    { id: 9, name: "blastoise" },
    { id: 6, name: "charizard" },
    { id: 2, name: "abc" },
    { id: 3, name: "def" },
    { id: 4, name: "ghi" },
    { id: 5, name: "jkl" },
    { id: 7, name: "mno" },
    { id: 10, name: "pqr" },
  ];

  //make pair of each component
  const pairOfPokemons = [...pokemons, ...pokemons];

  //Shuffling the cards
  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  let shuffledPokemon = useMemo(() => {
    return shuffle(pairOfPokemons);
  }, []);

  //open only that card which was matched
  useEffect(() => {
    const firstmatch = shuffledPokemon[openedCard[0]];
    const secondMatch = shuffledPokemon[openedCard[1]];

    setCount(count + 1);
    console.log("Count : ", count);
    console.log("Current Time", new Date().toLocaleTimeString());
    if (count === 1) {
      setStartTime(new Date().toLocaleTimeString());
      console.log(`Start Time : ${startTime}`);
    }
    if (secondMatch) {
      console.log(`firstMatch id ${firstmatch.id}`);
      console.log(`secondMatch id ${secondMatch.id}`);
      if (firstmatch.id === secondMatch.id) {
        console.log(`Match id: ${firstmatch.id}`);
        setMatched([...matched, firstmatch.id]);

        handleMatch();
      }
    }
    if (secondMatch && firstmatch.id !== secondMatch.id) {
      setErrScore((errScore = errScore + 1));
    }

    if (openedCard.length === 2) {
      setTimeout(() => setOpenedCard([]), 2000);
    }
  }, [openedCard]);

  const handleMatch = () => {
    console.log(`Match length : ${matched.length}`);
    if (matched.length === 9) {
      // clearInterval(countdownTimer)
      endTime = new Date().toLocaleTimeString();
      console.log(`Start Time: ${startTime}`);
      console.log(`End Time: ${endTime}`);

      if (startTime !== "" && endTime !== "") {
        totalTime = moment(endTime, "HH:mm:ss").diff(
          moment(startTime, "HH:mm:ss")
        );
        timeElapsed = totalTime / 1000;
        // console.log(`Total Time : ${timeElapsed/1000} sec`);
        setTimElapsed(timeElapsed);
        console.log(`time elapsed: ${timeElapsed}`);
      }

      setErrScore(errScore);
      setTimElapsed(timeElapsed);
      getRecords({ errScore, timeElapsed })
        .then((res) => console.log("record store Successsfully"))
        .catch((err) => console.log(err));
    }
  };

  const handleFlip = (index) => {
    // countdownTimer();
    setOpenedCard((opened) => [...opened, index]);
  };

  return (
    <div>
      <div className="header">
        <h1>Medium Level</h1>
        <Link to="/">
          <button className="btn">Main Menu</button>
        </Link>
      </div>

      {matched.length === 10 ? (
        <div className="result">
          <h3>Time Elapsed : {timeElapsed} sec</h3>
          <h3>Error Score : {errScore}</h3>
        </div>
      ) : (
        ""
      )}

      <div className="cards">
        {shuffledPokemon.map((pokemon, index) => {
          //flip the cards using flipped css
          let flipCard = false;
          let visible = false;
          if (openedCard.includes(index)) flipCard = true;

          if (matched.includes(pokemon.id)) flipCard = true;
          if (matched.includes(pokemon.id)) visible = true;
          if (matched.length === 10) flipCard = true;
          if (matched.length === 10) visible = false;

          return (
            <div
              id="startgame"
              className={`pokemon-card ${flipCard ? "flipped" : ""}`}
              key={index}
              onClick={() => handleFlip(index)}
            >
              <div className="inner">
                <div className={`front ${visible ? "visible" : ""}`}>
                  <img
                    src={`${url}/${pokemon.id}.png`}
                    alt="pokemon"
                    width="100"
                  />
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Medium;
