import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <div className="w-100 text-light">GDP Charts</div>
    </Navbar>
  );
}

export default Header;
