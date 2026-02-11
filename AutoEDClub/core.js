const overrides = {
	[ String.fromCharCode( 160 ) ]: ' '
}

const backspaceEvent = new KeyboardEvent( 'keydown', {
	key: 'Backspace',
	keyCode: 8,
	code: 'Backspace',
	which: 8,
	bubbles: true,
	cancelable: true
} );

const ignore = ( ) => false
const sleep = ms => new Promise( resolve => setTimeout( resolve, ms ) );

const dispatch = ( character, element ) => {
	if( !character ) {
		document.dispatchEvent( backspaceEvent );
		return;
	}

	let keyCode = character.charCodeAt( 0 );
	if( character == '\n' ) keyCode = 13;

	const downEvent = $.Event( 'keydown' );
	downEvent.keyCode = downEvent.which = keyCode;
	downEvent.originalEvent = {
		getModifierState: ignore,
		preventDefault: ignore,
		code: null,
		inputType: 'insertText'
	};

	element.trigger( downEvent );
	element.val( character );

	const inputEvent = $.Event( 'input' );
	inputEvent.originalEvent = {
		inputType: 'insertText'
	}
	element.trigger( inputEvent );

	const upEvent = $.Event( 'keyup' );
	upEvent.originalEvent = {
		getModifierState: ignore
	}
	element.trigger( upEvent );
}

const observer = new MutationObserver( mutations => {
	for( const mutation of mutations ) {
		for( const node of [ ... mutation.removedNodes ] ) {
			if( node.nodeName == 'INPUT' && node.baseURI.includes( '.play' ) ) stopAutoComplete( );
		}
	}
} );

observer.observe( document.body, { childList: true } );

let _break = true;
let running = false;

const autoComplete = async ( delay, variation, mistakeChance, correctionTime ) => {
	running = true;
	_break = false;

	const element = $( 'input[autofocus]' );
	const elements = [ ... document.querySelectorAll( '.token span.token_unit._clr' ) ];
	const characters = elements.map( element => element.firstChild?.classList?.contains( '_enter' ) ? '\n' : element.textContent[ 0 ] ).map( c => overrides.hasOwnProperty( c ) ? overrides[ c ] : c );

	for( const character of characters ) {
		if( _break ) return;

		if( Math.random( ) < mistakeChance / 100 && character != ' ' ) {
			dispatch( ' ', element );
			await sleep( Math.round( correctionTime / 2 ) );

			dispatch( );
			await sleep( Math.round( correctionTime / 2 ) );
		}

		dispatch( character, element );
		const timeout = Math.random( ) * ( ( delay + variation ) - ( delay - variation ) ) + ( delay - variation );
		await sleep( timeout );
	}
}

const stopAutoComplete = ( ) => {
	_break = true;
	running = false;

}

document.addEventListener( 'AEDC', e => running ? stopAutoComplete( ) : autoComplete( e.detail.keystrokeDelay, e.detail.delayVariation, e.detail.mistakeChance, e.detail.correctionTime ) );