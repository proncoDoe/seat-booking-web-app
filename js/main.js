

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const eventSelect = document.getElementById('event');


populateUI();


// you convert string in too ways in javascript + sign befor sintax or parseInt() function

let ticketPrice = parseInt(eventSelect.value);



// save select event indexbooking and price

function setEventsData(eventIndex, eventPrice){


    localStorage.setItem('selectedEventIndex', eventIndex);
    localStorage.setItem('selectedEventPrice', eventPrice);

    
}



// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
  
    const selectedEventIndex = localStorage.getItem('selectedEventIndex');
  
    if (selectedEventIndex !== null) {
      eventSelect.selectedIndex = selectedEventIndex;
    }
  }


// update count and total
function updateSelectedCount(){

    const selectedSeats = document.querySelectorAll('.row .seat.selected');


   // spread function
const seatsIndex =  [...selectedSeats].map((seat) => { return [...seats].indexOf(seat);});

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


const selectedSeatsCount = selectedSeats.length;

count.innerHTML = selectedSeatsCount;
total.innerHTML = selectedSeatsCount * ticketPrice;


}





// sellect an event

eventSelect.addEventListener('change', e => {

    // you convert string in too ways in javascript + sign befor sintax or parseInt() function
    ticketPrice = parseInt(e.target.value);

    updateSelectedCount();

    setEventsData(e.target.selectedIndex, e.target.value);

})



// seat click event

container.addEventListener('click', e => {

   if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){


    e.target.classList.toggle('selected');

    updateSelectedCount();

    
   }


});


// Initial count and total set
updateSelectedCount();
