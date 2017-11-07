<?php
/*
Plugin Name:  Veganberg
Plugin URI:   https://github.com/dechov/veganberg
Description:  Gutenberg block embedding a Vega (or Vega-Lite) graphic
Author:       Paul Dechov
Author URI:   https://twitter.com/pauldechov
*/

function veganberg_enqueue_block_assets() {
	wp_enqueue_script(
		'vega',
		'https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js',
		array()
	);
	wp_enqueue_script(
		'vega-lite',
		'https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.0/vega-lite.js',
		array( 'vega' )
	);
	wp_enqueue_script(
		'vega-embed',
		'https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc6/vega-embed.js',
		array( 'vega', 'vega-lite' )
	);
}
add_action( 'enqueue_block_assets', 'veganberg_enqueue_block_assets' );

function veganberg_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'veganberg-block-editor',
		plugins_url( 'block.built.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
	);
}
add_action( 'enqueue_block_editor_assets', 'veganberg_enqueue_block_editor_assets' );
