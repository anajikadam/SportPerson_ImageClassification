Dropzone.autoDiscover = false;

function check(){
    console.log( "Checking Connection of Service." );
    var url1 = "http://127.0.0.1:5000/imageClassification";
    try {
        var st = 0
        // var xhr = new XMLHttpRequest();
        // xhr.open('GET', url1, true);
        // xhr.onload = function () {
        // var st = xhr.status
        // alert(xhr.status);
        // };
        // xhr.send(null);
        var st = 200/st;
      }
      catch(err) {
          alert(err);
          alert("try catch error......")
      }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url1, true);
    xhr.onload = function () {
    console.log(xhr.responseURL); // http://example.com/test
    console.log(xhr.response);
    console.log(xhr.status);
    };
    xhr.send(null);

    // if (st!=200){
    //     alert("su");
    //     $("#error").show();
    //     return;
    // }else {
    //     alert("Service Connected.....!");
    //   }
}

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    
    dz.on("complete", function (file) {
        let imageData = file.dataURL;
                
        var url = "http://127.0.0.1:5000/classify_image";
        
        $.post(url, {image_data: file.dataURL },
            function(data, status) {
            // if (status=="success"){
            //     $("#error").show();
            //     return;
            // }
            console.log(data);
            if (!data || data.length==0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
                return;
            }
            let players = ["Lionel_Messi", "Maria_Sharapova", "Roger_Federer", "Sachin_Tendulkar", "Serena_Williams", "Virat_Kohli"];
            
            let match = null;
            let bestScore = -1;
            for (let i=0;i<data.length;++i) {
                let maxScoreForThisClass = Math.max(...data[i].class_probability);
                if(maxScoreForThisClass>bestScore) {
                    match = data[i];
                    bestScore = maxScoreForThisClass;
                }
            }
            console.log(bestScore);
            if (match) {
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").show();
                $("#resultHolder").html($(`[data-player="${match.class}" `).html());
                //$('.prob').html(bestScore);
                 $("#resultHolder .prob").html(bestScore);
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    let proabilityScore = match.class_probability[index];
                    let elementName = "#score_" + personName;
                    $(elementName).html(proabilityScore);
                }
            }
            // dz.removeFile(file);            
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();
    //check();
    init();
});