$(document).foundation();

/*!
 * jQuery Sticky Footer 1.1
 * Corey Snyder
 * http://tangerineindustries.com
 *
 * Released under the MIT license
 *
 * Copyright 2013 Corey Snyder.
 *
 * Date: Thu Jan 22 2013 13:34:00 GMT-0630 (Eastern Daylight Time)
 * Modification for jquery 1.9+ Tue May 7 2013
 * Modification for non-jquery, removed all, now classic JS Wed Jun 12 2013
 */

window.onload = function() {
	stickyFooter();
	
	//you can either uncomment and allow the setInterval to auto correct the footer
	//or call stickyFooter() if you have major DOM changes
	//setInterval(checkForDOMChange, 1000);
};

//check for changes to the DOM
function checkForDOMChange() {
	stickyFooter();
}

//check for resize event if not IE 9 or greater
window.onresize = function() {
	stickyFooter();
}

//lets get the marginTop for the <footer>
function getCSS(element, property) {
	
	var elem = document.getElementsByTagName(element)[0];
	var css = null;
	
	if (elem.currentStyle) {
		css = elem.currentStyle[property];
		
	} else if (window.getComputedStyle) {
		css = document.defaultView.getComputedStyle(elem, null).
		getPropertyValue(property);
	}
	
	return css;
	
}

function stickyFooter() {
	
	if (document.getElementsByTagName("footer")[0].getAttribute("style") != null) {
		document.getElementsByTagName("footer")[0].removeAttribute("style");
	}
	
	if (window.innerHeight != document.body.offsetHeight) {
		var offset = window.innerHeight - document.body.offsetHeight;
		var current = getCSS("footer", "margin-top");
		
		if (isNaN(current) == true) {
			document.getElementsByTagName("footer")[0].setAttribute("style","margin-top:0px;");
			current = 0;
		} else {
			current = parseInt(current);
		}
		
		if (current+offset > parseInt(getCSS("footer", "margin-top"))) {			
			document.getElementsByTagName("footer")[0].setAttribute("style","margin-top:"+(current+offset)+"px;");
		}
	}
}

/*
 ! *end sticky footer
 */
function sideNav() {
  if ($(window).width() < 769) {
    $('.off-canvas-wrap').removeClass('move-right');
    $('.left-off-canvas-toggle').show();
  } else {
    $('.off-canvas-wrap').addClass('move-right');
    $('.left-off-canvas-toggle').hide();
  }  
}

$(window).resize(function() {
  sideNav();
});

/*! DataTables Foundation integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

/*
 * IMPORTANT
 * This file has now been deprecated and replaced by support for the styling
 * integration with Foundation in the DataTables core software and its
 * accompanying extensions. Please refer to the styling documentation for
 * details:
 * 	https://datatables.net/manual/styling/
 */
(function(window, document, undefined){

var factory = function( $, DataTable ) {
"use strict";


$.extend( DataTable.ext.classes, {
	sWrapper: "dataTables_wrapper dt-foundation"
} );


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'small-6 columns'l><'small-6 columns'f>r>"+
		"t"+
		"<'row'<'small-6 columns'i><'small-6 columns'p>>",
	renderer: 'foundation'
} );


/* Page button renderer */
DataTable.ext.renderer.pageButton.foundation = function ( settings, host, idx, buttons, page, pages ) {
	var api = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang = settings.oLanguage.oPaginate;
	var btnDisplay, btnClass;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( e.data.action !== 'ellipsis' ) {
				api.page( e.data.action ).draw( false );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&hellip;';
						btnClass = 'unavailable';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' unavailable');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' unavailable');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' unavailable');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' unavailable');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'current' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'aria-controls': settings.sTableId,
							'tabindex': settings.iTabIndex,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);
				}
			}
		}
	};

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);
};


/*
 * TableTools Foundation compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Foundation
	$.extend( true, DataTable.TableTools.classes, {
		"container": "DTTT button-group",
		"buttons": {
			"normal": "button small",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	$.extend( true, DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}

}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
	define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery ) {
	// Otherwise simply initialise as normal, stopping multiple evaluation
	factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);

/*!
 DataTables Foundation integration
 ©2011-2014 SpryMedia Ltd - datatables.net/license
*/
(function(){var f=function(d,b){d.extend(b.ext.classes,{sWrapper:"dataTables_wrapper dt-foundation"});d.extend(!0,b.defaults,{dom:"<'row'<'small-6 columns'l><'small-6 columns'f>r>t<'row'<'small-6 columns'i><'small-6 columns'p>>",renderer:"foundation"});b.ext.renderer.pageButton.foundation=function(g,f,p,k,h,l){var q=new b.Api(g),r=g.oClasses,i=g.oLanguage.oPaginate,c,e,o=function(b,f){var j,m,n,a,k=function(a){a.preventDefault();"ellipsis"!==a.data.action&&q.page(a.data.action).draw(!1)};j=0;for(m=
f.length;j<m;j++)if(a=f[j],d.isArray(a))o(b,a);else{e=c="";switch(a){case "ellipsis":c="&hellip;";e="unavailable";break;case "first":c=i.sFirst;e=a+(0<h?"":" unavailable");break;case "previous":c=i.sPrevious;e=a+(0<h?"":" unavailable");break;case "next":c=i.sNext;e=a+(h<l-1?"":" unavailable");break;case "last":c=i.sLast;e=a+(h<l-1?"":" unavailable");break;default:c=a+1,e=h===a?"current":""}c&&(n=d("<li>",{"class":r.sPageButton+" "+e,"aria-controls":g.sTableId,tabindex:g.iTabIndex,id:0===p&&"string"===
typeof a?g.sTableId+"_"+a:null}).append(d("<a>",{href:"#"}).html(c)).appendTo(b),g.oApi._fnBindAction(n,{action:a},k))}};o(d(f).empty().html('<ul class="pagination"/>').children("ul"),k)};b.TableTools&&(d.extend(!0,b.TableTools.classes,{container:"DTTT button-group",buttons:{normal:"button small",disabled:"disabled"},collection:{container:"DTTT_dropdown dropdown-menu",buttons:{normal:"",disabled:"disabled"}},select:{row:"active"}}),d.extend(!0,b.TableTools.DEFAULTS.oTags,{collection:{container:"ul",
button:"li",liner:"a"}}))};"function"===typeof define&&define.amd?define(["jquery","datatables"],f):"object"===typeof exports?f(require("jquery"),require("datatables")):jQuery&&f(jQuery,jQuery.fn.dataTable)})(window,document);


