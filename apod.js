// use API key for apod url
const key = 'PA48QaSw2sAmi62iG2KjVtlMrYLsNgYDIKr4Apcd';
let date = new Date().toJSON().slice(0,10);
let url = 'https://api.nasa.gov/planetary/apod?api_key=' + key + '&date=' + date;

// Get the DOM elements to change
const domImage = document.getElementById('nasa-image');
const domDate = document.getElementById('header-date');
const domDateButton  = document.getElementById("date-submit")

// run getImage function on page load
getImage();

//disable datepicker button until a date has been entered
domDateButton.disabled = true;

// function to remove disabled style and state from button
function checkDisabled() {
  if (domDateButton && domDateButton.value) {
    domDateButton.disabled = false;
    domDateButton.classList.remove("disabled");
  }
}

// main function to retrieve the apod
function getImage() {
  fetch(url)
  // When a response is received check it
  .then(response => {
    // If the request is successful, convert it to JSON and return it
    if (response.ok) {
      return response.json();
    }
    // If the request fails throw an error which will be caught below
    throw Error(response.statusText);
  })
  // When the JSON conversion is done and returned, process it
  .then(json => {
    //show info in console for debuging
    console.log(json);
    console.log(date);
    // send the selected json data to the dom elements
    domImage.src = json.url;
    domDate.innerHTML = json.date;
  })
  .catch(err => console.log(err.message));
}

// function to change the date via the datepicker and update the image
function checkDate() {
  //use the simple datepicker to update the image
  let selectedText = document.getElementById('datepicker').value;
  date = new Date(selectedText).toJSON().slice(0,10);
  url = 'https://api.nasa.gov/planetary/apod?api_key=' + key + '&date=' + date;
  // request the image data
  getImage();
}
