
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
                themeText.textContent = 'الوضع المظلم';
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
   
// popup

// Function to show the new appointment form as a modal
function showNewAppointmentForm() {
  document.getElementById("addnewapp").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
  // Prevent event bubbling to avoid immediate closing
  document.getElementById("addnewapp").addEventListener("click", function(event) {
    event.stopPropagation();
  });
}

// Function to hide the new appointment form modal
function hideNewAppointmentForm() {
  document.getElementById("addnewapp").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}


// Wrapper function for Save_Name that closes the modal after submission
function saveAppointmentAndCloseModal() {
  // Call the original Save_Name function
  
  Save_Name();
  
  // Close the modal after a short delay to allow the save operation to complete
  setTimeout(function() {
    hideNewAppointmentForm();
  }, 500);

}


// type Numeric in Phone
  document.getElementById("phone").addEventListener('input',function (e){
    e.target.value = e.target.value.replace(/[^0-9+]/g,'');
  });



// old

var ProjectID="";
var tody ;
var update = false;
var proidshw = false;



window.onload = function () {

  var d = new Date();
  tody = d.toISOString().split('T')[0];

  if (typeof (Storage) !== "undefined") {

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

  }

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
  document.getElementById("ProjectID").value = localStorage.getItem("FirebaseID");
   document.getElementById("fireconn").style.display = 'block'; 
}
 else
 {
  document.getElementById("fireconn").style.display = 'none';
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

  if (tdate < tdy)
  {
    xmlHttp.open("DELETE", Url +"/" + k + ".json", false); // false for synchronous request
    xmlHttp.send(null);
  }
  
}
 }
 catch
 {
   document.getElementById("error").style.display = 'block'; 
    document.getElementById("error").innerHTML = "خطأ الاتصال بالانترنت"
 }
 
}


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
   document.getElementById("error").style.display = 'block'; 
  document.getElementById("error").innerHTML = "خطأ الاتصال بالانترنت"
}

if (xmlHttp.responseText === "null"){
//  console.log(xmlHttp.responseText);
  return;
} 
  var obj = JSON.parse(xmlHttp.responseText);



//  var data = '{"محمد":"محمد;5:00 PM;078000348","سعد":"سعد;2:00 PM;07701100" , "خالد":"خالد;3:00 PM;07778885"  , "احمد":"احمد;3:00 PM;07900885"}' ;
  //var data = '{"aaa":"aaa;5:00 PM;078000348","bbb":"bbb;2:00 PM;07701100" , "ccc":"ccc;3:00 PM;07778885"  , "ddd":"ddd;3:00 PM;07900885"}' ;
// var obj = JSON.parse(data);

 
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

  var hiary =[];
  
  for (let i = 0; i < val.length ; i++) {
    if (val[i] !== null)
    {
      var myary = (val[i]).split(";");    
      hiary.push(myary);  
    } 
     
  }

     const sortedArray = sortArrayByTime(hiary);


     for (let i = 0; i < sortedArray.length; i++) {      

    const button = document.createElement('button');
    button.setAttribute('class', 'appointment-button');

    const nameElement = document.createElement('span');
    const timeElement = document.createElement('span');

    nameElement.setAttribute('class', 'appointment-name');  
    timeElement.setAttribute('class', 'appointment-time');

    nameElement.innerHTML = (sortedArray[i][0]);
    timeElement.innerHTML = (sortedArray[i][1]);


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
    button.title = (sortedArray[i][2]);

    button.addEventListener('click', event => {

      update = true;    
      var appid = event.currentTarget.querySelector('.appointment-time').innerHTML;
      var nm = event.currentTarget.querySelector('.appointment-name').innerHTML;
      var phn = event.currentTarget.title;
      
      // Set the time in the slctime select element
      const slctimeSelect = document.getElementById("slctime");
      const formattedTime = appid.replace(":", "");
      
      // Find and select the matching option
      for (let i = 0; i < slctimeSelect.options.length; i++) {
        if (slctimeSelect.options[i].text === appid) {
          slctimeSelect.selectedIndex = i;
          break;
        }
      }

     // document.getElementById("slctime").value = appid;
     document.getElementById("name").value = nm;
     document.getElementById("phone").value =  phn;
    document.getElementById("name").setAttribute('readonly', true);
    showNewAppointmentForm();
   // document.getElementById("phone").setAttribute('readonly', true);
    
    });

    mydv.appendChild(button);
    var mybr = document.createElement('br');
    mydv.appendChild(mybr);

  }


}



            // Function to convert time string to minutes
            function convertToMinutes(timeStr) {
             // console.log(timeStr);
                const [time, modifier] = timeStr.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                
                if (modifier === 'PM' && hours !== 12) {
                    hours += 12;
                } else if (modifier === 'AM' && hours === 12) {
                    hours = 0;
                }
               //  console.log(hours * 60 + minutes);
                return hours * 60 + minutes;
            }
            
            // Sort the array by time
            function sortArrayByTime(arr) {
                return [...arr].sort((a, b) => {
                    return convertToMinutes(a[1]) - convertToMinutes(b[1]);
                });
            }



 async function Save_Name(){
  update = false;
  
 var name = document.getElementById("name").value.replace(';','');

 if (name === "")
  { return; }
 
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


let delayres = await delay(3000);

var nurl = ProjectID  + "/" + tody  + ".json";


 document.getElementById("name").value = "";
 document.getElementById("phone").value = "";
 
 GetName(nurl);  

}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};
