import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on("connection", (socket) => {
    console.log('a user connected');
    socket.broadcast.emit("chat", "new user joined");
    socket.on("chat", (payload) => {
        console.log("Received message:", payload);
        io.emit("chat", { message: payload.message });
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
