<?php

/*
  Controller name: Hairstyle
  Controller description: User Registration, Authentication, User Info, User Meta, FB Login, BuddyPress xProfile Fields methods
  Controller Author: Ben Miller
  Controller Author Twitter: @parorrey
  Controller Author Website: parorrey.com
  
*/
class JSON_API_Hairstyle_Controller {
	
	public function custom_register(){

		global $json_api;	  

	   	if (!$json_api->query->username) {
			$json_api->error("You must include 'username' var in your request. ");
		}
		else $username = sanitize_user( $json_api->query->username );
	 
	  	if (!$json_api->query->email) {
			$json_api->error("You must include 'email' var in your request. ");
		}
		else $email = sanitize_email( $json_api->query->email );

		if (!$json_api->query->nonce) {
			$json_api->error("You must include 'nonce' var in your request. Use the 'get_nonce' Core API method. ");
		}
	 	else $nonce =  sanitize_text_field( $json_api->query->nonce ) ;
	 
	 	if (!$json_api->query->display_name) {
			$json_api->error("You must include 'display_name' var in your request. ");
		}
		else $display_name = sanitize_text_field( $json_api->query->display_name );

		if (!$json_api->query->gender) {
			$json_api->error("You must include 'gender' var in your request. ");	
		}
		else $gender = sanitize_text_field ($json_api->query->gender);

		if (!$json_api->query->password) {
			$json_api->error("You must include 'password' var in your request. ");	
		}
		else $password = sanitize_text_field($json_api->query->password);

		$user_pass = sanitize_text_field( $_REQUEST['user_pass'] );

		//Add usernames we don't want used

		$invalid_usernames = array( 'admin' );

		//Do username validation

		$nonce_id = $json_api->get_nonce_id('user', 'register');

	 	if( !wp_verify_nonce($json_api->query->nonce, $nonce_id) ) {
	    	$json_api->error("Invalid access, unverifiable 'nonce' value. Use the 'get_nonce' Core API method. ");
	    }
		else {
			if ( !validate_username( $username ) || in_array( $username, $invalid_usernames ) ) {
	  			$json_api->error("Username is invalid.");
	        }
	    	elseif ( username_exists( $username ) ) {
	    		$json_api->error("Username already exists.");
	        }
	        else{
				if ( !is_email( $email ) ) {
	   	 			$json_api->error("E-mail address is invalid.");
	             }
	    		elseif (email_exists($email)) {
		 			$json_api->error("E-mail address is already in use.");
	          	}			
				else {
					//Everything has been validated, proceed with creating the user
					//Create the user

					if( !isset($_REQUEST['user_pass']) ) {
						 // $user_pass = wp_generate_password();
						 // $_REQUEST['user_pass'] = $user_pass;
						 $_REQUEST['user_pass'] = $password;
					}

					$_REQUEST['user_login'] = $username;
					$_REQUEST['user_email'] = $email;

					$allowed_params = array('user_login', 'user_email', 'user_pass', 'display_name', 'user_nicename', 'user_url', 'nickname', 'first_name',
					                         'last_name', 'description', 'rich_editing', 'user_registered', 'role', 'jabber', 'aim', 'yim',
											 'comment_shortcuts', 'admin_color', 'use_ssl', 'show_admin_bar_front'
					);
					foreach($_REQUEST as $field => $value){
						if( in_array($field, $allowed_params) ) 
							$user[$field] = trim(sanitize_text_field($value));	
					}

					$user_id = wp_insert_user( $user );
					$data['updated'] = add_user_meta( $user_id, 'gender', $gender, true );

					/*Send e-mail to admin and new user - 
					You could create your own e-mail instead of using this function*/
					if($user_id) 
						wp_new_user_notification( $user_id, $user_pass );	  

				}
			} 
	   	}
	   	$expiration = time() + apply_filters('auth_cookie_expiration', 1209600, $user_id, true);

		$cookie = wp_generate_auth_cookie($user_id, $expiration, 'logged_in');

		return array( 
			"cookie" => $cookie,	
			"user_id" => $user_id	
		); 		  
	}   
	public function update_password () {
		require_once( ABSPATH . 'wp-includes/pluggable.php' );
		global $json_api, $wpdb;

		// if (!$json_api->query->cookie) {
		// 	$json_api->error("Invalid cookie. Use the `generate_auth_cookie` method.");
		// } else $user_id = $json_api->query->cookie;

		if (!$json_api->query->user_id) {
			$json_api->error("Invalid id. Use the `generate_auth_cookie` method.");
		} else $user_id = $json_api->query->user_id;

		if (!$json_api->query->password) {
			$json_api->error("You must include a 'password' var in your request. Use the `generate_auth_cookie` method.");
		} else {
			$password = sanitize_text_field($json_api->query->password);
			// $hashedPassword = wp_hash_password($password),
		}

		// $data['user_id']; = $user_id;
		// $data['password']; = $password;
		// $data['updated'] = wp_set_password( $password, $user_id );
		// $data['updated'] = 
		wp_set_password( $password, $user_id );
		return $data;
	}

	public function delete_account () {
		require_once( ABSPATH . 'wp-admin/includes/user.php' );
		global $json_api, $wpdb;

		if (!$json_api->query->cookie) {
			$json_api->error("You must include a 'cookie' var in your request. Use the `generate_auth_cookie` method.");
		}
		$user_id = wp_validate_auth_cookie($json_api->query->cookie, 'logged_in');

		if (!$user_id) 	
			$json_api->error("Invalid cookie. Use the `generate_auth_cookie` method.");

		wp_delete_user( $user_id ); 

		return $data;
	}
	public function send_reminder_email () {

	}

}