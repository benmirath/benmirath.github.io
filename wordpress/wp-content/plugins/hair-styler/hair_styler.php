<?php
/*
Plugin Name: Hair Styler
Plugin URI: 
Description: 
Author: Ben Miller, Fabian Rastorfer
Version: 0.1
Author URI: 
*/

// REGISTER CUSTOM POST TYPES
// __________________________________________________________________________________________________________________________________________________
add_action( 'init', 'register_post_types' );
function register_post_types() {
    register_post_type( 'hairstyle',
        array(
            'labels' => array(
                'name' => __( 'Hairstyle' ),
                'singular_name' => __( 'Hairstyle' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'hairstyles'),
            'supports' => array('')
        )
    );
    register_post_type( 'model',
        array(
            'labels' => array(
                'name' => __( 'Model' ),
                'singular_name' => __( 'Model' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'models'),
            'supports' => array('')
        )
    );
    register_post_type( 'color',
        array(
            'labels' => array(
                'name' => __( 'Colors' ),
                'singular_name' => __( 'Colors' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'colors'),
            'supports' => array('')
        )
    );
    register_post_type( 'language',
        array(
            'labels' => array(
                'name' => __( 'Language' ),
                'singular_name' => __( 'Language' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'languages'),
            'supports' => array('')
        )
    );
}

// CUSTOM POST TITLE FILTER
// __________________________________________________________________________________________________________________________________________________
add_filter( 'the_title', 'filter_title', 10, 2 );
function filter_title( $title, $post_id )
{
    global $post;
    if ($post->post_type == 'hairstyle') {
        if( $new_title = get_post_meta( $post_id, 'hairstyle_id', true ) )
        {
            return 'ID: '.$new_title;
        }
    } else if ($post->post_type == 'model') {
         if( $new_title = get_post_meta( $post_id, 'model_id', true ) )
        {
            return 'ID: '.$new_title;
        }
    } else if ($post->post_type == 'color') {
         if( $new_title = get_post_meta( $post_id, 'color_name', true ) )
        {
            return 'ID: '.$new_title;
        }
    } else if ($post->post_type == 'language') {
         if( $new_title = get_post_meta( $post_id, 'language_name', true ) )
        {
            return 'ID: '.$new_title;
        }
    }
    return $title;
}

// CUSTOMIZE ADMIN MENU
// __________________________________________________________________________________________________________________________________________________
add_action( 'admin_menu', 'clear_menu' );
function clear_menu () {
    remove_menu_page( 'edit.php' );
    remove_menu_page( 'edit.php?post_type=page' );
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'edit-comments.php' );    
}

// ALLOWED DATA FOR API CALLS
// __________________________________________________________________________________________________________________________________________________
function allow_post_types($allowed_post_types) {
	$allowed_post_types[] = 'hairstyle';
	$allowed_post_types[] = 'model';
    $allowed_post_types[] = 'color';
	$allowed_post_types[] = 'language';
	return $allowed_post_types;
}

function allow_public_metadata( $allowed_meta_keys )
{
    // only run for REST API requests
    if ( ! defined( 'REST_API_REQUEST' ) || ! REST_API_REQUEST )
        return $allowed_meta_keys;

    $allowed_meta_keys[] = 'hairstyle_id';
    $allowed_meta_keys[] = 'hairstyle_gender';
    $allowed_meta_keys[] = 'hairstyle_length';
    $allowed_meta_keys[] = 'hairstyle_texture';
    $allowed_meta_keys[] = 'hairstyle_style';
    $allowed_meta_keys[] = 'hairstyle_image_original';
    $allowed_meta_keys[] = 'hairstyle_image_grayscale';
    $allowed_meta_keys[] = 'hairstyle_image_original';
    $allowed_meta_keys[] = 'hairstyle_colors';
    $allowed_meta_keys[] = 'hairstyle_individual_color';
    $allowed_meta_keys[] = 'hairstyle_color_tag';
    $allowed_meta_keys[] = '_wp_attached_file';
    $allowed_meta_keys[] = '_wp_attachment_metadata';
    $allowed_meta_keys[] = 'hairstyle_info';
    $allowed_meta_keys[] = 'hairstyle_color';

    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_1_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_4_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_2_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_3_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_5_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_6_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_7_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_1_fieldID_8_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_2_fieldID_1_numInSet_0';
    $allowed_meta_keys[] = '_simple_fields_fieldGroupID_2_fieldID_1_numInSet_1';
    return $allowed_meta_keys;
}
add_filter( 'rest_api_allowed_public_metadata', 'allow_public_metadata' );
add_filter( 'rest_api_allowed_post_types', 'allow_post_types');


// CUSTOM API CONTROLLER EXTENSIONS
// __________________________________________________________________________________________________________________________________________________
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
define('JSON_API_HAIRSTYLE_HOME', dirname(__FILE__));
if (!is_plugin_active('json-api/json-api.php')) {
    add_action('admin_notices', 'hf_draw_notice_json_api');
    return;
}
add_filter('json_api_controllers', 'hfJsonApiController');
add_filter('json_api_hairstyle_controller_path', 'SetHairstyleControllerPath');
load_plugin_textdomain('json-api-hairstyle', false, basename(dirname(__FILE__)) . '/languages');

function hf_draw_notice_json_api() {
    echo '<div id="message" class="error fade"><p style="line-height: 150%">';
    _e('<strong>JSON API User</strong></a> requires the JSON API plugin to be activated. Please <a href="wordpress.org/plugins/json-api/‎">install / activate JSON API</a> first.', 'json-api-user');
    echo '</p></div>';
}

function hfJsonApiController($aControllers) {
    $aControllers[] = 'Hairstyle';
    return $aControllers;
}

function SetHairstyleControllerPath($sDefaultPath) {
    return dirname(__FILE__) . '/controllers/Hairstyle.php';
}