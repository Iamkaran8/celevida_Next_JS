
export const transformData = (avgTableData, parameter, keyName) => {
  const item = avgTableData.find((d) => d.parameter === parameter);
  if (!item) return { data: [], percentageChange: null };

  const data = [
    { month: "Before Program", [keyName]: item.beforeProgramAvg },
    { month: "Month 1", [keyName]: item.month1Avg },
    { month: "Month 2", [keyName]: item.month2Avg },
    { month: "Month 3", [keyName]: item.month3Avg },
  ];

  return {
    data,
    percentageChange: item.percentageChange, 
  };
};
