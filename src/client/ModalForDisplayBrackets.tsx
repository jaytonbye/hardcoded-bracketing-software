import React, { useReducer, useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';

export default function ModalForDisplayBrackets(props: any) {
    let bout = props.bouts[props.index];
    let BoutId = bout.id;
    console.log({ Thebout: bout });

    const [topLineWrestler, setTopLineWrestler] = useState("");
    const [bottomLineWrestler, setBottomLineWrestler] = useState("");
    const [dispatched, setDispatched] = useState("");
    const [dispatchedToMat, setDispatchedToMat] = useState("");
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");
    const [matchNumber, setMatchNumber] = useState("");
    const [round, setRound] = useState("");
    const [score, setScore] = useState("");

    // Changing the winner of x or loser of x before the result has accrued will cause the 

    const defaultStateObj = {
        topLineWrestler: "",
        bottomLineWrestler: "",
        dispatched: "",
        dispatchedToMat: "",
        winner: "",
        loser: "",
        matchNumber: "",
        round: "",
        score: ""
    }

    const [editOfBout, setEditOfBout] = useState<any>(defaultStateObj);

    const takeInTheInputs = () => {

        let theFinalEditedBout = {
            topLineWrestler,
            bottomLineWrestler,
            dispatched,
            dispatchedToMat,
            winner,
            loser,
            matchNumber,
            round,
            score
        };
        // We are fucked

        (function () {
            let arrayOfKeyValuePairs = Object.entries(theFinalEditedBout);
            arrayOfKeyValuePairs.map((keyPair, index) => {
                // See top of file for bout definition
                switch (index) {
                    case 0:
                        if (!keyPair[1]) {
                            theFinalEditedBout.topLineWrestler = bout.top_line_wrestler;
                            break;
                        } else {
                            break;
                        }
                    case 1:
                        if (!keyPair[1]) {
                            theFinalEditedBout.bottomLineWrestler = bout.bottom_line_wrestler;
                            break;
                        } else {
                            break;
                        }
                    case 2:
                        if (!keyPair[1]) {
                            theFinalEditedBout.dispatched = bout.dispatched;
                            break;
                        } else {
                            break;
                        }
                    case 3:
                        if (!keyPair[1]) {
                            theFinalEditedBout.dispatchedToMat = bout.dispatched_to_mat;
                            break;
                        } else {
                            break;
                        }
                    case 4:
                        if (!keyPair[1]) {
                            theFinalEditedBout.winner = bout.winner;
                            break;
                        } else {
                            break;
                        }
                    case 5:
                        if (!keyPair[1]) {
                            theFinalEditedBout.loser = bout.loser;
                            break;
                        } else {
                            break;
                        }
                    case 6:
                        if (!keyPair[1]) {
                            theFinalEditedBout.matchNumber = bout.match_number;
                            break;
                        } else {
                            break;
                        }
                    case 7:
                        if (!keyPair[1]) {
                            theFinalEditedBout.round = bout.round;
                            break;
                        } else {
                            break;
                        }
                    case 8:
                        if (!keyPair[1]) {
                            theFinalEditedBout.score = bout.score;
                            break;
                        } else {
                            break;
                        }

                }
            }
            )
            setEditOfBout(theFinalEditedBout);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer token`,
                },
                body: JSON.stringify(theFinalEditedBout),
            };

            fetch(`/api/bouts/`, requestOptions).then((res) => {
                if (res.ok) {

                } else {
                    alert("it didn't work! Coach Wayne Apologizes try again later");
                }
            });


        })();

    }




    const eventSubmit = (e: any) => {
        e.preventDefault();



    }


    // const requestOptions = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         // Authorization: `Bearer token`,
    //     },
    //     body: JSON.stringify({
    //         eventname: EventNames,
    //         eventdescription: EventDescriptions,
    //         eventdate: EventDates,
    //         userId: 1
    //     }),
    // };



    return (
        <Form style={{ width: "90%", border: "2px solid slateGrey", borderRadius: "5px" }} className="mx-auto bg-dark text-light mt-2 p-2">

            <Form.Group className="mb-3" >
                <Form.Label>topLineWrestler</Form.Label>
                <Form.Control onChange={(e) => setTopLineWrestler(e.target.value)} type="text" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>bottomLineWrestler</Form.Label>
                <Form.Control onChange={(e) => setBottomLineWrestler(e.target.value)} type="text" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>dispatched</Form.Label>
                <Form.Control onChange={(e) => setDispatched(e.target.value)} type="number" placeholder="0 = false 1 = true" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>dispatchedToMat</Form.Label>
                <Form.Control onChange={(e) => setDispatchedToMat(e.target.value)} type="text" placeholder="text" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>winner</Form.Label>
                <Form.Control onChange={(e) => setWinner(e.target.value)} type="text" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>loser</Form.Label>
                <Form.Control onChange={(e) => setLoser(e.target.value)} type="text" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>matchNumber</Form.Label>
                <Form.Control onChange={(e) => setMatchNumber(e.target.value)} type="text" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Round</Form.Label>
                <Form.Control onChange={(e) => setRound(e.target.value)} type="text" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Score</Form.Label>
                <Form.Control onChange={(e) => setScore(e.target.value)} type="text" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="button" onClick={takeInTheInputs}>
                Submit
            </Button>
        </Form>
    );
}

