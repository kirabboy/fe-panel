export const convertToPercent = (part, total) => {
  if (total === 0) {
    return 0; // Avoid division by zero
  }
  return Number((part / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
};
