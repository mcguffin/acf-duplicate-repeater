ACF Duplicate Repeater
======================

WordPress plugin which extends the functionality of the Advanced Custom Fields Plugin (Pro, Version 5+).  
http://www.advancedcustomfields.com/pro/

Adds a duplicate button to ACF Repeater Fields.

Tested up to WP 4.9.x and ACF Pro 5.7.0.  
Compatible with ACF 5.x

Requires at least PHP 5.3.


Installation
------------

 ### Production (Stand-Alone)
  - Head over to [releases](../../releases)
  - Download 'acf-duplicate-repeater.zip'
  - Upload and activate it like any other WordPress plugin
  - AutoUpdate will run as long as the plugin is active

 ### Production (using Github Updater – recommended for Multisite)
  - Install [Andy Fragen's GitHub Updater](https://github.com/afragen/github-updater) first.
  - In WP Admin go to Settings / GitHub Updater / Install Plugin. Enter `mcguffin/acf-duplicate-repeater` as a Plugin-URI.

 ### Development
  - cd into your plugin directory
  - $ `git clone git@github.com:mcguffin/acf-duplicate-repeater.git`
  - $ `cd acf-duplicate-repeater`
  - $ `npm install`
  - $ `gulp


Contributing
------------
 - **Issues, Pull Requests, Feature Requests:** Are always welcome. (But please keep in mind, that I will only support ACF and ACF Pro core fields.)
 - **3rd Party Field Support:** In order to keep a lean codebase and to avoid maintenance work, I won't add support non-ACF-fields. I would have to keep track of dozens of plugins. However since version 1.2 it is no rocket science to add support for your own fields: [Third Party Field Support](wiki/Third-Party-Fields).  
   Please feel free to share your knowledge in the wiki.
