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

 - **3rd Party Field Support:** In order to keep a lean codebase and to avoid maintenance work, I won't add support non-ACF-fields. I would have to keep track of dozens of plugins. However since release 1.2.0 it is no rocket science to add support for your own fields: [Third Party Field Support](wiki/Third-Party-Fields).


Pull Requests Welcome
---------------------
This plugin is mainly to be used in my client projects. It is published in the hope that it may be useful to others.
At this time I want to keep the maintenance profile low.
I will do bugfixing and adding new features is only according to the particular needs of my clients.

So please understand, that I can not respond to each of your issues.

Anyway, if you are able to fix an issue or add a cool new feature, your pull request is more than welcome!


Developing
----------
This plugin uses gulp.

To get started `cd` in the plugin directory,  
run `npm install`  
followed by `gulp`.
