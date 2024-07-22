import { STATE_KEY } from "../constants/state";
import { defaultState } from "../state";

export const useStore = () => {
  const setupApp = () => {
    if (!localStorage.getItem(STATE_KEY)) {
      localStorage.setItem(STATE_KEY, JSON.stringify(defaultState));
    }
    return JSON.parse(localStorage.getItem(STATE_KEY));
  };
  const getStore = () => {
    return setupApp();
  };
  const getStoreItem = (item) => {
    return getStore()[item];
  };
  const saveStore = (store) => {
    localStorage.setItem(STATE_KEY, JSON.stringify(store));
  };
  return { setupApp, getStore, getStoreItem, saveStore };
};

export default useStore;
