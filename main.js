music = "";
objects=[];
status="";
function preload(){
    music = loadSound("turkey_time.mp3");
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
}
function Start(){
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Person";
}
function draw(){
image(video,0,0,380,380);
if(status != ""){
    objectDetector.detect(video,gotResults);
    r = random(255);
    g = random(255);
    b = random(255);
    for(i = 0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status:Object detected";
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+ " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label=="person"){
            document.getElementById("number_of_objects").innerHTML="Baby Found!";
            music.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found!";
            music.play();
        }
    }
    if(objects.length==0){
        document.getElementById("number_of_objects").innerHTML="Baby Not Found!";
            music.play();
    }
}
}
function modelloaded(){
    console.log("Model is loaded");
    status = "true";
}
function gotResults(error,results){
if(error){
    console.error(error);
}
else{
console.log(results);
objects=results;
}
}