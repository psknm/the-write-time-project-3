import { useReducer, useEffect } from "react";
import { deleteDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const initialState = {
    snippetList: [],
    copiedText: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SNIPPETS":
            return { ...state, snippetList: action.payload };
        case "DELETE_SNIPPET":
            return {
                ...state,
                snippetList: state.snippetList.filter((snippet) => snippet.id !== action.payload)
            };
        case "COPY_SNIPPET":
            return {
                ...state,
                copiedText: action.payload
            };
        default:
            return state;
    }
};

const fetchSnippets = async (dispatch) => {
    const snippetHistoryRef = collection(db, "snippethistory");
    const data = await getDocs(snippetHistoryRef);
    dispatch({ type: "SET_SNIPPETS", payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) });
};

const History = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSnippets(dispatch);
    }, [dispatch]);

    const deleteSnippet = async (id) => {
        const snippetDoc = doc(db, "snippethistory", id);
        await deleteDoc(snippetDoc);
        dispatch({ type: "DELETE_SNIPPET", payload: id });
    };

    const viewSnippet = (id) => {
        navigate(`/snippet/${id}`);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                dispatch({ type: "COPY_SNIPPET", payload: text });
                console.log("Snippet copied to clipboard!");
            })
            .catch((error) => alert("Failed to copy snippet:", error));
    };

    return (
        <div>
            {state.snippetList.map((post) => (
                <div key={post.id} className="history-container">
                    <h1>{post.title}</h1>
                    <div>{post.snippetText}</div>
                    <br />
                    <button onClick={() => viewSnippet(post.id)}>View</button>
                    <button onClick={() => copyToClipboard(post.snippetText)}>Copy</button>
                    <button onClick={() => deleteSnippet(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default History;