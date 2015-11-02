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
      "Heat be still!",
      "Proofo el finito (as they say in Mexico)",
      "Give me a number, x, thank you!",
      "Piece of cake",
      "Just like that",
      "The only conclusion a thinking person can make...",
      "Imagen if you will",
      "But! My Friends!",
      "Are you buying that?"
                 ]
   return phrases;
}

function generateBingo() {

   console.log("hello world");

   var cells = new Array(5);
   for (var i = 0; i < 5; i++) {
      cells[i] = new Array(5);
   }

   // a bit of a hack...
   cells[0][0] = document.getElementById("r0c0");
   cells[0][1] = document.getElementById("r0c1");
   cells[0][2] = document.getElementById("r0c2");
   cells[0][3] = document.getElementById("r0c3");
   cells[0][4] = document.getElementById("r0c4");
   cells[1][0] = document.getElementById("r1c0");
   cells[1][1] = document.getElementById("r1c1");
   cells[1][2] = document.getElementById("r1c2");
   cells[1][3] = document.getElementById("r1c3");
   cells[1][4] = document.getElementById("r1c4");
   cells[2][0] = document.getElementById("r2c0");
   cells[2][1] = document.getElementById("r2c1");
   cells[2][2] = document.getElementById("r2c2");
   cells[2][3] = document.getElementById("r2c3");
   cells[2][4] = document.getElementById("r2c4");
   cells[3][0] = document.getElementById("r3c0");
   cells[3][1] = document.getElementById("r3c1");
   cells[3][2] = document.getElementById("r3c2");
   cells[3][3] = document.getElementById("r3c3");
   cells[3][4] = document.getElementById("r3c4");
   cells[4][0] = document.getElementById("r4c0");
   cells[4][1] = document.getElementById("r4c1");
   cells[4][2] = document.getElementById("r4c2");
   cells[4][3] = document.getElementById("r4c3");
   cells[4][4] = document.getElementById("r4c4");


   // get the phrases, in some order
   var phrases = shuffle(phraseList());

   var x=y=0;
   var i=0;
   while(i < phrases.length && i < 25) {
      cells[x][y].innerHTML = phrases[i];

      y++;
      i++;
      if(y==5){
         x++;
         y=0;
      }
   }

   // show the filled in card
   var card = document.getElementById("BingoCard");
   card.className = card.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );

   // show the print button
   var print = document.getElementById("print-btn");
   print.className = print.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );

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
