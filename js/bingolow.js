function phraseList() {
   var phrases = [
      "Thank you, thank you thank you",
      "Bob's your uncle",
      "Dave's Party Principle",
      "Doodly doodly doo",
      "Elephants all the way down",
      "Shiver me timbers",
      "**sips diet pepsi**",
      "Follow the tail of breadcrumbs (all the way to gramma's house)",
      "Here we go!",
      "But wait a second!",
      "Whooooooooooooooooo",
      "**breaks chalk**",
      "Heart be still!",
      "Proofo el finito (as they say in Mexico)",
      "Give me a number, x, thank you!",
      "Piece of cake",
      "Just like that",
      "The only conclusion a thinking person can make...",
      "Imagine if you will",
      "But! My Friends!",
      "Are you buying that?"
                 ]
   return phrases;
}

function generateBingo() {

   // clear current card styles;
   removeClass(document.body,"blackout");
   removeClass(document.getElementById("title"),"blackout-title-header");
   removeClass(document.getElementById("footer"),"blackout-footer");
   removeClass(document.getElementById("got-bingo"),"bingoed");


   // Bingo bsize
   var bsize = 4;
   var csize = 800 / bsize;

   // Our Phrases :)
   var phrases = shuffle(phraseList());

   // Initialize cells arrays
   var cells = new Array(bsize);
   for (var i = 0; i < bsize; i++) {
      cells[i] = new Array(bsize);
   }

   var tableheader = document.getElementById("bingoheader");
   tableheader.setAttribute('width',(csize*bsize)+"px");

   var table = document.getElementById("bingotable");
   table.setAttribute('width',(csize*bsize) + "px");

   for (var i = 0; i < bsize; i++) {
      var rname = 'r'+i

      var row = document.getElementById(rname);
      if( row == null){
         row = document.createElement('tr');
         row.setAttribute('id',rname);
         row.setAttribute('height',csize+"px");
         table.appendChild(row);
      }

      for(var j = 0; j < bsize; j++){
         var cellname = 'r'+i+'c'+j;
         cells[i][j] = document.getElementById(cellname);

         if( cells[i][j] == null){

            cells[i][j] = document.createElement('td');
            var cellname = 'r'+i+'c'+j
            cells[i][j].setAttribute('id',cellname);
            row.appendChild(cells[i][j]);
         }

         // as long as we have phrases left over...
         if((i*bsize)+j < phrases.length){

            cells[i][j].innerHTML = phrases[(i*bsize)+j];

         }

         // set the table to be "clickable"
         // hover is done with css
         cells[i][j].onclick = function(e){
            var target = (e || window.event).target;

            if(! target.className.match(/clicked/)){
               addClass(target,"clicked");
            }else{
               removeClass(target, "clicked");
            }

            var bingo = document.getElementById('got-bingo');
            if(checkBingo(bsize)){
               addClass(bingo,"bingoed");
            }else{
               removeClass(bingo,"bingoed");
            }
         }

         // make sure that these cells can't be selected
         cells[i][j].className = "noselect";
      }
   }

   // show the filled in card
   var card = document.getElementById("bingocard");
   card.style.visibility = 'visible';

   // show the print button
   var print = document.getElementById("print-btn");
   print.style.visibility = 'visible';

}

// given the clicked cell, check for bingo
function checkBingo(bsize) {

   var nchecked = 0;
   var blackout = 0;

   // check the rows, as well as blackout
   var bingo = false;
   for (var x=0; x < bsize; x++) {
      nchecked = 0;
      for (var y=0; y < bsize; y++) {
         if (document.getElementById('r'+x+'c'+y).className.match(/clicked/)) {
            nchecked++;
            blackout++;
         }
      }
      if(nchecked == bsize){
         bingo = true;
      }
   }
   // easter egg when you black out the board
   if (blackout == (bsize*bsize)){
      addClass(document.body, "blackout");
      addClass(document.getElementById('footer'), "blackout-footer");
      addClass(document.getElementById('title'), "blackout-title-header");
   }else{
      removeClass(document.body, "blackout");
      removeClass(document.getElementById('footer'),"blackout-footer");
      removeClass(document.getElementById('title'), "blackout-title-header");;
   }
   // either way, if we got a row bingo...
   if (bingo){
      return true;
   }

   // check the columns
   for (var y=0; y < bsize; y++) {
      nchecked = 0;
      for (var x=0; x < bsize; x++) {
         if (document.getElementById('r'+x+'c'+y).className.match(/clicked/)) {
            nchecked++;
         }
      }
      if(nchecked == bsize){
         return true;
      }
   }

   // check the two diagonals
   nchecked = 0;
   for(var p=0; p < bsize; p++) {
      if (document.getElementById('r'+p+'c'+p).className.match(/clicked/)) {
         nchecked++;
      }
   }
   if(nchecked == bsize){
      return true;
   }

   nchecked = 0;
   for(var p=0; p < bsize; p++) {
      if (document.getElementById('r'+(bsize-p-1)+'c'+p).className.match(/clicked/)) {
         nchecked++;
      }
   }
   if(nchecked == bsize){
      return true;
   }


   // if non of the checks have produced a true, there is no bingo :/
   return false;
}

function addClass(target, classToBeAdded){
   if(! target.className.match(classToBeAdded)){
      target.className = target.className + " " + classToBeAdded;
   }
}
function removeClass(target, classToBeRemoved){
   var re = new RegExp("(?:^|\\s)"+classToBeRemoved+"(?!\\S)","g");
   target.className = target.className.replace(re, '' );
}



// http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
