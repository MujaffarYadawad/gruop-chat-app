console.log('index chats')
const url = `http://localhost:3000`;


async function sendMessage(event){
 // console.log('index ffunct')
  event.preventDefault();
  const msg = event.target.message.value;
  const msgs = {
    msg: msg
  }
  try {
    const res = await axios.post(`${url}/message/postMessage`, msgs, 
    { headers: { Authorization: token } 
  })
    console.log(res)
       
  } catch (err) {
    console.log(err)
    
  }
  
}

const token = localStorage.getItem("token");
//console.log('token--', token)

console.log("loadeing  n diom");
window.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("loadeing diom");
    const res = await axios.get(`${url}/message/getMessage`, {
      headers: { Authorization: token },
    });
   // console.log("getMessges-->", res);

    for (let i = 0; i < res.data.length; i++) {
      showMsgOnScreen(res.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});



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
       const parentNode = document.getElementById("chat-msg");
       const childHTML = `<li class="chat-msg-li">${data.message}</li>`; // if u are using above for loop then use i insted of data.message
       parentNode.innerHTML += childHTML;

}