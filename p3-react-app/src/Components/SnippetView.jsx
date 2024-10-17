import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../FirebaseConfig';
import { useParams } from "react-router";

const fetchDocument = async (id, setPost) => {
    const docRef = doc(db, "snippethistory", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setPost(docSnap.data());
    } else {
        console.log("No such document!");
    }
};

const SnippetView = () => {

    const { id } = useParams();

    const [post, setPost] = useState({
        title: "",
        snippetText: ""
    });


    useEffect(() => {
        if (id) {
            fetchDocument(id, setPost);
        }
    }, [id]);

    return (
        <div>
                    <h1 className="snippet-view">{post.title}</h1>
                    <p  className="snippet-view">{post.snippetText}</p>
        </div>
    )

}

export default SnippetView;