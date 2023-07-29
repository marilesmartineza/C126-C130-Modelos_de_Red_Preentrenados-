song = "";
cancion = [];
indice = 0;
nombresCanciones = ["1985","Big Boy","Chiquetere","ET","Hijo de la Luna","Makudonarudo","Sway"];

function preload() {
    cancion[0]=loadSound("1985.mp3");
    cancion[1]=loadSound("Big Boy.mp3");
    cancion[2]=loadSound("Chiquetere.mp3");
    cancion[3]=loadSound("ET.mp3");
    cancion[4]=loadSound("Hijo de la Luna.mp3");
    cancion[5]=loadSound("Makudonarudo.mp3");
    cancion[6]=loadSound("Sway.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightwristX = 0;
rightwristY = 0;

leftwristX = 0;
leftwristY = 0;

noseX = 0;
noseY = 0;

function setup() {
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {

    console.log("longitud" + results.length);
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist );

        leftwristX = results[0].pose.leftWrist.x -80;
        leftwristY = results[0].pose.leftWrist.y -100;  
        console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY );
        
        rightwristX = results[0].pose.rightWrist.x -50; 
        rightwristY = results[0].pose.rightWrist.y -100;  
        console.log("rightwristX = " + rightwristX + "rightwristY = " + rightwristY );

        noseX = results[0].pose.nose.x -70;
        noseY = results[0].pose.nose.y -30;  
        console.log("noseX = " + noseX + "noseY = " + noseY );
    }
}

function draw() {
    image(video, 0,0,500,400);

    fill("#6a329f");
    stroke("#6a329f");

    if(scoreRightWrist > 0.2){
        circle(rightwristX,rightwristY,30);
    
       if(rightwristY >0 && rightwristY <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        cancion[indice].rate(0.5);
       }
       else if (rightwristY > 100 && rightwristY <=200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        cancion[indice].rate(1); 
       }
       else if (rightwristY > 200 && rightwristY <=300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        cancion[indice].rate(1.5); 
       }
       else if (rightwristY > 300 && rightwristY <=400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        cancion[indice].rate(2); 
       }
       else if (rightwristY > 400) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        cancion[indice].rate(2.5); 
       }
    }

    if(scoreLeftWrist > 0.2) {
        circle(leftwristX,leftwristY,30);
        InNumberleftWristY = Number(leftwristY);
        remove_decimals = floor(InNumberleftWristY);
        volumen = remove_decimals/500;
        document.getElementById("volumen").innerHTML = "Volumen = " + volumen;
        cancion[indice].setVolume(volumen);
       }

    textSize(30);
    fill("#c90076")
    text(nombresCanciones[indice],width/3,height/5);

}

function next(){
    stop();
    if (indice<=cancion.length-1) {
        indice+=1;        
    } else if (indice=cancion.length) {
        indice=0;        
    }
    play();
    window.alert("Se a cambiado la canción");
}

function prev(){
    stop();
    if ((indice<=cancion.length-1) && (indice > 0)) {
        indice-=1;        
    } else {
        indice=0;        
    }
    play();
    window.alert("Retrocediste la canción");
}

function play() {
    cancion[indice].play();
    cancion[indice].setVolume(1);
    cancion[indice].rate(1);
}

function stop() {
    cancion[indice].stop();
}

