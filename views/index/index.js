console.log('index chats')
const url = `http://localhost:3000`;

const token = localStorage.getItem('token')
console.log('token--', token)

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
    console.log(res)
    
  } catch (err) {
    console.log(err)
    
  }
}