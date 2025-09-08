
        // Theme toggle functionality appointments-list
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        const htmlElement = document.documentElement;
        
        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        updateThemeToggle(currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const theme = htmlElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggle(newTheme);
        });
        
        function updateThemeToggle(theme) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'الوضع الداكن';
            } else {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'الوضع الفاتح';
            }
        }
        
        // Set current date in Arabic
        function updateDate() {
            const dateElement = document.getElementById('txtdate');
            const today = new Date();
            
            // Format date for cross-browser compatibility
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let formattedDate;
            
            try {
               formattedDate = today.toLocaleDateString('ar-irq', options);
             // formattedDate = today.toLocaleDateString('en', options);
            } catch (e) {
                // Fallback for browsers that don't support toLocaleDateString with options
                const months = [
                    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                ];
                
                const days = [
                    "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
                ];
                
                const dayName = days[today.getDay()];
                const monthName = months[today.getMonth()];
                const date = today.getDate();
                const year = today.getFullYear();
                
                formattedDate = `${dayName}، ${date} ${monthName} ${year}`;
            }
            
            dateElement.textContent = formattedDate;
        }
        
        // Initialize date on page load
        updateDate();
        
        // Polyfill for forEach on NodeList for older browsers
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }
        
        // Polyfill for closest() method
        if (!Element.prototype.closest) {
            Element.prototype.closest = function(s) {
                var el = this;
                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);
                return null;
            };
        }
        
        // Polyfill for matches() method
        if (!Element.prototype.matches) {
            Element.prototype.matches = 
                Element.prototype.msMatchesSelector || 
                Element.prototype.webkitMatchesSelector;
        }
   




// old

var ProjectID="";
var tody ;
var update = false;
var proidshw = false;


// type Numeric in Phone
  document.getElementById("phone").addEventListener('input',function (e){
    e.target.value = e.target.value.replace(/[^0-9+]/g,'');
  });


window.onload = function () {

  var d = new Date();
  tody = d.toISOString().split('T')[0];

//  document.getElementById("txtdate").innerHTML = tody;  

 // document.getElementById("ProjectID").style.display = 'none';
//    document.getElementById("btnvaseID").style.display = 'none';
 

  if (typeof (Storage) !== "undefined") {

   // document.getElementById("ProjectID").style.display = 'none';
   // document.getElementById("btnvaseID").style.display = 'none';
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
      document.getElementById("fireconn").style.display = 'flex';

   // document.getElementById("name").style.display = 'none';
   // document.getElementById("phone").style.display = 'none';
   // document.getElementById("slctime").style.display = 'none';
   // document.getElementById("btnsubmt").style.display = 'none';

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
    document.getElementById("error").style.display = 'block';
    document.getElementById("error").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
  
  }
}

function showfire(){

if(!proidshw)
{
   // alert("Your message here."); 
  proidshw = true;
  document.getElementById("ProjectID").value = localStorage.getItem("FirebaseID");
   document.getElementById("fireconn").style.display = 'block';
  //  document.getElementById("ProjectID").style.display = 'flex';
  // document.getElementById("btnvaseID").style.display = 'block'; 
  // document.getElementById("ProjectID").value = localStorage.getItem("FirebaseID");  
}
 else
 {
  document.getElementById("fireconn").style.display = 'none';
  // document.getElementById("ProjectID").style.display = 'none';
  // document.getElementById("btnvaseID").style.display = 'none';   
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
  document.getElementById("error").style.display = 'block';
document.getElementById("error").innerHTML = "خطأ بالاتصال بالانترنت"
 }
 

  //console.log(Url.replace(ProjectID,""));
}



/**
 * Function to fetch and display data from a URL
 * Creates clickable elements with appointment information
 * @param {string} Url - The URL to fetch data from
 */
function GetName(Url) {
  var xmlHttp = new XMLHttpRequest();

  // Open synchronous request to the specified URL
  xmlHttp.open("GET", Url, false); // false for synchronous request
try{
    // Send the request
 xmlHttp.send(null);
}
catch
{
 // alert("خطأ بالاتصال بالانترنت");
document.getElementById("error").style.display = 'block';
document.getElementById("error").innerHTML = "خطأ بالاتصال بالانترنت"
}
 



if (xmlHttp.responseText === "null"){
 // console.log(xmlHttp.responseText);
  return;
} 

   // alert(xmlHttp.responseText);
  var obj = JSON.parse(xmlHttp.responseText);

/*
//   Off line Test
  var data = '{"محمد":"محمد;5:00 PM;07788","سعد":"سعد;2:00 PM;07778885"}' ;
  var obj = JSON.parse(data);
*/

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
      nameary.push(myary[0]);
      appary.push(myary[1]);      
      phonary.push(myary[2]);
    
    }    
  }



  for (let i = 0; i < nameary.length; i++) {

    const button = document.createElement('button');
    button.setAttribute('class', 'appointment-button');

    const nameElement = document.createElement('span');
    const timeElement = document.createElement('span');

    nameElement.setAttribute('class', 'appointment-name');
    var aptm="";

    timeElement.setAttribute('class', 'appointment-time');

 aptm= appary[i].replace("00", ":00");
    aptm = aptm.replace("30", ":30");
   

    nameElement.innerHTML = nameary[i];
    timeElement.innerHTML = aptm;


 button.id = parseInt(dv[i], 10) + 1;
  
    // Create a container for the appointment elements
    const container = document.createElement('div');
    container.setAttribute('class', 'appointment-container');
    
    // Add space between name and time
    const spaceElement = document.createElement('span');
    spaceElement.innerHTML = "&nbsp;&nbsp;&nbsp;";
    
    // Add elements to the container (name on right, time on left)
    container.appendChild(nameElement);
    container.appendChild(spaceElement);
    container.appendChild(timeElement);
    
    // Add container to the button
    button.appendChild(container);

  
    button.title = phonary[i];


    button.addEventListener('click', event => {

      update = true;    
      var timeValue = event.currentTarget.querySelector('.appointment-time').innerHTML;
      var nameValue = event.currentTarget.querySelector('.appointment-name').innerHTML;
      var phoneValue = event.currentTarget.title;
      
      // Set the time in the slctime select element
      const slctimeSelect = document.getElementById("slctime");
      const formattedTime = timeValue.replace(":", "");
      
      // Find and select the matching option
      for (let i = 0; i < slctimeSelect.options.length; i++) {
        if (slctimeSelect.options[i].text === timeValue) {
          slctimeSelect.selectedIndex = i;
          break;
        }
      }
     document.getElementById("name").value = nameValue;
     document.getElementById("phone").value =  phoneValue;
    document.getElementById("name").setAttribute('readonly', true);
   // document.getElementById("phone").setAttribute('readonly', true);
    
    });

    mydv.appendChild(button);

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
//  alert(data);
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
