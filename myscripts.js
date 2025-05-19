var AppID =0;
var ProjectID="";
var tody ;


window.onload = function () {


  var d = new Date();

  tody = d.toISOString().split('T')[0];

  document.getElementById("txtdate").innerHTML = tody;

  if (typeof (Storage) !== "undefined") {

    document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
    document.getElementById("name").style.display = 'flex';
    document.getElementById("phone").style.display = 'flex';
    document.getElementById("slctime").style.display = 'flex';
    document.getElementById("btnsubmt").style.display = 'flex';

  document.getElementById("btnconn").style.display = 'flex';
   
 
    ProjectID = localStorage.getItem("FirebaseID");   
   
    var baseurl = ProjectID + "/" + tody  + ".json";
   // console.log(baseurl);

   removolddate(ProjectID);

  }
  else{
    document.getElementById("name").style.display = 'none';
    document.getElementById("phone").style.display = 'none';
    document.getElementById("slctime").style.display = 'none';
    document.getElementById("btnsubmt").style.display = 'none';

  }

 // var baseurl = "https://app-db-df0f1-default-rtdb.asia-southeast1.firebasedatabase.app/Dr-Marthad.json";
  GetName(baseurl);  

 
}



function saveID() {

  if (document.getElementById("ProjectID").value !== "") {
    ProjectID = document.getElementById("ProjectID").value;
 
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("FirebaseID", document.getElementById("ProjectID").value);
    document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
   
  // var baseurl = ProjectID  + "/" + tody  + ".json";
  // console.log(baseurl);

   // GetName(baseurl);
  } else {
    document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
  
  }
}

function showfire(){
  document.getElementById("ProjectID").style.display = 'flex';
  document.getElementById("btnvaseID").style.display = 'flex'; 
  document.getElementById("ProjectID").value = localStorage.getItem("FirebaseID");   

}



function removolddate(Url){

 // console.log(Url + ".json");
 try{
 var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", Url + ".json", false); // false for synchronous request

  xmlHttp.send(null);

var obj = JSON.parse(xmlHttp.responseText);

for (var k in obj) {

  var tdate = new Date(k);
  var tdy = new Date(tody);
  // console.log(k);
  if (tdate < tdy)
  {
    xmlHttp.open("DELETE", Url +"/" + k + ".json", false); // false for synchronous request
    xmlHttp.send(null);
  // console.log("ok");
  }
  
}
 }
 catch
 {
document.getElementById("error").innerHTML = "خطأ بالاتصال بالانترنت"
 }
 

  //console.log(Url.replace(ProjectID,""));
}




function GetName(Url) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", Url, false); // false for synchronous request

  xmlHttp.send(null);

 
  
if (xmlHttp.responseText === "null"){
 // console.log(xmlHttp.responseText);
  return;
} 

  var obj = JSON.parse(xmlHttp.responseText);

  

  if(AppID == 0 && obj.length > 0)
  {
    AppID = obj.length - 1 ;
  }
  
 

  var dv = []
  for (var k in obj) {
    dv.push(k);
  }

  var val = []
  for (var k in obj) {
    val.push(obj[k]);
  }


  const mydv = document.getElementById('mydiv'); 

  while(mydv.firstChild){
    mydv.removeChild(mydv.lastChild);
  }

 for (let i = 0; i < val.length ; i++) {
   if (val[i] !== null)
   {
      val[i] = val[i].replace(':','');
   }

 }
val.sort();
 // val.sort(function(a, b){return b - a});
  
  var appary = new Array();
  var nameary = new Array();
  var phonary = new Array();


  for (let i = 0; i < val.length ; i++) {
    if (val[i] !== null)
    {

      var myary = (val[i]).split(";");
      appary.push(myary[0]);
      nameary.push(myary[1]);
      phonary.push(myary[2]);
    
    }    
  }



  for (let i = 0; i < nameary.length; i++) {

    const a = document.createElement('a');
    a.setAttribute('class', 'button');

    const s1 = document.createElement('span');
    const s2 = document.createElement('span');

    s1.setAttribute('class', 'span span1');
    var aptm="";

 aptm= appary[i].replace("00", ":00");
    aptm = aptm.replace("30", ":30");
   // aptm = aptm.replace(" ", "-");

    s1.innerHTML = nameary[i];
    s2.innerHTML = aptm;



  
    a.appendChild(s2);
  a.appendChild(s1);
  
    a.title = phonary[i];


    a.addEventListener('click', event => {

     // var btn = event.target;
      var appid = event.target.lastChild.innerHTML;
      var nm = event.target.firstChild.innerHTML;
      var phn = event.target.title;
console.log(appid);
      document.getElementById("slctime").value = 5;
     document.getElementById("name").value = nm;
     document.getElementById("phone").value =  phn;
    

    });

    mydv.appendChild(a);

    var mybr = document.createElement('br');
    mydv.appendChild(mybr);

  }


}

 async function Save_Name(){

  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var tim = document.getElementById("slctime");
  var tmval = tim.options[tim.selectedIndex].text;

var data = tmval + ";" + name.replace(';','') + ";" + phone.replace(';','') ;

var baseurl = ProjectID  + "/" + tody  + "/";

//console.log(tmval);

 // var baseurl = "https://app-db-df0f1-default-rtdb.asia-southeast1.firebasedatabase.app/Dr-Marthad/" ;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.statusText !== "OK") {
      document.getElementById("error").innerHTML = "Invalid Firebase Project ID.";
    } else {
      document.getElementById("error").innerHTML = "";
     // GetState(baseurl + ".json");
    }
  }
  AppID ++;
  xmlhttp.open("PUT", baseurl +  AppID + ".json", true);
  xmlhttp.setRequestHeader('Content-type', 'text/plain;');
 xmlhttp.send("\"" + data + "\"");



let delayres = await delay(2000);

 //var nurl = "https://app-db-df0f1-default-rtdb.asia-southeast1.firebasedatabase.app/Dr-Marthad.json";
// document.getElementById("error").innerHTML = baseurl + ".json";
var nurl = ProjectID  + "/" + tody  + ".json";


 document.getElementById("name").value = "";
 document.getElementById("phone").value = "";
 
 GetName(nurl);  

}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};



