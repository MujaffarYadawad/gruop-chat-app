const url = `http://localhost:3000`;

localStorage.clear();

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
    const userLoginRes = await axios.post(`${url}/user/postLogin`, loginObj);
    console.log(userLoginRes);
    if (userLoginRes.data.success === true) {
      localStorage.setItem("username", userLoginRes.data.data.name);
      localStorage.setItem("token", userLoginRes.data.token);
      window.location.href = "../index/index.html";
    }
  } catch (err) {
    console.log(err);
  }
}
