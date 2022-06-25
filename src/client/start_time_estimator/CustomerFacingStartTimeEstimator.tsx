import React, { useEffect, useState } from "react";

export default function CustomerFacingStartTimeEstimator(props: any) {
  const [startTimeEstimator, setStartTimeEstimator] = useState<any>();
  const [divisionsAndSize, setDivisionsAndSize] = useState();

  let eventID = props.eventID;

  useEffect(() => {
    fetch(`/api/startTimeEstimatorSettings/${eventID}`)
      .then((res) => res.json())
      .then((results) => {
        setStartTimeEstimator(results);
      });
  }, []);

  useEffect(() => {
    fetch(
      `/api/divisions/findTheNumberOfCompetitorsInEachDivisionOfAnEvent/${eventID}`
    )
      .then((res) => res.json())
      .then((results) => {
        setDivisionsAndSize(results);
      });
  }, []);

  return (
    <>
      <h3>
        IMPORTANT: These are estimates. They will change. If you follow these
        you're a fool who deserves to show up at the wrong time. I hate you for
        being illiterate.
      </h3>
    </>
  );
}
