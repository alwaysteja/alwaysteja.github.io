function hi(){
    document.getElementById("hi").innerHTML="Hi I' Am";
    document.getElementById("teja").innerHTML="Teja Nutakki";

}
function Greet(){
    var welcome;  
    var date = new Date();  
    var hour = date.getHours();  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    if (minute < 10) {  
      minute = "0" + minute;  
    }  
    if (second < 10) {  
      second = "0" + second;  
    }  
    if (hour < 12) {  
      welcome = "Good Morning";  
    } else if (hour < 17) {  
      welcome = "Good Afternoon";  
    } else {  
      welcome = "Good Evening";  
    }  
 document.getElementById("hi").innerHTML=welcome;
 document.getElementById("teja").innerHTML="Welcome to My page";


}