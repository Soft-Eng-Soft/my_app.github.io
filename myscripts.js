
var ProjectID="";
var tody ;
var update = false;
var proidshw = false;



window.onload = function () {

  var d = new Date();
  tody = d.toISOString().split('T')[0];

  document.getElementById("txtdate").innerHTML = tody;

  document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
   // document.getElementById("btndelet").style.display = 'none';

  if (typeof (Storage) !== "undefined") {

    document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
    document.getElementById("name").style.display = 'flex';
    document.getElementById("phone").style.display = 'flex';
    document.getElementById("slctime").style.display = 'flex';
    document.getElementById("btnsubmt").style.display = 'block';

    document.getElementById("btnconn").style.display = 'block';
   
 
    ProjectID = localStorage.getItem("FirebaseID");   
   
    var baseurl = ProjectID + "/" + tody  + ".json";

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
   
   var baseurl = ProjectID  + "/" + tody  + ".json";
  // console.log(baseurl);

    GetName(baseurl);
  } else {
    document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
  
  }
}

function showfire(){
if(!proidshw)
{
  proidshw = true;
document.getElementById("ProjectID").style.display = 'flex';
  document.getElementById("btnvaseID").style.display = 'block'; 
  document.getElementById("ProjectID").value = localStorage.getItem("FirebaseID");  
}
 else
 {
  document.getElementById("ProjectID").style.display = 'none';
  document.getElementById("btnvaseID").style.display = 'none';   
  proidshw = false;
 } 
}



function removolddate(Url){
 
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
try{
 xmlHttp.send(null);
}
catch
{
document.getElementById("error").innerHTML = "خطأ بالاتصال بالانترنت"
}
 


  
if (xmlHttp.responseText === "null"){
 // console.log(xmlHttp.responseText);
  return;
} 

  var obj = JSON.parse(xmlHttp.responseText);

  
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
   

    s1.innerHTML = nameary[i];
    s2.innerHTML = aptm;


 a.id =parseInt(dv[i],10) +1 ;
  
    a.appendChild(s2);
  a.appendChild(s1);
  
    a.title = phonary[i];


    a.addEventListener('click', event => {

      update = true;    
      var appid = event.target.firstChild.innerHTML;
      var nm = event.target.lastChild.innerHTML;
      var phn = event.target.title;

      document.getElementById("slctime").value = appid;
     document.getElementById("name").value = nm;
     document.getElementById("phone").value =  phn;
    document.getElementById("name").setAttribute('readonly', true);
    document.getElementById("phone").setAttribute('readonly', true);
    
    });

    mydv.appendChild(a);

    var mybr = document.createElement('br');
    mydv.appendChild(mybr);

  }


}

 async function Save_Name(){


 document.getElementById("name").removeAttribute('readonly');
    document.getElementById("phone").removeAttribute('readonly');

  if(!update)
  {
 var name = document.getElementById("name").value.replace(';','');
  var phone = document.getElementById("phone").value;
  var tim = document.getElementById("slctime");
  var tmval = tim.options[tim.selectedIndex].text;

var data = name + ";" +  tmval + ";" + phone.replace(';','') ;

var baseurl = ProjectID  + "/" + tody  + "/";

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.statusText !== "OK") {
      document.getElementById("error").innerHTML = "Invalid Firebase Project ID.";
    } else {
      document.getElementById("error").innerHTML = "";
   
    }
  }

  xmlhttp.open("PUT", baseurl +  name + ".json", true);
  xmlhttp.setRequestHeader('Content-type', 'text/plain;');
 xmlhttp.send("\"" + data + "\"");

  }

 else
 {
  update = false;
  // document.getElementById("btndelet").style.display = 'none';

   var name = document.getElementById("name").value.replace(';','');
  var phone = document.getElementById("phone").value;
  var tim = document.getElementById("slctime");
  var tmval = tim.options[tim.selectedIndex].text;

var data = tmval + ";" + name + ";" + phone.replace(';','') ;

var baseurl = ProjectID  + "/" + tody  + "/";


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.statusText !== "OK") {
      document.getElementById("error").innerHTML = "Invalid Firebase Project ID.";
    } else {
      document.getElementById("error").innerHTML = "";
  
    }
  }
   
  xmlhttp.open("PUT", baseurl +  name + ".json", true);
  xmlhttp.setRequestHeader('Content-type', 'text/plain;');
 xmlhttp.send("\"" + data + "\"");


 }

let delayres = await delay(2000);

var nurl = ProjectID  + "/" + tody  + ".json";


 document.getElementById("name").value = "";
 document.getElementById("phone").value = "";
 
 GetName(nurl);  

}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};




async function Delete_Name(){
 
update = false;
   document.getElementById("btndelet").style.display = 'none';

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
   
  xmlhttp.open("DELETE", baseurl +  btnid + ".json", true);
  xmlhttp.setRequestHeader('Content-type', 'text/plain;');
 xmlhttp.send();



let delayres = await delay(2000);

 //var nurl = "https://app-db-df0f1-default-rtdb.asia-southeast1.firebasedatabase.app/Dr-Marthad.json";
// document.getElementById("error").innerHTML = baseurl + ".json";
var nurl = ProjectID  + "/" + tody  + ".json";


 document.getElementById("name").value = "";
 document.getElementById("phone").value = "";
 
 GetName(nurl);  
}
