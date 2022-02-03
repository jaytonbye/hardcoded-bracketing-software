import React from "react";

export default function SubmitResult(props: any) {
  const [score, setScore] = React.useState("");

  let submitResult = () => {
    //This function will both submit the result (by updating the bout), but it will also update the 2 matches that are dependant upon these results.
  };
  let onScoreChange = (e: any) => {
    setScore(e.target.value);
  };

  return (
    <>
      <h1>hey</h1>
      <label>Wrestler 1 Name goes here:</label>
      <input type="radio" value="the value will go here" />
      <br />
      <label>Wrestler 2 Name goes here</label>
      <input type="radio" value="the value will go here" />
      <br />
      <label>Score: </label>
      <input type="text" onChange={onScoreChange} />
      <button onClick={submitResult} className="btn btn-primary">
        Submit Result
      </button>
    </>
  );
}
