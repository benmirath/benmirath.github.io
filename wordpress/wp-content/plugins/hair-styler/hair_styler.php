<?php
/*
Plugin Name: Hair Styler
Plugin URI: 
Description: 
Author: Ben Miller, Fabian Rastorfer
Version: 0.1
Author URI: 
*/

// register_activation_hook(__FILE__, 'hair_styler_activate');			Plugin Type: Piklist
// register_deactivation_hook(__FILE__, 'hair_styler_deactivate');

// function hair_styler_activate() {
// 	require_once dirname(__FILE__).'/hair_styler_loader.php';
// 	$loader = new HairStylerLoader();
// 	$loader->activate();
// }

// function hair_styler_deactivate() {
// 	require_once dirname(__FILE__).'/hair_styler_loader.php';
// 	$loader = new HairStylerLoader();
// 	$loader->deactivate();
// }

// CLEANUP EMPTY WPMVC PAGES
// add_action( 'admin_menu', 'my_remove_menu_pages' );
// function my_remove_menu_pages() {
// 	remove_menu_page('mvc_[hairstyles]');
// 	remove_menu_page('mvc_[models]');
// }


// add_action('init', 'register_hair_styler_scripts');
// function register_hair_styler_scripts() {
// 	error_log('register_hair_styler_scripts()');
//     wp_register_script('ev-ui', plugins_url('ev-ui.js', __FILE__), array(), false, true);

//     wp_localize_script('ev-ui', 'EVUIEnv', array(
//         'tpl_dir' => plugins_url('/components/templates/', __FILE__),
//         'theme_dir' => get_bloginfo('template_url')
//     ));
// }

// Load all of the php files in the components folder
// $file_tmp = glob(dirname(__FILE__).'/components/*.php', GLOB_MARK | GLOB_NOSORT);
// foreach ($file_tmp as $item){
//     if (substr($item, -1) != DIRECTORY_SEPARATOR) {
//         require_once($item);
//     }
// }

// CUSTOM TYPE BACKEND CODE
add_filter('piklist_post_types', 'model_register');
add_filter('piklist_post_types', 'hairstyle_register');
add_filter('piklist_post_types', 'color_register');
add_filter('piklist_post_types', 'language_register');


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


// // MODELS
// function model_register($post_types) {
//     $post_types['model'] = array(
//     	'labels' => piklist('post_type_labels', 'Model'),
//     	'public' => true,
//     	'rewrite' => array(
//     		'slug' => 'model'
//     	),
//     	'supports' => array(
//     		'editor'
//     	),
//     	'hide_meta_box' => array(
//     		'editor',
//     		'author',
//     		'slug',
//     		'revisions',
//     		'comments',
//     		'commentstatus'
//     	)
//     );
//     return $post_types;
// }

// // HAIRSTYLES
// function hairstyle_register($post_types) {
// 	$post_types['hairstyle'] = array(
//     	'labels' => piklist('post_type_labels', 'Hairstyle'),
//     	'public' => true,
//     	'rewrite' => array(
//     		'slug' => 'hairstyle'
//     	),
//     	'supports' => array(
//     		'title'
//     	),
//     	'hide_meta_box' => array(
//     		'editor',
//     		'author',
//     		'slug',
//     		'revisions',
//     		'comments',
//     		'commentstatus'
//     	)
//     );
//     return $post_types;
// }

// function color_register($post_types) {
//     $post_type['color'] = array (
//         'labels' => piklist('post_type_labels', 'Color'),
//         'public' => true,
//         'rewrite' => array(
//             'slug' => 'color'
//         ),
//         'supports' => array(
//             'title'
//         ),
//         'hide_meta_box' => array(
//             'editor',
//             'author',
//             'slug',
//             'revisions',
//             'comments',
//             'commentstatus'
//         )
//     );
//     return $post_types;
// }

// function language_register($post_types) {
//     $post_type['language'] = array (
//         'labels' => piklist('post_type_labels', 'Language'),
//         'public' => true,
//         'rewrite' => array(
//             'slug' => 'language'
//         ),
//         'supports' => array(
//             'title'
//         ),
//         'hide_meta_box' => array(
//             'editor',
//             'author',
//             'slug',
//             'revisions',
//             'comments',
//             'commentstatus'
//         )
//     );
//     return $post_types;
// }

add_action( 'admin_menu', 'clear_menu' );
function clear_menu () {
    remove_menu_page( 'edit.php' );
    remove_menu_page( 'edit.php?post_type=page' );
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'edit-comments.php' );    
}



// add_action( 'save_post', 'hairstyle_save_post_meta', 10, 2 );
// function hairstyle_save_post_meta( $post_id, $post ) {

//     global $meta_box, $wpdb;
//     // verify nonce
//     // if (!wp_verify_nonce($_POST['hairstyle_meta_box_nonce'], basename(__FILE__))) {
//     //     return $post_id;
//     // }
//     // check autosave
//     if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
//         return $post_id;
//     }
//     // check permissions
//     // if ('hairstyle' == $_POST['post_type']) {
//     //     if (!current_user_can('edit_page', $post_id)) {
//     //         return $post_id;
//     //     }
//     // } elseif (!current_user_can('edit_post', $post_id)) {
//     //     return $post_id;
//     // }
//     if (!current_user_can('edit_page', $post_id))
//             return $post_id;

//     // foreach ($meta_box['fields'] as $field) {
//     //     $old = get_post_meta($post_id, $field['id'], true);
//     //     $new = $_POST[$field['id']];
//     //     if ($new && $new != $old) {
//     //         update_post_meta($post_id, $field['id'], $new);
//     //     } elseif ('' == $new && $old) {
//     //         delete_post_meta($post_id, $field['id'], $old);
//     //     }
//     // }
// }


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

// function copy_title_to_meta( $post_ID )
// {

//     $meta_field = 'pm_title';
//     $post = get_post( $post_ID );

//     if ($post->post_type == 'hairstle') {
//         $meta_field = 'hairstyle_id';
//     } else if ($post->post_type == 'model') {
//         $meta_field = 'model_id';
//     }

//     if( $post->post_status == 'inherit' ) $post = get_post( $post->post_parent );
//     if ( $post->post_status == 'publish' AND !wp_is_post_revision( $post_ID ) ) update_post_meta( $post->ID, $post->post_title, $meta_field, false ); 

//     return $post_ID;
// }



// add_action( 'wp_insert_post', 'copy_title_to_meta' );
// add_action('save_post','update_title');
// add_filter( 'wp_insert_post_data' , 'update_title' , '99', 2 );
// function update_title($data, $postarr) {
// // function update_title($post_id) {
//     global $post;
//     if ( !is_admin() )
//         return $data;
//     // echo '<script>alert("cough...");</script>';
//     if ($data['post_type'] == 'hairstyle') {
//         // echo '<script>alert("cough...");</script>';
//         // $data['post_title'] = 'ID: '.get_post_meta($post_id, 'hairstyle_id', true);
//         // $data['post_name'] = 'ID: '.get_post_meta($post_id, 'hairstyle_id', true);
//         $data['post_title'] = 'ID: '.$postarr['hairstyle_id'];
//         $data['post_name'] = 'ID: '.$postarr['hairstyle_id'];
//         // wp_update_post( array('ID' => $post->ID, 'post_title' => get_post_meta($post_id, 'hairstyle_id') ) );
//         return $data;
//     } else if ($data['post_type'] == 'model') {
//         // $post->post_title = 'ID: '.get_post_meta($post_id, 'model_id', true);
//         $data['post_title'] = 'ID: '.$postarr['model_id'];
//         $data['post_name'] = 'ID: '.$postarr['model_id'];
//         // $data['post_title'] = 'ID: '.get_post_meta($post_id, 'model_id', true);
//         // $data['post_name'] = 'ID: '.get_post_meta($post_id, 'model_id', true);
//         // wp_update_post( array('ID' => $post->ID, 'post_title' => get_post_meta($post_id, 'model_id') ) );
//         return $data;
//     } if ($data['post_type'] == 'color') {
//         $data['post_title'] = 'ID: '.$postarr['color_name'];
//         $data['post_name'] = 'ID: '.$postarr['color_name'];
//         return;
//     } if ($data['post_type'] == 'language') {
//         $data['post_title'] = 'ID: '.$postarr['model_id'];
//         $data['post_name'] = 'ID: '.$postarr['model_id'];
//         return $data;
//     } else {
//         return $data;
//     }
    // wp_update_post( array('ID' => $post->ID, 'post_title' => 'ID' ) );

// global $post;
//     if ( !is_admin() )
//         return;
//     echo '<script>alert("cough...");</script>';
//     if ($post->post_type == 'hairstyle') {
//         // echo '<script>alert("cough...");</script>';
//         $post->post_title = 'ID: '.get_post_meta($post_id, 'hairstyle_id', true);
//         $post->post_name = 'ID: '.get_post_meta($post_id, 'hairstyle_id', true);
//         // wp_update_post( array('ID' => $post->ID, 'post_title' => get_post_meta($post_id, 'hairstyle_id') ) );
//         return;
//     } else if ($post->post_type == 'model') {
//         // $post->post_title = 'ID: '.get_post_meta($post_id, 'model_id', true);
//         $post->post_title = 'ID: '.get_post_meta($post_id, 'model_id', true);
//         $post->post_name = 'ID: '.get_post_meta($post_id, 'model_id', true);
//         // wp_update_post( array('ID' => $post->ID, 'post_title' => get_post_meta($post_id, 'model_id') ) );
//         return;
//     } if ($post->post_type == 'color') {
//         $post->post_title = 'ID: '.get_post_meta($post_id, 'color_name', true);
//         $post->post_name = 'ID: '.get_post_meta($post_id, 'color_name', true);
//         return;
//     } if ($post->post_type == 'language') {
//         $post->post_title = sanitize_title( date_i18n( 'F-j-Y-G-i-s', strtotime( $post->post_date ) ). '-viewpoint' );
//         $post->post_name = 'Viewpoint - '.date_i18n( 'M j, Y @ G:i', strtotime( $post->post_date ) );
//         return;
//     } else {
//         return;
//     }
//     wp_update_post( array('ID' => $post->ID, 'post_title' => 'ID' ) );
// }


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

// CUSTOM REST API FUNCTIONALITY
// function myplugin_api_init() {
//     global $myplugin_api_mytype;

//     $plugin = new HairFinder_API_Hairstyle();
//     add_filter( 'json_endpoints', array( $plugin, 'register_routes' ) );
// }
// add_action( 'wp_json_server_before_serve', 'myplugin_api_init' );

// class HairFinder_API_Hairstyle {
//     public function register_routes( $routes ) {
//         $routes['/hairfinder/hairstyle'] = array(
//             array( array( $this, 'get_posts'), WP_JSON_Server::READABLE ),
//             array( array( $this, 'new_post'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
//         );
//         $routes['/hairfinder/hairstyle/(?P<id>\d+)'] = array(
//             array( array( $this, 'get_post'), WP_JSON_Server::READABLE ),
//             array( array( $this, 'edit_post'), WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
//             array( array( $this, 'delete_post'), WP_JSON_Server::DELETABLE ),
//         );
//         // Add more custom routes here
//         return $routes;
//     }
//     public function get_posts() {
//         global $json_api;
//         $url = parse_url($_SERVER['REQUEST_URI']);
//         $defaults = array(
//           'ignore_sticky_posts' => true
//         );
//         $query = wp_parse_args($url['query']);
//         unset($query['json']);
//         unset($query['post_status']);
//         $query = array_merge($defaults, $query);
//         $posts = $json_api->introspector->get_posts($query);
//         $result = $this->posts_result($posts);
//         $result['query'] = $query;
//         return $result;
//       }
      
//       public function get_post() {
//         global $json_api, $post;
//         $post = $json_api->introspector->get_current_post();
//         if ($post) {
//             $previous = get_adjacent_post(false, '', true);
//             $next = get_adjacent_post(false, '', false);
//             $response = array(
//                 'post' => new JSON_API_Post($post)
//             );
//             if ($previous) {
//                 $response['previous_url'] = get_permalink($previous->ID);
//             }
//             if ($next) {
//                 $response['next_url'] = get_permalink($next->ID);
//             }
//           return $response;
//         } else {
//             $json_api->error("Not found.");
//         }
//       }
//       public function create_post() {
//         global $json_api;
//         if (!current_user_can('edit_posts')) {
//             $json_api->error("You need to login with a user that has 'edit_posts' capacity.");
//         }
//         if (!$json_api->query->nonce) {
//             $json_api->error("You must include a 'nonce' value to create posts. Use the `get_nonce` Core API method.");
//         }
//         $nonce_id = $json_api->get_nonce_id('posts', 'create_post');
//         if (!wp_verify_nonce($json_api->query->nonce, $nonce_id)) {
//             $json_api->error("Your 'nonce' value was incorrect. Use the 'get_nonce' API method.");
//         }
//         nocache_headers();
//         $post = new JSON_API_Post();
//         $id = $post->create($_REQUEST);
//         if (empty($id)) {
//             $json_api->error("Could not create post.");
//         }
//         return array(
//             'post' => $post
//         );
//       }
      
//       public function update_post() {
//         global $json_api;
//         $post = $json_api->introspector->get_current_post();
//         if (empty($post)) {
//             $json_api->error("Post not found.");
//         }
//         if (!current_user_can('edit_post', $post->ID)) {
//             $json_api->error("You need to login with a user that has the 'edit_post' capacity for that post.");
//         }
//         if (!$json_api->query->nonce) {
//             $json_api->error("You must include a 'nonce' value to update posts. Use the `get_nonce` Core API method.");
//         }
//         $nonce_id = $json_api->get_nonce_id('posts', 'update_post');
//         if (!wp_verify_nonce($json_api->query->nonce, $nonce_id)) {
//             $json_api->error("Your 'nonce' value was incorrect. Use the 'get_nonce' API method.");
//         }
//         nocache_headers();
//         $post = new JSON_API_Post($post);
//         $post->update($_REQUEST);
//         return array(
//             'post' => $post
//         );
//       }
      
//       public function delete_post() {
//         global $json_api;
//         $post = $json_api->introspector->get_current_post();
//         if (empty($post)) {
//             $json_api->error("Post not found.");
//         }
//         if (!current_user_can('edit_post', $post->ID)) {
//             $json_api->error("You need to login with a user that has the 'edit_post' capacity for that post.");
//         }
//         if (!current_user_can('delete_posts')) {
//             $json_api->error("You need to login with a user that has the 'delete_posts' capacity.");
//         }
//         if ($post->post_author != get_current_user_id() && !current_user_can('delete_other_posts')) {
//             $json_api->error("You need to login with a user that has the 'delete_other_posts' capacity.");
//         }
//         if (!$json_api->query->nonce) {
//             $json_api->error("You must include a 'nonce' value to update posts. Use the `get_nonce` Core API method.");
//         }
//         $nonce_id = $json_api->get_nonce_id('posts', 'delete_post');
//         if (!wp_verify_nonce($json_api->query->nonce, $nonce_id)) {
//             $json_api->error("Your 'nonce' value was incorrect. Use the 'get_nonce' API method.");
//         }
//         nocache_headers();
//         wp_delete_post($post->ID);
//         return array();
//       }

//     // ...
// }


$test = "tester testerson";

// FIREBUG DEBUGGING
require_once('misc/FirePHPCore-0.3.2/lib/FirePHPCore/FirePHP.class.php');
ob_start();


?>