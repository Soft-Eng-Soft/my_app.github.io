var ProjectID = "";
var tody;
var update = false;
var proidshw = false;

// Initialize the app
window.onload = function() {
  // Set up theme
  setupTheme();

  // Initialize date
  var d = new Date();
  tody = d.toISOString().split('T')[0];
  document.getElementById("txtdate").innerHTML = formatDate(tody);

  // Hide project ID elements initially
  document.getElementById("ProjectID").style.display = 'none';
  document.getElementById("btnvaseID").style.display = 'none';

  // Check if browser supports localStorage
  if (typeof (Storage) !== "undefined") {
    document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
    document.getElementById("name").style.display = 'flex';
    document.getElementById("phone").style.display = 'flex';
    document.getElementById("slctime").style.display = 'flex';
    document.getElementById("btnsubmt").style.display = 'block';
    document.getElementById("btnconn").style.display = 'block';

    // Get saved project ID
    ProjectID = localStorage.getItem("FirebaseID");
    var baseurl = ProjectID + "/" + tody + ".json";

    // Remove old data
    removolddate(ProjectID);
  } else {
    // Hide form elements if localStorage not supported
    document.getElementById("name").style.display = 'none';
    document.getElementById("phone").style.display = 'none';
    document.getElementById("slctime").style.display = 'none';
    document.getElementById("btnsubmt").style.display = 'none';
  }

  // Load appointments
  if (ProjectID) {
    GetName(baseurl);
  }

  // Add touch event listeners for better mobile experience
  addTouchListeners();

  // Detect mobile device and adjust UI accordingly
  detectMobileDevice();
};

// Format date for better display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ar-SA', options);
}

// Set up theme functionality
function setupTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Toggle between light and dark theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);

  // Add haptic feedback if available
  if ('vibrate' in navigator) {
    navigator.vibrate(50);
  }
}

// Add touch event listeners for better mobile experience
function addTouchListeners() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('touchstart', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.touches[0].clientX - rect.left - size / 2;
      const y = e.touches[0].clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Prevent double tap zoom on iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// Detect mobile device and adjust UI accordingly
function detectMobileDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Adjust font sizes for better readability on mobile
    document.documentElement.style.setProperty('--mobile-adjustment', '1');

    // Add swipe gestures if needed
    addSwipeGestures();

    // Adjust viewport for better mobile experience
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }
  }
}

// Add swipe gestures for navigation
function addSwipeGestures() {
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - could be used for navigation
        console.log('Swipe left');
      } else {
        // Swipe right - could be used for navigation
        console.log('Swipe right');
      }
    }
  }
}

// Save project ID
function saveID() {
  if (document.getElementById("ProjectID").value !== "") {
    ProjectID = document.getElementById("ProjectID").value;

    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("FirebaseID", document.getElementById("ProjectID").value);
      document.getElementById("ProjectID").style.display = 'none';
      document.getElementById("btnvaseID").style.display = 'none';

      var baseurl = ProjectID + "/" + tody + ".json";
      GetName(baseurl);

      // Show success feedback
      showFeedback('تم حفظ معرّف المشروع بنجاح');
    } else {
      document.getElementById("error").innerHTML = "عذراً، متصفحك لا يدعم التخزين المحلي...";
    }
  }
}

// Show/hide project ID input
function showfire() {
  if (!proidshw) {
    proidshw = true;
    document.getElementById("ProjectID").style.display = 'flex';
    document.getElementById("btnvaseID").style.display = 'block';
    document.getElementById("ProjectID").value = localStorage.getItem("FirebaseID") || "";

    // Focus on input for better UX
    setTimeout(() => {
      document.getElementById("ProjectID").focus();
    }, 300);
  } else {
    document.getElementById("ProjectID").style.display = 'none';
    document.getElementById("btnvaseID").style.display = 'none';
    proidshw = false;
  }
}

// Remove old date records
function removolddate(Url) {
  try {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url + ".json", false);
    xmlHttp.send(null);

    var obj = JSON.parse(xmlHttp.responseText);

    for (var k in obj) {
      var tdate = new Date(k);
      var tdy = new Date(tody);

      if (tdate < tdy) {
        xmlHttp.open("DELETE", Url + "/" + k + ".json", false);
        xmlHttp.send(null);
      }
    }
  } catch (e) {
    document.getElementById("error").innerHTML = "خطأ في الاتصال بالإنترنت";
  }
}

// Get appointment names
function GetName(Url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", Url, false);

  try {
    xmlHttp.send(null);
  } catch (e) {
    document.getElementById("error").innerHTML = "خطأ في الاتصال بالإنترنت";
    return;
  }

  if (xmlHttp.responseText === "null") {
    return;
  }

  var obj = JSON.parse(xmlHttp.responseText);
  var dv = [];
  var val = [];

  // Extract keys and values
  for (var k in obj) {
    dv.push(k);
    val.push(obj[k]);
  }

  // Clear existing appointments
  const mydv = document.getElementById('mydiv');
  while (mydv.firstChild) {
    mydv.removeChild(mydv.lastChild);
  }

  // Process values
  for (let i = 0; i < val.length; i++) {
    if (val[i] !== null) {
      val[i] = val[i].replace(':', '');
    }
  }

  val.sort();

  // Extract appointment data
  var appary = new Array();
  var nameary = new Array();
  var phonary = new Array();

  for (let i = 0; i < val.length; i++) {
    if (val[i] !== null) {
      var myary = (val[i]).split(";");
      appary.push(myary[0]);
      nameary.push(myary[1]);
      phonary.push(myary[2]);
    }
  }

  // Create appointment elements
  for (let i = 0; i < nameary.length; i++) {
    const a = document.createElement('a');
    a.setAttribute('class', 'button');

    const s1 = document.createElement('span');
    const s2 = document.createElement('span');

    s1.setAttribute('class', 'span span1');
    var aptm = "";

    aptm = appary[i].replace("00", ":00");
    aptm = aptm.replace("30", ":30");

    s1.innerHTML = nameary[i];
    s2.innerHTML = aptm;

    a.id = parseInt(dv[i], 10) + 1;

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
      document.getElementById("phone").value = phn;
      document.getElementById("name").setAttribute('readonly', true);
      document.getElementById("phone").setAttribute('readonly', true);

      // Scroll to form for better UX on mobile
      document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });

    // Add touch events for better mobile interaction
    a.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });

    a.addEventListener('touchend', function() {
      this.style.transform = 'scale(1)';
    });

    mydv.appendChild(a);

    var mybr = document.createElement('br');
    mydv.appendChild(mybr);
  }

  // Add animation to appointment items
  animateAppointmentItems();
}

// Animate appointment items when they appear
function animateAppointmentItems() {
  const items = document.querySelectorAll('#mydiv .button');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';

      setTimeout(() => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 50);
    }, index * 50);
  });
}

// Save appointment name
async function Save_Name() {
  document.getElementById("name").removeAttribute('readonly');
  document.getElementById("phone").removeAttribute('readonly');

  if (!update) {
    var name = document.getElementById("name").value.replace(';', '');
    var phone = document.getElementById("phone").value;
    var tim = document.getElementById("slctime");
    var tmval = tim.options[tim.selectedIndex].text;

    var data = name + ";" + tmval + ";" + phone.replace(';', '');

    var baseurl = ProjectID + "/" + tody + "/";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.statusText !== "OK") {
        document.getElementById("error").innerHTML = "معرّف مشروع Firebase غير صالح.";
        showFeedback('خطأ في حفظ الحجز', 'error');
      } else {
        document.getElementById("error").innerHTML = "";
        showFeedback('تم حفظ الحجز بنجاح', 'success');
      }
    }

    xmlhttp.open("PUT", baseurl + name + ".json", true);
    xmlhttp.setRequestHeader('Content-type', 'text/plain;');
    xmlhttp.send(""" + data + """);
  } else {
    update = false;

    var name = document.getElementById("name").value.replace(';', '');
    var phone = document.getElementById("phone").value;
    var tim = document.getElementById("slctime");
    var tmval = tim.options[tim.selectedIndex].text;

    var data = tmval + ";" + name + ";" + phone.replace(';', '');

    var baseurl = ProjectID + "/" + tody + "/";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.statusText !== "OK") {
        document.getElementById("error").innerHTML = "معرّف مشروع Firebase غير صالح.";
        showFeedback('خطأ في تحديث الحجز', 'error');
      } else {
        document.getElementById("error").innerHTML = "";
        showFeedback('تم تحديث الحجز بنجاح', 'success');
      }
    }

    xmlhttp.open("PUT", baseurl + name + ".json", true);
    xmlhttp.setRequestHeader('Content-type', 'text/plain;');
    xmlhttp.send(""" + data + """);
  }

  let delayres = await delay(2000);

  var nurl = ProjectID + "/" + tody + ".json";

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";

  GetName(nurl);
}

// Show feedback message to user
function showFeedback(message, type = 'success') {
  // Create feedback element if it doesn't exist
  let feedback = document.getElementById('feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'feedback';
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.padding = '12px 24px';
    feedback.style.borderRadius = '8px';
    feedback.style.color = 'white';
    feedback.style.fontWeight = 'bold';
    feedback.style.zIndex = '9999';
    feedback.style.opacity = '0';
    feedback.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(feedback);
  }

  // Set message and style based on type
  feedback.textContent = message;
  feedback.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';

  // Show feedback
  feedback.style.opacity = '1';

  // Hide feedback after delay
  setTimeout(() => {
    feedback.style.opacity = '0';
  }, 3000);

  // Add haptic feedback if available
  if ('vibrate' in navigator) {
    navigator.vibrate(type === 'success' ? [50] : [50, 50, 50]);
  }
}

// Delay function
const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

// Delete appointment name
async function Delete_Name() {
  update = false;
  document.getElementById("btndelet").style.display = 'none';

  var baseurl = ProjectID + "/" + tody + "/";

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.statusText !== "OK") {
      document.getElementById("error").innerHTML = "معرّف مشروع Firebase غير صالح.";
      showFeedback('خطأ في حذف الحجز', 'error');
    } else {
      document.getElementById("error").innerHTML = "";
      showFeedback('تم حذف الحجز بنجاح', 'success');
    }
  }

  xmlhttp.open("DELETE", baseurl + btnid + ".json", true);
  xmlhttp.setRequestHeader('Content-type', 'text/plain;');
  xmlhttp.send();

  let delayres = await delay(2000);

  var nurl = ProjectID + "/" + tody + ".json";

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";

  GetName(nurl);
}
