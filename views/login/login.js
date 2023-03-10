const url = `http://localhost:3000`;

async function login(event) {
  console.log("funciton login");
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  const loginObj = {
    email,
    password,
  };

  try {
    const res = await axios.post(`${url}/user/postLogin`, loginObj);
    console.log(res);
    if(res.data.success === true){
      localStorage.setItem("token", res.data.token);
      window.location.href = "../index/index.html";
    }
  } catch (err) {
    console.log(err);
  }
}
