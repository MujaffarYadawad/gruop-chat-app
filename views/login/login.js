const url = `http://localhost:3000`;

async function login(event) {
  console.log('funciton login')
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  const loginObj = {
    email: email,
    password: password
  }
  
  try {
    const res = await (`${url}/login/loginUser`, loginObj);
    console.log(res);

  } catch (err) {
    console.log(err)
  }

}