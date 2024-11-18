{
      id: "1aaa2319-dede-4dd7-9a6c-05c6f7eda078",
      name: "Sequence 3 Playbook",
      version: "v1.0",
      trigger: {
        source: ["ANY"],
        entityType: "CONTACT",
        triggerType: "CONTACT_UPDATED",
      },
      criteria: {
        entityFilters: {
          status: "ACTIVE",
          emailId: {
            exists: true,
          },
        },
      },
      actions: [
        {
          type: "ADD_TO_DESTINATION",
          params: {
            destinationId: "sequence-3",
            destinationType: "SEQUENCE",
          },
        },
      ],
      priority: 3,
      enabled: true,
      createdAt: "2024-11-18T05:18:33.609Z",
      updatedAt: "2024-11-18T05:18:33.609Z",
    },
    {
      id: "d03d174b-05eb-421c-a9b2-953bc547609d",
      name: "Sequence 2 Playbook",
      version: "v1.0",
      trigger: {
        source: ["ANY"],
        entityType: "CONTACT",
        triggerType: "CONTACT_UPDATED",
      },
      criteria: {
        entityFilters: {
          status: "ACTIVE",
          emailId: {
            exists: true,
          },
          companyDomain: "example.com",
        },
      },
      actions: [
        {
          type: "ADD_TO_DESTINATION",
          params: {
            destinationId: "sequence-2",
            destinationType: "SEQUENCE",
          },
        },
      ],
      priority: 2,
      enabled: true,
      createdAt: "2024-11-18T05:18:26.075Z",
      updatedAt: "2024-11-18T05:18:26.075Z",
    },
    {
      id: "b3f52bf5-b5ef-4b9d-8c9b-c3c967a94f1e",
      name: "Sequence 1 Playbook",
      version: "v1.0",
      trigger: {
        source: ["ANY"],
        entityType: "CONTACT",
        triggerType: "CONTACT_UPDATED",
      },
      criteria: {
        entityFilters: {
          status: "ACTIVE",
          emailId: {
            exists: true,
          },
          companyDomain: "wwe.com",
        },
      },
      actions: [
        {
          type: "ADD_TO_DESTINATION",
          params: {
            destinationId: "sequence-1",
            destinationType: "SEQUENCE",
          },
        },
      ],
      priority: 1,
      enabled: true,
      createdAt: "2024-11-18T05:18:18.257Z",
      updatedAt: "2024-11-18T05:18:18.257Z",
    },