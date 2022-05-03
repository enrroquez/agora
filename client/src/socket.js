import { io } from "socket.io-client";

export let socket;

export const init = () => {
    if (!socket) {
        socket = io.connect();

        socket.on("greeting", (data) => {
            console.log("data: ", data);
        });

        socket.on("user-click-inform", (userClick) => {
            console.log("userClick: ", userClick);
        });

        socket.on("exceptMe", (data) => {
            console.log("data: ", data);
        });

        socket.on("private", (data) => {
            console.log("data: ", data);
        });

        socket.on("bob", (data) => {
            console.log("data: ", data);
        });

        socket.emit("thanks", [
            "hey there mr server",
            "thats so nice of you",
            "im so happy to be here",
        ]);
    }
};
