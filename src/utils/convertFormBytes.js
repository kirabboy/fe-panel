export const convertFromBytes = (bytes) => {
  if (typeof bytes !== "number" || bytes < 0) {
    console.error(
      "Invalid input: Expected a non-negative number, but got",
      bytes
    );
    return "0 Bytes"; // Return "0 Bytes" if input is invalid
  }

  const units = ["Bytes", "Ki", "Mi", "Gi", "Ti"];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`; // Format the result to 2 decimal places
};
