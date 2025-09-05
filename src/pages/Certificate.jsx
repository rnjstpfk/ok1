// src/pages/Certificate.jsx
import React from "react";
import "./Certificate.scss"; 
import certImg from "../assets/OkDrugsGummyCOA.avif";

export default function Certificate() {
  return (
    <div className="certificate-page">
      {/* <h1>Certificate of Analysis</h1> */}
      <div className="certificate-wrapper">
        <img src={certImg} alt="Certificate of Analysis" />
      </div>
    </div>
  );
}
