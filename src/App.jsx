import { useState, useEffect } from 'react';
import {KidNamedFinger, SaulGoodman, WalterWhite, RoofPizza, WalterFalling, GusFring, WalterCook} from "./Images/images.js";
import './App.css';

function App() {

  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageId, setImageId] = useState(0);
  const [imagesViewed, setimagesViewed] = useState([]);
  const [message, setMessage] = useState("Start Playing");

  useEffect(() => {
    getRandomImage();
  },[]);

  function getRandomImage(){
    let num = Math.ceil(Math.random() * 7);
    while(num == imageId){
      num = Math.ceil(Math.random() * 7);
    }
    if(num == 1){
      setCurrentImage(KidNamedFinger);
    }
    else if(num == 2){
      setCurrentImage(SaulGoodman);
    }
    else if(num == 3){
      setCurrentImage(WalterWhite);
    }
    else if(num == 4){
      setCurrentImage(RoofPizza);
    }
    else if(num == 5){
      setCurrentImage(WalterFalling);
    }
    else if(num == 6){
      setCurrentImage(GusFring);
    }
    else if(num == 7){
      setCurrentImage(WalterCook);
    }
    setImageId(num);
  }

  function resetGame(){
    setCurrentScore(0);
    setimagesViewed([]);
    getRandomImage();
  }

  function updateBestScore(){
    if(currentScore >= bestScore){
      setBestScore(currentScore);
    }
  }

  function updateMessage(text){
    setMessage(text);
  }

  function Check(input){
    if(imagesViewed.includes(imageId)){
      //logic for when the image has already been seen
      if(input == "Yes"){
        setCurrentScore(currentScore + 1);
        updateMessage("Correct!");
      }
      else if(input == "No"){
        updateMessage("Game Over! Try again.");
        updateBestScore();
        resetGame();
        return;
      }
    }
    else if(!imagesViewed.includes(imageId)){
      //logic for when image has not been seen yet
      if(input == "No"){
        setCurrentScore(currentScore + 1);
        updateMessage("Correct!");
      }
      else if(input == "Yes"){
        updateMessage("Game Over! Try again.");
        updateBestScore();
        resetGame();
        return;
      }
    }

    updateBestScore();

    //Win game logic
    if(currentScore >= 15){
      updateMessage("You Win! Play again?");
      resetGame();
      return;
    }

    //adding current image to viewedImages array and then changing it
    imagesViewed.push(imageId);
    getRandomImage();
  }


  return (
    <div className="App">
      <header>
        <h1>Memory Card Game</h1>
        <h2>Challenge your memory!</h2>
        <div className="scoring">
          <p>Current Score: {currentScore}</p>
          <p>Best Score: {bestScore}</p>
        </div>
        <h3 id="message">{message}</h3>
      </header>
      <main>
        <div>
          <section>
          <h3 id="buttonHeader">Have you seen this before?</h3>
          <div id="buttons">
            <button onClick={() => { Check("Yes")}}>Yes</button>
            <button onClick={() => { Check("No")}}>No</button>
          </div>
          </section>
        </div>
        <div>
          <section id="card">
            <img src={currentImage} alt="cardImage"/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
