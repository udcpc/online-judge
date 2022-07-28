import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    //create large text box to input text tailwind
    return (
        <div className="App">
            <h1 className="text-3xl font-bold">CPC OJ</h1>
            <input
                type="text"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
        </div>
    );
}

export default App;
