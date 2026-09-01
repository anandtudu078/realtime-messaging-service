import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello leo");
// });

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Messaging service is healthy",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/conversations", conversationRoutes)
app.use("/api/v1", messageRoutes);

export default app;