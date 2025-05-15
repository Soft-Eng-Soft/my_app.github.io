var AppID =0;
var ProjectID="";
var tody ;


window.onload = function () {


  var d = new Date();
   tody = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();

  document.getElementById("txtdate").innerHTML = tody;

  if (typeof (Storage) !== "undefined") {

    document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
  document.getElementById("btnconn").style.display = 'flex';
   
 
    ProjectID = localStorage.getItem("FirebaseID");   
   
    var baseurl = ProjectID + "/" + tody  + ".json";
   // console.log(baseurl);

   removolddate(ProjectID);

  }

 // var baseurl = "https://app-db-df0f1-default-rtdb.asia-southeast1.firebasedatabase.app/Dr-Marthad.json";
  GetName(baseurl);  

  /*
  var xmlHttp = new XMLHttpRequest();
  var UpdateVisitsURL = "https://iotcar-2767a.firebaseio.com/FirebaseHomeVisits.json";

  xmlHttp.open("GET", UpdateVisitsURL, false);
  xmlHttp.send(null);
  var visits = xmlHttp.responseText;
  visits++;

  var newxmlHttp = new XMLHttpRequest();
  newxmlHttp.open("PUT", UpdateVisitsURL, true);
  newxmlHttp.setRequestHeader('Content-type', 'text/plain;');
  newxmlHttp.send(visits);
  */
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
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", Url + ".json", false); // false for synchronous request

  xmlHttp.send(null);

// console.log(xmlHttp.responseText);

var obj = JSON.parse(xmlHttp.responseText);

var dv = []
for (var k in obj) {
  dv.push(k);
 // console.log(k);
  if (k !== tody)
  {
    xmlHttp.open("DELETE", Url +"/" + k + ".json", false); // false for synchronous request
    xmlHttp.send(null);
  // console.log("ok");
  }
  
}

  //console.log(Url.replace(ProjectID,""));
}

function GetName(Url) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", Url, false); // false for synchronous request

  xmlHttp.send(null);
 
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
 // val.sort();
  val.sort();
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

  appary.sort(function(a,b){
    return a-b;
  });



var slctary = new Array();
var tm = document.getElementById("slctime");
    
for (let k=0; k< tm.options.length; k++)
{
  slctary.push(tm.options[k].innerHTML);
 // console.log(appary[k]);
}


//console.log(appary.length);

  for (let i = 0; i < appary.length ; i++) {
   // console.log(nameary[i]);   
    const a = document.createElement('a');
    a.setAttribute('class', 'button');
   
a.innerHTML = nameary[i]  + " ......  " +  slctary[i]   ;

    a.addEventListener('click', event => {
      var appid = event.target.id;
      var nm = event.target.innerHTML;
      var phn = event.target.title;

      document.getElementById("slctime").value = appid;
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
  var tmval = tim.value;

var data = tmval + ";" + name + ";" + phone ;

var baseurl = ProjectID  + "/" + tody  + "/";

console.log(baseurl);

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



