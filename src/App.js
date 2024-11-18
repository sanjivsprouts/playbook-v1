import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playbooks from "./Components/Playbooks";
import "./Styles/index.scss";
import NewPlaybook from "./Components/NewPlaybook";
import ExPlaybook from "./Components/ExPlaybook";
import NameEntity from "./Components/NameEntity";
import Criteria from "./Components/Criteria";
import Action from "./Components/Action";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [playbook, setPlayBook] = useState([]);
  const fetchPlaybooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/playbooks?page=1&limit=10"
      );
      const data = await response.json();
      setPlayBook(data.playbooks);
    } catch (err) {
      console.error("Error fetching playbooks:", err);
    }
  };
  const updatePlaybookStatus = async (id) => {
    try {
      const url = `http://localhost:3000/api/playbooks/${id}/toggle`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchPlaybooks();
    } catch (error) {
      console.error("Error updating playbook status:", error);
    }
  };
  const deletePlaybook = async (id) => {
    try {
      const url = `http://localhost:3000/api/playbooks/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchPlaybooks();
    } catch (error) {
      console.error("Error deleting playbook:", error);
    }
  };

  useEffect(() => {
    fetchPlaybooks();
  }, []);
  const handleSavePlaybook = async () => {
    const data = {
      version: "v1.0",
      name: formNameEntityState.playbookName,
      trigger: {
        entityType: formNameEntityState.entityType,
        triggerType: formNameEntityState.sourceType,
        ...formNameEntityState?.criteria?.reduce(
          (acc, { field1, field2, field3 }) => {
            if (!acc[field1]) {
              acc[field1] = {};
            }
            acc[field1][field2] = field3;
            return acc;
          },
          {}
        ),
      },
      criteria: {
        entityFilters: {
          ...rulesets[0]?.criteria?.reduce(
            (acc, { field1, field2, field3 }) => {
              if (!acc[field1]) {
                acc[field1] = {};
              }
              acc[field1][field2] = field3;
              return acc;
            },
            {}
          ),
        },
      },
      actions: [
        actionData.sendToSequence && {
          type: "ADD_TO_DESTINATION",
          params: {
            destinationType: "SEQUENCE",
            destinationId: actionData.sequence,
          },
        },
      ],
      priority: Math.floor(Math.random() * 10),
      enabled: true,
    };

    // API call to save the playbook
    try {
      await fetch("http://localhost:3000/api/playbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchPlaybooks();
    } catch (error) {
      console.error("Error during API call:", error);
    }

    // Reset the states
    setActionData({
      sendToCampaign: false,
      campaign: null,
      sendToSequence: false,
      sequence: null,
      sendSlackNotification: false,
    });
    setFormNameEntityState({
      playbookName: "",
      entityType: "",
      sourceType: "",
      criteria: [],
    });
    setRulesets([]);
    setPlayBook((pre) => {
      return [...pre, data];
    });
  };
  // For action
  const [actionData, setActionData] = useState({
    sendToCampaign: false,
    campaign: null,
    sendToSequence: false,
    sequence: null,
    sendSlackNotification: false,
  });
  const handleCheckboxChange = (field) => (e) => {
    setActionData((prev) => ({
      ...prev,
      [field]: e.target.checked,
      ...(field === "sendToCampaign" &&
        !e.target.checked && { campaign: null }),
      ...(field === "sendToSequence" &&
        !e.target.checked && { sequence: null }),
    }));
  };
  const handleSelectChange = (field) => (e) => {
    setActionData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  // For Name Entity
  const [formNameEntityState, setFormNameEntityState] = useState({
    playbookName: "",
    entityType: "",
    sourceType: "",
    criteria: [],
  });
  const updateNameEntityFormState = (key, value) => {
    setFormNameEntityState((prev) => ({ ...prev, [key]: value }));
  };
  const handleNameEntityCriterionChange = (id, key, value) => {
    setFormNameEntityState((prev) => ({
      ...prev,
      criteria: prev.criteria.map((criterion) =>
        criterion.id === id ? { ...criterion, [key]: value } : criterion
      ),
    }));
  };
  //For Criteria
  const [rulesets, setRulesets] = useState([]);
  const addNewRuleset = () => {
    setRulesets([
      ...rulesets,
      {
        id: rulesets.length + 1,
        name: `Ruleset ${rulesets.length + 1}`,
        criteria: [],
      },
    ]);
  };
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const addCriteria = (rulesetId) => {
    setRulesets((prevRulesets) =>
      prevRulesets.map((ruleset) =>
        ruleset.id === rulesetId
          ? {
              ...ruleset,
              criteria: [
                ...ruleset.criteria,
                { id: Date.now(), field1: "", field2: "", field3: "" },
              ],
            }
          : ruleset
      )
    );
  };

  const handleField1Change = (rulesetId, criterionId, value) => {
    setRulesets((prevRulesets) =>
      prevRulesets.map((ruleset) =>
        ruleset.id === rulesetId
          ? {
              ...ruleset,
              criteria: ruleset.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? { ...criterion, field1: value, field2: "", field3: "" }
                  : criterion
              ),
            }
          : ruleset
      )
    );
  };

  const handleField2Change = (rulesetId, criterionId, value) => {
    setRulesets((prevRulesets) =>
      prevRulesets.map((ruleset) =>
        ruleset.id === rulesetId
          ? {
              ...ruleset,
              criteria: ruleset.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? { ...criterion, field2: value, field3: "" }
                  : criterion
              ),
            }
          : ruleset
      )
    );
  };

  const handleField3Change = (rulesetId, criterionId, value) => {
    setRulesets((prevRulesets) =>
      prevRulesets.map((ruleset) =>
        ruleset.id === rulesetId
          ? {
              ...ruleset,
              criteria: ruleset.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? { ...criterion, field3: value }
                  : criterion
              ),
            }
          : ruleset
      )
    );
  };

  const getField2Options = (type) => {
    switch (type) {
      case "string":
        return ["equals", "not equals"];
      case "number":
        return ["greater than", "less than", "equals", "not equals"];
      case "date":
        return ["range", "relative"];
      case "array":
        return ["contains", "does not contain"];
      case "object":
        return ["has key", "does not have key"];
      default:
        return [];
    }
  };

  const removeCriterion = (rulesetId, criterionId) => {
    setRulesets((prevRulesets) =>
      prevRulesets.map((ruleset) =>
        ruleset.id === rulesetId
          ? {
              ...ruleset,
              criteria: ruleset.criteria.filter(
                (criterion) => criterion.id !== criterionId
              ),
            }
          : ruleset
      )
    );
  };

  const deleteRuleset = (rulesetId) => {
    setRulesets((prevRulesets) =>
      prevRulesets.filter((ruleset) => ruleset.id !== rulesetId)
    );
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Playbooks
                playbook={playbook}
                setPlaybook={setPlayBook}
                updatePlaybookStatus={updatePlaybookStatus}
              />
            }
          />
          <Route path="/new-playbook" element={<NewPlaybook />}>
            <Route
              index
              element={
                <NameEntity
                  formNameEntityState={formNameEntityState}
                  handleNameEntityCriterionChange={
                    handleNameEntityCriterionChange
                  }
                  setNameEntityFormState={setFormNameEntityState}
                  updateNameEntityFormState={updateNameEntityFormState}
                />
              }
            />
            <Route
              path="name"
              element={
                <NameEntity
                  formNameEntityState={formNameEntityState}
                  handleNameEntityCriterionChange={
                    handleNameEntityCriterionChange
                  }
                  setNameEntityFormState={setFormNameEntityState}
                  updateNameEntityFormState={updateNameEntityFormState}
                />
              }
            />
            <Route
              path="criteria"
              element={
                <Criteria
                  addCriteria={addCriteria}
                  addNewRuleset={addNewRuleset}
                  deleteRuleset={deleteRuleset}
                  getField2Options={getField2Options}
                  handleField1Change={handleField1Change}
                  handleField2Change={handleField2Change}
                  handleField3Change={handleField3Change}
                  removeCriterion={removeCriterion}
                  rulesets={rulesets}
                  selectionRange={selectionRange}
                />
              }
            />
            <Route
              path="action"
              element={
                <Action
                  actionData={actionData}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSelectChange={handleSelectChange}
                  handleSavePlaybook={handleSavePlaybook}
                />
              }
            />
          </Route>
          <Route path="/ex-playbook/:id" element={<ExPlaybook />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
