export const dropdownConfig = [
  {
    id: "dropdown1",
    dependencies: [],
    settings: { disabled: false, enableMultiSelect: true, enableSearch: true },
    data: {
      request: {
        type: "GET",
        endpoint: "/api/v1/dropdown1",
        payload: {},
      },
      response: {
        formatter: () => [
          { id: "A", name: "Option A" },
          { id: "B", name: "Option B" },
          { id: "C", name: "Option C" },
        ],
      },
    },
  },
  {
    id: "dropdown2",
    dependencies: ["dropdown1"],
    settings: { disabled: true, enableMultiSelect: true, enableSearch: true },
    data: {
      request: {
        type: "POST",
        endpoint: "/api/v1/dropdown2",
        payload: (selectedValues) => ({ parentIds: selectedValues.dropdown1 }),
      },
      response: {
        formatter: () => [
          { id: "P", name: "Option P" },
          { id: "Q", name: "Option Q" },
          { id: "R", name: "Option R" },
        ],
      },
    },
  },
  {
    id: "dropdown3",
    dependencies: ["dropdown2"],
    settings: { disabled: true, enableMultiSelect: true, enableSearch: true },
    data: {
      request: {
        type: "POST",
        endpoint: "/api/v1/dropdown3",
        payload: (selectedValues) => ({ parentIds: selectedValues.dropdown2 }),
      },
      response: {
        formatter: (selectedValues) => {
          if (!selectedValues || selectedValues.length === 0) return [];

          const options = {
            P: [
              { id: "D", name: "Option D" },
              { id: "E", name: "Option E" },
              { id: "F", name: "Option F" },
            ],
            Q: [
              { id: "G", name: "Option G" },
              { id: "H", name: "Option H" },
              { id: "I", name: "Option I" },
            ],
            R: [
              { id: "J", name: "Option J" },
              { id: "K", name: "Option K" },
              { id: "L", name: "Option L" },
            ],
          };

          // Create a unique set of results based on selected values
          const resultSet = new Set();
          selectedValues.forEach((value) => {
            if (options[value]) {
              options[value].forEach((option) => {
                resultSet.add(JSON.stringify(option));
              });
            }
          });

          return Array.from(resultSet).map((item) => JSON.parse(item));
        },
      },
    },
  },
];
