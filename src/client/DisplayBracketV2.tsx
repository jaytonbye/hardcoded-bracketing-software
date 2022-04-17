import React, { useState } from "react";

import classNames from "classnames";

import UpdateAllByes from "./UpdateAllByes";
import SingleBoutForDisplayBracket from "./SingleBoutForDisplayBracket";
import "./PracticingWithFlexboxToDisplayTheBrackets.scss";

export default function DisplayBracket(props: any) {
  const [bouts, setBouts] = React.useState([]);
  const [dispatchToMat, setDispatchToMat] = React.useState();
  const [modalShow, setModalShow] = React.useState<any>({});

  let eventID = props.eventID;
  let divisionID = props.divisionID;

  React.useEffect(() => {
    fetch(`/api/bouts/boutsByEventAndDivision/${eventID}&${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        setBouts(results);
      });
  }, []);

  return (
    <>
      <UpdateAllByes divisionID={divisionID} eventID={eventID} />
      <h3>Brackets go here:</h3>

      {/* {bouts.map((bout, index) => {
        //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
        const cardClasses = classNames("my-2", "mx-1", "col-10", {
          "the-card-border": bout.id % 2 === 0,
          "the-card-border-black": bout.id % 2 !== 0,
        });
        return (
          <>
            <SingleBoutForDisplayBracket
              eventID={eventID}
              bout={bout}
              index={index}
              bouts={bouts}
            />
          </>
        );
      })} */}
      <div className="bracket_header">
        <h4 className="round_name round-title-div text-center">Round 12</h4>
        <h4 className="round_name round-title-div text-center">Round 10</h4>
        <h4 className="round_name round-title-div text-center">Round 9</h4>
        <h4 className="round_name round-title-div text-center">Round 7</h4>
        <h4 className="round_name round-title-div text-center">Round 6</h4>
        <h4 className="round_name round-title-div text-center">Round 4</h4>
        <h4 className="round_name round-title-div text-center">Round 3</h4>
        <h4 className="round_name round-title-div text-center">Round 1</h4>
        <h4 className="round_name round-title-div text-center">Round 2</h4>
        <h4 className="round_name round-title-div text-center">Round 5</h4>
        <h4 className="round_name round-title-div text-center">Round 8</h4>
        <h4 className="round_name round-title-div text-center">
          Round 11 (finals)
        </h4>
      </div>
      <div className="full_bracket">
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 12) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 10) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 9) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 7) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 6) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 4) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 3) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 1) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 2) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 5) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 8) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="round">
          {bouts.map((bout, index) => {
            //I'm not sure where this logic belongs. I would imagine it belongs in the SingleBoutForDisplayBracket component. Ask wc.
            const cardClasses = classNames("my-2", "mx-1", "col-10", {
              "the-card-border": bout.id % 2 === 0,
              "the-card-border-black": bout.id % 2 !== 0,
            });
            if (bout.round == 11) {
              return (
                <div>
                  <SingleBoutForDisplayBracket
                    eventID={eventID}
                    bout={bout}
                    index={index}
                    bouts={bouts}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}