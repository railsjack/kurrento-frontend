function persistStore(state: any, payload: any) {
  return Object.assign({}, state, payload);
}

const reducer = (state = {}, {type = '', payload = null}) => {
  switch (type) {
    case 'persist/REHYDRATE':
      return persistStore(state, payload);
    default:
      return state;
  }
};

export default reducer;
