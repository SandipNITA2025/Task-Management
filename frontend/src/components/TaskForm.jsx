import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../api";

const TaskForm = ({
  onSubmit,
  setIsModelOpen,
  initialData,
  setEditingtask, // Expecting this as a prop
}) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        console.log(initialData);
        await axios.put(`${BASE_URL}/update-task/${initialData.id}`, data);
        if (setEditingtask) setEditingtask(null); // Check if the function is provided
        reset();
        setIsModelOpen(false);
      } else {
        console.log(data);
        await axios.post(`${BASE_URL}/store-task`, data);
      }
      onSubmit();
      setIsModelOpen(false);
      reset();
      if (setEditingtask) setEditingtask(null); // Check if the function is provided
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/40 z-20">
      <form
        className="bg-white flex flex-col w-[390px] p-6 py-7 rounded-md gap-3 relative"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="absolute -top-2 -right-2">
          <RxCross2
            onClick={() => {
              setIsModelOpen(false);
              if (setEditingtask) setEditingtask(null);
              reset();
            }}
            className="bg-white text-red-500 rounded-full shadow-md text-xl p-[2px] cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            placeholder="Title"
            type="text"
            {...register("title", { required: true })}
            className="border border-gray-300 p-2 px-3 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label>Description</label>
          <input
            placeholder="Description"
            type="text"
            {...register("description", { required: true })}
            className="border border-gray-300 p-2 px-3 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label>Due Date</label>
          <input
            placeholder="Due Date"
            type="date"
            {...register("dueDate", { required: true })}
            className="border border-gray-300 p-2 px-3 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label>Status</label>
          <select
            className="flex-1 w-full flex gap-3 border border-gray-300 p-2 px-3 rounded-md"
            {...register("status", { required: true })}
          >
            <option value="">Select Status</option>
            <option value="In progress">In progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          className="bg-black text-white p-2 px-3 rounded-md"
          type="submit"
        >
          {initialData ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
