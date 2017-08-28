ACF Duplicate Repeater
======================

WordPress plugin which extends the funtionality of the Advanced Custom Fields Plugin (Pro, Version 5+).  
http://www.advancedcustomfields.com/pro/

Adds a duplicate button to ACF Repeater Fields.

Coded with WP 4.8 and ACF Pro 5.6.1

Requires at least PHP 5.3.

Note:
-----
This plugin is still a stub. It only works with posts and repeater fields yet.
Pull requests are welcome.


Known Issues:
-------------
 - Duplicated WYSIWYG-Editor fields are not being initialized properly.
   This means you will see an empty text area and a dysfunctional toolbar in the duplicate.
   After saving the post you can edit the copy thext as usual.
 - 


Developing
----------
This plugin uses gulp.

To get started `cd` in the plugin directory,  
run `npm install`  
followed by `gulp`.


ToDo:
-----

 - [ ] Fix broken TinyMCE initialization
 - [ ] Make it work with:
	 - [ ] Users
	 - [ ] Taxonomies
	 - [ ] Options pages
	 - [ ] Widgets
 - [ ] Support Layout field