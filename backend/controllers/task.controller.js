import { nanoid } from "nanoid";
let tasks = [];

class TasksController {
  static async index(req, res) {
    res.json(tasks);
  }

  static async store(req, res) {
    const { title, description, status, dueDate } = req.body;

    const existingTask = tasks.find((task) => task.title === title);
    if (existingTask) {
      return res.status(400).json({ message: "Title must be unique" });
    }

    const newTask = {
      id: nanoid(),
      title,
      description,
      status,
      dueDate,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }

  static async show(req, res) {
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json(task);
    }
  }

  static async update(req, res) {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, dueDate } = req.body;
    const updatedTask = tasks[taskIndex];

    if (title !== undefined) {
      updatedTask.title = title;
    }
    if (description !== undefined) {
      updatedTask.description = description;
    }``
    if (status !== undefined) {
      updatedTask.status = status;
    }
    if (dueDate !== undefined) {
      updatedTask.dueDate = dueDate;
    }

    tasks[taskIndex] = updatedTask;
    return res.json(updatedTask);
  }

  static async destroy(req, res) {
    const taskId = req.params.id;
    tasks = tasks.filter((task) => task.id !== taskId);
    res.status(204).end();
  }
}

export default TasksController;
