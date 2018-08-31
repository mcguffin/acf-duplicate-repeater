ACF Duplicate Repeater
======================

WordPress plugin which extends the functionality of the Advanced Custom Fields Plugin (Pro, Version 5+).  
http://www.advancedcustomfields.com/pro/

Adds a duplicate button to ACF Repeater Fields.

Tested up to WP 4.9 and ACF Pro 5.7.0.  
Compatible with ACF 5.x

Requires at least PHP 5.3.


Installation
------------
 - Head over to [releases](../../releases)
 - Download 'acf-duplicate-repeater.zip'
 - Install and activate it like any other WordPress plugin
 - As long as the plugin is active, it will check for updates


Contributing
------------
 - **Issues, Pull Requests, Feature Requests:** Are always welcome. (But please keep in mind, that I will only support ACF and ACF Pro core fields.)
 - **3rd Party Field Support:** In order to keep a lean codebase and to avoid maintenance work, I won't add support non-ACF-fields. I would have to keep track of dozens of plugins. However since version 1.2 it is no rocket science to add support for your own fields: [Third Party Field Support](wiki/Third-Party-Fields).  
   Please feel free to share your knowledge in the wiki.


Developing
----------
This plugin uses gulp.

To get started `cd` in the plugin directory,  
run `npm install`  
followed by `gulp`.
