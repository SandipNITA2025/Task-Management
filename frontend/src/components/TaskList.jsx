import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
import { BASE_URL } from "../api";
import { ImFileEmpty } from "react-icons/im";
import TaskForm from "./TaskForm";

const TaskList = ({
  isLoading,
  tasks,
  fetchTasks,
  isModelOpen,
  setIsModelOpen,
}) => {
  const [selectedtask, setSelectedtask] = useState(null);
  const [editingtask, setEditingtask] = useState(null);

  const actionBoxRef = useRef();

  const handleEdit = (task) => {
    setSelectedtask(task.id);
    setEditingtask(task);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/delete-task/${taskId}`);
      console.log("deleted");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionBoxRef.current &&
        !actionBoxRef.current.contains(event.target)
      ) {
        setSelectedtask(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedtask]);

  return (
    <div className="table-container mt-8 px-3 h-[450px] overflow-y-auto mb-6">
      <table className="relative">
        <thead className="sticky top-0 bg-white shadow-sm z-10">
          <tr className="text-gray-400 sticky text-start border-b">
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "170px", overflow: "hidden" }}
            >
              Task
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "260px", overflow: "hidden" }}
            >
              Description
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "180px", overflow: "hidden" }}
            >
              Status
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "180px", overflow: "hidden" }}
            >
              Due Date
            </th>

            <th
            // className="font-medium   text-start  p-3"
            // style={{ width: "10px", overflow: "hidden" }}
            ></th>
          </tr>
        </thead>

        {tasks?.length === 0 ? (
          <div className="h-full absolute w-full flex items-center justify-center top-[200px] gap-2 text-[14px] text-gray-400">
            {isLoading ? (
              <>
                <RiLoader2Line size={20} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ImFileEmpty /> No data Found
              </>
            )}
          </div>
        ) : (
          <tbody className="">
            {tasks?.map((task) => (
              <tr
                className={` ${
                  selectedtask === task.id && "bg-gray-100"
                } hover:bg-gray-100 cursor-pointer rounded-md`}
                key={task.id}
              >
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "170px", overflow: "hidden" }}
                >
                  <span className="line-clamp-1">
                  {task.title} </span >
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "260px", overflow: "hidden" }}
                >
                  <span className="line-clamp-1">{task.description}</span>
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "180px", overflow: "hidden" }}
                >
                  <span
                    className={`${
                      task.status === "Pending"
                        ? "text-orange-500"
                        : task.status === "Completed"
                        ? "text-green-500"
                        : task.status === "In progress"
                        ? "text-yellow-500"
                        : ""
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "180px", overflow: "hidden" }}
                >
                  {task.dueDate}
                </td>
                <td
                  className={`font-normal pr-4 text-gray-700   text-start  p-3 text-[15px] ${
                    (task.paymentStatus === "Pending" && "text-orange-500") ||
                    (task.paymentStatus === "Completed" && "text-green-500")
                  }`}
                  style={{ maxWidth: "150px", overflow: "hidden" }}
                >
                  {task.paymentStatus}
                </td>
                <td>
                  <div className="relative">
                    <HiOutlineDotsVertical
                      className="cursor-pointer"
                      onClick={() => setSelectedtask(task.id)}
                    />
                    {selectedtask === task.id && (
                      <div
                        ref={actionBoxRef}
                        className="absolute z-[8] right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <button
                          onClick={() => {
                            handleEdit(task), setIsModelOpen(true);
                          }}
                          className=" px-4 py-2 text-sm hover:bg-gray-100 w-full text-left flex items-center gap-1 text-gray-500"
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className=" px-4 py-2 text-sm hover:bg-gray-100 w-full text-left flex items-center gap-1 text-gray-500"
                        >
                          <MdDeleteOutline /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isModelOpen && (
        <TaskForm
          onSubmit={fetchTasks}
          setIsModelOpen={setIsModelOpen}
          initialData={editingtask}
          setEditingtask={setEditingtask}
        />
      )}
    </div>
  );
};

export default TaskList;
