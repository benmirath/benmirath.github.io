<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
// define('DB_NAME', 'millb313');
define('DB_NAME', 'hairStyler');

/** MySQL database username */
// define('DB_USER', 'millb313');
define('DB_USER', 'root');

/** MySQL database password */
// define('DB_PASSWORD', 'Petrichor2357!');
define('DB_PASSWORD', 'root');

/** MySQL hostname */
// define('DB_HOST', 'localhost');
define('DB_HOST', 'localhost:/Applications/MAMP/tmp/mysql/mysql.sock');


/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'M-%`Yk1!Y|R/x(M{O8>ETV*OvYmE:14.nxJXT-jN|x2[Iwu-nF-g0-5gA=VLp;)n');
define('SECURE_AUTH_KEY',  'IE<t+N%,ReiyF!`#ZwnCNNy=dR555qY5-4qM/WsxlSO&._HBQGmZ;~q4$(D~{Zcg');
define('LOGGED_IN_KEY',    '2HY}p=+MR0ylR5[Yns:g76dvr~nFkUM4IJ-&Q]qIIQ%i(T6Klu=+ty@8J}X-{*fO');
define('NONCE_KEY',        '|pX 7P+<N@xt|KZwd6.:=B3bY`wWU)J`<!N*%h(Vy.9XLe-Th8`T@|3EP)it5E7J');
define('AUTH_SALT',        'ylKy|xLH@1&p^}<X.SF1iR+BG|}uZ`ekBe@w1S,5tPj|p/9dya7KAE]E3lY%+?``');
define('SECURE_AUTH_SALT', 'iRe_RlcxXeoq?A$mM`}1n%dZMnH?`staM^Rkqb@5oM67Ds_D9s^NlKs)#AMqGe)j');
define('LOGGED_IN_SALT',   'omCQTefW{wQQBNEy{Sxwk/_41V2qv JnC%[n%!+4!krw?sZ|vC|gU;p]0W72FhTB');
define('NONCE_SALT',       'Yhe`b}Vmo7|IAqgWOeY#C+D3rAiF<SY&a_2KJ_xP#2NuIs3}~|!Wb)_-Ym*VxCmi');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
 // Enable WP_DEBUG mode
define('WP_DEBUG', true);

// Enable Debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', true);

// Disable display of errors and warnings 
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors',0);

// Use dev versions of core JS and CSS files (only needed if you are modifying these core files)
define('SCRIPT_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
