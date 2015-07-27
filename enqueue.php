<?php
/**
 * Plugin Name: jvwp-web
 */

$enqueue_fieldwork_assets = function () {

    wp_enqueue_media();
    wp_enqueue_script('jvwp', plugins_url('build/main.js', __FILE__), ['jquery', 'fieldwork']);
    wp_enqueue_style('jvwp', plugins_url('build/main.css', __FILE__));

};

add_action('admin_enqueue_scripts', $enqueue_fieldwork_assets);