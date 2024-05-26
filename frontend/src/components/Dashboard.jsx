import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { BASE_URL } from "../api";

const Dashboard = () => {
  const { reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-tasks`);
      const data = await response.data;
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/store-task`, data);
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setIsModelOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const calculateCompletedTasks = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return { totalTasks, completedTasks };
  };

  const { totalTasks, completedTasks } = calculateCompletedTasks();

  return (
    <div className="w-fit  border bg-[#fff] rounded-md px-3 shadow-lg">
      <div className="w-full border-b border-gray-200 py-4 px-3 flex items-center gap-2">
        <img src="/logo.png" className="w-[25px]" alt="" />
        <h1 className="font-medium text-[1.1rem]">Task Management</h1>
      </div>
      <div className="flex items-center mt-8 px-3 justify-between">
       <div>
       <div className="w-full flex flex-col overflow-hidden">
          <span className="text-gray-900 font-medium">Tasks completed</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">
              {completedTasks} of {totalTasks}
            </span>
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-gray-900 rounded-full"
                style={{
                  width: `${(completedTasks / (totalTasks || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
       </div>
        <button
          className="bg-[#000000] text-white w-fit p-2 px-3 rounded-md flex items-center justify-center gap-1"
          onClick={() => setIsModelOpen(true)}
        >
          <FiPlus /> Create Task
        </button>

        {isModelOpen && (
          <TaskForm
            onSubmit={handleFormSubmit}
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
          />
        )}
      </div>
      <TaskList
        isLoading={isLoading}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        fetchTasks={fetchTasks}
        tasks={tasks}
      />
    </div>
  );
};

export default Dashboard;
