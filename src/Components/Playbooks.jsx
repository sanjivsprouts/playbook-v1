import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
const Playbooks = ({
  playbook,
  setPlaybook,
  updatePlaybookStatus,
  deletePlaybook,
}) => {
  const navigate = useNavigate();
  const updateStatus = (id) => {
    updatePlaybookStatus(id);
  };
  const deletePlaybookById = (id) => {
    deletePlaybook(id);
  };
  return (
    <div className="playbooks-container">
      <div className="header">
        <div className="intro">
          <h1>Playbooks</h1>
          <p>
            Assign target contacts to sequences using automated playbooks. Set
            specific criteria to match new contacts, and drag playbooks to
            prioritize their order for seamless assignment..
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/new-playbook");
          }}
        >
          <span>+</span>Create New Playbook
        </button>
      </div>
      <div className="body">
        {playbook.map((item) => {
          return (
            <div className="playbook-data">
              <div className="top">
                <div className="status">
                  <h2>{item.name}</h2>
                  {item.enabled ? (
                    <div className="state">
                      <p className="active">Active</p>
                      <button
                        onClick={() => {
                          updateStatus(item.id);
                        }}
                      >
                        Click to pause
                      </button>
                    </div>
                  ) : (
                    <div className="state">
                      <p className="paused">Paused</p>
                      <button
                        onClick={() => {
                          updateStatus(item.id);
                        }}
                      >
                        Click to activate
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className="b1"
                    onClick={() => {
                      deletePlaybookById(item.id);
                    }}
                  >
                    Delete
                  </button>{" "}
                  &nbsp;
                  <button>Edit</button>
                </div>
              </div>
              <div className="bottom">
                <p>
                  Entity type: <span>{item?.trigger?.entityType}</span> &nbsp;|
                </p>
                <p>
                  Source type: <span>{item?.trigger?.triggerType}</span> &nbsp;|
                </p>
                <p>
                  {/* Action type: <span>Actions yet to show </span> */}
                  &nbsp;|
                </p>{" "}
                <p>
                  Updated at:{" "}
                  <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                </p>{" "}
              </div>
            </div>
          );
        })}
        {playbook.length === 0 && (
          <div className="empty">
            <div>
              <SentimentDissatisfiedOutlinedIcon sx={{ fontSize: "50px" }} />
            </div>
            <h1>There are no existing playbook</h1>
            <p>
              Effortlessly assign target contacts to sequences using automated
              playbooks. Set specific criteria to match new contacts, and drag
              playbooks to prioritize their order for seamless assignment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playbooks;
