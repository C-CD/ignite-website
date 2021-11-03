//Preloader
// Wait for window load
  $(function() {
    //Gallery Page
     $(".filter-button").on("click",function(){
          var value = $(this).attr('data-filter');
          
          if(value == "all")
          {
              //$('.filter').removeClass('hidden');
              $('.gallery-item').show('1000');
          }
          else
          {
              $(".gallery-item").not('.'+value).hide('3000');
              $('.gallery-item').filter('.'+value).show('3000');
          }

          if ($(".filter-button").removeClass("selected")) {
              $(this).removeClass("selected");
          }
          $(this).addClass("selected");
      });
  });

     //Dropdown and dropdown sub menu
     $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
     }
      var $subMenu = $(this).next('.dropdown-menu');
      $subMenu.toggleClass('show');


      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass('show');
      });


      return false;
    });

//Mobile Menu
function openNav() {
  document.getElementById("mobileNav").style.width = "250px";

  $(function() {
    $("span.carousel-control-prev-icon").hide();
    $("span.carousel-control-next-icon").hide();
    $("ol.carousel-indicators").hide();
  })
}

function closeNav() {
  document.getElementById("mobileNav").style.width = "0";

  $(function() {
    $("span.carousel-control-prev-icon").show();
    $("span.carousel-control-next-icon").show();
    $("ol.carousel-indicators").show();
  })
}


/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content */
var dropdown = document.getElementsByClassName("mobile-dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}

//Home Clips
  const clipsPagination=document.querySelector(".clips-pagination");
  const clipsContainer=document.querySelector(".home-clips-container");
  const allClips=clipsContainer.children;
  const clipsContainerWidth=clipsContainer.offsetWidth;
  const margin=30;
   var clips=0;
   var totalItems=0;
   var jumpSlideWidth=0;


  /* item setup per slide */
 responsive=[
  {breakPoint:{width:0,clip:1}},
  {breakPoint:{width:1000,clip:2}}
 ]

 function load(){
     for(let i=0; i<responsive.length;i++){
      if(window.innerWidth>responsive[i].breakPoint.width){
        clips=responsive[i].breakPoint.clip
      }
     }
     start();
 }
 
 function start(){
   var totalItemsWidth=0
  for(let i=0;i<allClips.length;i++){
     /* width and margin setup of items */
    allClips[i].style.width=(clipsContainerWidth/clips)-margin + "px";
    allClips[i].style.margin=(margin/2)+ "px";
        totalItemsWidth+=clipsContainerWidth/clips;
        totalItems++;
  }

  /* thumbnail-container width set up */
  clipsContainer.style.width=totalItemsWidth + "px";

  /* slides clipsPagination number set up */
   const allSlides=Math.ceil(totalItems/clips);
     const ul=document.createElement("ul");
        for(let i=1;i<=allSlides;i++){
          const li=document.createElement("li");
               li.id=i;
               li.innerHTML=i;
               li.setAttribute("onclick","clipsPaginationlides(this)");
               ul.appendChild(li);
               if(i==1){
                li.className="activeClipPag";
               }
        }
        clipsPagination.appendChild(ul);
 }

    /* when click on numbers slide to next slide */
 function clipsPaginationlides(ele){
       // select clipsPagination children  'ul' element 
       const ul=clipsPagination.children;

       /* select ul children 'li' elements; */
      const li=ul[0].children
        
       
       var activeClipPag;

       for(let i=0;i<li.length;i++){
        if(li[i].className=="activeClipPag"){
          /* find who is now activeClipPag */
          activeClipPag=i;
          /* remove activeClipPag class from all 'li' elements */
          li[i].className="";
        }
       }
       /* add activeClipPag class to current slide */
       ele.className="activeClipPag";

       var numb=(ele.id-1)-activeClipPag;
          jumpSlideWidth=jumpSlideWidth+(clipsContainerWidth*numb);
       clipsContainer.style.marginLeft=-jumpSlideWidth + "px";
 }

window.onload=load();

