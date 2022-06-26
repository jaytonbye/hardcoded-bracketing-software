import { IRegistrations } from "../registration/interfaces";

//this gets called twice for each wrestler
let dispatchedToMatMessage = (
  registrationId: string | number,
  matNumber: number | string,
  wrestler1ActualName: string,
  wrestler2ActualName: string
) => {
  if (Number(registrationId)) {
    fetch(`/api/registrations/getSingleRegistrationInfo/${registrationId}`)
      .then((res) => res.json())
      .then((res: IRegistrations[]) => {
        if (res[0]) {
          if (res[0].phone_number) {
            fetch("/api/twilio/twilioMatDispatchMessage", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                wrestlerPhoneNumber: res[0].phone_number,
                wrestlerName1: wrestler1ActualName,
                wrestlerName2: wrestler2ActualName,
                matNumber: matNumber,
              }),
            });
          } else {
            console.log("no number re: dispatch");
          }
        }
      });
  } else {
    // console.log(registrationId);
    console.log("not a wrestler to text about dispatch");
  }
};

//this gets called twice for each wrestler
let resultsMessage = (
  registrationId: number | string | any,
  winnerName: string,
  loserName: string
) => {
  if (Number(registrationId)) {
    fetch(`/api/registrations/getSingleRegistrationInfo/${registrationId}`)
      .then((res) => res.json())
      .then((res: IRegistrations[]) => {
        if (res[0]) {
          if (res[0].phone_number) {
            fetch("/api/twilio/twilioResultMessage", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                wrestlerPhoneNumber: res[0].phone_number,
                wrestlerName1Win: winnerName,
                wrestlerName2Loss: loserName,
              }),
            });
          } else {
            console.log("no number re: results");
          }
        }
      });
  } else {
    console.log("not wrestler to text about results");
  }
};

// let getRegistrationInfoForTextFunc = (registrationId: number | string) => {
//   return fetch(
//     `/api/registrations/getSingleRegistrationInfo/${registrationId}`
//   ).then((res) => res.json());
//   // .then((res: IRegistrations[]) =>{})
// };

export { dispatchedToMatMessage, resultsMessage };
