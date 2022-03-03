import React, { useEffect, useReducer, useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';

export default function ModalForDisplayBrackets(props: any) {
    let bout = props.bouts[props.index];
    let BoutId = bout.id;
    console.log({ Thebout: bout });

    const [topLineWrestler, setTopLineWrestler] = useState(bout.top_line_wrestler);
    const [bottomLineWrestler, setBottomLineWrestler] = useState(bout.bottom_line_wrestler);
    // You need to remove these any's and be a big boy about it
    const [dispatched, setDispatched] = useState<any>(bout.dispatched);
    const [dispatchedToMat, setDispatchedToMat] = useState<any>(bout.dispatched_to_mat);
    const [winner, setWinner] = useState(bout.winner);
    const [loser, setLoser] = useState(bout.loser);
    const [matchNumber, setMatchNumber] = useState(bout.match_number);
    const [round, setRound] = useState(bout.round);
    const [score, setScore] = useState(bout.score);

    // Changing the winner of x or loser of x before the result has accrued will cause the 

    const defaultStateObj = {
        topLineWrestler,
        bottomLineWrestler,
        dispatched,
        dispatchedToMat,
        winner,
        loser,
        matchNumber,
        round,
        score,
        userID: 1,
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
            score,
            userID: 1
        };



        useEffect(() => {
            setEditOfBout({
                topLineWrestler,
                bottomLineWrestler,
                dispatched,
                dispatchedToMat: Number(dispatchedToMat),
                winner,
                loser,
                matchNumber,
                round,
                score,
                userID: 1
            });
        }, [topLineWrestler,
            bottomLineWrestler,
            dispatched,
            dispatchedToMat,
            winner,
            loser,
            matchNumber,
            round,
            score,])
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer token`,
            },
            body: JSON.stringify(editOfBout),
        };

        fetch(`/api/bouts/${BoutId}`, requestOptions).then((res) => {
            if (res.ok) {

            } else {
                alert("it didn't work! Coach Wayne Apologizes try again later");
            }
        });



    }

    console.log(editOfBout);



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
                <Form.Control onChange={(e) => setDispatched(e.target.value)} type="number" placeholder="0 ===''  1 = true" />
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

