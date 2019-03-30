var countDownDate = [];
fetch('/api/events')
.then(function(res){
    return res.json();
})
.then(function(data){
    
    for(var key in data){
        countDownDate.push(data[key].date);
    }    
    var timeArr = countDownDate.map (function(x){
        return new Date(x).getTime();
    });    
    var x = setInterval(function() {    
    var now = new Date().getTime();
    var distance = timeArr.map(x => x-now);
    var days = distance.map(x => Math.floor(x / (1000 * 60 * 60 * 24)));
    var hours = distance.map(x => Math.floor((x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    var minutes = distance.map(x => Math.floor((x % (1000 * 60 * 60)) / (1000 * 60)));
    var seconds = distance.map(x => Math.floor((x % (1000 * 60)) / 1000));
    var countDown = document.getElementsByClassName("countdown");   
    var len = countDown.length;
    let cStr;
    for(let i=0 ; i<len ; i++){
        if(days[i] == 0){
            if(hours[i] == 0){
                if(minutes[i] == 0){
                    if(seconds[i] == 0){
                        
                    }else{
                        cStr = `${seconds[i]} s to go!`
                    }
                }else{
                    cStr = `${minutes[i]} min to go!`
                }
            }else{
                cStr = `${hours[i]} hr to go!`
            }
        }else{
            cStr = `${days[i]} days to go!`
        }
        countDown[i].innerHTML = cStr;
    }
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
    }, 1000);
    })
.catch(function(err){
    console.log(err);
});


function getEvent(eventName){    
    $.ajax({
        method: "POST",
        url: "/",
        data: {eventName:eventName}
    })
    .done(function(res){
        window.location.href = "/events";
    })
    .fail(function(){
        console.log("OPS");
    })
}

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
