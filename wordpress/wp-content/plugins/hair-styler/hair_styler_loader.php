<?php
class HairstylerLoader extends MvcPluginLoader {

	var $db_version = '1.0';
    var $tables = array();

	function activate() {
 
        // This call needs to be made to activate this app within WP MVC
 
        $this->activate_app(__FILE__);
 
        // Perform any databases modifications related to plugin activation here, if necessary
 
        require_once ABSPATH.'wp-admin/includes/upgrade.php';
 
        add_option('hair_styler_db_version', $this->db_version);
 
        // Use dbDelta() to create the tables for the app here
 
        global $wpdb;
 
        $this->tables = array(
            // 'hairstyles' => $wpdb->prefix.'hairstyles',
            // 'models' => $wpdb->prefix.'models'
            'hairstyles' => $wpdb->prefix.'postmeta'
        );
 
  //       $sql = 'CREATE TABLE '.$this->tables['hairstyles'].' (
  //               hairstyle_id int(5) NOT NULL,
  //               hairstyle_gender varchar(8) NOT NULL default "female",
  //               hairstyle_length varchar(8) NOT NULL,
  //               hairstyle_texture varchar(8) NOT NULL,
  //               hairstyle_style varchar(8) NOT NULL,
  //               hairstyle_colors text NOT NULL,
  //               PRIMARY KEY  (hairstyle_id)
  //       )';
  //       dbDelta($sql);
 
  //       $sql = 'CREATE TABLE '.$this->tables['models'].' (
  //            	model_id int(5) NOT NULL,
  //            	model_gender varchar(8) NOT NULL default "female",
  //            	PRIMARY KEY  (model_id)
  //       )';
		// dbDelta($sql);
    }
 
    function deactivate() {
 
        // This call needs to be made to deactivate this app within WP MVC
        $this->deactivate_app(__FILE__);
 
        // Perform any databases modifications related to plugin deactivation here, if necessary
 
    }

}
?>