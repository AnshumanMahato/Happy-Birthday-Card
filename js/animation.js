//jshint esversion:6

let button = document.querySelector(".btn"),
    blackbox = document.querySelector(".blackbox"),
    giftbox = document.querySelector(".giftbox"),
    whitebox = document.querySelector(".whitebox");

let blackText = document.querySelectorAll(".bb-text"),
    giftText = document.querySelectorAll(".gift-text");

// test

let frames = document.querySelectorAll(".frame"),
    msg = document.querySelector(".text-frame p");

// test

for(let i = 0; i < blackText.length; i++) {
    setTimeout(()=>{
        blackText[i].classList.add("read");
        if(i === blackText.length - 1)
            button.style.display = "inline-block";
    },5000*i);
    
}

button.addEventListener("click",function(){
    
    if(button.classList.contains("switch")) {

        blackbox.classList.add("fade-in");
        let light = document.querySelector(".switch-aud");
        light.play();
        blackbox.style.opacity = "0";
        button.style.display = "none";
        setTimeout(function() {
            button.classList.add("gift");
            blackbox.style.display = "none";
            for(let j = 0; j < giftText.length; j++) {
                setTimeout(()=>{
                    giftText[j].classList.add("read");
                    if(j === giftText.length - 2)
                        button.style.display = "inline-block";
                },5000*j);
            } 
        },4000);
    }

    else if(button.classList.contains("gift")) {
        
        let blast = document.querySelector(".blast-aud");
        blast.play();
        giftbox.style.display = "none";
        whitebox.classList.add("fade-in");
        whitebox.style.opacity = "0";
        let music = document.querySelector(".hbd-aud");
        music.loop = true;
        music.play();
        button.style.display = "none";

        //test 

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
        },68000);

        setTimeout(() => {
            frames[1].style.display = "none";
            frames[0].style.display = "block";
            frames[0].classList.add("appear");
            frames[0].style.opacity = "1";
        },71000);

        //test

        setTimeout(function () {
            whitebox.style.display = "none";
        },5000);
    }

    button.classList.remove("switch");
});
