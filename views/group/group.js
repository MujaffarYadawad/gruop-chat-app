async function groupname(event) {
  event.preventDefault();
   const token = localStorage.getItem("token");

  const obj = {
    groupname: event.target.name.value,
  };
  console.log("new created group", obj);
  try {
   const token = localStorage.getItem("token");
    const data = await axios.post("http://localhost:3000/group/createGroup", obj, {
      headers: { Authorization: token } });
      console.log('data--',data)
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.get("http:/localhost:3000/group/allgroups", {
      headers: { Authorization: token },
    });
    console.log('resulet--', result)
    const usergroups = result.data.usergps;
    console.log('usergropus--', usergroups)
    document.getElementById("groups").innerHTML = "";
    const groupcontainer = document.getElementById("groups");

    for (let i = 0; i < usergroups.length; i++) {
      const groupdiv = document.createElement("button");
      groupdiv.innerHTML = `<p>${usergroups[i].groupname}-${usergroups[i].id}<p>`;
      groupdiv.classList.add("groupdiv");
      groupdiv.setAttribute("id", `${usergroups[i].id}`);
      groupcontainer.appendChild(groupdiv);
    }
  } catch (err) {
    console.log(err);
  }
});

const adduser = document.getElementById("adu");
adu.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const addingemail = document.getElementById("adduser").value;
  const groupid = document.getElementById("groupid").value;
  const makeadmin = document.getElementById("makeadmin").value;
  console.log(makeadmin)
  var adminright;
  if (makeadmin[0].checked) {
    adminright = "on";
  } else {
    adminright = "off";
  }
  let addusertogroup = {
    addingemail: addingemail,
    groupid: groupid,
    makeadmin: adminright,
  };
 // console.log("add", addusertogroup);
  try {
    const token = localStorage.getItem("token");
    const result = await axios.post(
      "http://localhost:3000/group/addusertogroup",
      addusertogroup,
      { headers: { Authorization: token } }
    );
    console.log(result)
    alert("user added to group successfully");
  } catch (err) {
    console.log(err);
  }
});

const rmuser = document.getElementById("rmu");
rmuser.addEventListener("click", async (e) => {
  e.preventDefault();
  const rmemail = document.getElementById("rmuser").value;
  const groupid = document.getElementById("gid").value;
  let rmuser = {
    rmemail: rmemail,
    groupid: groupid,
  };
  console.log("remove", rmuser);
  try {
    const token = localStorage.getItem("token");
    const result = await axios.post("http:localhost:3000/group/removeuser", rmuser, {
      headers: { Authorization: token },
    });
    alert("user remove successfully");
  } catch (err) {
    console.log(err);
  }
});
