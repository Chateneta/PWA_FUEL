

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            gps={
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            };
            getDelta(gps);
        });
    }
    else {
      console.log("Geo Location not supported by browser");
    }
}


function getDelta(){
    xmlDoc = loadXMLDoc('./extract/PrixCarburants_instantane.xml');
    xmlDoc = xmlDoc.getElementsByTagName("pdv");
    var delta=new Array;
    for(i = 0; i < xmlDoc.length; i++){
        var lati = xmlDoc[i].getAttribute('latitude')/100000;
        var longi = xmlDoc[i].getAttribute('longitude')/100000;
        nearest = Math.abs( (gps.latitude-lati)) + Math.abs((gps.longitude-longi));
        delta.push({
            gps:nearest,
            index:i}) 
    }
    delta.sort(function(a,b){
        return a.gps - b.gps
    })
    getNearest(delta)
}
function getNearest(delta){
    for(j=0; j<delta.length ;j++){
        $('#main').createElement("div");
        $('#main').append(xmlDoc[delta[j].index].getElementsByTagName('ville'));
    }  
    $('#loader').hide();
}




function loadXMLDoc(filename){
    if (window.XMLHttpRequest){
        xhttp=new XMLHttpRequest();
    }
    else{
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",filename,false);
    xhttp.send();

    return xhttp.responseXML;
} 

// function test(){
//     
//     xmlDoc = xmlDoc.getElementsByTagName("pdv");

//     for(i = 0; i <xmlDoc.length; i++){
//         $('#test').append(xmlDoc[i].getElementsByTagName('ville'));
//     }
// }