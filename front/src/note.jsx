import { useState } from "react";

const Note = () => {
  const date = new Date();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const hour = date.toLocaleTimeString("en-US", {hour : "2-digit", minute : "2-digit"});
  const [countChar, setCountChar] = useState(0);
  const [textArea, setTextArea] = useState("");
  console.log(localStorage.getItem('title'))

  return (
    <div className="m-2">
      <main>
        <input
          type="text"
          name="title"
          className="placeholder-gray-300 outline-none p-2 focus:placeholder-transparent"
          placeholder="Title"
        />
      </main>
      <section className="text-sm p-2">
        {month} {date.getDate()} {hour} |{" "}  { countChar} Characters
      </section>
      <section>
        <textarea
          onChange={(e) =>{
              setTextArea(e.target.value),
              setCountChar(e.target.value.length )
              localStorage.setItem('title', e.target.value)
            } 
        }
            
          value={textArea}
          name="body"
          id=""
          className="p-2 placeholder-gray-300 outline-none w-100 focus:placeholder-transparent"
          placeholder="Start Typing"
        ></textarea>
      </section>
    </div>
  );
};

export default Note;
