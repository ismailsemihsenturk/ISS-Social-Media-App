import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);
io.listen(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    let i = 0;
    console.log("a user connected " + i)
    i++;
    
    io.emit("welcome", "hello this is socket server!")

});