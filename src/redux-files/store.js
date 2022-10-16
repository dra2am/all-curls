import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import { allReducers } from "../redux-files/reducers/index";

//create store
const makeStore = (context) => createStore(allReducers);

//export assembled wrapper
export const wrapper = createWrapper(makeStore);
