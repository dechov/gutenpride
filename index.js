
/**
 * Veganberg
 * A gutenberg block that embeds a Vega or Vega-Lite graphic
 */

import TextareaAutosize from 'react-autosize-textarea';

const { __ } = wp.i18n;
const { registerBlockType, createBlock, source: { attr } } = wp.blocks;
const { Component, findDOMNode } = wp.element;

class VegaEmbed extends Component {
	render() {
		return <div>Vega</div>
	}
	componentDidMount() {
		this.componentDidRender();
	}
	componentDidUpdate() {
		this.componentDidRender();
	}
	componentDidRender() {
		let spec = null;
		// TODO parse before render and indicate stale renders
		try {
			spec = JSON.parse( this.props.spec );
		} catch ( error ) {}
		spec && vegaEmbed( findDOMNode( this ), spec, { actions: false } );
	}
	shouldComponentUpdate( nextProps ) {
		return this.props.spec !== nextProps.spec;
	}
}

registerBlockType( 'dechov/veganberg', {
	title: 'Vega',

	icon: 'chart-line',

	category: 'widgets',

	keywords: [ __( 'chart' ), __( 'graphic' ) ],

	attributes: {
		spec: {
            type: 'string',
			source: attr( 'script', 'data-spec' ),
		}
	},

	// // WIP
	// transforms: {
	// 	from: [
	// 		{
	// 			type: 'pattern',
	// 			trigger: 'paste',
	// 			regExp: /"\$schema": "[^"]*vega/,
	// 			transform() {
	// 				// TODO get spec. can use content, or has to be match?
	// 				return createBlock( 'dechov/veganberg', { spec: attributes.alt } );
	// 			},
	// 		},
	// 		{
	// 			type: 'block',
	// 			blocks: [ 'core/image' ],
	// 			isMatch( attributes ) {
	// 				// TODO validate attributes.alt as either URL or JSON
	// 				return true;
	// 			},
	// 			transform( attributes ) {
	// 				return createBlock( 'dechov/veganberg', { spec: attributes.alt } );
	// 			},
	// 		},
	// 	],
	// 	to: [
	// 		{
	// 			type: 'block',
	// 			blocks: [ 'core/image' ],
	// 			transform( attributes ) {
	// 				return Promise.resolve()
	// 					.then( () => vegaEmbed( document.createElement( 'div' ), JSON.parse( attributes.spec ) ) )
	// 					.then( ( { view } ) => view.toImageURL( 'png' ) )
	// 					.then( url => createBlock( 'core/image', { url, alt: attributes.spec } ) )
	// 			},
	// 		},
	// 	],
	// },

	edit( { attributes, setAttributes, focus } ) {
		return [
			<VegaEmbed key="embed" spec={ attributes.spec } />,
			focus && <div key="spec" data-type="core/code">
				<TextareaAutosize
					key="spec"
					value={ attributes.spec }
					onChange={ event => setAttributes( { spec: event.target.value } ) }
					placeholder="Vega spec…"
				/>
			</div>,
		];
	},
	
	save( { attributes } ) {
		const script = `
			document.querySelectorAll('.veganberg').forEach(function(block) {
				if (block.querySelector('script')) {
					var spec = block.querySelector('script').getAttribute('data-spec');
					vegaEmbed(block, JSON.parse(spec), { actions: false });
				}
			});
		`;
		return (
			<div className="veganberg">
				<script
					type="text/javascript"
					data-spec={ attributes.spec }
					dangerouslySetInnerHTML={ { __html: script } }
				/>
			</div>
		)
	},
} );
