import React, { useState } from "react";
export default function BullShitComponent() {
  const [arrayOfStuff, setArrayOfStuff] = React.useState([1, 2, 3]);
  const [theText, setTheText] = useState({});

  let onChangeTextForThisDiv = (e: any) => {
    setTheText((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {arrayOfStuff.map((thing) => {
        return (
          <>
            <div>This is thing {thing}</div>
            <input
              type="text"
              onChange={onChangeTextForThisDiv}
              name={String(thing)}
            />
            <h1>You Just Typed {/*theText[thing]*/}</h1>
          </>
        );
      })}
      ;
    </div>
  );
}
