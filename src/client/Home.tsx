import * as React from "react";
import { Link } from "react-router-dom";

const Home = (props: HomeProps) => {
  return (
    <>
      <h1 className="text text-center">
        Welcome to the Simple Wrestling Backeting Software!
      </h1>
      <h2 className="text text-center">
        Brought to you by the creators of WAR Zone, the future of wrestling.
      </h2>
      <h3 className="text text-center">
        Learn more about WAR Zone at{" "}
        <a href="www.wellruntournaments.com/faq">
          www.WellRunTournaments.com/faq
        </a>
      </h3>
      <main>
        <section className="d-flex mt-4 justify-content-center">
          <div className="d-flex">
            <Link to={`/homepage`} className="mb-2 mr-2 btn btn-primary">
            View brackets as spectator
            </Link>
          </div>
          <div className="d-flex">
            <Link to={`/login`} className="mb-2 mr-2 btn btn-secondary">
              Login as admin
            </Link>
          </div>
          {/* <div className="d-flex">
            <Link to={`/createAccount`} className="mb-2 ml-2 btn btn-secondary">
              Create An Account
            </Link>
          </div> */}
        </section>
      </main>
    </>
  );
};

interface HomeProps {}

export default Home;
