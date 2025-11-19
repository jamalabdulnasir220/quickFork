import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.ts";


const app = express();

// PORT Number
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello world!!!" });
});

connectDB().then(() => {
  console.log("Database connection successful")
  app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
}).catch((error) => {
  console.log("Error connecting to the database", error)
})

