
function launch(){
    getLocation();
    $('#go').hide();
    $('#loader').toggle();
}

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


function getDelta(gps){
        loadXMLDoc('./extract/PrixCarburants_instantane.xml').then( data => {
        console.log(data);
        xmlDoc = data.getElementsByTagName("pdv");
        let radlati1 = Math.PI * gps.latitude/180;
        var delta=new Array;
        for(i = 0; i < xmlDoc.length; i++){
            let lati = xmlDoc[i].getAttribute('latitude')/100000;
            let longi = xmlDoc[i].getAttribute('longitude')/100000;
            // nearest = Math.abs( (gps.latitude-lati)) + Math.abs((gps.longitude-longi));
            let radlati2  =Math.PI * lati/180;
            let radDeltaLongi  =Math.PI * (gps.longitude-longi)/180;
            let temp = Math.acos(Math.sin(radlati1) * Math.sin(radlati2) + Math.cos(radlati1) * Math.cos(radlati2) * Math.cos(radDeltaLongi));
            temp = temp * 180/Math.PI
            let deltaKm = (temp * 60 * 1.1515) * 1.609344;
            delta.push({
                gps:deltaKm,
                index:i}) 
            }
        delta.sort(function(a,b){
            return a.gps - b.gps
        })
        delta=delta.slice(0,5);
        getNearest(delta)
    })
   
}

function getNearest(delta){
    console.log(delta)
    for(j=0; j<delta.length ;j++){
        var context ={
            ville:xmlDoc[delta[j].index].getElementsByTagName('ville'),
            adrss:xmlDoc[delta[j].index].getElementsByTagName('adresse')
        };
        var html = [
            '<div class="data">',
                '<div class="title">',
                    '<span></span>',
                    '<span></span>',
                '</div>',
                '<div class="content">',
                    '<ul>',
                        
                    '</ul>',
                    '<div>',
                        '<span></span>',
                        '<div class="services">',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join("\n");
        $('#main').append(html);
        $('#main .data:last-child .title span:first-child').html(context.ville);
        $('#main .data:last-child .title span:nth-child(2)').html(Math.round( (delta[j].gps*10) )/10 +" km" );
        $('#main .data:last-child .content span:first-child').html(context.adrss);
        let collec =xmlDoc[delta[j].index].getElementsByTagName('prix');
        for(i=0; i<collec.length; i++){
            $('#main .data:last-child .content ul').append('<li></li>');
            $('#main .data:last-child .content ul li:last-child').html(collec[i].getAttribute('nom')+': '+Math.round( (collec[i].getAttribute('valeur')*10) )/10 +' €');
        }
        collec =xmlDoc[delta[j].index].getElementsByTagName('service');
        for(i=0; i<collec.length; i++){
            if(collec[i].textContent == "DAB (Distributeur automatique de billets)"){
                $('#main .data:last-child .content .services').append('<img src="./image/capture.png" alt="">');

            }
            if(collec[i].textContent == "laverie" || "lavage manuel" || 'lavage automatique'){
                $('#main .data:last-child .content .services').append('<img src="./image/wash.png" alt="">');

            }
        }

    } 
    $('#loader').hide();
}




async function loadXMLDoc(filename){
    // if (window.XMLHttpRequest){
    //     xhttp=new XMLHttpRequest();
    // }
    // else{
    //     xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // xhttp.open("GET",filename,false);
    // xhttp.send();

    // return xhttp.responseXML;
    let res = await fetch(filename);
    let text = await res.text();
    let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(text, 'text/xml');
    return xmlDoc;
} 

