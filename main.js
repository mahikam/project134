song=""
img="";
var status="";
objects=[];

function preload(){
    song=loadSound("alarm.mp3");
}
function setup(){
    canvas= createCanvas(400,400);
    canvas.position(475,175);
    video= createCapture(VIDEO);
    video.hide();
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status_detection").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status= true;
}
function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else if(results){
        console.log(results);
        objects= results;
    }
}
function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        r= random(255);
        g= random(255);
        b= random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("status_detection").innerHTML="Status: Objects Detected";
            fill(r,g,b);
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("status_detection").innerHTML="Baby Detected";
                song.stop();
            }
            else{
                document.getElementById("status_detection").innerHTML="Baby Not Detected";
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("status_detection").innerHTML="Baby Not Detected";
            song.play();
        }
    }
}