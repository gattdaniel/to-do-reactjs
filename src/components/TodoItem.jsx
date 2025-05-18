import { motion } from "framer-motion";
export default function Task({
  totalPages,
  setCurrentPage,
  currentPage,
  tasks,
  deleteTask,
  toggleCheck,
}) {
  return (
    <>
      <div
        className="w-full max-w-md mx-auto mb-48 mt-52  shadow-md rounded-md p-4"
      >
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <motion.li
              key={task.id} // Utilise l'ID pour garantir que chaque tâche est unique
              className="flex justify-between items-center p-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              initial={{ opacity: 0 }} // L'élément commence avec une opacité de 0 (invisible)
              animate={{ opacity: 1 }} // L'élément devient visible avec une opacité de 1
              transition={{ duration: 1.25 }} // Animation qui dure 1.25 seconde
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCheck(index)}
                className="w-5 h-5"
              />
              <span
                className={`transition duration-100 ease-in-out ${
                  task.completed ? "text-gray-400 italic line-through" : ""
                }`}
              >
                {" "}
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-blue-400 text-white px-5 py-1 rounded hover:bg-orange-600 transition duration-300"
              >
                *
              </button>
            </motion.li>
          ))}
        </ul>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
