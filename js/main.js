$(document).on('ready', function() {
$.getJSON("js/config.json", function(json) {
// console.log(json[0]); // show the info it in firebug console
// alert(json.length)
var tabindex = 2;
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
        for (var sectionkey in json[key]) {
          if (sectionkey != "iconimage") {
            if (json[key].hasOwnProperty(sectionkey)) {

              // sets the Main Category row, presets the submenus:
              //console.log(sectionkey)
              $('.menu__wrapper').append('<a href="#' + sectionkey + '" tabindex="'+ tabindex++ +'"><span>'+sectionkey.replace(/_/g, ' ') + '</span><span class="optional" style="background-image:url('+json[key].iconimage+');"></span></a>');

              $('.submenu__scroller').addClass('owl-carousel').append('<div class="submenu__group" data-hash="'+sectionkey+'"><div class="submenu__elements"></div></div>');
              }
                for (var itemkey in json[key][sectionkey]) {
                  if (json[key][sectionkey].hasOwnProperty(itemkey)) {

                    //$('.submenu__wrapper').append('<div style="font-size:14px;text-indent:10px;">'+itemkey+'</div>');
                    //$('[data-title="'+sectionkey+'"]').append('<div>'+itemkey+'</div>');
                    let title = json[key][sectionkey][itemkey].title;
                    
                    // sets the submenu icon rows:
                    $('[data-hash="' + sectionkey + '"] .submenu__elements').append('<button class="submenu__item" data-title="' + title + '"><img src="' + json[key][sectionkey][itemkey].icon + '" alt="icon" /></button>');


                    // sets the content:
                     let titleBarConstant = '<div class="panel__wrapper ' + 
                        json[key][sectionkey][itemkey].type +
                        '" data-title="' + title + 
                        '" style="display:none"><div class="panel__title"><span>' + title + 
                        '</span><span>' + 
                        json[key][sectionkey][itemkey].date + 
                        '</span></div>';


                    if (json[key][sectionkey][itemkey].type == 'video') {
                      let posterframe = ''; // poster frame is optional.
                      if ('posterframe' in json[key][sectionkey][itemkey]) {
                          posterframe = 'poster="' + json[key][sectionkey][itemkey].posterframe + '" ';
                      }
                      let panelString = titleBarConstant + '<div class="panel__sidebar"><div class="panel__controls"><button class="panel__play">Play Video</button></div><div class="panel__body"><div class="panel__runtime">Runtime: ' + json[key][sectionkey][itemkey].runtime + '</div>' + json[key][sectionkey][itemkey].body + '</div></div><div class="panel__content-wrapper">';


                        if (json[key][sectionkey][itemkey].image.constructor === Array) {
                          let arraystring = '<div class="imagelayer owl-carousel">',
                            endarraystring = '</div>';

                            for ( elem in json[key][sectionkey][itemkey].image) {
                            arraystring += '<video style="width:' + json[key][sectionkey][itemkey].width + 'px" ' + posterframe + 'style="width:'+json[key][sectionkey][itemkey].width+'px;height:315px;" controls="" preload="auto"><source src="' + json[key][sectionkey][itemkey].image[elem] + '" type="video/mp4"></video>';
                            }
                            $('.panel__collection').append( panelString + arraystring + endarraystring +'</div></div></div>');

                          } else {
                           
                          $('.panel__collection').append(panelString+'<video style="width:' + json[key][sectionkey][itemkey].width + 'px" ' + posterframe + 'style="width:420px;height:315px;" controls="" preload="auto"><source src="' + json[key][sectionkey][itemkey].image + '" type="video/mp4"></video></div></div></div>');
                          }


                    } else if (json[key][sectionkey][itemkey].type == 'website') {
                      
                      $('.panel__collection').append(titleBarConstant + '<div class="panel__body">' + json[key][sectionkey][itemkey].body + '<a href="' + json[key][sectionkey][itemkey].url + '" target="new">' + json[key][sectionkey][itemkey].url.replace("https://","") + '</a></div><div class="panel__content-wrapper"><a href="' + json[key][sectionkey][itemkey].url + '" target="new"><img class="panel__image" src="' + json[key][sectionkey][itemkey].image + '" style="width:' + json[key][sectionkey][itemkey].width + 'px" alt="' + json[key][sectionkey][itemkey].alt + '"/></a></div></div>');


                    } else {
                      // other elements:
                      // for a single image :
                      let imagePart = '<img src="' + json[key][sectionkey][itemkey].image + '" class="panel__image" style="width:' + json[key][sectionkey][itemkey].width + 'px" alt="' + json[key][sectionkey][itemkey].alt + '" />';
                      // check if theres multiple images :
                      if(json[key][sectionkey][itemkey].image.constructor === Array) {
                        let arraystring = '<div class="imagelayer owl-carousel">',
                            endarraystring = '</div>';
                        for ( elem in json[key][sectionkey][itemkey].image) {
                          arraystring += '<div><img class="panel__image" src="' + json[key][sectionkey][itemkey].image[elem] + '" class="panel__image" style="width:' + json[key][sectionkey][itemkey].width + 'px"  alt="' + json[key][sectionkey][itemkey].alt[[elem]] + '"/></div>';
                        }
                        imagePart = arraystring + endarraystring;
                      }
                      $('.panel__collection').append('<div class="panel__wrapper ' + json[key][sectionkey][itemkey].type +
                      '" data-title="' + title + '" style="display:none"><div class="panel__title"><span>' + title + '</span><span>' + json[key][sectionkey][itemkey].date + '</span></div><div class="panel__body">' + json[key][sectionkey][itemkey].body + '<a href="' + json[key][sectionkey][itemkey].url + '">' + json[key][sectionkey][itemkey].url.replace("https://","") + '</a></div><div class="panel__content-wrapper">'+imagePart +'</div></div>');
                    }
                }
              }
          }         
        }
      }
  }

  let menuitems = $('.menu__wrapper a').length;
  let menusWidth = 100;
  $('.menu__wrapper').css('width', menuitems * menusWidth).attr("data-width", menusWidth).append('<div class="cursor__wrapper"><div class="cursor" style="width:' + menusWidth + 'px"></div></div>');

  $('.owl-carousel').each(function() {
    let $this = $(this);
    if ($this.hasClass('imagelayer')) {
      $(this).owlCarousel({ 
        items: 1, 
        nav: !0, 
        rewind: !0, 
        animateOut: "fadeOut", 
        stagePadding: 0 
      });
    } else {
      $(this).owlCarousel({
        items: $('.submenu__scroller').length,
        nav: false,
        loop: false,
        center: true,
        stagePadding: 0,
        URLhashListener: true,
        autoplayHoverPause: false,
        startPosition: 'URLHash'
      });
    }
    
  });
});

// controls menu layer:
  $('.menu__wrapper').on('click','a',function() {
    let $this = $(this);
    $('.menu__wrapper a').removeClass('selected');
    $this.addClass('selected');

    $('.panel__wrapper, .pointer__wrapper').hide();
    $('.menu_shadow, .cursor__wrapper, .submenu__wrapper').show();
    
    //controls cursor position
    let menusWidth = $('.menu__wrapper').data('width');
    $('.cursor').animate({'marginLeft':( $this.index() * menusWidth)}, 200);

    //controls submenu slider
    let leftVal = $this.index() * -500;
    // 3D try: $('.submenu__scroller').css('transform', 'translateZ(-60px) rotateY(' + leftVal + 'deg)' );
    //  $('.submenu__scroller').animate({'marginLeft':leftVal}, 200);

    let mediaBreak = window.matchMedia("(max-width: 500px)");
    if (mediaBreak.matches) {
      let trackWidth = '100%';
    } else {
      let trackWidth = ($('[data-title="'+$this.text() + '"] button').length) * 100;
    }
    //let trackWidth = ($('[data-title="'+$this.text() + '"] button').length) * 100;
    // $('[data-title="' + $this.text() + '"] .submenu__elements, .pointer__track').css('width', '100%');
    //index focus management
    let currentIndex = $this.index();
    let currentTabIndex =  Number($this.attr('tabindex'));
    
    //sets indexes on icons to 20's
    $('.submenu__item').each(function(i) {
      $(this).attr('tabindex',-1);
    });

    $('.submenu__group').eq(currentIndex).find('.submenu__item').each(function(i) {
      $(this).attr('tabindex', i + currentTabIndex + 2);
    });

  });

  const owl = $('.owl-carousel');
  owl.on('changed.owl.carousel', function(event) {
    if ($('.submenu__wrapper').is(":visible")){
      $('.panel__wrapper, .pointer__wrapper').hide();
      $('.menu__wrapper a').removeClass('selected').eq(event.page.index).addClass('selected');
      $('.menu__wrapper a').eq(event.page.index).trigger( "click" );
    }
  })


// controls thumbnail layer:
  $('.submenu__wrapper').on('click','.submenu__item',function() {
    let $this = $(this);
    let currentitem = $this.index();
    let NumbrOfIcons = $this.siblings().length + 1;

    $this.addClass('submenu__item--seenit');
    $('.pointer__track').css('width', NumbrOfIcons * 100);

    // let trackWidth = $this.siblings().length + 1 * 100;
    let measure = "px";
    let trackWidth = '500px';
    //let position = 100 / numofitems * currentitem;
    let position = (currentitem)  * 100;
    let mediaBreakPoint = window.matchMedia("(max-width: 500px)");
    //console.log(mediaBreakPoint.matches)

     if (mediaBreakPoint.matches) {
        trackWidth = '100%';
        measure = "%";
        if (NumbrOfIcons == 5) {
          if (currentitem == 0) {position = 11}
          if (currentitem == 1) {position = 31}
          if (currentitem == 2) {position = 50}
          if (currentitem == 3) {position = 69}
          if (currentitem == 4) {position = 89}
        } else if (NumbrOfIcons == 4) {
          if (currentitem == 0) {position = 15}
          if (currentitem == 1) {position = 38}
          if (currentitem == 2) {position = 62}
          if (currentitem == 3) {position = 85}
        }
      }
    
    // let trackmeasuredwidth = $('.submenu__wrapper').css('width').replace('px','');

    //let elementwidth = $('.submenu__item').css('width').replace('px','');
    // let spacing = trackmeasuredwidth - (elementwidth * (numofitems + 1));
    //let space = spacing / (numofitems + 1)
    //let elements = elementwidth * (numofitems+1)
    //let halfwidth = elementwidth / 2;
    
   // let position = currentitem * 20 -2;
   //let position = ((Number(spacing) + Number(elementwidth)) * Number(currentitem)) - 8;
   
    $('.pointer__track').css('width', trackWidth);
    let title = $this.data('title');
    $('.panel__wrapper').hide();
    $('.panel__wrapper[data-title="' + title + '"], .pointer__wrapper').show();
    
    $('.pointer__arrow').animate({'left': position + measure },200);
  });

// tracks clicks for backgrounds: 
  let clicks = 0;

  $(document).on('click', 'body', function(){
      clicks++;
      if (clicks == 5) {
        $('.background__three').fadeOut();
        $('.background__one').fadeIn(12000);
      }
      if (clicks == 10) {
        $('.background__one').fadeOut(12000);
        $('.background__two').fadeIn(12000);
      }
      if (clicks == 15) {
        $('.background__two').fadeOut(12000);
        $('.background__three').fadeIn(12000);
      }
      if (clicks == 20) {
        $('.background__three').fadeOut(12000);
        $('.background__one').fadeIn(12000);
        clicks = 6;
      }
  });

// video play/pause button control:
  $(document).on('click','.panel__controls button:first-child', function() {
    let $this = $(this);
      if ($this.closest('.panel__wrapper').find('.active').length) {
        var movie = $this.closest('.panel__wrapper').find('.owl-item.active video')[0];
      } else {
        var movie = $this.closest('.panel__wrapper').find('video')[0];
      }
     
    if ($this.text().indexOf("Pause Video")!= -1) {
      movie.pause();
      $this.attr("class","panel__play").html("Play Video");
    }else { 
      movie.play();
      $this.attr("class","panel__pause").html("Pause Video");
      }
  });

// checks for play state to update button:
  t = window.setInterval(function() { 
    $('video').each(function(){
      let $this = $(this);
      let $thisControl = $this.closest('.panel__wrapper:has .active').find('.panel__controls button:first-child');
      if ($this[0].paused == true || $this[0].ended == true) {
        $thisControl.attr("class","panel__play").html("Play Video");
      } else {
        $thisControl.attr("class","panel__pause").html("Pause Video");
      }
    });
  },333);

// zooms images in place to full zize:
  $(document).on('click','.panel__content-wrapper img', function() {
    if ($(this).prop("style")["width"] !== '') {
        $(this).attr('data-width', $(this).prop("style")["width"]);
        $(this).removeAttr('style');
    } else {
      $(this).css('width', $(this).attr("data-width"));
    }
  });

});