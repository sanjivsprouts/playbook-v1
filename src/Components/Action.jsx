import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { types } from "../FieldData";

const Action = ({
  handleCheckboxChange,
  actionData,
  handleSelectChange,
  handleSavePlaybook,
}) => {
  const navigate = useNavigate();
  return (
    <div className="action-container">
      <div className="header">
        <h1>Choose actions</h1>
      </div>
      <div className="body">
        <div>
          <input
            type="checkbox"
            value="Send to slack"
            onChange={handleCheckboxChange("sendSlackNotification")}
            checked={actionData.sendSlackNotification}
          />{" "}
          Send Slack notifications
        </div>
        <div>
          <input
            type="checkbox"
            value="Send to sequence"
            onChange={handleCheckboxChange("sendToSequence")}
            checked={actionData.sendToSequence}
          />{" "}
          Send to Sequence
          {actionData.sendToSequence && (
            <select
              onChange={handleSelectChange("sequence")}
              value={actionData.sequence}
            >
              <option value="" disabled selected>
                Select a sequence
              </option>
              {types?.data?.actions?.ADD_TO_DESTINATION?.params?.destinationId?.values?.map(
                (option) => {
                  return <option value={option}>{option}</option>;
                }
              )}
            </select>
          )}
        </div>
      </div>
      <div className="footer">
        <button
          className="b1"
          onClick={() => {
            navigate("/new-playbook/criteria");
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (actionData.sendToCampaign && !actionData.campaign) {
              toast("Please choose a campaign");
            } else if (actionData.sendToSequence && !actionData.sequence) {
              toast("Please choose a sequece");
            } else if (
              !actionData.sendSlackNotification &&
              !actionData.sendToCampaign &&
              !actionData.sendToSequence
            ) {
              toast("Please choose a action");
            } else {
              handleSavePlaybook();
              navigate("/");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Action;
