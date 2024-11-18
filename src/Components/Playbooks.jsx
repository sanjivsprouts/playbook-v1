import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <h1>Playbooks</h1>
        <button
          onClick={() => {
            navigate("/new-playbook");
          }}
        >
          Create new Playbook
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
      </div>
    </div>
  );
};

export default Playbooks;
