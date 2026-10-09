import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate()


  
  


  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
 
  
 
  
  const [title, setTitle] = useState(localStorage.getItem("title") ?? "");



          const sendData = async (e) => {
            e.preventDefault();
              try {
                  const response = await api.post("/tasks", { title: title });
                  setMsg(response.data.message);
                } catch (error) {
                    setError(error.response?.data?.message);
                  }
                  
                }
            


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
        <form action="" method="post" onSubmit={(e) => sendData(e)}>
      <main className="flex gap-2">

        <input
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("title", e.target.value);
          }}
          value={title}
          type="text"
          name="title"
          className="placeholder-gray-300 border rounded  p-2 "
          placeholder="enter a text"
          />
        <button className="bg-blue-600 p-2 rounded text-white"  >+add</button>
      </main>
          </form>

     
        
    </div>
  );
};

export default Create;
