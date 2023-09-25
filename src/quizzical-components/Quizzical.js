import React from "react";
import QuizzicalMain from "./QuizzicalMain.js";
import Quiz from "./Quiz.js";

export default function Quizzical(props) {
  const [quizData, setQuizData] = React.useState([]);
  const [startQuiz, setStartQuiz] = React.useState(true);
  const [formData, setFormData] = React.useState({
    numberOfQuestions: 0,
    selectCategory: "",
    selectDifficulty: "",
  });

  React.useEffect(() => {
    let apiUrl;
    if (startQuiz === false) {
      // Construct the base URL
      if (formData.numberOfQuestions) {
        apiUrl = `https://opentdb.com/api.php?amount=${formData.numberOfQuestions}`;
      }
      // Add category parameter if it's selected
      if (formData.selectCategory) {
        apiUrl += `&category=${formData.selectCategory}`;
      }

      // Add difficulty parameter if it's selected
      if (formData.selectDifficulty) {
        apiUrl += `&difficulty=${formData.selectDifficulty}`;
      }

      console.log(apiUrl);
      if (apiUrl) {
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            // Shuffle the answers for each question
            const shuffledData = data.results.map((question) => {
              const allAnswers = [
                ...question.incorrect_answers,
                question.correct_answer,
              ];
              const correctAnswerIndex = Math.floor(
                Math.random() * allAnswers.length
              );
              const correctAnswer = allAnswers[correctAnswerIndex];
              allAnswers[correctAnswerIndex] =
                allAnswers[allAnswers.length - 1];
              allAnswers[allAnswers.length - 1] = correctAnswer;
              return {
                ...question,
                answers: allAnswers,
              };
            });
            setQuizData(shuffledData);
          });
      }
    }
  }, [startQuiz]);

  function handleStartButton() {
    setStartQuiz((quizStatus) => !quizStatus);
  }

  console.log(formData);

  return (
    <main>
      {startQuiz ? (
        <QuizzicalMain
          handleClick={handleStartButton}
          // handleFormChange={handleFormChange}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <Quiz darkName={props.darkName} quizData={quizData} handleClick={handleStartButton} />
      )}
    </main>
  );
}
