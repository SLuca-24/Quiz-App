import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/quiz.css';
import './css/index.css';


function App() {

  interface CheckboxState {
    id: number;
    correctAnswer: string;
  }



const initialCheckboxState: CheckboxState[] = [
  { id: 1, correctAnswer: "q1" },
  { id: 2, correctAnswer: "q4" },
  { id: 3, correctAnswer: "q3" },
  { id: 4, correctAnswer: "q4" },
  { id: 5, correctAnswer: "q4" },
  { id: 6, correctAnswer: "q3" },
  { id: 7, correctAnswer: "q1" },
  { id: 8, correctAnswer: "q4" },
  { id: 9, correctAnswer: "q4" },
  { id: 10, correctAnswer: "q1" },
];




  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars




  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuizIndex(currentQuizIndex + 1);
  };




  const nextQuiz = () => {
    if (!checkedItems) {
      alert('Check at least one checkbox');
      return;
    }
    checkAnswer();
    if (currentQuizIndex < initialCheckboxState.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCheckedItems(null);
    }
  };

  

  const checkAnswer = () => {
    const currentQuestion = initialCheckboxState.find(
      (item) => item.id === currentQuizIndex
    );
    if (currentQuestion) {
      if (currentQuestion.correctAnswer === checkedItems) {
        setCorrectAnswers((prev) => prev + 1);
        console.log("esatto");
      } else {
        setWrongAnswers((prev) => prev + 1);
        console.log("sbagliato");
      }
    }
  };
  
  

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setCheckedItems(name);
  };

 


  const finishQuiz = () => {
    checkAnswer();
    setQuizFinished(true);
  };



  const scoreMessage = () => {
    if (correctAnswers === 10) {
      return <div>Congratulations,<br />You guessed all the quiz, you are a genius<br/>
      <div className="progress">
      <div className="progress-bar-good" style={{ width: '100%' }} data-progress="100%"></div>
     </div>
     </div>;
    } else if (correctAnswers === 9) {
      return <div>Well done,<br />You guessed 9 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-good" style={{ width: '90%' }} data-progress="100%"></div>
     </div>
      </div>;

    } else if (correctAnswers === 8) {
      return <div>Great job,<br />You guessed 8 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-good" style={{ width: '80%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 7) {
      return <div>Good effort,<br />You guessed 7 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-intermediate" style={{ width: '70%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 6) {
      return <div>Nice try,<br />You guessed 6 out of 10
      <div className="progress">
      <div className="progress-bar-intermediate" style={{ width: '60%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 5) {
      return <div>Not bad,<br />You guessed 5 out of 10
            <div className="progress">
      <div className="progress-bar-intermediate" style={{ width: '50%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 4) {
      return <div>Almost there,<br />You guessed 4 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-intermediate" style={{ width: '40%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 3) {
      return <div>Room for improvement,<br />You guessed 3 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-bad" style={{ width: '30%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 2) {
      return <div>Needs work,<br />You guessed 2 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-bad" style={{ width: '20%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 1) {
      return <div>Better luck next time,<br />You guessed 1 out of 10<br/>
      <div className="progress">
      <div className="progress-bar-bad" style={{ width: '10%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    } else if (correctAnswers === 0) {
      return <div>What a shame,<br />You did not guess any of the questions<br/>
      <div className="progress">
      <div className="progress-bar-bad" style={{ width: '0%' }} data-progress="100%"></div>
     </div>
      </div>;
      
    }
    return <h1>Error</h1>;
  };



  const scoreLevel = () => {
    if (correctAnswers >= 8 && correctAnswers <= 10) {
    return <div className='level-div'>Your level is: Master</div>;
    } else if (correctAnswers >= 4 && correctAnswers <= 7) {
      return <div className='level-div'>Your level is: Intermediate </div>;
    } else if (correctAnswers >= 0 && correctAnswers <= 3) {
      return <div className='level-div'>Your level is: Base </div>;
    } 
    return <h1>Error</h1>;
  };




  useEffect(() => {
    const body = document.body;
    if (quizFinished) {
      if (correctAnswers >= 8) {
        body.style.background = 'linear-gradient(to bottom, black 0%, black 20%, #2ecc71 100%)';
      } else if (correctAnswers >= 4) {
        body.style.background = 'linear-gradient(to bottom, black 0%, black 20%, #f39c12 100%)';
      } else {
        body.style.background = 'linear-gradient(to bottom, black 0%, black 20%, #a83232 100%)';
      }
    }
    return () => {
      body.style.background = '';
    };
  }, [correctAnswers, quizFinished]);




  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuizIndex(0);
    setCheckedItems(null);
    setQuizFinished(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };


  

  return (
    <>
    {!quizStarted && currentQuizIndex === 0 && (
      <div className="presentation-div">
        <h1>Welcome to the Sustainable Fashion Quiz! 🌿</h1>
        <h3>Sustainable fashion aims to reduce environmental impact and promote ethics in the clothing industry. This quiz will test your knowledge on eco-friendly materials, ethical practices, and sustainable innovations. Good luck!</h3>
        <button onClick={startQuiz}>Start the quiz!</button>
      </div>
    )}

    {currentQuizIndex === 1 &&(
      <div className='quiz-div'>
        <h1 className='question'>Q1: What is a key principle of sustainable fashion?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Reducing waste and pollution</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Following fast fashion trends</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Using synthetic fibers exclusively</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Increasing production speed</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    {currentQuizIndex === 2 && (
      <div className='quiz-div'>
        <h1 className='question'>Q2: Which material is considered more sustainable?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Organic cotton</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Polyester</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Rayon</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Acetate</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    {currentQuizIndex === 3 && (
      <div className='quiz-div'>
        <h1 className='question'>Q3: What is "slow fashion"?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Fashion that emphasizes quality and durability</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Fashion that follows the latest trends quickly</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Fashion that promotes seasonal collections</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Fashion that focuses on mass production</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    {currentQuizIndex === 4 && (
      <div className='quiz-div'>
        <h1 className='question'>Q4: Which practice is essential for ethical fashion?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Fair wages and safe working conditions</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Fast production cycles</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Using non-renewable resources</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Overproduction</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    { currentQuizIndex === 5 &&(
      <div className='quiz-div'>
        <h1 className='question'>Q5: What is a circular economy in fashion?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Recycling and reusing materials to extend product life</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Using only new materials for every product</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Producing disposable garments</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Maximizing resource extraction</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    {currentQuizIndex === 6 &&(
      <div className='quiz-div'>
        <h1 className='question'>Q6: What does "ethical fashion" focus on?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Respect for human rights and the environment</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>High production volumes</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Promoting overconsumption</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Utilizing harmful chemicals</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    {currentQuizIndex === 7 &&(
      <div className='quiz-div'>
        <h1 className='question'>Q7: What is "upcycling" in fashion?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Transforming old materials into new, higher-quality products</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Disposing of materials after a single use</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Using only new raw materials</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Increased garment production rates</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    { currentQuizIndex === 8 &&(
      <div className='quiz-div'>
        <h1 className='question'>Q8: What role does "transparency" play in sustainable fashion?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Ensuring clear information about the production processes</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Keeping production methods secret</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Increasing the use of non-renewable resources</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Promoting fast fashion</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    { currentQuizIndex === 9 &&(
      <div className='quiz-div'>
        <h1 className='question'>Q9: What is a benefit of "buying less, choosing well"?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Reduces waste and encourages mindful consumption</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Increases the number of items purchased</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Encourages frequent wardrobe updates</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Promotes overconsumption</p>
        </div>

        <div className='next-button-div'><button className='next-button' onClick={nextQuiz}>NEXT</button></div>
      </div>
    )}

    {currentQuizIndex === 10 && !quizFinished && (
      <div className='quiz-div'>
        <h1 className='question'>Q10: What does "cradle-to-cradle" design focus on?</h1>

        <div className='answer-options'>
          <input
            type='radio'
            name='q1'
            checked={checkedItems === "q1"}
            onChange={handleCheckboxChange}
          />
          <p>Designing products for a closed-loop lifecycle</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q2'
            checked={checkedItems === "q2"}
            onChange={handleCheckboxChange}
          />
          <p>Designing for planned obsolescence</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q3'
            checked={checkedItems === "q3"}
            onChange={handleCheckboxChange}
          />
          <p>Encouraging single-use products</p>
        </div>

        <div className='answer-options'>
          <input
            type='radio'
            name='q4'
            checked={checkedItems === "q4"}
            onChange={handleCheckboxChange}
          />
          <p>Maximizing resource depletion</p>
        </div>

        <div className='next-button-div'>
          <button className='next-button' onClick={finishQuiz}>FINISH</button>
        </div>
      </div>
    )}

    {quizFinished && (
      <div className='quizfinished-div'>
        {scoreMessage()}
        {scoreLevel()}
        <button className='restart-button' onClick={restartQuiz}>🔄 Restart the quiz</button>
      </div>
            )}
    </>
  );
}

export default App;
