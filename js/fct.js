$(window).on('offline', function(){
    $('#refresh').hide();
});

$('#refresh').click(function(){
    $.get("php/fct.php").then(
        $('#error').text('Réussite')
        ).catch(err =>  $('#error').text('Failure'));      
})


function launch(){
    getLocation();
    $('#go').hide();
    $('.container #logo').hide();
    $('#loader').toggle();
    $('#refresh').addClass('fixed');
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            gps={
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            };

            getTab(gps);
        });
    }
    else {
      console.log("Geo Location not supported by browser");
    }
}

function getTab(gps){
        loadXMLDoc('extract/PrixCarburants_instantane.xml').then( data => {
        xmlDoc = data.getElementsByTagName("pdv");
        let radlati1 = Math.PI * gps.latitude/180;
        var tab=new Array;
        for(i = 0; i < xmlDoc.length; i++){
            let lati = xmlDoc[i].getAttribute('latitude')/100000;
            let longi = xmlDoc[i].getAttribute('longitude')/100000;
            let radlati2 = Math.PI * lati/180;
            let radDeltaLongi = Math.PI * (gps.longitude-longi)/180;
            let temp = Math.acos(Math.sin(radlati1) * Math.sin(radlati2) + Math.cos(radlati1) * Math.cos(radlati2) * Math.cos(radDeltaLongi));
            let deltaKm = temp*6371;
            tab.push({
                gps:deltaKm,
                index:i}) 
            }
        tab.sort(function(a,b){
            return a.gps - b.gps
        })
        tab=tab.slice(0,5);
        getNearest(tab)
    })
}

function getNearest(tab){
    $('#main').toggle();
    for(j=0; j<tab.length ;j++){
        var context ={
            ville:xmlDoc[tab[j].index].getElementsByTagName('ville'),
            adrss:xmlDoc[tab[j].index].getElementsByTagName('adresse')
        };
        let onclick='openMaps("station+service+'+context.ville[0].textContent.replace(/ /gi, '+')+'+'+context.adrss[0].textContent.replace(/ /gi, '+')+'")';
        var html = [
            '<div class="data" onclick='+onclick+'>',
                '<div class="title">',
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
        $('#main .data:last-child .title').prepend(context.ville);
        $('#main .data:last-child .title span').html(Math.round( (tab[j].gps*10) )/10 +" km" );
        $('#main .data:last-child .content span:first-child').html(context.adrss);
        let collec =xmlDoc[tab[j].index].getElementsByTagName('prix');
        for(i=0; i<collec.length; i++){
            $('#main .data:last-child .content ul').append('<li></li>');
            $('#main .data:last-child .content ul li:last-child').html(collec[i].getAttribute('nom')+': '+Math.round( (collec[i].getAttribute('valeur')*10) )/10 +' €');
        }
        collec =xmlDoc[tab[j].index].getElementsByTagName('service');
        collecCount=0;
        let wash=false;
        for(i=0; i<collec.length; i++){
            if(collec[i].textContent == "DAB (Distributeur automatique de billets)"){
                $('#main .data:last-child .content .services').append('<img src="./image/atm.svg" alt="">');
                collecCount++ 
            }else if( (collec[i].textContent == "Laverie" || collec[i].textContent.includes("Lavage")) && !wash){
                $('#main .data:last-child .content .services').append('<img src="./image/wash.svg" alt="Laverie">');
                    wash=true;
                    collecCount++
            }else if(collec[i].textContent == "Automate CB 24/24"){
                $('#main .data:last-child .content .services').append('<img src="./image/2424.svg" alt="24/24">');
                collecCount++ 
            }else if(collec[i].textContent.includes('Restauration') ||collec[i].textContent  == 'Boutique alimentaire' ){
                $('#main .data:last-child .content .services').append('<img src="./image/restau.svg" alt="restau">');
                collecCount++ 
            }
            else if(collec[i].textContent == 'Toilettes publiques' ){
                $('#main .data:last-child .content .services').append('<img src="./image/wc.svg" alt="wc">');
                collecCount++ 
            }
        }
    $('#loader').hide();
    
    }
}

async function loadXMLDoc(filename){
    let res = await fetch(filename);
    let text = await res.text();
    let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(text,'text/xml');
    return xmlDoc;
} 

function openMaps(adrss) {
    console.log('toto')
    if((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPod") != -1))
      window.open("maps://maps.google.com/maps?place="+adrss+"&amp;ll=");
  else 
      window.open("https://maps.google.com/maps/search/"+adrss);
  }
