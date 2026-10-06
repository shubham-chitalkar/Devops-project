const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "student_task_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"]
});

let tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Learn Kubernetes", completed: false },
  { id: 3, title: "Practice Jenkins", completed: true }
];

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });

  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }

  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  tasks = tasks.filter((task) => task.id !== id);

  res.json({
    message: "Task deleted successfully"
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    application: "Student Task Manager",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});