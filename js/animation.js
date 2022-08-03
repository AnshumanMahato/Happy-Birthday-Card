//jshint esversion:6

/******************************************************* SETUP ************************************************************/

import config from "./config.js";

if (config.name) {
  document.querySelector(".name").textContent = config.name;
  if (config.nickname)
    document.querySelector(".nickname").textContent = config.nickname;
  else document.querySelector(".nickname").textContent = config.name;
}

if (config.pic)
  document.querySelector(
    ".bd-pic"
  ).style.backgroundImage = `url(${config.pic})`;

/*************************************************** ANIMATION CODE *******************************************************/

const button = document.querySelector(".btn"),
  darkroom = document.querySelector(".darkroom"),
  giftroom = document.querySelector(".giftroom"),
  hallway = document.querySelector(".hallway"),
  room = document.querySelector(".empty-room"),
  flash = document.querySelector(".flash");

// These are the text elements that hold messages to be displayed in the respective screes

const blackText = document.querySelectorAll(".bb-text"), // msgs in the dark room scene
  giftText = document.querySelectorAll(".gift-text"), // msgs in the gift scene
  hallText = document.querySelectorAll(".hall-text"), // msgs in the hallway scene
  roomText = document.querySelectorAll(".room-text"), // msgs in empty room scene
  CTAtext = document.querySelector(".btn-ref");

//Elements in the card page

const frames = document.querySelectorAll(".frame"),
  msgWindow = document.querySelector(".scroll"), // this one has the message frame in [0] and card fram in [1]
  msg = document.querySelector(".scroll p"); // the Message para

//Sfx files

const light = document.querySelector(".switch-aud"),
  blast = document.querySelector(".blast-aud"),
  door = document.querySelector(".door-aud"),
  haunt = document.querySelector(".haunt-aud"),
  music = document.querySelector(".hbd-aud");

//  readMsg() displays the paras in each scene successively. It takes an array of the para elements as input.

const readMsg = (text) => {
  for (let i = 0; i < text.length; i++) {
    // this loop goes through all the text msg paras
    setTimeout(() => {
      // A timeout of 5s ia applied to all text elements so that appear successively one after the other

      text[i].classList.add("read"); // this adds a fadeIn-fadeOut animation to elements
      if (i === text.length - 1) {
        // this ensures that the button appears only after the last text is displayed.
        button.style.display = "inline-block";
        CTAtext.style.display = "block";
      }
    }, 5000 * i);
  }
};

// transition() is animation for change from one scene to another. It takes the current scene div element as input.

const transition = (currentScene) => {
  currentScene.classList.add("fade-in");
  currentScene.style.opacity = "0";
  button.style.display = "none";
  CTAtext.style.display = "none";
};

//Animation Code

/*
    In the beginning, the black page appears signifying a dark room and after displaying the msg paras
    one by one, a button(bulb) appears and the user is asked to click the button to swith on the lights.
*/

CTAtext.innerHTML = "Click the Light Bulb.";
readMsg(blackText);

button.addEventListener("click", function () {
  if (button.classList.contains("switch")) {
    /* 
            When the switch is pressed, the black div will wipe out and the backgroung scene with no 
            elements will appear, signifying that the lights are turned on and the room is empty. Then 
            the msg will be displayed after which, the user will be asked to move out and the button with
            door icon will appear. 
        */

    light.play();
    transition(darkroom);
    CTAtext.innerHTML = "Click the Door";
    setTimeout(function () {
      button.classList.add("door-out");
      button.classList.remove("switch");
      darkroom.style.display = "none";
      readMsg(roomText);
    }, 4000);
  } else if (button.classList.contains("door-out")) {
    /* 
            when the door is pressed, scene changes to cemetry. Again, the msg will be displayed, after 
            which, the user will be asked to come inside and the button with door will appear again.
        */

    door.play();
    transition(room);
    setTimeout(function () {
      haunt.play();
      haunt.loop = true;
      button.classList.add("door-in");
      button.classList.remove("door-out");
      room.style.display = "none";
      readMsg(hallText);
    }, 4000);
  } else if (button.classList.contains("door-in")) {
    /* 
            when the door is pressed, scene changes to the gift room. Again, the msg will be displayed, after 
            which, the user will be asked to open the gift and the button with gift will appear.
        */

    door.play();
    transition(hallway);
    CTAtext.innerHTML = "Click the Gift";
    setTimeout(function () {
      button.classList.add("gift");
      button.classList.remove("door-in");
      hallway.style.display = "none";
      readMsg(giftText);
    }, 4000);
  } else if (button.classList.contains("gift")) {
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

    if (!config.showScrollMsg) {
      frames[0].style.display = "flex";
      setTimeout(() => {
        frames[0].classList.add("appear");
        frames[0].style.opacity = "1";
      }, 1500);
      return;
    }

    document.querySelector(".HBD").textContent = "May your soul rest in peace";

    frames[1].style.display = "flex";

    setTimeout(() => {
      frames[1].classList.add("appear");
      frames[1].style.opacity = "1";
      msg.classList.add("move-up");
    }, 1500);

    setTimeout(() => {
      msg.style.transform = "translateY(-100%)";
      flash.style.display = "none";
    }, 5000);

    setTimeout(() => {
      msgWindow.classList.add("fade-in");
      msgWindow.style.opacity = "0";
    }, 88000);

    setTimeout(() => {
      frames[1].style.display = "none";
      frames[0].style.display = "flex";
      frames[0].classList.add("appear");
      frames[0].style.opacity = "1";
    }, 91000);
  }
});

////////////////////////////////////////////
///////   Confetti Effects    /////////////
//////////////////////////////////////////


(function($){
  $.confetti= new function(){
      //global variable declearition
      var canvas;     //canvas
      var ConTx;      //context
      var w,h;    //width & height
      var maxp=200,particles=[];      //maximum perticles and array of those perticles
      var angle=0,tiltAngle=0;
      var confettiActive=true,animationComplete=true;
      var aniHan;       //animation handler

      //objects
      var particleCol={
          colorOptions:[
              "Sienna","CornflowerBlue","CadetBlue",
              "PaleTurquoise","Olive","Indigo",
              "Khaki","MediumViolet","FireBrick",
              "Goldenrod","Beige","Tan",
              "DarkSeaGreen","Plum","Gold"
          ],                  //define all the color
          colIndex:0,
          colIncre:0,         //color incrementer
          colThres:10,        //color threshold

          getCol: function(){
              if(this.colIncre>=10){
                  this.colIncre=0;
                  this.colIndex++;
                  if(this.colIndex>=this.colorOptions.length){
                      this.colIndex=0;
                  }

              }
              this.colIncre++;
              return this.colorOptions[this.colIndex];
          }
      }

      function confetti_particles(color){
          this.x=Math.random()*w;     //  X co-ordinate
          this.y=(Math.random()*h)-h;     //  Y co-ordinate
          this.r=Math.floor(Math.random()*21)+10;     //  Radius
          this.d=Math.floor(Math.random()*maxp)+10;       //  Density
          this.color=color;           //color
          this.tilt=Math.floor(Math.random()*10)-10;      //tilt
          this.tiltAngleIncre=Math.floor(Math.random()*0.07)+0.05;    //tilt angle Increment
          this.tiltAngle=0;

          this.drawing=function(){
              ConTx.beginPath();      
              ConTx.lineWidth=this.r/2;       //line width = Radius/2
              ConTx.strokeStyle=this.color;
              ConTx.moveTo(this.x+this.tilt+(this.r/4),this.y);     //X-coordinate + tilt + (Radius/4) ----> Y-coordinates
              ConTx.lineTo(this.x+this.tilt,this.y+this.tilt+(this.r/4));   //X-coordinate + tilt ---->  Y-coordinate + tilt + (Radius/4)
              return ConTx.stroke();
          }
      }

      function initial(){
          SetBody();
          // InitializeConfetti();
          InitializeButton();

          $(window).resize(function(){
              w=window.innerWidth;        //width
              h=window.innerHeight;       //height
              canvas.width=w;
              canvas.height=h;
          });
      }
      function InitializeButton(){
          $('.frame').click(InitializeConfetti);      //activate by clicking
      }
      function SetBody(){
          $('body').append('<canvas id="confettiCanvas" style="position:absolute;top:0;left:0;display:none;z-index:1;"></canvas>');       // add css in body

          canvas=document.getElementById("confettiCanvas");   // target id
          ConTx=canvas.getContext("2d");
          w=window.innerWidth;
          h=window.innerHeight;
          canvas.width=w;
          canvas.height=h;
      }

      function InitializeConfetti(){
          canvas.style.display='block';   // define canvas dispaly as block
          particles=[];
          animationComplete=false;

          for(var i=0;i<maxp;i++){
              var particleColor=particleCol.getCol();     //call for color
              particles.push(new confetti_particles(particleColor));
          }
          Startconfetti();    // called for start
      }

      function Drawing(){
          ConTx.clearRect(0,0,w,h);
          var res=[];     //result array define
          for(var i=0;i<maxp;i++){
              (function(j){
                  res.push(particles[j].drawing());
              })(i);
          }
          Update();
          return res;        
      }

      function Update(){
          var remFlakes=0;        // Remaining Flakes
          var particle;
          angle=angle+0.01;       //angle change
          tiltAngle=tiltAngle+0.1;        //tilt angle change

          for(var i=0;i<maxp;i++){
              particle=particles[i];
              if(animationComplete) return;
              if(!confettiActive && particle.y<-15){
                  particle.y=h+100;
                  continue;
              }
      
              particle.tiltAngle=particle.tiltAngle+particle.tiltAngleIncre;
              particle.y=particle.y + (Math.cos(angle+particle.d)+3+particle.r/2)/2;
              particle.x=particle.x+Math.sin(angle);
              particle.tilt=(Math.sin(particle.tiltAngle-(i/3)))*15;

              if(particle.y<=h){
                  remFlakes++;
              }

              // Checking for position
             if((particle.x>w+20 || particle.x<-20 || particle.y>h) && confettiActive){
                  if(i%5>0 || i%2==0){        //  ~67% of Flakes
                      repos(particle,Math.random()*w,-10,Math.floor(Math.random()*10)-10);
                  }
                  else{
                      repos(particle,w+5,Math.random()*h,Math.floor(Math.random()*10)-10);
                  }
             } 
          }
      }
      function repos(particle,x_cor,y_cor,tilt){
          particle.x=x_cor;
          particle.y=y_cor;
          particle.tilt=tilt;
      }

      
      function Startconfetti(){
          w=window.innerWidth;
          h=window.innerHeight;
          canvas.width=w;
          canvas.height=h;

          (function animationLoop(){      //loop
              if(animationComplete) return null;
              aniHan=reqAniFrame(animationLoop);
              return Drawing();

          })();
      }

      window.reqAniFrame=(function(){
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(c){
              return window.setTimeout(c,1000/60);
          };
      })();

      this.initial = initial;
      this.start = InitializeConfetti;
  }
  $.confetti.initial();       //main function call
}(jQuery));