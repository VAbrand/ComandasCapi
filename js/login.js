function verificar() {
  const pass = document.getElementById("password").value;
  if (pass === "M1n0mbr3") {
    window.location.href = "menu.html";
  } else {
    alert("Contraseña incorrecta");
  }
}
// JavaScript Document