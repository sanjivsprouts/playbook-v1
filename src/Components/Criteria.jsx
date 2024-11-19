import React from "react";
import { fieldData } from "../FieldData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AlignVerticalCenterOutlinedIcon from "@mui/icons-material/AlignVerticalCenterOutlined";
import PlaylistRemoveOutlinedIcon from "@mui/icons-material/PlaylistRemoveOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";
const Criteria = ({
  addNewRuleset,
  rulesets,
  addCriteria,
  deleteRuleset,
  handleField1Change,
  handleField2Change,
  getField2Options,
  selectionRange,
  handleField3Change,
  removeCriterion,
}) => {
  const navigate = useNavigate();
  return (
    <div className="criteria-container">
      <div className="header">
        <div>
          <h1>Set up Criteria</h1>
          <p>
            Provide some rulesets for comparing between playbooks | Action will
            trigger if one of the ruleset matches
          </p>
        </div>
        <button onClick={addNewRuleset}>
          {" "}
          <InsightsOutlinedIcon />
          Add new Ruleset
        </button>
      </div>
      <div className="body">
        {rulesets.map((ruleset, idx) => (
          <React.Fragment key={ruleset.id}>
            <div className="ruleset">
              <div className="head">
                <div className="upper">
                  <h4>
                    <AlignHorizontalLeftOutlinedIcon />
                    Ruleset ({idx + 1})
                  </h4>
                  <span>Select some criteria</span>
                </div>
                <div className="btn-grp">
                  <button
                    onClick={() => addCriteria(ruleset.id)}
                    className="b1"
                  >
                    <AlignVerticalCenterOutlinedIcon /> Add Criteria
                  </button>
                  <button
                    onClick={() => deleteRuleset(ruleset.id)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                    className="delete"
                  >
                    <PlaylistRemoveOutlinedIcon />
                    Delete Ruleset
                  </button>
                </div>
              </div>
              <div className="criteria-list">
                {ruleset.criteria.map((criterion) => {
                  const field1 = criterion?.field1 || "";
                  const field2 = criterion?.field2 || "";
                  const field3 = criterion?.field3 || "";

                  return (
                    <div className="criterion">
                      {/* Field 1 */}
                      <select
                        value={field1}
                        onChange={(e) =>
                          handleField1Change(
                            ruleset.id,
                            criterion.id,
                            e.target.value
                          )
                        }
                        className="input-field"
                      >
                        <option value="">Select Field</option>
                        {Object.keys(fieldData).map((fieldKey) => (
                          <option key={fieldKey} value={fieldKey}>
                            {fieldKey}
                          </option>
                        ))}
                      </select>

                      {/* Field 2 */}
                      <select
                        value={field2}
                        onChange={(e) =>
                          handleField2Change(
                            ruleset.id,
                            criterion.id,
                            e.target.value
                          )
                        }
                        disabled={!field1}
                        className="input-field"
                      >
                        <option value="">Select Condition</option>
                        {field1 &&
                          fieldData[field1]?.operators.map((operator) => (
                            <option key={operator} value={operator}>
                              {operator}
                            </option>
                          ))}
                      </select>

                      {/* Field 3 */}
                      {field1 === "source" && field2 !== "exists" && (
                        <select
                          value={field3}
                          onChange={(e) =>
                            handleField3Change(
                              ruleset.id,
                              criterion.id,
                              e.target.value
                            )
                          }
                          className="input-field"
                          disabled={!field2}
                        >
                          <option value="">Select Option</option>
                          {field1 &&
                            fieldData[field1]?.values.map((operator) => (
                              <option key={operator} value={operator}>
                                {operator}
                              </option>
                            ))}
                        </select>
                      )}
                      {field1 === "department" && field2 !== "exists" && (
                        <select
                          value={field3}
                          onChange={(e) =>
                            handleField3Change(
                              ruleset.id,
                              criterion.id,
                              e.target.value
                            )
                          }
                          disabled={!field2}
                          className="input-field"
                        >
                          <option value="">Select Option</option>
                          {field1 &&
                            fieldData[field1]?.values.map((operator) => (
                              <option key={operator} value={operator}>
                                {operator}
                              </option>
                            ))}
                        </select>
                      )}
                      {fieldData[field1]?.type === "date" &&
                        field2 === "in_last_x_days" && (
                          <div>
                            <input
                              value={field3}
                              type="number"
                              className="input-field"
                              onChange={(e) =>
                                handleField3Change(
                                  ruleset.id,
                                  criterion.id,
                                  e.target.value
                                )
                              }
                              disabled={!field2}
                            />
                          </div>
                        )}
                      {fieldData[field1]?.type === "date" &&
                        field2 !== "in_last_x_days" && (
                          <div>
                            <input
                              value={field3}
                              className="input-field"
                              type="date"
                              onChange={(e) =>
                                handleField3Change(
                                  ruleset.id,
                                  criterion.id,
                                  e.target.value
                                )
                              }
                              disabled={!field2}
                            />
                          </div>
                        )}
                      {field1 !== "source" &&
                        field1 !== "department" &&
                        fieldData[field1]?.type !== "date" &&
                        field2 !== "exists" && (
                          <div>
                            <input
                              className="input-field"
                              value={field3}
                              disabled={!field2}
                              type="text"
                              onChange={(e) =>
                                handleField3Change(
                                  ruleset.id,
                                  criterion.id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        )}
                      {field2 === "exists" && (
                        <select
                          value={field3}
                          onChange={(e) =>
                            handleField3Change(
                              ruleset.id,
                              criterion.id,
                              e.target.value
                            )
                          }
                          className="input-field"
                          disabled={!field2}
                        >
                          <option value="">Select Option</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      )}
                      {/* Remove Criterion */}
                      <button
                        onClick={() =>
                          removeCriterion(ruleset.id, criterion.id)
                        }
                        style={{
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: 500,
                          color: "white",
                          width: "30px",
                          height: "34px",
                          background: "red",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ))}
        {rulesets.length === 0 && (
          <div className="empty">
            <h1>
              <NotificationsActiveOutlinedIcon />
              No ruleset defined yet
            </h1>
            <p>Please add some ruleset</p>
          </div>
        )}
      </div>
      <div className="footer">
        <button
          className="b1"
          onClick={() => {
            navigate("/new-playbook/name");
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (rulesets.length === 0) {
              toast("Please provide atleast one ruleset");
            } else if (
              rulesets.find((item) => {
                return item.criteria.length === 0;
              })
            ) {
              toast("Please define the ruleset");
            } else if (
              rulesets.find((item) => {
                return item.criteria.find((ele) => {
                  return !ele.field1 || !ele.field2 || !ele.field3;
                });
              })
            ) {
              toast("Please fill the criteria");
            } else {
              navigate("/new-playbook/action");
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Criteria;
