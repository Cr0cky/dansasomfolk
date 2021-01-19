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

const sidTitel = document.getElementById('sidTitel');
const ingress = document.getElementById('ingress');
const fromCMS = document.getElementById('fromCMS');

// Plockar ut namnet på aktuell HTML-sida.
let getPageName = () => {
  let lastSlashAt = window.location.toString().lastIndexOf("/", window.location.toString().length);
  return window.location.toString().slice(lastSlashAt);

}
console.log(getPageName());

let data = fetch('../md' + getPageName().replace(".html", ".md"))
  .then(response => response.text()).then(result => {
    console.log(result);
    // Konverterar YAML till objekt.
    let yamlAsObject = yamlFront.loadFront(result);
    console.log(yamlAsObject);
  });

// Kollar om script som krävs för CMS:et finns med..
let scriptsAsArray = Array.prototype.slice.call(document.getElementsByTagName('script'));
let mappedScripts = scriptsAsArray.map(function (value, index){

  //if(scriptsAsArray[index].src.includes("yamlFront.js")){

    // Hämtar data från aktuell HTML-sida   Tanken här är att alla HTML-sidor har samma namn som respektive MD-fil.
    let data = fetch('../md' + getPageName().replace(".html", ".md"))
    .then(response => response.text()).then(result => {

      console.log(result);
      // Konverterar YAML till objekt.
      let yamlAsObject = yamlFront.loadFront(result);
      //console.log(yamlAsObject);
      // Konverterar markdown till HTML.
      converter = new showdown.Converter();
      let description = converter.makeHtml(yamlAsObject.description);
      let title = converter.makeHtml(yamlAsObject.title);


      // Ställer in rubrik för sida, och ingress.
      sidTitel.innerHTML = title;
      ingress.innerHTML =  description;


      // Funktioner för att behandla HTML-taggar.
      function stripHtml(html){
        let doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
      }
      function paragraphToDiv(html){
        return (html.replace("<p>", "<div>")).replace("</p>", "</div>");
      }
      function paragraphToSpan(html){
        return (html.replace("<p>", "<span>")).replace("</p>", "</span>");
      }
      
      var dateOptions = {  
        year: "numeric",  
        month: "long",  
        day: "numeric" 
      };

      // Loopar in HTML i DOM.
      (yamlAsObject.intro.blurbs).map(function(key, index){
        if(getPageName() === "/aktuellt.html"){
          let mallForHTMLAktuellt = `
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
              <div class="right">` + paragraphToDiv(converter.makeHtml(key.body)) + `
              </div>
            </div>
          </div>
        `;
        fromCMS.innerHTML += mallForHTMLAktuellt;
        }
        else if(getPageName() === "/dansgrupper.html"){

          let http = "";
          if(key.webb !== ""){
            http = `<a href="` + key.webb + `">` + stripHtml(converter.makeHtml(key.title)) + `</a>`;
          }
          let mallForHTMLDansgrupp = `
            <hr class="hrDansgrupper">
            <div class="dansgrupp">
              <div class="dansgruppRubrik">
                <h1>` + paragraphToDiv(converter.makeHtml(key.title)) + `</h1>
              </div>
              <div class="dansgruppWrapper">
                <div class="left">	
                  <div class="bildWrapper">
                    <img src="` + key.image +`" class="bildDansgrupp" alt="Dansgruppens övningslokal.">
                  </div>
                </div>
                <div class="right">
                ` + paragraphToDiv(converter.makeHtml(key.body)) + `
                  <br>
                  <br>
                  <b>Plats: </b>` + paragraphToSpan(converter.makeHtml(key.plats)) + `
                  <br>
                  <b>Tid: </b>` + paragraphToSpan(converter.makeHtml(key.tid)) + `
                  <br>
                  <b>Ledare: </b>` + paragraphToSpan(converter.makeHtml(key.ledare)) + `
                  <br>
                  <b>Webb: </b> `+ http + `</a>
                </div>
              </div>
            </div>
          `;
          fromCMS.innerHTML += mallForHTMLDansgrupp;
        }
        else if(getPageName() === "/ovasjalv.html"){
          console.log(stripHtml(converter.makeHtml(key.http)));
          let mallForHTMLOvasjalv = `
            <div class="dansgrupp">
              <div class="dansgruppRubrik">
                <h1 class="aktuelltRubrik">` + paragraphToDiv(converter.makeHtml(key.title)) + `</h1>
                7 Juni 2020
              </div>
              <div class="dansgruppWrapper">
                <div class="left">	
                  <div class="youtubeWrapper">
                    <iframe src="` + stripHtml(converter.makeHtml(key.http)) + `"
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        class="youtubeVideo"
                        title="Dansvideo">
                    </iframe>
                  </div>
                </div>
                <div class="right">` + paragraphToDiv(converter.makeHtml(key.body)) + `</div>
              </div>
            </div>
            <hr class="hrDansgrupper">
          `;
          fromCMS.innerHTML += mallForHTMLOvasjalv;
        }
      });















    });
  //}
});

