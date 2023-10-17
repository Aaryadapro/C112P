Webcam.set({
    width:300,
    height:300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    }
    )};

    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jNJfC6pAi/model.json ", modelLoaded);

    function modelLoaded(){
        console.log('ml5 verson', ml5.version);
    }

    function check(){
        img = document.getElementById("captured_image");
        classifier.classify(img, gotResult);
    }

    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = " The first prediction is " + prediction_1;
        speak_data_2 = " My second prediction is " + prediction_2;
        var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
        utterThis.rate= 0.5;
        synth.speak(utterThis);
    }

    function gotResult(error, results){
        if(error)
        {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("result_emotion_name2").innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();
            if(results[0].label == "best"){
                document.getElementById("update_emoji").innerHTML = "&#128077;";
            }
            if(results[0].label == "amazing"){
                document.getElementById("update_emoji").innerHTML = "&#128532;";
            }
            if(results[0].label == "victory"){
                document.getElementById("update_emoji").innerHTML = "&#9996;";
            }
            if(results[1].label == "best"){
                document.getElementById("update_emoji2").innerHTML = "&#128077;";
            }
            if(results[1].label == "amazing"){
                document.getElementById("update_emoji2").innerHTML = "&#128532;";
            }
            if(results[1].label == "victory"){
                document.getElementById("update_emoji2").innerHTML = "&#9996;";
            }
        }
    }


