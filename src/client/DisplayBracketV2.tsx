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

  return false ? (
    <h1>Ladder Bracket</h1>
  ) : (
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
      <div className="div-for-bracket_header-and-full_bracket">
        <div className="bracket_header">
          <h5 className="round_name round-title-div text-center">Round 12</h5>
          <h5 className="round_name round-title-div text-center">Round 10</h5>
          <h5 className="round_name round-title-div text-center">Round 9</h5>
          <h5 className="round_name round-title-div text-center">Round 7</h5>
          <h5 className="round_name round-title-div text-center">Round 6</h5>
          <h5 className="round_name round-title-div text-center">Round 4</h5>
          <h5 className="round_name round-title-div text-center">Round 3</h5>
          <h5 className="round_name round-title-div text-center">
            Round-1 (round of 32)
          </h5>
          <h5 className="round_name round-title-div text-center">
            Round-2 (round of 16)
          </h5>
          <h5 className="round_name round-title-div text-center">
            Round-5 (quarter finals)
          </h5>
          <h5 className="round_name round-title-div text-center">
            Round-8 (semi finals)
          </h5>
          <h5 className="round_name round-title-div text-center">
            Round-11 (finals)
          </h5>
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
      </div>
    </>
  );
}
