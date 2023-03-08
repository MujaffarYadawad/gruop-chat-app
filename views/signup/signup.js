const url = `http://localhost:3000`;

async function signup(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const phonenumber = event.target.phonenumber.value;
  const password = event.target.password.value;
  
  const signupDetails = {
    name,
    email,
    phonenumber,
    password,
  };
 
  try {
    const res = await axios.post(`${url}/user/postUser`,signupDetails);
   
    if (res.data.alreadyexisting === false) {
      //if user not existed then only creat new user
      console.log("succesfully created new user");
      window.alert('Successfully User Signup')
    } else {
      window.alert("User Already Exists,Please Login")
    }
  } catch (err) {
    console.log(err);
    document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
}
