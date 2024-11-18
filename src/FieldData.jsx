export const types = {
  status: "success",
  data: {
    fields: {
      entityType: {
        type: "list",
        operators: ["equal", "notEqual", "in", "notIn"],
        values: ["CONTACT", "ACCOUNT", "LEAD"],
      },
      eventType: {
        type: "list",
        operators: ["equal", "notEqual", "in", "notIn"],
        values: ["ADDED", "UPDATED"],
      },
    },
    actions: {
      ADD_TO_DESTINATION: {
        type: "action",
        params: {
          destinationType: "SEQUENCE",
          destinationId: {
            type: "list",
            values: [
              "seq-001",
              "seq-002",
              "seq-003",
              "general-sequence",
              "high-priority-sequence",
            ],
          },
        },
      },
      SEND_NOTIFICATION: {
        type: "action",
        params: {
          channel: {
            type: "list",
            values: ["EMAIL", "SMS", "PUSH_NOTIFICATION"],
          },
          message: {
            type: "string",
            editable: true,
          },
        },
      },
    },
  },
};

export const fieldData = {
  source: {
    type: "list",
    operators: ["equal", "notEqual", "in", "notIn"],
    values: ["CRM", "CSV_UPLOAD", "HUBSPOT", "ANY"],
  },
  status: {
    type: "string",
    operators: ["equal", "notEqual", "exists"],
  },
  emailId: {
    type: "string",
    operators: ["equal", "notEqual", "exists", "contains", "doesNotContain"],
  },
  companyDomain: {
    type: "string",
    operators: ["equal", "notEqual", "exists", "contains", "doesNotContain"],
  },
  jobTitle: {
    type: "string",
    operators: ["equal", "notEqual", "exists", "contains", "doesNotContain"],
  },
  department: {
    type: "list",
    operators: ["equal", "notEqual", "in", "notIn"],
    values: ["Engineering", "Sales", "Marketing", "Product", "Support"],
  },
  insertedAt: {
    type: "date",
    operators: ["lessThan", "greaterThan", "in_last_x_days"],
  },
  updatedAt: {
    type: "date",
    operators: ["lessThan", "greaterThan", "in_last_x_days"],
  },
};
