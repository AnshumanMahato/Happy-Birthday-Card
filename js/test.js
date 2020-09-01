let frames = document.querySelectorAll(".frame"),
    msg = document.querySelector(".text-frame p");

frames[1].style.display = "block";

setTimeout(() => {
    frames[1].classList.add("appear");
    frames[1].style.opacity = "1";
    msg.classList.add("move-up");
},1500);

setTimeout(() => {
    msg.style.transform = "translateY(-100%)";
},5000);

setTimeout(() => {
    document.querySelector(".text-frame").classList.add("fade-in");
    document.querySelector(".text-frame").style.opacity = '0';
},11000);

setTimeout(() => {
    frames[1].style.display = "none";
    frames[0].style.display = "block";
    frames[0].classList.add("appear");
    frames[0].style.opacity = "1";
},13000);