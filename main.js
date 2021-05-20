// Collect HTML for future reference
const intro = document.querySelector('#intro');
const app = document.querySelector('#app');
const display = document.querySelector('#arena');
const msgBox = document.querySelector('.msg-box');

const ourForm = document.ourForm;

const formElms = document.querySelectorAll('form *');

const nextBtn = document.querySelector('#next');

let currentEl = 0;
/*
function showFormElement () {
  if (!formElms[currentEl].classList.contains('active')) {
    formElms[currentEl].classList.add('active');
  }
  
  if (currentEl > 1) {
    formElms[currentEl - 1].classList.add('prev-active');
    formElms[currentEl].classList;
  }
  
  if (currentEl === formElms.length) {
    currentEl = formElms.length - 1;
  }
  
  currentEl++;
}

nextBtn.addEventListener('click', showFormElement);
*/
/* (!) NEWLY ADDED */
// Store some colors
const BLUE = 'dodgerblue';
const GREEN = 'mediumseagreen';
const GRAYWHITE = '#ddd';
/* End NEWLY ADDED BLOCK */




// -- TIMER BEGINS BELOW --
// Create start time in minutes...
// You can add as much minutes as you want
let startingMins = 1;

// Derive time in seconds
let time = startingMins * 60;

// Create time interval
/* Here, we are assigning setInterval() to a variable so that we can stop the countdown when time elapses to avoid negative values
*/
let timeInterval = setInterval(updateTimer, 1000);

/*
  Create a function that will show the time output to HTML. It recieves a target HTML element, as well as an array of time metric objects as parameter.
*/
function renderTimer (target, timeSnap) {
    // Loop through the time metrics using .map() method
    const output = timeSnap.map(metric => {
      // Get state of the metric
      let state = metric.val <= 0 ? 'done' : 'running';
      
      // Store pulse animation class depending on if state === 'running'
      let pulse = state === 'running' ? 'pulsate' : '';
      
      // Variable to prefix zero to the metrics
      let prefixZero = metric.val < 10 ? '0' : '';
      
      // Create singular or plural labels
      let label = (metric.val === 1) ? metric.label : (metric.label + 's');
      
      // Finally, return a div for each metric
      return `
        <div class=${state}>
          <h1 class='time-val ${pulse}'>
            ${prefixZero + metric.val}
          </h1>
          <span>${label}</span>
        </div>
      `;
    }).join('');
    
    // Send the output to HTML
    target.innerHTML = output;
}

/*
  This function will run in our setInterval() and update time every 1 second. It achieves this by decrementing time.
*/
function updateTimer() {
  /* First, collect time metrics */
  
  // Derive days metric
  const days = Math.floor(time / 86400);
  // Derive hours metric
  const hours = Math.floor(time / 60 / 60);
  // Derive minutes metric
  const minutes = Math.floor(time / 60);
  // Derive seconds metric
  const seconds = time % 60;
  
  // Check if time has elapsed, so we can stop the countdown
  if (time <= 0) {
    // If so, stop the countdown
    clearInterval(timeInterval, 1000);
    // Show a success message
    msgBox.innerHTML = 'Countdown complete';
    // Give the message a background color
    msgBox.style.backgroundColor = 'mediumseagreen';
    // Animate the message
    msgBox.classList.add('pulsate');
    // Remove the animation class after 1 second
    setTimeout(function () {
      msgBox.classList.remove('pulsate');
    }, 1000);
  } else {
    /* If not, we still have time */
   
    // Just show a progress message
    msgBox.innerHTML = 'Countdown in progress...';
    // ...and give the message a background color as well
    msgBox.style.backgroundColor = 'dodgerblue';
  }
  
  /* Here we create an array of time metric objects using the values derived above */
  const snapshot = [
    {val: days, label: 'day'}, 
    {val: hours, label: 'hour'},
    {val: minutes, label: 'minute'}, 
    {val: seconds, label: 'second'},
  ];
  
  /* ...then we feed these values to the renderTimer function we created above. We also give it a target HTML element to use for it's purposes */
  renderTimer(display, snapshot);
  
  // Finally, we update time by decrement
  time--;
}

// The End

/* (!) NEWLY ADDED -
    This interval runs every 100 milliseconds to check if the time has elapsed and the body has darkmode
*/

setInterval(() => {
    if (document.body.classList.contains('dark-mode') && time <= 0) {
      display.style.boxShadow = `2px 2px 18px ${GREEN}`;
      display.querySelectorAll('div').forEach(box => box.style.borderColor = GREEN);
    } else if (!document.body.classList.contains('dark-mode') && time <= 0) {
      display.style.boxShadow = `2px 2px 18px ${GRAYWHITE}`;
      display.querySelectorAll('div').forEach(box => box.style.borderColor = GRAYWHITE);
    }
}, 100)

/* This simply switches between darkmode and lightmode by toggling the dark-mode class when the body is clicked */
document.body.addEventListener('click', (e) => {
  if (e.target === document.body) {
    document.body.classList.toggle('dark-mode')
  }
});

/* End NEWLY ADDED BLOCK */