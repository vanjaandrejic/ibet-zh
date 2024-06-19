export const mapQuarterToNumber = (quarter: string): string | null => {
  switch (quarter) {
    case "FIRST_QUARTER":
      return "1. čet.";
    case "SECOND_QUARTER":
      return "2. čet.";
    case "THIRD_QUARTER":
      return "3. čet.";
    case "FORTH_QUARTER":
      return "4. čet.";
    case "FIRST_SET":
      return "1. set";
    case "SECOND_SET":
      return "2. set";
    case "THIRD_SET":
      return "3. set";
    case "FORTH_SET":
      return "4. set";
    case "FIFTH_SET":
      return "5. set";

    case "PAUSE":
      return "Pauza";

    case "INTERRUPTED":
      return "Prekinuto";

    default:
      return "";
  }
};
