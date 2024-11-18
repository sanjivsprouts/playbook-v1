import React from "react";
import { Outlet } from "react-router-dom";

const NewPlaybook = () => {
  return (
    <div className="newPlaybook-container">
      <div className="header">
        <h1>Configure your playbook</h1>
      </div>
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default NewPlaybook;
