//jshint esversion:6

/******************************************************* SETUP ************************************************************/

const config = {
    name: "", // actual name of the recipient
    nickname: "", // nickname(optional)
    pic: "https://scontent.fixr3-1.fna.fbcdn.net/v/t1.6435-9/187640039_302817597976153_1586608434934831406_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=EhnUkEO1QbIAX_xKqsG&_nc_ht=scontent.fixr3-1.fna&oh=00e74d1c19e322a0c02c4a131fe7cf0d&oe=617B0EB7" //image url of recipients
};

if(config.name)
    document.querySelector('.name').textContent = config.name;
if(config.nickname)
    document.querySelector('.nickname').textContent = config.nickname;
if(config.pic)
    document.querySelector('.bd-pic').style.backgroundImage = `url(${config.pic})`;

/*************************************************** ANIMATION CODE *******************************************************/

let button = document.querySelector(".btn"),
    darkroom = document.querySelector(".darkroom"),
    giftroom = document.querySelector(".giftroom"),
    hallway = document.querySelector(".hallway"),
    room = document.querySelector(".empty-room"),
    flash = document.querySelector(".flash");

// These are the text elements that hold messages to be displayed in the respective screes

let blackText = document.querySelectorAll(".bb-text"), // msgs in the dark room scene
    giftText = document.querySelectorAll(".gift-text"), // msgs in the gift scene
    hallText = document.querySelectorAll(".hall-text"), // msgs in the hallway scene
    roomText = document.querySelectorAll(".room-text"), // msgs in empty room scene 
    CTAtext = document.querySelector(".btn-ref");

//Elements in the card page

let frames = document.querySelectorAll(".frame"),
    msgWindow = document.querySelector(".scroll"),// this one has the message frame in [0] and card fram in [1]
    msg = document.querySelector(".scroll p"); // the Message para

//Sfx files

let light = document.querySelector(".switch-aud"),
    blast = document.querySelector(".blast-aud"),
    door = document.querySelector(".door-aud"),
    haunt = document.querySelector(".haunt-aud"),
    music = document.querySelector(".hbd-aud");

//  readMsg() displays the paras in each scene successively. It takes an array of the para elements as input.

let readMsg = (text) => {

    for(let i = 0; i < text.length; i++) {  // this loop goes through all the text msg paras
        setTimeout(() => {  // A timeout of 5s ia applied to all text elements so that appear successively one after the other
            
            text[i].classList.add("read");    // this adds a fadeIn-fadeOut animation to elements   
            if(i === text.length - 1){             // this ensures that the button appears only after the last text is displayed.
                button.style.display = "inline-block";
                CTAtext.style.display = "block";
            }
    
        },5000*i);
        
    }
};

// transition() is animation for change from one scene to another. It takes the current scene div element as input.

let transition = (currentScene) => {
    currentScene.classList.add("fade-in");
    currentScene.style.opacity = "0";
    button.style.display = "none";
    document.querySelector(".btn-ref").style.display = "none";       
};

//Animation Code

/*
    In the beginning, the black page appears signifying a dark room and after displaying the msg paras
    one by one, a button(bulb) appears and the user is asked to click the button to swith on the lights.
*/ 

document.querySelector(".btn-ref").innerHTML = "Click the Light Bulb.";

readMsg(blackText);

button.addEventListener("click",function(){
    
    if(button.classList.contains("switch")) {

        /* 
            When the switch is pressed, the black div will wipe out and the backgroung scene with no 
            elements will appear, signifying that the lights are turned on and the room is empty. Then 
            the msg will be displayed after which, the user will be asked to move out and the button with
            door icon will appear. 
        */

        light.play();
        transition(darkroom);
        document.querySelector(".btn-ref").innerHTML = "Click the Door";
        setTimeout(function() {
            button.classList.add("door-out");
            button.classList.remove("switch");
            darkroom.style.display = "none";
            readMsg(roomText); 
        },4000);
    }

    else if(button.classList.contains("door-out")) {

        /* 
            when the door is pressed, scene changes to cemetry. Again, the msg will be displayed, after 
            which, the user will be asked to come inside and the button with door will appear again.
        */
        
        door.play();
        transition(room);
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

        /* 
            when the door is pressed, scene changes to the gift room. Again, the msg will be displayed, after 
            which, the user will be asked to open the gift and the button with gift will appear.
        */
        
        door.play();
        transition(hallway);
        document.querySelector(".btn-ref").innerHTML = "Click the Gift";
        setTimeout(function() {
            button.classList.add("gift");
            button.classList.remove("door-in");
            hallway.style.display = "none";
            readMsg(giftText);
        },4000);
    }

    else if(button.classList.contains("gift")) {

        /* 
            when the gift is pressed, the gift scene vanishes and the white div fades slowly giving a sense 
            of explosion. After that, the message frame appears and moves up until the message completes. Then,
            the message frame fades away and the card appears.
        */
       
        haunt.pause();
        blast.play();
        giftroom.style.display = "none";
        transition(flash);
       
        music.loop = true;
        music.play();

        frames[1].style.display = "flex";

        setTimeout(() => {
            frames[1].classList.add("appear");
            frames[1].style.opacity = "1";
            msg.classList.add("move-up");
        },1500);

        setTimeout(() => {
            msg.style.transform = "translateY(-100%)";
            flash.style.display = "none";
        },5000);

        setTimeout(() => {
            document.querySelector(".text-frame").classList.add("fade-in");
            document.querySelector(".text-frame").style.opacity = '0';
        },88000);

        setTimeout(() => {
            frames[1].style.display = "none";
            frames[0].style.display = "flex";
            frames[0].classList.add("appear");
            frames[0].style.opacity = "1";
        },91000);

    }

});