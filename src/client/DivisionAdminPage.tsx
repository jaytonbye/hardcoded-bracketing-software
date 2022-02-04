import React from "react";
import NavigationBar from "./NavigationBar";
import AddDivisionComponent from "./AddDivisionComponent";
import EditDivisionsComponent from "./EditDivisionsComponent";
import { useParams } from "react-router-dom";
import AddCompetitorsComponent from "./AddCompetitorsComponent";
import AllCompetitorsForSingleDivision from "./AllCompetitorsForSingleDivision";

export default function Admin() {
  const [
    showAddCompetitorsComponent,
    setShowAddCompetitorsComponent,
  ] = React.useState(false);

  let { divisionID } = useParams<any>();

  divisionID = Number(divisionID);

  let showOrHideTheAddCompetitorsComponent = () => {
    setShowAddCompetitorsComponent(!showAddCompetitorsComponent);
  };

  return (
    <>
      <NavigationBar />
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheAddCompetitorsComponent}
      >
        Input Competitors
      </button>
      {showAddCompetitorsComponent && (
        <AddCompetitorsComponent divisionID={divisionID} />
      )}
      <AllCompetitorsForSingleDivision divisionID={divisionID} />
    </>
  );
}
