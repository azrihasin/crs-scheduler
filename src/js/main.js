// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.setAttribute("style", "height:"+val+"px;");
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.setAttribute("style", "height:"+start+"px;");
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    window.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};


(function() {
	// Schedule Template - by CodyHouse.co
	function ScheduleTemplate( element ) {
		this.element = element;
		this.timelineItems = this.element.getElementsByClassName('cd-schedule__timeline')[0].getElementsByTagName('li');
		this.timelineStart = getScheduleTimestamp(this.timelineItems[0].textContent);
		this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems[1].textContent) - getScheduleTimestamp(this.timelineItems[0].textContent);
		
		this.topInfoElement = this.element.getElementsByClassName('cd-schedule__top-info')[0];
		this.singleEvents = this.element.getElementsByClassName('cd-schedule__event');
		
		this.modal = this.element.getElementsByClassName('cd-schedule-modal')[0];
		this.modalHeader = this.element.getElementsByClassName('cd-schedule-modal__header')[0];
		this.modalHeaderBg = this.element.getElementsByClassName('cd-schedule-modal__header-bg')[0];
		this.modalBody = this.element.getElementsByClassName('cd-schedule-modal__body')[0];
		this.modalBodyBg = this.element.getElementsByClassName('cd-schedule-modal__body-bg')[0];
		this.modalClose = this.modal.getElementsByClassName('cd-schedule-modal__close')[0];
		this.modalDate = this.modal.getElementsByClassName('cd-schedule-modal__date')[0];
		this.modalEventName = this.modal.getElementsByClassName('cd-schedule-modal__name')[0];
		this.coverLayer = this.element.getElementsByClassName('cd-schedule__cover-layer')[0];

		this.modalMaxWidth = 800;
		this.modalMaxHeight = 480;

		this.animating = false;
		this.supportAnimation = Util.cssSupports('transition');

		this.initSchedule();
	};

	ScheduleTemplate.prototype.initSchedule = function() {
		this.scheduleReset();
		this.initEvents();
	};

	ScheduleTemplate.prototype.scheduleReset = function() {
		// according to the mq value, init the style of the template
		var mq = this.mq(),
			loaded = Util.hasClass(this.element, 'js-schedule-loaded'),
			modalOpen = Util.hasClass(this.modal, 'cd-schedule-modal--open');
		if( mq == 'desktop' && !loaded ) {
			Util.addClass(this.element, 'js-schedule-loaded');
			this.placeEvents();
			modalOpen && this.checkEventModal(modalOpen);
		} else if( mq == 'mobile' && loaded) {
			//in this case you are on a mobile version (first load or resize from desktop)
			Util.removeClass(this.element, 'cd-schedule--loading js-schedule-loaded');
			this.resetEventsStyle();
			modalOpen && this.checkEventModal();
		} else if( mq == 'desktop' && modalOpen ) {
			//on a mobile version with modal open - need to resize/move modal window
			this.checkEventModal(modalOpen);
			Util.removeClass(this.element, 'cd-schedule--loading');
		} else {
			Util.removeClass(this.element, 'cd-schedule--loading');
		}
	};

	ScheduleTemplate.prototype.resetEventsStyle = function() {
		// remove js style applied to the single events
		for(var i = 0; i < this.singleEvents.length; i++) {
			this.singleEvents[i].removeAttribute('style');
		}
	};

	ScheduleTemplate.prototype.placeEvents = function() {
		// on big devices - place events in the template according to their time/day
		var self = this,
			slotHeight = this.topInfoElement.offsetHeight;
		for(var i = 0; i < this.singleEvents.length; i++) {
			var anchor = this.singleEvents[i].getElementsByTagName('a')[0];
			var start = getScheduleTimestamp(anchor.getAttribute('data-start')),
				duration = getScheduleTimestamp(anchor.getAttribute('data-end')) - start;

			var eventTop = slotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				eventHeight = slotHeight*duration/self.timelineUnitDuration;

			this.singleEvents[i].setAttribute('style', 'top: '+(eventTop-1)+'px; height: '+(eventHeight +1)+'px');
		}

		Util.removeClass(this.element, 'cd-schedule--loading');
	};

	ScheduleTemplate.prototype.initEvents = function() {
		var self = this;
		for(var i = 0; i < this.singleEvents.length; i++) {
			// open modal when user selects an event
			this.singleEvents[i].addEventListener('click', function(event){
				event.preventDefault();
				if(!self.animating) self.openModal(this.getElementsByTagName('a')[0]);
			});
		}
		//close modal window
		this.modalClose.addEventListener('click', function(event){
			event.preventDefault();
			if( !self.animating ) self.closeModal();
		});
		this.coverLayer.addEventListener('click', function(event){
			event.preventDefault();
			if( !self.animating ) self.closeModal();
		});
	};

	ScheduleTemplate.prototype.openModal = function(target) {
		var self = this;
		var mq = self.mq();
		this.animating = true;

		//update event name and time
		this.modalEventName.textContent = target.getElementsByTagName('em')[0].textContent;
		this.modalDate.textContent = target.getAttribute('data-start')+' - '+target.getAttribute('data-end');
		this.modal.setAttribute('data-event', target.getAttribute('data-event'));

		//update event content
		this.loadEventContent(target.getAttribute('data-content'));

		Util.addClass(this.modal, 'cd-schedule-modal--open');
		
		setTimeout(function(){
			//fixes a flash when an event is selected - desktop version only
			Util.addClass(target.closest('li'), 'cd-schedule__event--selected');
		}, 10);

		if( mq == 'mobile' ) {
			self.modal.addEventListener('transitionend', function cb(){
				self.animating = false;
				self.modal.removeEventListener('transitionend', cb);
			});
		} else {
			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var modalTranslateX = parseInt((windowWidth - modalWidth)/2 - eventLeft),
				modalTranslateY = parseInt((windowHeight - modalHeight)/2 - eventTop);
			
			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);

			//change modal height/width and translate it
			self.modal.setAttribute('style', 'top:'+eventTop+'px;left:'+eventLeft+'px;height:'+modalHeight+'px;width:'+modalWidth+'px;transform: translateY('+modalTranslateY+'px) translateX('+modalTranslateX+'px)');
			//set modalHeader width
			self.modalHeader.setAttribute('style', 'width:'+eventWidth+'px');
			//set modalBody left margin
			self.modalBody.setAttribute('style', 'margin-left:'+eventWidth+'px');
			//change modalBodyBg height/width ans scale it
			self.modalBodyBg.setAttribute('style', 'height:'+eventHeight+'px; width: 1px; transform: scaleY('+HeaderBgScaleY+') scaleX('+BodyBgScaleX+')');
			//change modal modalHeaderBg height/width and scale it
			self.modalHeaderBg.setAttribute('style', 'height: '+eventHeight+'px; width: '+eventWidth+'px; transform: scaleY('+HeaderBgScaleY+')');
			
			self.modalHeaderBg.addEventListener('transitionend', function cb(){
				//wait for the  end of the modalHeaderBg transformation and show the modal content
				self.animating = false;
				Util.addClass(self.modal, 'cd-schedule-modal--animation-completed');
				self.modalHeaderBg.removeEventListener('transitionend', cb);
			});
		}

		//if browser do not support transitions -> no need to wait for the end of it
		this.animationFallback();
	};

	ScheduleTemplate.prototype.closeModal = function() {
		var self = this;
		var mq = self.mq();

		var item = self.element.getElementsByClassName('cd-schedule__event--selected')[0],
			target = item.getElementsByTagName('a')[0];

		this.animating = true;

		if( mq == 'mobile' ) {
			Util.removeClass(this.modal, 'cd-schedule-modal--open');
			self.modal.addEventListener('transitionend', function cb(){
				Util.removeClass(self.modal, 'cd-schedule-modal--content-loaded');
				Util.removeClass(item, 'cd-schedule__event--selected');
				self.animating = false;
				self.modal.removeEventListener('transitionend', cb);
			});
		} else {
			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var modalStyle = window.getComputedStyle(self.modal),
				modalTop = Number(modalStyle.getPropertyValue('top').replace('px', '')),
				modalLeft = Number(modalStyle.getPropertyValue('left').replace('px', ''));

			var modalTranslateX = eventLeft - modalLeft,
				modalTranslateY = eventTop - modalTop;

			Util.removeClass(this.modal, 'cd-schedule-modal--open cd-schedule-modal--animation-completed');

			//change modal width/height and translate it
			self.modal.style.width = eventWidth+'px';self.modal.style.height = eventHeight+'px';self.modal.style.transform = 'translateX('+modalTranslateX+'px) translateY('+modalTranslateY+'px)';
			//scale down modalBodyBg element
			self.modalBodyBg.style.transform = 'scaleX(0) scaleY(1)';
			//scale down modalHeaderBg element
			// self.modalHeaderBg.setAttribute('style', 'transform: scaleY(1)');
			self.modalHeaderBg.style.transform = 'scaleY(1)';

			self.modalHeaderBg.addEventListener('transitionend', function cb(){
				//wait for the  end of the modalHeaderBg transformation and reset modal style
				Util.addClass(self.modal, 'cd-schedule-modal--no-transition');
				setTimeout(function(){
					self.modal.removeAttribute('style');
					self.modalBody.removeAttribute('style');
					self.modalHeader.removeAttribute('style');
					self.modalHeaderBg.removeAttribute('style');
					self.modalBodyBg.removeAttribute('style');
				}, 10);
				setTimeout(function(){
					Util.removeClass(self.modal, 'cd-schedule-modal--no-transition');
				}, 20);
				self.animating = false;
				Util.removeClass(self.modal, 'cd-schedule-modal--content-loaded');
				Util.removeClass(item, 'cd-schedule__event--selected');
				self.modalHeaderBg.removeEventListener('transitionend', cb);
			});
		}

		//if browser do not support transitions -> no need to wait for the end of it
		this.animationFallback();
	};

	ScheduleTemplate.prototype.checkEventModal = function(modalOpen) {
		// this function is used on resize to reset events/modal style
		this.animating = true;
		var self = this;
		var mq = this.mq();
		if( mq == 'mobile' ) {
			//reset modal style on mobile
			self.modal.removeAttribute('style');
			self.modalBody.removeAttribute('style');
			self.modalHeader.removeAttribute('style');
			self.modalHeaderBg.removeAttribute('style');
			self.modalBodyBg.removeAttribute('style');
			Util.removeClass(self.modal, 'cd-schedule-modal--no-transition');
			self.animating = false;	
		} else if( mq == 'desktop' && modalOpen) {
			Util.addClass(self.modal, 'cd-schedule-modal--no-transition cd-schedule-modal--animation-completed');
			var item = self.element.getElementsByClassName('cd-schedule__event--selected')[0],
				target = item.getElementsByTagName('a')[0];

			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);


			setTimeout(function(){
				self.modal.setAttribute('style', 'top:'+(windowHeight/2 - modalHeight/2)+'px;left:'+(windowWidth/2 - modalWidth/2)+'px;height:'+modalHeight+'px;width:'+modalWidth+'px;transform: translateY(0) translateX(0)');
				//change modal modalBodyBg height/width
				self.modalBodyBg.style.height = modalHeight+'px';self.modalBodyBg.style.transform = 'scaleY(1) scaleX('+BodyBgScaleX+')';self.modalBodyBg.style.width = '1px';
				//set modalHeader width
				self.modalHeader.setAttribute('style', 'width:'+eventWidth+'px');
				//set modalBody left margin
				self.modalBody.setAttribute('style', 'margin-left:'+eventWidth+'px');
				//change modal modalHeaderBg height/width and scale it
				self.modalHeaderBg.setAttribute('style', 'height: '+eventHeight+'px;width:'+eventWidth+'px; transform:scaleY('+HeaderBgScaleY+');');
			}, 10);

			setTimeout(function(){
				Util.removeClass(self.modal, 'cd-schedule-modal--no-transition');
				self.animating = false;	
			}, 20);

		}
	};

	ScheduleTemplate.prototype.loadEventContent = function(content) {
		// load the content of an event when user selects it
		var self = this;

		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
	      if (httpRequest.status === 200) {
	      	self.modal.getElementsByClassName('cd-schedule-modal__event-info')[0].innerHTML = self.getEventContent(httpRequest.responseText); 
	      	Util.addClass(self.modal, 'cd-schedule-modal--content-loaded');
	      }
	    }
		};
		httpRequest.open('GET', content+'.html');
    httpRequest.send();
	};

	ScheduleTemplate.prototype.getEventContent = function(string) {
		// reset the loaded event content so that it can be inserted in the modal
		var div = document.createElement('div');
		div.innerHTML = string.trim();
		return div.getElementsByClassName('cd-schedule-modal__event-info')[0].innerHTML;
	};

	ScheduleTemplate.prototype.animationFallback = function() {
		if( !this.supportAnimation ) { // fallback for browsers not supporting transitions
			var event = new CustomEvent('transitionend');
			self.modal.dispatchEvent(event);
			self.modalHeaderBg.dispatchEvent(event);
		}
	};

	ScheduleTemplate.prototype.mq = function(){
		//get MQ value ('desktop' or 'mobile') 
		var self = this;
		return window.getComputedStyle(this.element, '::before').getPropertyValue('content').replace(/'|"/g, "");
	};

	function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	};

	var scheduleTemplate = document.getElementsByClassName('js-cd-schedule'),	
		scheduleTemplateArray = [],
		resizing = false;
	if( scheduleTemplate.length > 0 ) { // init ScheduleTemplate objects
		for( var i = 0; i < scheduleTemplate.length; i++) {
			(function(i){
				scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
			})(i);
		}

		window.addEventListener('resize', function(event) { 
			// on resize - update events position and modal position (if open)
			if( !resizing ) {
				resizing = true;
				(!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
			}
		});

		window.addEventListener('keyup', function(event){
			// close event modal when pressing escape key
			if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) {
				for(var i = 0; i < scheduleTemplateArray.length; i++) {
					scheduleTemplateArray[i].closeModal();
				}
			}
		});

		function checkResize(){
			for(var i = 0; i < scheduleTemplateArray.length; i++) {
				scheduleTemplateArray[i].scheduleReset();
			}
			resizing = false;
		};
	}
}());