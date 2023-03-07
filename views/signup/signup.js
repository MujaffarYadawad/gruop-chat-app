console.log('hi chats');
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
  console.log(signupDetails);
  try {
    const res = await axios.post(
      `http://localhost:3000/user/postUser`,
      signupDetails
    );
   
    if (res.data.alreadyexisting === false) {
      //if user not existed then only creat new user
      console.log("succesfully created new user");
    } else {
      throw new Error("failed to Signup , account is already exist");
    }
  } catch (err) {
    console.log(err);
    document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
}
