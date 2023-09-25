// import React, { useState } from "react";

// export default function Quiz(props) {
//   const [selectedChoices, setSelectedChoices] = useState([]);
//   const [showAnswers, setShowAnswers] = React.useState(false)
//   const [finalScore, setFinalScore] = useState(null);

//   function isChoiceSelected(questionIndex, choiceIndex) {
//     return selectedChoices[questionIndex] === choiceIndex;
//   }

//   function handleChoiceClick(questionIndex, choice) {
//     const updatedChoices = [...selectedChoices];
//     updatedChoices[questionIndex] = choice;
//     setSelectedChoices(updatedChoices);
//   }

//   function populateQuizUI() {
//     if (props.quizData) {
//       return props.quizData.map((question, index) => {
//         return (
//           <div key={index}>
//             <p>{question.question}</p>
//             <ul className="choices">
//               {question.answers.map((answer, answerIndex) => (
//                 <li
//                   onClick={() => handleChoiceClick(index, answer)}
//                   key={answerIndex}
//                   className={isChoiceSelected(index, answer) ? "selected" : ""}
//                 >
//                   {answer}
//                 </li>
//               ))}
//             </ul>
//             <hr></hr>
//           </div>
//         );
//       });
//     }
//   }

//   function checkAnswers() {
//     // setShowAnswers(prevShow => !prevShow)
//     setShowAnswers(true)
//     let correctAnswers = 0;

//     props.quizData.forEach((question, index) => {
//       const selectedAnswerIndex = selectedChoices[index];
//       const correctAnswer = question.correct_answer;
//       if (
//         selectedAnswerIndex !== undefined &&
//         selectedAnswerIndex == correctAnswer
//       ) {
//         correctAnswers++;
//       }
//     })

//     const totalQuestions = props.quizData.length;
//     const calculatedScore = (correctAnswers / totalQuestions) * 100;
//     console.log(calculatedScore);
//     setFinalScore(calculatedScore)
//   }

//   return (
//     <div className="quiz-container">
//       {populateQuizUI()}
//       <div className="btn">
//         <button className="check-answer-btn" onClick={checkAnswers}>
//           Check answers
//         </button>
//         {showAnswers && <h2>
//             Final Score = {finalScore}
//         </h2>}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import he from "he"

export default function Quiz(props) {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [scoreData, setScoreData] = useState([]);

  function isChoiceSelected(questionIndex, choiceIndex) {
    return selectedChoices[questionIndex] === choiceIndex;
  }

  function handleChoiceClick(questionIndex, choice) {
    const updatedChoices = [...selectedChoices];
    updatedChoices[questionIndex] = choice;
    setSelectedChoices(updatedChoices);
  }

  function populateQuizUI() {
    if (props.quizData) {
      return props.quizData.map((question, index) => {
        const correctAnswerIndex = question.answers.indexOf(
          question.correct_answer
        );

        const decodedQuestionText = { __html: he.decode(question.question) };

        return (
          <div key={index}>
            {/* <p>{question.question}</p> */}
            <p dangerouslySetInnerHTML={decodedQuestionText}></p>

            <ul className={"choices"+props.darkName}>
              
              {question.answers.map((answer, answerIndex) => {
                const isSelected = isChoiceSelected(index, answerIndex);
                const isCorrect = answerIndex === correctAnswerIndex;

                let className = "";
                if (showAnswers) {
                  className = isSelected? isCorrect? "correct": "wrong": "not-selected";
                } else {
                    className = isSelected? "selected" : "choices"
                }

                return (
                  <li
                    onClick={() => handleChoiceClick(index, answerIndex)}
                    key={answerIndex}
                    className={className}
                  >
                    {answer}
                  </li>
                );
              })}
            </ul>
            <hr></hr>
          </div>
        );
      });
    }
  }

  function checkAnswers() {
    setShowAnswers(true);
    const scoreArray = [];

    props.quizData.forEach((question, index) => {
      const selectedAnswerIndex = selectedChoices[index];
      const correctAnswerIndex = question.answers.indexOf(
        question.correct_answer
      );
      scoreArray.push(selectedAnswerIndex === correctAnswerIndex);
    });

    setScoreData(scoreArray);
  }

  return (
    <div className="quiz-container">
      {populateQuizUI()}
      <div className="btn">
        <button className="check-answer-btn" onClick={checkAnswers}>
          Check answers
        </button>
        <button onClick={props.handleClick} className="check-answer-btn">Start Quiz</button>
        {showAnswers && (
          <h2>
            Final Score: {scoreData.filter((correct) => correct).length} /{" "}
            {scoreData.length}
          </h2>
        )}
      </div>
    </div>
  );
}
