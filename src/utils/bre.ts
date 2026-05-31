export const checkEligibility = ({
  dob,
  salary,
  pan,
  employmentMode,
}: {
  dob: string;
  salary: number;
  pan: string;
  employmentMode: string;
}) => {

  const age =
    new Date().getFullYear() -
    new Date(dob).getFullYear();

  if (age < 23 || age > 50) {
    return {
      success: false,
      message: "Age must be between 23 and 50",
    };
  }

  if (salary < 25000) {
    return {
      success: false,
      message: "Salary must be at least 25000",
    };
  }

  const panRegex =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan)) {
    return {
      success: false,
      message: "Invalid PAN",
    };
  }

  if (employmentMode === "UNEMPLOYED") {
    return {
      success: false,
      message: "Applicant cannot be unemployed",
    };
  }

  return {
    success: true,
  };
};