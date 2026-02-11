const $s = selector => document.querySelector( selector );

const ksdElement = $s( '#_aedc_ksd' );
const dvElement = $s( '#_aedc_dv' );
const mcElement = $s( '#_aedc_mc' );
const ctElement = $s( '#_aedc_ct' );

let keystrokeDelay = 100;
let delayVariation = 10;
let mistakeChance = 0;
let correctionTime = 150;

chrome.storage.local.get( [ 'keystrokeDelay', 'delayVariation', 'mistakeChance', 'correctionTime' ], res => {

	typeof res[ 'keystrokeDelay' ] == 'number' ? keystrokeDelay = res[ 'keystrokeDelay' ] : chrome.storage.local.set( { keystrokeDelay } )
	typeof res[ 'delayVariation' ] == 'number' ? delayVariation = res[ 'delayVariation' ] : chrome.storage.local.set( { delayVariation } )
	typeof res[ 'mistakeChance' ] == 'number' ? mistakeChance = res[ 'mistakeChance' ] : chrome.storage.local.set( { mistakeChance } )
	typeof res[ 'correctionTime' ] == 'number' ? correctionTime = res[ 'correctionTime' ] : chrome.storage.local.set( { correctionTime } )

	ksdElement.value = keystrokeDelay;
	dvElement.value = delayVariation;
	mcElement.value = mistakeChance;
	ctElement.value = correctionTime;

} );

ksdElement.onchange = ( ) => chrome.storage.local.set( { keystrokeDelay: Number( ksdElement.value ) } )
dvElement.onchange = ( ) => chrome.storage.local.set( { delayVariation: Number( dvElement.value ) } )
mcElement.onchange = ( ) => chrome.storage.local.set( { mistakeChance: Number( mcElement.value ) } )
ctElement.onchange = ( ) => chrome.storage.local.set( { correctionTime: Number( ctElement.value ) } )