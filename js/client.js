const socket=io("http://localhost:8000",{transports: ['websocket']});
const form =document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const container = document.querySelector('.container');
var audio=new Audio('../ping.mp3');
const append=(message,position,info)=>{
    const msgElement =document.createElement("div");
    const msg =document.createElement("p");
    const time =new Date().toLocaleTimeString();
    // time.innerText =;
    msgElement.innerHTML =`${message}<br><span id="time">${time}</span>`;
   
    if(position==='left'){
        audio.play();
    }
    
    msgElement.classList.add(position);
    if(info==true){
        msgElement.classList.add('info');

    }
    else{
        msgElement.classList.add('message');

    }
    // msgElement.appendChild(time);
    container.appendChild(msgElement);

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = messageInput.value;
    append(`You: ${msg}`,'right',false);
    socket.emit('send',msg);
    messageInput.value = '';
})
const naam=prompt("Enter your name");
socket.emit('new-user-joined',naam);
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right',true);
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message} `,'left',false);
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left',true);
})
