const msgBox = document.getElementById("msg-box");
const chatInput = document.getElementById("chat-input");
const socket = io();

const sendMessage =  (msg) => {
    if (msg.length > 0) {
        socket.emit("chat message", msg, user);
        chatInput.value = "";
    }
};
const renderMessage = (msg, user) => {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = `
        <div class="message" >
            <p class="message"><strong>${user}</strong>: ${msg}</p>
        </div>
    `;
    msgBox.appendChild(message);
    msgBox.scrollTop = msgBox.scrollHeight;
};

chatInput.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.querySelector("input").value;
    sendMessage(msg);
    chatInput.querySelector("input").value = "";
});

socket.on("chat message", (msg, user) => {
    renderMessage(msg, user);
});