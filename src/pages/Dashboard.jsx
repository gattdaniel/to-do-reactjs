import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Task from "../components/TodoItem";
import Ajout from "../components/TodoForm";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Dashboard() {
  // deconnexion
  const navigate = useNavigate();
  const { Logout } = useContext(AuthContext);
  const Onsubmit = async () => {
    Logout();
    navigate("/Signup");
  };
  // state
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
      setCurrentPage(1);
    });

    return () => unsubscribe();
  }, [user]);

  // systeme de pagination
  const [currentPage, setCurrentPage] = useState(1); // page actuelle
  const tasksPerPage = 3; // nombre de tâches par page

  // Calcul des index
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  // Découper les tâches pour la page actuelle
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const addTasks = async (text) => {
    if (!user) return;
    await addDoc(collection(db, "tasks"), {
      text,
      completed: false,
      uid: user.uid,
    });
    setCurrentPage(1);
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.log("erreur de suppression:", error.message);
    }
  };
  // checkage
  const toggleCheck = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };
  // option date
  const date = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("fr-FR", options);
  return (
    <>
      <div
        className="fixed  top-0 left-0 right-0 mt-0  px-4 sm:px-6   w-full "
        style={{ backgroundColor: "rgb(168, 201, 230)" }}
      >
        {/* afficher ce message if pas de task */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">Aucune tâche trouvée</p>
        )}

        {/* Sign */}
        <div className="flex justify-end p-4">
          <button
            onClick={Onsubmit}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 text-white font-semibold rounded-full shadow-md transition duration-200 ease-in-out"
          >
            LogOut
          </button>
        </div>
        <h2 className="text-center text-sm sm:text-base mx-auto  mb-10 uppercase font-semibold">
          salut{" "}
          <span className="text-blue-500">
            {user?.displayName && user.displayName}
          </span>{" "}
          👋 ,<hr className="bordure : border-0" />
          Ready to be productive today : {formattedDate}?
        </h2>
      </div>

      <Ajout addTasks={addTasks} />
      <Task
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentTasks={currentTasks}
        tasks={currentTasks}
        deleteTask={deleteTask}
        toggleCheck={toggleCheck}
      />
    </>
  );
}
