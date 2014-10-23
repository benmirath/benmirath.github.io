<?php
add_shortcode('hf-hairstyles', 'hf_hairstyles_handler');
function hf_hairstyles_handler($atts) {
    global $hf_add_hairstyles_scripts;

    $hf_add_hairstyles_scripts = true;

    return '<div id="hf-hairstyles">
                <div class="hf-hairstyles-list"></div>
                <div class="hf-hairstyles-details"></div>
            </div>';
}

add_action('wp_footer', 'hf_enqueue_hairstyles_scripts');
function hf_enqueue_hairstyles_scripts() {
    global $hf_add_hairstyles_scripts;

    /* Test if the 'ev-venues' shortcode exists on the page */
    if ($hf_add_hairstyles_scripts) {
        wp_enqueue_script('hf-hairstyles-model', 
            plugins_url('js/models/hairstyles-model.js', __FILE__),
            array('backbone', 'underscore'), false, true);
        wp_enqueue_script('hf-hairstyles-list-view', 
            plugins_url('js/views/hairstyles-list.js', __FILE__),
            array('ev-ui', 'jquery', 'backbone', 'underscore'), 
            false, true);
        wp_enqueue_script('hf-hairstyles-details-view', 
            plugins_url('js/views/hairstyles-details.js', __FILE__),
            array('ev-ui', 'jquery', 'backbone', 'underscore'), 
            false, true);
        wp_enqueue_script('hf-hairstyles', 
            plugins_url('js/hairstyles-app.js', __FILE__),
            array('hf-hairstyles-model', 'hf-hairstyles-list-view', 
                  'hf-hairstyles-details-view'), false, true);
    }
}
?>