
const popMenu= () => {
    let x = document.getElementById("list");
    let y =document.getElementById("navBar");
    if(x.style.display === "none"){
      x.style.display = "flex";
      y.style.height = "300px";
    }
    else{
      x.style.display = "none";
      y.style.height = "165px";
    }
  }
  