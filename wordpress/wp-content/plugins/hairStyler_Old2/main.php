<?php
    /*
    Plugin Name: Hair Style Plugin Old
    Description: a plugin to create customized hairstyles.
    Version: 1.0
    Author: Ben Miller
    */
    //CUSTOM POST TYPES
    // MODELS
    add_action('init', 'model_register');
    add_action('init', 'hairstyle_register');

    function model_register() {
        $labels = array(
            'name'               => _x( 'Models', 'post type general name' ),
            'singular_name'      => _x( 'Model', 'post type singular name' ),
            'add_new'            => _x( 'Add New', 'model' ),
            'add_new_item'       => __( 'Add New Model' ),
            'edit_item'          => __( 'Edit Model' ),
            'new_item'           => __( 'New Model' ),
            'all_items'          => __( 'All Models' ),
            'view_item'          => __( 'View Model' ),
            'search_items'       => __( 'Search Models' ),
            'not_found'          => __( 'No models found' ),
            'not_found_in_trash' => __( 'No models found in the Trash' ), 
            'parent_item_colon'  => '',
            'menu_name'          => 'Models'
            );
        $args = array(
            'labels'        => $labels,
            'description'   => 'Holds model images and data',
            'public'        => true,
            'menu_position' => 6,
            'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' ),
            'has_archive'   => true,
        );
        register_post_type( 'model', $args ); 
    }

    // HAIRSTYLES

    function hairstyle_register() {
        $labels = array(
            'name'               => _x( 'Hairstyles', 'post type general name' ),
            'singular_name'      => _x( 'Hairstyle', 'post type singular name' ),
            'add_new'            => _x( 'Add New', 'hairstyle' ),
            'add_new_item'       => __( 'Add New Hairstyle' ),
            'edit_item'          => __( 'Edit Hairstyle' ),
            'new_item'           => __( 'New Hairstyle' ),
            'all_items'          => __( 'All Hairstyles' ),
            'view_item'          => __( 'View Hairstyle' ),
            'search_items'       => __( 'Search Hairstyles' ),
            'not_found'          => __( 'No hairstyles found' ),
            'not_found_in_trash' => __( 'No hairstyles found in the Trash' ), 
            'parent_item_colon'  => '',
            'menu_name'          => 'Hairstyles'
            );
        $args = array(
            'labels'        => $labels,
            'description'   => 'Holds hairstyle images and data',
            'public'        => true,
            'menu_position' => 5,
            'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' ),
            'has_archive'   => true,
        );
        register_post_type( 'hairstyle', $args ); 
    }
    


    add_action( 'add_meta_boxes', 'hairstyle_custom_box' );
    function hairstyle_custom_box() {
        global $meta_box;
        add_meta_box ($meta_box['id'], $meta_box['title'], 'draw_hairstyle_meta_box', $meta_box['page'], $meta_box['context'], $meta_box['priority']);
    }
    $meta_box = array(
        'id' => 'hairstyle-meta-box',
        'title' => 'Hairstyle Data',
        'page' => 'hairstyle',
        'context' => 'side',
        'priority' => 'high',
        'fields' => array(
            array(
                'name' => 'ID',
                'desc' => '',
                'id' => $prefix . 'text',
                'type' => 'text',
                'std' => 'Enter hair ID'
            ),
            array(
                'name' => 'Gender',
                'id' => $prefix . 'select-gender',
                'type' => 'select',
                'options' => array('Female', 'Male')
            ),
            array(
                'name' => 'Style',
                'id' => $prefix . 'select-style',
                'type' => 'select',
                'options' => array('Salon', 'Celebrity')
            ),
            array(
                'name' => 'Length',
                'id' => $prefix . 'select-length',
                'type' => 'select',
                'options' => array('Short', 'Medium', 'Long')
            ),
            array(
                'name' => 'Texture',
                'id' => $prefix . 'select-texture',
                'type' => 'select',
                'options' => array('Straight', 'Wavy', 'Curly')
            ),
            array(
                'name' => 'Image Upload',
                'id' => $prefix . 'file',
                'type' => 'file'
            )
        )
    );

    $haircolors = array(
        0 => 'Blonde',
        1 => 'Brunette',
        2 => 'White',
    );

    function initArray() {
        $haircolors = array(
            0 => 'Blonde',
            1 => 'Brunette',
            2 => 'White',
        );
    }

    // Callback function to show fields in meta box
    function draw_hairstyle_meta_box() {
        global $meta_box, $post, $haircolors;
        // Use nonce for verification
        echo '<input type="hidden" name="hairstyle_meta_box_nonce" value="', wp_create_nonce(basename(__FILE__)), '" />';
        foreach ($meta_box['fields'] as $field) {
            // get current post meta data
            $meta = get_post_meta($post->ID, $field['id'], true);
            switch ($field['type']) {
                case 'text':
                    echo '<label for="' , $field['id'] , '">' , $field['name'] , '</label>';
                    echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" placeholder="Please enter an ' , $field['name'], '" value="', $meta ? $meta : $field['std'], '" style="float: right;" />', '<br />', $field['desc'];
                    break;
                case 'select':
                    echo '<label for="' , $field['id'] , '">' , $field['name'] , '</label>';
                    echo '<select name="', $field['id'] , '" id="', $field['id'], '" style="float: right;">';
                    echo '<option value="" disabled selected>Select a ' , $field['name'] , '</option>';
                    foreach ($field['options'] as $option) {
                        echo '<option ', $meta == $option ? ' selected="selected"' : '', '>', $option, '</option>';
                    }
                    echo '</select>';

                    break;
                case 'file':
                    echo 
                    '<label for="' , $field['id'] , '">' , $field['name'] , '</label>
                    <div class="hairstyleWrapper">
                    <select name="' , $field['name'] , '" id="' , $field['id'] , '"style="float: right;">
                    <option value="" disabled selected>Select a haircolor</option>';
                    foreach ($haircolors as $option) {
                        echo '<option ', $meta == $option ? ' selected="selected"' : '', '>', $option , '</option>';
                    }
                    echo '</select>
                    <input type="file" name="', $field['id'] , '" style="float: right;" />
                    <br/>
                    </div>'; 


                    echo '<input type="button" value="Add Hair Color Image" onclick="(function (e) {
                            var container = document.createElement(\'div\'); 
                            container.classList.add(\'hairstyleWrapper\');
                            var select = document.createElement(\'select\');

                            var initialOpt = document.createElement(\'option\');
                            initialOpt.setAttribute(\'disabled\', true);
                            initialOpt.setAttribute(\'selected\', true);
                            select.appendChild(initialOpt);';

                        foreach($haircolors as $option){
                            echo 'var tempOpt = document.createElement(\'option\');
                            tempOpt.innerHTML(\'' , $option , '\');

                            select.appendChild(tempOpt);';
                        }
                    echo 'console.log(container);
                            container.appendChild(select);
                            console.log(e);
                            e.target.parentElement.insertBefore(container, e.target);
                        })(event);" />';
                            // var el = document.createElement(\'
                            // <select name="' , $field['name'] , '" id="' , $field['id'] , '"style="float: right;">
                            // <option value="" disabled selected>Select a haircolor</option>';
                            // foreach ($haircolors as $option) {
                            //     echo '<option>' , $haircolors[$option] , '</option>';
                            // };
                            // echo '</select>
                            // \');}" />';
                    break;
            }
            echo '<br/><br/>';
        }
    }
    add_action( 'save_post', 'hairstyle_save_post_meta', 10, 2 );

    function hairstyle_save_post_meta( $post_id, $post ) {

        global $meta_box;
        // verify nonce
        if (!wp_verify_nonce($_POST['hairstyle_meta_box_nonce'], basename(__FILE__))) {
            return $post_id;
        }
        // check autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $post_id;
        }
        // check permissions
        if ('hairstyle' == $_POST['post_type']) {
            if (!current_user_can('edit_page', $post_id)) {
                return $post_id;
            }
        } elseif (!current_user_can('edit_post', $post_id)) {
            return $post_id;
        }
        foreach ($meta_box['fields'] as $field) {
            $old = get_post_meta($post_id, $field['id'], true);
            $new = $_POST[$field['id']];
            if ($new && $new != $old) {
                update_post_meta($post_id, $field['id'], $new);
            } elseif ('' == $new && $old) {
                delete_post_meta($post_id, $field['id'], $old);
            }
        }

    }