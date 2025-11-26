
export const transformData = (avgTableData, parameter, keyName) => {
  const item = avgTableData?.find((d) => d.parameter === parameter);

  // If item not found or avgTableData is null/undefined, return default structure with zeros
  if (!item) {
    return {
      data: [
        { month: "Before Program", [keyName]: 0 },
        { month: "Month 1", [keyName]: 0 },
        { month: "Month 2", [keyName]: 0 },
        { month: "Month 3", [keyName]: 0 },
      ],
      percentageChange: 0
    };
  }

  const data = [
    { month: "Before Program", [keyName]: item.beforeProgramAvg || 0 },
    { month: "Month 1", [keyName]: item.month1Avg || 0 },
    { month: "Month 2", [keyName]: item.month2Avg || 0 },
    { month: "Month 3", [keyName]: item.month3Avg || 0 },
  ];

  return {
    data,
    percentageChange: item.percentageChange || 0,
  };
};
