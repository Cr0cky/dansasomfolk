// MENYN

if (sessionStorage['nav']) {
  document.getElementById(sessionStorage.getItem("nav")).className += " active"
}


document.getElementsByClassName("icon")[0].addEventListener("click", function(){
  myFunction();
});

function myFunction() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// Tillägg för aktiv länk
// Get the container element
let btnContainer = document.getElementById("myTopnav");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    // If there's no active class
    if (current.length > 0) { 
      current[0].className = current[0].className.replace(" active", "");
    }
    
    sessionStorage.setItem("nav", this.id);
  });
}        



/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/



// PARALLAX
// init controller
// Indexsidan
var controller = new ScrollMagic.Controller();

// Parallax background
// ROW 1
new ScrollMagic.Scene({
        triggerElement: "#parallax",
        triggerHook: "onEnter",
    })
    .duration('200%')
    .setTween("#parallax", {
        backgroundPosition: "50% 100%",
        ease: Linear.easeNone
    })
    //.addIndicators() // for debugging purposes
    .addTo(controller);
	
// ROW 2	
new ScrollMagic.Scene({
        triggerElement: "#slidein",
        triggerHook: "onLeave",
    })
    .setPin("#slidein")
    //.addIndicators() // add indicators (requires plugin)
    .addTo(controller);
 
 
// ROW 3 
new ScrollMagic.Scene({
        triggerElement: "#slidein2",
        triggerHook: "onLeave",
    })
    .setPin("#slidein2")
    //.addIndicators() // add indicators (requires plugin)
    .addTo(controller);
		
	
	

 
 
 
 //Fly in from the bottom
 var fromBottomTimeline = new TimelineMax();
var fromBottomFrom = TweenMax.from("#left", 1, {
    y: 300
});
var fromBottomTo = TweenMax.to("#left", 1, {
    y: 0
});
fromBottomTimeline
    .add(fromBottomFrom)
    .add(fromBottomTo);
 
new ScrollMagic.Scene({
        triggerElement: "#slidein2",
        offset: 200,
    })
    .setTween(fromBottomTimeline)
    .duration(400)
    //    .reverse(false)
    //.addIndicators() // add indicators (requires plugin)
    .addTo(controller);
	
	

// Övriga sidor
var mainPageController = new ScrollMagic.Controller();
// ROW 1
new ScrollMagic.Scene({
        triggerElement: "#parallaxDansgrupper",
        triggerHook: "onEnter",
    })
    .duration('200%')
    .setTween("#parallaxDansgrupper", {
        backgroundPosition: "0% 0%",
        ease: Linear.easeNone
    })
    //.addIndicators() // for debugging purposes
    .addTo(mainPageController);



/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/




// Overlay för presentation av dansgrupper
var silverspannet = document.getElementById("silverspannet");
var silverspannetOverlay = document.getElementById("overlay");

//silverspannet.addEventListener("click", function() {silverspannetOverlay.style.display = "block";}, false);
//silverspannetOverlay.addEventListener("click", function() {silverspannetOverlay.style.display = "none";}, false);







/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/






//TweenLite.to(graph, 2.5, { ease: Elastic.easeOut.config(1, 0.3), y: -500 });
//TweenMax.to("#developerName", 13, {x:300, ease:Elastic.easeOut});
//TweenMax.to("#developerName", 13, {left:"-=120px"});








/*************************************************NETLIFY CMS*************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/

const ingressAktuellt = document.getElementById('ingressAktuellt');
const sidTitelAktuellt = document.getElementById('sidTitelAktuellt');
const newsFromCMS = document.getElementById('newsFromCMS');

// Plockar ut namnet på aktuell HTML-sida.
let getPageName = () => {
  let lastSlashAt = window.location.toString().lastIndexOf("/", window.location.toString().length);
  return window.location.toString().slice(lastSlashAt);

}
console.log(getPageName());


if(getPageName() === "/aktuellt.html"){
  console.log("Hepp!")
}


let data = fetch('../md/aktuellt.md')
  .then(response => response.text())
  .then(result => {

    // Konverterar YAML till objekt.
    let yamlAsObject = yamlFront.loadFront(result);
    console.log(yamlAsObject);
    // Konverterar markdown till HTML.
    converter = new showdown.Converter();
    let description = converter.makeHtml(yamlAsObject.description);
    let title = converter.makeHtml(yamlAsObject.title);
  

    // Ställer in rubrik för sida, och ingress.
    ingressAktuellt.innerHTML =  description;
    sidTitelAktuellt.innerHTML = title;

    // Funktioner för att behandla HTML-taggar.
    function stripHtml(html){
      let doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    }
    function paragraphToDiv(html){
      return (html.replace("<p>", "<div>")).replace("</p>", "</div>");
    }
    
    var dateOptions = {  
      year: "numeric",  
      month: "long",  
      day: "numeric" 
    };

    // Loopar in HTML i DOM.
    (yamlAsObject.intro.blurbs).map(function(key, index){
      let mallForHTML = `
      <hr class="hrDansgrupper">
      <div class="dansgrupp">
        <div class="dansgruppRubrik">
          <h1 class="aktuelltRubrik">` + paragraphToDiv(converter.makeHtml(key.title)) + `</h1>`
          + stripHtml(converter.makeHtml((new Date(key.date)).toLocaleDateString("se-FI", dateOptions))) + `
        </div>
        <div class="dansgruppWrapper">
          <div class="left">	
            <div class="bildWrapper">
              <img src="../` + key.image +`" class="bildDansgrupp" alt="Nyhetsbild">
            </div>
          </div>
          <div class="right">` + paragraphToDiv(converter.makeHtml(key.body)) + `</p>
          </div>
        </div>
      </div>
    `;
    newsFromCMS.innerHTML += mallForHTML;
  });
});
