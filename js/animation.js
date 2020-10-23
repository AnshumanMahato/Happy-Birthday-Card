//jshint esversion:6

let button = document.querySelector(".btn"),
    blackbox = document.querySelector(".blackbox"),
    giftbox = document.querySelector(".giftbox"),
    hallway = document.querySelector(".hallway"),
    room = document.querySelector(".empty-room"),
    whitebox = document.querySelector(".whitebox");

// These are the text elements that hold messages to be displayed in the respective screes

let blackText = document.querySelectorAll(".bb-text"), // msgs in the dark room scene
    giftText = document.querySelectorAll(".gift-text"), // msgs in the gift scene
    hallText = document.querySelectorAll(".hall-text"), // msgs in the hallway scene
    roomText = document.querySelectorAll(".room-text"); // msgs in empty room scene 

//Elements in the card page

let frames = document.querySelectorAll(".frame"), // this one has the message frame in [0] and card fram in [1]
    msg = document.querySelector(".text-frame p"); // the Message para

//Sfx files

let light = document.querySelector(".switch-aud"),
    blast = document.querySelector(".blast-aud"),
    door = document.querySelector(".door-aud"),
    haunt = document.querySelector(".haunt-aud"),
    music = document.querySelector(".hbd-aud");

let readMsg = (text) => {

    for(let i = 0; i < text.length; i++) {  // this loop goes through all the text msg paras
        setTimeout(() => {  // A timeout of 5s ia applied to all text elements so that appear successively one after the other
            
            text[i].classList.add("read");    // this adds a fadeIn-fadeOut animation to elements
    
            if(i === text.length - 1){             // this ensures that the button appears only after the last text is displayed.
                button.style.display = "inline-block";
                document.querySelector(".btn-ref").style.display = "block";
            }
    
        },5000*i);
        
    }
};

//Animation Code

/*
    In the beginning, the black page appears signifying a dark room and after displaying the msg paras
    one by one, a button(bulb) appears and the user is asked to click the button to swith on the lights.
*/ 

document.querySelector(".btn-ref p").innerHTML = "Click the Light Bulb.";

readMsg(blackText);

button.addEventListener("click",function(){
    
    if(button.classList.contains("switch")) {

        blackbox.classList.add("fade-in");
        light.play();
        blackbox.style.opacity = "0";
        button.style.display = "none";
        document.querySelector(".btn-ref").style.display = "none";
        document.querySelector(".btn-ref p").innerHTML = "Click the Door";
        setTimeout(function() {
            button.classList.add("door-out");
            button.classList.remove("switch");
            blackbox.style.display = "none";
            readMsg(roomText); 
        },4000);
    }

    else if(button.classList.contains("door-out")) {
        room.classList.add("fade-in");
        door.play();
        room.style.opacity = "0";
        button.style.display = "none";
        document.querySelector(".btn-ref").style.display = "none";
        setTimeout(function() {
            haunt.play();
            haunt.loop = true;
            button.classList.add("door-in");
            button.classList.remove("door-out");
            room.style.display = "none";
            readMsg(hallText); 
        },4000);
    }

    else if(button.classList.contains("door-in")) {
        hallway.classList.add("fade-in");
        door.play();
        hallway.style.opacity = "0";
        button.style.display = "none";
        document.querySelector(".btn-ref").style.display = "none";
        document.querySelector(".btn-ref p").innerHTML = "Click the Gift";
        setTimeout(function() {
            button.classList.add("gift");
            button.classList.remove("door-in");
            hallway.style.display = "none";
            readMsg(giftText);
        },4000);
    }

    else if(button.classList.contains("gift")) {
        haunt.pause();
        blast.play();
        giftbox.style.display = "none";
        document.querySelector(".btn-ref").style.display = "none";
        whitebox.classList.add("fade-in");
        whitebox.style.opacity = "0";
       
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
            whitebox.style.display = "none";
        },5000);

        setTimeout(() => {
            document.querySelector(".text-frame").classList.add("fade-in");
            document.querySelector(".text-frame").style.opacity = '0';
        },78000);

        setTimeout(() => {
            frames[1].style.display = "none";
            frames[0].style.display = "block";
            frames[0].classList.add("appear");
            frames[0].style.opacity = "1";
        },81000);

    }

});










/*

setTimeout(function() {
            button.classList.add("gift");
            blackbox.style.display = "none";
            for(let j = 0; j < giftText.length; j++) {
                setTimeout(()=>{
                    giftText[j].classList.add("read");
                    if(j === giftText.length - 2){
                        button.style.display = "inline-block";
                        document.querySelector(".btn-ref").style.display = "block";
                    } 
                },5000*j);
            } 
        },4000);

*/