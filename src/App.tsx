import React, { useEffect, useState } from "react";
import { processAnswer } from "./ProcessAnswer";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Latex from "react-latex";

import { doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import firestoreApp from "./firebase";

import logo from "./logo.svg";
import "./App.css";
type ProblemAndAnswer = {
    statementDisplay: string;
    statement: string;
    answer: string;
    data: string;
};

function App() {
    //firestore
    const db = getFirestore(firestoreApp);
    //create large text box to input text tailwind
    const [input, setInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [problemsAndAnswer, setProblemsAndAnswer] =
        useState<ProblemAndAnswer>();

    //useeffect to get data from firestore
    useEffect(() => {
        const fetchProblems = async () => {
            const docRef = doc(db, "problems", "101");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setProblemsAndAnswer(docSnap.data() as ProblemAndAnswer);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };

        fetchProblems();
    }, [db]);
    //open text file in new tab to see the data
    const openFile = () => {
        if (problemsAndAnswer?.data) {
            const file = new File([problemsAndAnswer.data], "data.txt");
            const blob = new Blob([file], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "data.txt";
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const onAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput("");
        // console.log(processAnswer(input, "Hello World"));
        if (problemsAndAnswer?.answer) {
            setIsCorrect(processAnswer(input, problemsAndAnswer.answer));
        }
    };
    const onInputChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setInput(e.target.value);
    };

    return (
        <div className="App">
            <h1 className="text-3xl font-bold">CPC OJ</h1>

            {problemsAndAnswer?.statementDisplay && (
                <ReactMarkdown
                    children={problemsAndAnswer?.statementDisplay}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                />
            )}
            <form onSubmit={onAnswerSubmit}>
                <label>
                    Your Answer
                    <textarea
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        name="Text1"
                        cols={40}
                        rows={5}
                        value={input}
                        onChange={onInputChange}
                    ></textarea>
                    <input
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        value="Submit"
                    />
                </label>
            </form>
            <div className="flex justify-center">
                <div className="bg-gray-200 text-gray-700 p-4 rounded">
                    <p>{isCorrect ? "Correct" : "Incorrect"}</p>
                </div>
                <div className="bg-blue p-2">
                    {problemsAndAnswer?.data && (
                        <button onClick={openFile}>Get Data</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
