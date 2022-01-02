objects = "";

function preload() {}

function setup() {

    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelloaded() {
    console.log("model");
    status = true;
}

function draw() {
    image(video, 0, 0, 400, 400);
    name = document.getElementById("input").value
    if (status != "") {
        objectDetector.detect(video, gotResult);

        function gotResult(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                objects = result;
                for (i = 0; i < objects.length; i++) {
                    percent = objects[i].confidence * 100;
                    fill("black");
                    text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                    noFill();
                    stroke("red");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                   
                    if (name == objects[i].label) {
                        document.getElementById("status").innerHTML = "Object Found";
                        synth = window.speechSynthesis;
                        utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
                        synth.speak(utterThis);
                        utter();

                    }
                    if (name != objects[i].label) {
                        document.getElementById("status").innerHTML = "Object Not Found";
                        synth2 = window.speechSynthesis;
                        utter_This = new SpeechSynthesisUtterance("Object Mentioned Not Found");
                        synth2.speak(utter_This);
                        utter();
                    }

                }
            }
        }

    }
}