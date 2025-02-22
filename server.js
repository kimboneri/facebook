import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://pruebafbhhr.netlify.app", // Cambia esto por tu dominio frontend
    methods: ["GET", "POST"]
  }
});

// Middleware CORS para otras rutas de la API
app.use(cors({
  origin: "https://pruebafbhhr.netlify.app"
}));

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("mensaje", data); // Reenvía a todos los clientes conectados
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
