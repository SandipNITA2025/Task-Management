import express from "express";

import TasksController from "../controllers/task.controller.js";

const router = express.Router();

router.post("/store-task", TasksController.store);
router.get("/get-tasks", TasksController.index);
router.get("/single-task/:id", TasksController.show);
router.put("/update-task/:id", TasksController.update);
router.delete("/delete-task/:id", TasksController.destroy);

export default router;
