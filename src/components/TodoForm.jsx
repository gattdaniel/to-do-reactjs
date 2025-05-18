import { useEffect, useRef, useState } from "react";
import Footer from "./footer";

export default function Ajout({ addTasks }) {
  const [inputValue, setInputValue] = useState("");
  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, [addTasks]);

  const ajouterTache = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addTasks(inputValue); // Firestore sera appelé ici
      setInputValue("");
    }
  };
  return (
    <>
 <div className="fixed w-full bottom-0  flex flex-col items-center space-y-1 px-4 py-2" style={{ backgroundColor: "rgb(168, 201, 230)" }}>
  {/* Bloc avec background pour l'input + bouton */}
  <div className="flex w-full max-w-xl  justify-center items-center space-x-2  px-4 py-2 rounded shadow-md" style={{ backgroundColor: "rgb(168, 201, 230)" }}>
    <input
      type="text"
      ref={input}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          ajouterTache(e);
        }
      }}
      placeholder=" + create new task"
      className="text-black px-4 py-2 rounded-full "
    />
    <button
      className="bg-blue-400 text-white px-5 py-2 whitespace-nowrap rounded hover:bg-orange-600 transition duration-300"
      onClick={ajouterTache}
    >
      ajouter
    </button>
  </div>

  {/* Footer sans background */}
  <div className="text-sm text-gray-600">
    <Footer />
  </div>
</div>

    </>
  );
}
