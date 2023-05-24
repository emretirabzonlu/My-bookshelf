import React from "react";
import Header from "../components/Header";

import { useSelector } from "react-redux";
import ListBooks from "../components/ListBooks";

const HomePage=()=>{
    const {booksState,categoriesState} = useSelector(state=>state)
    

    return(
        <div>
            <Header/>
            <ListBooks/>
        </div>
    )
}

export default HomePage