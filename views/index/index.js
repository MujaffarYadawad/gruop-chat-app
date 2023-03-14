//console.log('index chats')

 
const url = `http://localhost:3000`;


const token = localStorage.getItem('token')
//console.log('token--', token)
  //const parentNode = document.getElementById("chatMsg");


     

window.addEventListener("DOMContentLoaded",   getMsg)

async function showMsgOnScreen(data) {
  //   console.log('data', data )
  //  for (const key in data) {
  //   // console.log( data[key].message);
  //    let i = data[key].message;
  //    console.log(i)
  //      const parentNode = document.getElementById("chat-msg");
  //      const childHTML = `<li class="chat-msg-li">${i}</li>`;
  //      parentNode.innerHTML += childHTML;
  //  }
  //  const parentNode = document.getElementById("chatMsg");
  //  parentNode.innerHTML = " ";

  // const chatMsgLi = document.createElement("li");
  // chatMsgLi.classList.add("chat-msg-li");
  // chatMsgLi.textContent = data.message;
  // parentNode.appendChild(chatMsgLi);

  const parentNode = document.getElementById("chatMsg");
  const childHTML = `<li class="chat-msg-li">${data.message}</li>`;
  parentNode.innerHTML= parentNode.innerHTML + childHTML;
}

async function getMsg(){
  //console.log(parentNode);
   
   try {
   
     const res = await axios.get(`${url}/message/getMessage`, {
       headers: { Authorization: token },
     });

     console.log("getMessges-->", res);
     

     for (let i = 0; i < res.data.length; i++) {
       showMsgOnScreen(res.data[i]);
     }
   } catch (err) {
     console.log(err);
   }
 
}

async function sendMessage(event){
  console.log('index ffunct')
  event.preventDefault();
  const msg = event.target.message.value;
  const msgs = {
    msg: msg
  }
  try {
    const res = await axios.post(`${url}/message/postMessage`, msgs, 
    { headers: { Authorization: token } 
  })
   event.target.message.value = ""; 
    console.log(res)
     

  } catch (err) {
    console.log(err)
    
  
}
}

 setInterval(()=> {
    const parentNode = document.getElementById("chatMsg");
    parentNode.innerHTML = " ";
   getMsg()
 }, 3000)
 








 