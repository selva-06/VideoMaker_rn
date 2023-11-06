/* eslint-disable prettier/prettier */
export const setListData = data => ({
  type: 'SET_LIST_DATA',
  payload: data,
});

export const fetchListData = () => ({
  type: 'FETCH_LIST_DATA',
});
