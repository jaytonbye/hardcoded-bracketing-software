import React from "react";
import NavigationBar from "./NavigationBar";
import AddDivisionComponent from "./AddDivisionComponent";
import EditDivisionsComponent from "./EditDivisionsComponent";

export default function Admin() {
  const [showAddDivision, setShowAddDivision] = React.useState(false);
  const [showEditDivisions, setShowEditDivisions] = React.useState(false);

  let showOrHideTheAddDivisionComponent = () => {
    setShowAddDivision(!showAddDivision);
  };
  let showOrHideTheEditDivisionsComponent = () => {
    setShowEditDivisions(!showEditDivisions);
  };

  return (
    <>
      <NavigationBar />
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheAddDivisionComponent}
      >
        Add New Division
      </button>
      <button
        className="btn btn-primary ml-2 mt-2"
        onClick={showOrHideTheEditDivisionsComponent}
      >
        Edit Divisions
      </button>
      {showAddDivision && <AddDivisionComponent />}
      {showEditDivisions && <EditDivisionsComponent />}
    </>
  );
}
