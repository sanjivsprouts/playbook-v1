import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { types, fieldData } from "../FieldData";
import { toast } from "react-toastify";

const NameEntity = ({
  formNameEntityState,
  updateNameEntityFormState,
  setNameEntityFormState,
  handleNameEntityCriterionChange,
}) => {
  const navigate = useNavigate();
  return (
    <div className="name-entity-container">
      <div className="body">
        <div className="name-section">
          <p>Name the playbook</p>
          <input
            type="text"
            className="input-field"
            placeholder="Eg: ICP Fit"
            value={formNameEntityState.playbookName}
            onChange={(e) =>
              updateNameEntityFormState("playbookName", e.target.value)
            }
          />
        </div>
        <div className="entity-section">
          <div className="sub-section">
            <p>Select Entity Type</p>
            <select
              className="input-field"
              value={formNameEntityState.entityType}
              onChange={(e) =>
                updateNameEntityFormState("entityType", e.target.value)
              }
            >
              <option value="">Select Entity Type</option>
              {types?.data?.fields?.entityType?.values?.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="sub-section">
            <p>Select Source Type</p>
            <select
              className="input-field"
              value={formNameEntityState.sourceType}
              onChange={(e) =>
                updateNameEntityFormState("sourceType", e.target.value)
              }
            >
              <option value="">Select Source Type</option>
              {types?.data?.fields?.eventType?.values?.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="sub-section">
            <button
              onClick={() => {
                const newCriterion = {
                  id: Date.now(),
                  field1: "",
                  field2: "",
                  field3: "",
                };
                setNameEntityFormState((prev) => ({
                  ...prev,
                  criteria: [...prev.criteria, newCriterion],
                }));
              }}
              className="add-criterion-button"
            >
              Add Criterion
            </button>
          </div>
        </div>
        <div className="criteria-list">
          {formNameEntityState.criteria.map((criterion) => {
            const { id, field1, field2, field3 } = criterion;
            return (
              <div className="criterion" key={id}>
                {/* Field 1 */}
                <select
                  value={field1}
                  onChange={(e) =>
                    handleNameEntityCriterionChange(
                      id,
                      "field1",
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
                    handleNameEntityCriterionChange(
                      id,
                      "field2",
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
                      handleNameEntityCriterionChange(
                        id,
                        "field3",
                        e.target.value
                      )
                    }
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
                {field1 === "department" && field2 !== "exists" && (
                  <select
                    value={field3}
                    onChange={(e) =>
                      handleNameEntityCriterionChange(
                        id,
                        "field3",
                        e.target.value
                      )
                    }
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
                          handleNameEntityCriterionChange(
                            id,
                            "field3",
                            e.target.value
                          )
                        }
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
                          handleNameEntityCriterionChange(
                            id,
                            "field3",
                            e.target.value
                          )
                        }
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
                          handleNameEntityCriterionChange(
                            id,
                            "field3",
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
                      handleNameEntityCriterionChange(
                        id,
                        "field3",
                        e.target.value
                      )
                    }
                    className="input-field"
                  >
                    <option value="">Select Option</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                )}
                {/* Remove Criterion */}
                <button
                  onClick={() =>
                    setNameEntityFormState((prev) => ({
                      ...prev,
                      criteria: prev.criteria.filter(
                        (criterion) => criterion.id !== id
                      ),
                    }))
                  }
                  style={{
                    padding: "10px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 500,
                    backgroundColor: "red",
                    color: "white",
                    width: "150px",
                  }}
                >
                  Remove Criterion
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <button
          className="b1"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!formNameEntityState.playbookName) {
              toast("Please name your playbook");
            }
            // else if (!formNameEntityState.entityType) {
            //   toast("Please choose an Entity type");
            // }
            else if (!formNameEntityState.sourceType) {
              toast("Please choose an Source type");
            } else if (formNameEntityState.criteria.length === 0) {
              toast("Please provide atleast one criteria");
            } else if (
              formNameEntityState.criteria.find((item) => {
                return !item.field1 || !item.field2 || !item.field3;
              })
            ) {
              toast("Please fill all the criteria");
            } else {
              navigate("/new-playbook/criteria");
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NameEntity;
