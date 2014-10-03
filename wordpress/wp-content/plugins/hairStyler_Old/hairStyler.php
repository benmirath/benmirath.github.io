<?php
	/**
	 * Plugin Name: Hairstyler (deprecated)
	 * Plugin URI: 
	 * Description: 
	 * Version: 1.0
	 * Author: Ben Miller, Fabian Rastorfer
	 * Author URI: 
	 * Plugin Type: Piklist
	 * License: A "Slug" license name e.g. GPL2
	 */
    add_filter('piklist_post_types', 'model_register');
	add_filter('piklist_post_types', 'hairstyle_register');
    // MODELS
	function model_register($post_types) {
        $post_types['model'] = array(
        	'labels' => piklist('post_type_labels', 'Model'),
        	'public' => true,
        	'rewrite' => array(
        		'slug' => 'model'
        	),
        	'supports' => array(
        		'editor'
        	),
        	'hide_meta_box' => array(
        		// 'editor',
        		'author',
        		'slug',
        		'revisions',
        		'comments',
        		'commentstatus'
        	)
        );
        return $post_types;
    }

    // HAIRSTYLES
    function hairstyle_register($post_types) {
    	$post_types['hairstyle'] = array(
        	'labels' => piklist('post_type_labels', 'Hairstyle'),
        	'public' => true,
        	'rewrite' => array(
        		'slug' => 'hairstyle'
        	),
        	'supports' => array(
        		'title'
        	),
        	'hide_meta_box' => array(
        		'editor',
        		'author',
        		'slug',
        		'revisions',
        		'comments',
        		'commentstatus'
        	)
        );
        return $post_types;
    }



    add_action('init', 'my_init_function');
	function my_init_function() {
	  	if(is_admin()) {
			include_once('/localhost/wp-content/plugins/piklist/assets/class-piklist-checker.php');

			// if (!piklist_checker::check(__FILE__)) {
			// 	return;
			// }
	  	}
	}

	// Forces only one image to be uploaded per post
	add_filter('wp_handle_upload_prefilter', 'yoursite_wp_handle_upload_prefilter');
	function yoursite_wp_handle_upload_prefilter($file) {
	  // This bit is for the flash uploader
	  if ($file['type']=='application/octet-stream' && isset($file['tmp_name'])) {
	    $file_size = getimagesize($file['tmp_name']);
	    if (isset($file_size['error']) && $file_size['error']!=0) {
	      $file['error'] = "Unexpected Error: {$file_size['error']}";
	      return $file;
	    } else {
	      $file['type'] = $file_size['mime'];
	    }
	  }
	  list($category,$type) = explode('/',$file['type']);
	  if ('image'!=$category || !in_array($type,array('jpg','jpeg','gif','png'))) {
	    $file['error'] = "Sorry, you can only upload a .GIF, a .JPG, or a .PNG image file.";
	  } else if ($post_id = (isset($_REQUEST['post_id']) ? $_REQUEST['post_id'] : false)) {
	    if (count(get_posts("post_type=attachment&post_parent={$post_id}"))>0)
	      $file['error'] = "Sorry, you cannot upload more than one (1) image.";
	  }
	  return $file;
	}
