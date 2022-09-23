import '../styles/globals.css'
import 'antd/dist/antd.css';
import React, {createContext, useState} from "react";

export const DeletedCustomer = createContext(null);

function MyApp({Component, pageProps}) {
    const [deletedCustomer, setDeletedCustomer] = useState([])
    return (
        <DeletedCustomer.Provider
            value={{deletedCustomer, setDeletedCustomer}}
        >
            <Component {...pageProps} />
        </DeletedCustomer.Provider>
    )
}

export default MyApp
