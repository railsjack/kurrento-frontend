export const createTypes = (typePrefix: string) => ({
  INITIAL: `${typePrefix}_INITIAL`,
  DOING: `${typePrefix}_DO`,
  SUCCESS: `${typePrefix}_SUCCESS`,
  FAILED: `${typePrefix}_FAILED`,
});

export const createAction = (type: string, args: any) => ({
  ...args,
  type,
});

export const transformNetworkError = (error: any) => {
  if (!error.response) {
    return {
      status: 404,
      statusText: error.message,
    };
  }
  return {
    status: error.response.status,
    statusText: error.response.statusText,
  };
};
