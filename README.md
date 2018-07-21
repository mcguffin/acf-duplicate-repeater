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


Fields Tested and verified so far
---------------------------------

| Field            | Status        |
|------------------|---------------|
| **Basic**        |               |
| Text             | works         |
| Text Area        | untested      |
| Number           | untested      |
| Range            | untested      |
| Email            | untested      |
| Url              | untested      |
| Password         | untested      |
| **Content**      |               |
| Image            | works         |
| File             | untested      |
| Wysiwyg Editor   | works         |
| oEmbed           | untested      |
| Gallery          | untested      |
| **Choice**       |               |
| Select           | untested      |
| Checkbox         | works         |
| Radio Button     | untested      |
| Button Group     | untested      |
| True / False     | untested      |
| **Relational**   |               |
| Link             | works         |
| Post Object      | untested      |
| Page Link        | untested      |
| Relationship     | untested      |
| Taxonomy         | untested      |
| User             | untested      |
| **jQuery**       |               |
| Google Map       | works         |
| Date Picker      | works         |
| Date Time Picker | works         |
| Time Picker      | works         |
| Color Picker     | works         |
| **Layout**       |               |
| Message          | untested      |
| Accordion        | untested      |
| Tab              | untested      |
| Group            | untested      |
| Repeater         | works         |
| Flexible Content | works         |
| Clone            | untested      |


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
