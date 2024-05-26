import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/tasks.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
