function hi(){
    document.getElementById("hi").innerHTML="Hi! I' Am";
    document.getElementById("teja").innerHTML="Teja Nutakki";

}
function getAge(){
    var date1 = new Date("08/08/2000");
var date2 =new Date();
var Difference_In_Time = date2.getTime() - date1.getTime();
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
var age=Difference_In_Days/365;
var agedays=Math.round((age-Math.round(age))*100);
document.getElementById("dob").innerHTML="Age : " +Math.round(age) +" years "+agedays+" days";
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
    document.getElementById("teja").innerHTML="Welcome";
 document.getElementById("hi").innerHTML=welcome;


};
