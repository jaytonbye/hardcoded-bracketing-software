import React, { useState } from "react";

import classNames from "classnames";

import UpdateAllByes from "./UpdateAllByes";
import SingleBoutForDisplayBracket from "./SingleBoutForDisplayBracket";
import "./PracticingWithFlexboxToDisplayTheBrackets.scss";

export default function DisplayBracketRoundRobin(props: any) {
  const [bouts, setBouts] = React.useState([]);
  const [dispatchToMat, setDispatchToMat] = React.useState();
  const [modalShow, setModalShow] = React.useState<any>({});
  const [
    registrationInformationForThisDivision,
    setRegistrationInformationForThisDivision,
  ] = useState<any>();
  const [bouts2, setBouts2] = useState<any[]>();

  let eventID = props.eventID;
  let divisionID = props.divisionID;

  React.useEffect(() => {
    fetch(`/api/bouts/boutsByEventAndDivision/${eventID}/${divisionID}`)
      .then((res) => res.json())
      .then((results) => {
        setBouts(results);
      });
  }, []);

  React.useEffect(() => {
    if (bouts) {
      fetch(
        `/api/registrations/getNameAndTeamNameOnly/${eventID}/${divisionID}`
      )
        .then((res) => res.json())
        .then((res) => {
          setRegistrationInformationForThisDivision(res);
        });
    }
  }, [bouts]);

  React.useEffect(() => {
    if (registrationInformationForThisDivision && bouts) {
      let theNewBoutsArray = [];
      console.log("for loop begins");
      for (let x = 0; x < bouts.length; x++) {
        theNewBoutsArray.push({
          ...bouts[x],
        });
        for (
          let y = 0;
          y < registrationInformationForThisDivision.length;
          y++
        ) {
          if (
            JSON.parse(bouts[x].bottom_line_wrestler).name ==
            registrationInformationForThisDivision[y].id
          ) {
            theNewBoutsArray[
              x
            ].bottomLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
            theNewBoutsArray[x].bottomLineWrestlersActualTeamName =
              registrationInformationForThisDivision[y].team_name;
          }
          if (
            JSON.parse(bouts[x].top_line_wrestler).name ==
            registrationInformationForThisDivision[y].id
          ) {
            theNewBoutsArray[
              x
            ].topLineWrestlersActualName = `${registrationInformationForThisDivision[y].first_name} ${registrationInformationForThisDivision[y].last_name}`;
            theNewBoutsArray[x].topLineWrestlersActualTeamName =
              registrationInformationForThisDivision[y].team_name;
          }
          if (JSON.parse(bouts[x].top_line_wrestler).name == "Bye") {
            theNewBoutsArray[x].topLineWrestlersActualName = "Bye";
            theNewBoutsArray[x].topLineWrestlersActualTeamName = "Bye";
          }
          if (JSON.parse(bouts[x].bottom_line_wrestler).name == "Bye") {
            theNewBoutsArray[x].bottomLineWrestlersActualName = "Bye";
            theNewBoutsArray[x].bottomLineWrestlersActualTeamName = "Bye";
          }
        }
      }
      console.log({ theNewBoutsArray });
      setBouts2(theNewBoutsArray);
    }
  }, [registrationInformationForThisDivision]);

  // return false ? (
  //   <h1>Round Robin Bracket</h1>
  // ) : (
  if (bouts2) {
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
        <div className="div-for-bracket_header-and-full_bracket">
          <div className="bracket_header"></div>
          <div className="full_bracket">
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 1
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 2
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 3
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 4
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 5
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 6
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="round">
              <h2
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Round 7
              </h2>
              {bouts2.map((bout, index) => {
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
                        bouts={bouts2}
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
  } else {
    return (
      <p>Wow, you found our secret super hidden hacker page. Good Stuff!</p>
    );
  }
}
