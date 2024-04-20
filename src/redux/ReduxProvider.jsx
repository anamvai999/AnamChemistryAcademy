"use client"

import { Provider } from "react-redux";
import store from "./store";

const ReduxProvider = ({ childern }) => {
    return (
        <Provider store={store} >
            {childern}
        </Provider>
    )
}

export default ReduxProvider;