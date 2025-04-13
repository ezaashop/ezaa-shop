// utils/formatApiError.ts
export const formatApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return {
      status: error.response.status,
      message:
        error.response.data?.message || "Something went wrong on the server",
    };
  } else if (error.request) {
    // No response from server
    return {
      status: null,
      message: "No response from server.",
    };
  } else {
    // Other errors
    return {
      status: null,
      message: error.message || "Something went wrong.",
    };
  }
};
