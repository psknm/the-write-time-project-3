import Timer from "./Timer";

const WritingArea = () => {

    

    return (
        <>
        <div></div>
        <label htmlFor="title">Title: </label>
        <input type="text" required></input><br/><br/>
        <div><textarea className="writing-area" rows="20" cols="100"></textarea></div>
        <button>Save</button>
        {/* add an onClick here */}
        {/* The Save button should save the snippet to localStorage */}
        <button>Reset</button>
        {/* add an onClick here */}
        {/* This button should reload the page and clear contents */}
        </>
    )
}






export default WritingArea;