import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then(() => onDeleteQuestion(question))
  }
  function handleAnswerSelection(event) {
    console.log("Answer ID selected:", event.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: event.target.value 
      }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));
  }
 

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerSelection}>{options}</select>
      </label>
      <button className='remove' onClick={handleDeleteClick} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
