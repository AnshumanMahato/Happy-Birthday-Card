//jshint esversion:6

let button = document.querySelector(".btn"),
    blackbox = document.querySelector(".blackbox"),
    giftbox = document.querySelector(".giftbox"),
    whitebox = document.querySelector(".whitebox");

let blackText = document.querySelectorAll(".bb-text"),
    giftText = document.querySelectorAll(".gift-text");

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
        setTimeout(function () {
            whitebox.style.display = "none";
        },5000);
    }

    button.classList.remove("switch");
});
