/**
 * uiMorphingButton_fixed.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';

	var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function UIMorphingButton( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	UIMorphingButton.prototype.options = {
		closeEl : '',
		onBeforeOpen : function() { return false; },
		onAfterOpen : function() { return false; },
		onBeforeClose : function() { return false; },
		onAfterClose : function() { return false; }
	}

	UIMorphingButton.prototype._init = function() {
		// the button
		this.button = this.el.querySelector( 'button' );
		// state
		this.expanded = false;
		// content el
		this.contentEl = this.el.querySelector( '.morph-content' );
		// init events
		this._initEvents();
		
		this.support = support;
		
		this.openTransition = true;
	}

	UIMorphingButton.prototype._initEvents = function() {
		var self = this;
		// open
		this.button.addEventListener( 'click', function() {
            self.toggle();
            self.expanded = !self.expanded;
        } );
		// close
		if( this.options.closeEl !== '' ) {
			var closeEl = this.el.querySelector( this.options.closeEl );
			if( closeEl ) {
                closeEl.addEventListener('click', function() {
                    self.toggle();
                    self.expanded = !self.expanded;
                });


			}
		}
	}

	UIMorphingButton.prototype.toggle = function() {

		// callback
		if( this.expanded ) {
			this.options.onBeforeClose();
		}
		else {
			// add class active (solves z-index problem when more than one button is in the page)
			jQuery(this.el).addClass('active');
			this.options.onBeforeOpen();
		}

		this.isAnimating = true;

		var self = this,
			onEndTransitionFn = function( ev ) {
				if( self.support.transitions && ev.target !== this ) return false;

				if( self.support.transitions ) {
					// open: first opacity then width/height/left/top
					// close: first width/height/left/top then opacity
					if( self.expanded && ev.propertyName !== 'opacity' || !self.expanded && ev.propertyName !== 'width' && ev.propertyName !== 'height' && ev.propertyName !== 'left' && ev.propertyName !== 'top' ) {
						return false;
					}
				 	this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				self.isAnimating = false;
				
				// callback
				if( self.expanded ) {
					// remove class active (after closing)
					jQuery(self.el).removeClass('active');
					self.options.onAfterClose();
				}
				else {
					self.options.onAfterOpen();
				}
			};

		if( this.support.transitions ) {
			this.contentEl.addEventListener( transEndEventName, onEndTransitionFn );
		}
		else {
			onEndTransitionFn();
		}
			
		// set the left and top values of the contentEl (same like the button)
		var buttonPos = this.button.getBoundingClientRect();
		// need to reset
		jQuery(this.contentEl).addClass('no-transition');
		this.contentEl.style.left = 'auto';
		this.contentEl.style.top = 'auto';
		
		// add/remove class "open" to the button wraper
		self.contentEl.style.left = buttonPos.left + 'px';
		self.contentEl.style.top = buttonPos.top + 'px';

		// Don't put this in a setTimeout, it relies on self.expanded to be set correctly
		// self.expanded is changed just after the toggle function runs in most cases.
		if( self.expanded ) {
			jQuery(self.contentEl).removeClass('no-transition');
			jQuery(self.el).removeClass('open');
		}
		else {
			setTimeout( function() {
				if (self.openTransition) {
					jQuery(self.contentEl).removeClass('no-transition');
				}

				jQuery(self.el).addClass('open');

				if (!self.openTransition) {
					jQuery(self.contentEl).removeClass('no-transition');
          		}
			}, 25 );
		}

	}

	// add to global namespace
	window.UIMorphingButton = UIMorphingButton;
	
})( window );
