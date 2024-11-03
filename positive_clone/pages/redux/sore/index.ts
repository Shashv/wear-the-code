import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers";
const store = configureStore({
    reducer: reducer
});
export default store;
export type IState = ReturnType<typeof store.getState>;
export type IDispatch = typeof store.dispatch;
//Return type keyword is the keyword used to return the type on the basis of the function runtime , not as static fixed runtime

//Redux create store from the api provides the getState , subscribe , dispatch , since redux provide the enhancers to customize the store's dispatch , subscribe , and getstate methods , it acts as the protective layer around the store , since which acts as the protective layer around the store , but most of the time we want dispatch to be customized only rather than whole getstate and dispatch methods , we can use dispatch to customize the asyncgrounousity of the dispatch methods , by using the middleware acts as the top of the enhanceers built in with redux...
//incase of the memoru allocation for the variable in the javascript generally declare the variable ,only  as it will initialize the memory for it, even if we dont declare it..
//the main difference between java and the javascript is that , it is the looselY type langauge , not strictly type like java because in js the variables can store any type of the data , regardless of the mentioning the datatype , where as in the java the variable declarations needs to be mentioned ..