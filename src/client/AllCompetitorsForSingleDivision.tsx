import React from "react";

export default function AllCompetitorsForSingleDivision(props: any) {
  const [
    allCompetitorsInThisDivision,
    setAllCompetitorsInThisDivision,
  ] = React.useState([]);

  let divisionID = props.divisionID;

  React.useEffect(() => {
    fetch("/boutsByEventAndDivision/:eventID&:divisionID")
      .then((res) => res.json())
      .then((results) => {
        setAllCompetitorsInThisDivision(results);
      });
  }, []);

  //   React.useEffect(()=>{
  //     for(let x=0;x<allCompetitorsInThisDivision.length;x++){
  //         if(allCompetitorsInThisDivision)
  //     }
  //   },[allCompetitorsInThisDivision])

  return (
    <>
      <h2>All competitors ordered by seed:</h2>
    </>
  );
}
