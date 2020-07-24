
function launch(){
  test();
  $('#go').hide();

}

function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
      console.log("Geo Location not supported by browser");
    }
}//function that retrieves the position

function showPosition(position) {
    var location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }
    return location;
}//request for location

function loadXMLDoc(filename)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",filename,false);
xhttp.send();
return xhttp.responseXML;
} 

function test(){
  xmlDoc = loadXMLDoc('./extract/PrixCarburants_instantane.xml');
  xmlDoc = xmlDoc.getElementsByTagName("pdv");
  console.log('toto');
  for(i = 0; i <xmlDoc.length; i++){

    $('#test').append(xmlDoc[i].getElementsByTagName('ville'));
  }
}
  