let keystrokeDelay = 100;
let delayVariation = 10;
let mistakeChance = 0;
let correctionTime = 150;

const element = document.createElement( 'script' );
element.type = 'text/javascript';
element.src = chrome.runtime.getURL( 'AutoEDClub/core.js' );
document.body.appendChild( element );

document.addEventListener( 'keydown', event => {
	if( event.key != 'F8' ) return;

	chrome.storage.local.get( [ 'keystrokeDelay', 'delayVariation', 'mistakeChance', 'correctionTime' ], res => {
		typeof res[ 'keystrokeDelay' ] == 'number' ? keystrokeDelay = res[ 'keystrokeDelay' ] : chrome.storage.local.set( { keystrokeDelay } )
		typeof res[ 'delayVariation' ] == 'number' ? delayVariation = res[ 'delayVariation' ] : chrome.storage.local.set( { delayVariation } )
		typeof res[ 'mistakeChance' ] == 'number' ? mistakeChance = res[ 'mistakeChance' ] : chrome.storage.local.set( { mistakeChance } )
		typeof res[ 'correctionTime' ] == 'number' ? correctionTime = res[ 'correctionTime' ] : chrome.storage.local.set( { correctionTime } )
		document.dispatchEvent( new CustomEvent( 'AEDC', {
			detail: { keystrokeDelay, delayVariation, mistakeChance, correctionTime } 
		} ) );
	} );
} );