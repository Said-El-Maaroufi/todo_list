import { useEffect, useState } from "react";
import api from "../api/axios";

const Create = () => {
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const date = new Date();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const hour = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [countChar, setCountChar] = useState(
    localStorage.getItem("textArea").length,
  );
  const [textArea, setTextArea] = useState(
    localStorage.getItem("textArea") ?? "",
  );
  const [title, setTitle] = useState(localStorage.getItem("title") ?? "");

  useEffect(() => {

    if (
      localStorage.getItem("textArea").length ||
      localStorage.getItem("title").length >= 1
    ) {
      const sendData = async () => {
        try {
          const response = await api.post("/tasks", { text: textArea });
          setMsg(response.data.message);
        } catch (error) {
          setError(error.response?.data?.message);
        }
      };
      
      sendData();
    }
  }, [textArea])

  return (
    <div className="m-2">
      {msg && (
        <div
          class="flex items-center justify-between p-4 mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm"
          role="alert"
        >
          <div class="flex items-center gap-3">
            {/* <!-- Icône Check --> */}
            <svg
              class="w-5 h-5 text-emerald-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <span class="font-semibold">{msg} !</span>
            </div>
          </div>
        </div>
      )}
      <main>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("title", e.target.value);
          }}
          value={title}
          type="text"
          name="title"
          className="placeholder-gray-300 outline-none p-2 focus:placeholder-transparent"
          placeholder="Title"
        />
      </main>
      <section className="text-sm p-2">
        {month} {date.getDate()} {hour} | {countChar} Characters
      </section>
      <section>
        <textarea
          onChange={(e) => {
            (setTextArea(e.target.value), setCountChar(e.target.value.length));
            localStorage.setItem("textArea", e.target.value);
          }}
          value={textArea}
          name="text"
          id=""
          className="p-2 placeholder-gray-300 outline-none w-100 focus:placeholder-transparent"
          placeholder="Start Typing"
        ></textarea>
      </section>
    </div>
  );
};

export default Create;
