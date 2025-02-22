import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);

// Configurar CORS para permitir el frontend en Netlify
const allowedOrigins = [
  "http://localhost:5173", // Desarrollo local
  "https://candid-strudel-51093d.netlify.app/" // Reemplázalo con tu URL de Netlify
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// Configurar WebSockets con Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Evento de conexión
io.on("connection", (socket) => {
  console.log("🟢 Un usuario conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("📩 Mensaje recibido:", data);
    io.emit("mensaje", data); // Reenviar el mensaje a todos los clientes conectados
  });

  socket.on("disconnect", () => {
    console.log("🔴 Un usuario se desconectó");
  });
});

// Configurar el puerto desde .env o usar 3001 por defecto
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
