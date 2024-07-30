import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();

  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const Content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to="/dash/notes"> View ValNote </Link>
      </p>

      <p>
        <Link to="/dash/notes/new"> Add New View ValNote </Link>
      </p>

      <p>
        <Link to="/dash/users"> View Users </Link>
      </p>

      <p>
        <Link to="/dash/users/new"> Add New User </Link>
      </p>
    </section>
  );

  return Content;
};

export default Welcome;
