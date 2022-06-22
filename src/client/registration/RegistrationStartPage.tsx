import * as React from "react";
import NavigationBar from "../NavigationBar";
import RegistrationForm from "./RegistrationForm";

const RegistrationStartPage = () => {
  return (
    <div>
      <NavigationBar />
      <RegistrationForm isAdmin={false} />
    </div>
  );
};

export default RegistrationStartPage;
