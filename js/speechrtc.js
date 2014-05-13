/**
 * Created by andre on 12/15/13.
 */


// Wait for connection to BinaryJS server
client.on('open', function(){
    console.log("opened");

});

// Deal with DOM quirks
function doNothing (e){
    e.preventDefault();
    e.stopPropagation();
}

function stopsrtc(){

    setTimeout( function(){
            console.log('stopped now');
            stream = client.send("0", {name: "fim", size: 0});
            stream.on('data', function(data){
                onResults(data);
            });
            mediaRecorder.stop();
    }, 500);
}

function speaksrtc(){
    stream = this.client.send("0", {name: "start:en", size: 0});
    mediaRecorder.start(1000);

}


function errorCallback(error){
    console.log("navigator.getUserMedia error: ", error);
    nomike = true;
}


function startRecording(stream) {
    log('Starting...');
    nomike = false;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(e) {
        stream = client.send(e.data, {name: "audio", size: e.data.size});

        stream.on('data', function(data){
            console.log(data);
        });

    };

    mediaRecorder.onerror = function(e){
        nomike = true;
    };


}

if (typeof MediaRecorder === 'undefined' || !navigator.getUserMedia) {
    alert('Sorry! This demo requires a more recent Firefox.');
} else {
    navigator.getUserMedia(constraints, startRecording, errorCallback);
}


function SelectAudio(text) {

    if (text.length > 500)
        text = text.substr(0,500);

    var urlaudio = "http://speechan.cloudapp.net/weblayer/synth.ashx?lng=en&msg=" + text;


    var e = document.createElement("audio");
    e.src = urlaudio;
    e.setAttribute("type", urlaudio.type);
    e.setAttribute("autoplay", "true");
    //document.getElementById("divaudio").appendChild(e);


}
