//console.log('index chats')

const url = `http://localhost:3000`;


const token = localStorage.getItem('token')
//console.log('token--', token)
 
window.addEventListener("DOMContentLoaded",  () =>  {
  getMsg();

})

// getmsgs
async function getMsg(){
     const parentNode = document.getElementById("chatMsg");
     parentNode.innerHTML = " ";
   
      
    const msgArray = JSON.parse(localStorage.getItem("msgs"))
    // console.log(msgArray)
     if(!msgArray){
          try {
            const res = await axios.get(`${url}/message/getMessage`, {
              headers: { Authorization: token },
            });

            console.log(res);
            const response = res.data.slice( res.data.length - 10, res.data.length); // slice will take top 10 elment 0r recennt 0r last 10
            console.log(response);
            const messages = JSON.stringify(response);
            console.log(messages);
            localStorage.setItem("msgs", messages);

            for (let i = 0; i < res.data.length; i++) {
              showMsgOnScreen(res.data[i]);
            }
            
          } catch (err) {
            console.log(err);
          }
  
      }
      else{
         for (let i = 0; i < msgArray.length; i++) {
              showMsgOnScreen( msgArray[i]);
      }
   }
}

// alll msg , insures new msg will get
async function allMsgs() {
  try {
    const oldMsgArray = JSON.parse(localStorage.getItem("msgs"));
    console.log(oldMsgArray)
    const lastMsgId = oldMsgArray[oldMsgArray.length - 1].id  || 0;
    
    console.log(lastMsgId)

      const res = await axios.get(`${url}/message/getMessage?id=${lastMsgId}`, { headers: { Authorization: token } });
    console.log(res.data);
    const allMsgs = oldMsgArray.concat(res.data);
    console.log(allMsgs);
    if (allMsgs.length > 10) {
      const msgToSaveInLs = allMsgs.slice(allMsgs.length - 10, allMsgs.length);
      localStorage.setItem("msgs", JSON.stringify(msgToSaveInLs));
    } else {
      localStorage.setItem("msgs", JSON.stringify(allMsgs));
    }

    getMsg();
  } catch (err) {
    console.log(err);
  }
}

// send msg
async function sendMessage(event){
  
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
    console.log(res);

   allMsgs();
 

  } catch (err) {
    console.log(err)
  
}
}

// show msgs on screen
 async function showMsgOnScreen(data) {
   const parentNode = document.getElementById("chatMsg");
   const childHTML = `<li class="chat-msg-li">${data.name}: ${data.message}</li>`;
   parentNode.innerHTML = parentNode.innerHTML + childHTML;
 }
 








 