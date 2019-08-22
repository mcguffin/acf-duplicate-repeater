ACF Duplicate Repeater
======================

This is the official github repository of the [ACF Duplicate Repeater](https://wordpress.org/plugins/acf-duplicate-repeater/) plugin.

Adds a duplicate button to ACF Repeater Fields.

Tested up to WP 5.2 and ACF Pro 5.8.3.

Requires at least [ACF PRO 5.6](http://www.advancedcustomfields.com/pro/) and PHP 5.6

Installation
------------

#### In WP Admin
 Just follow the [Automatic Plugin Installation](https://wordpress.org/support/article/managing-plugins/#automatic-plugin-installation) procedere.

### Using Composer
 - Add repository source : { "type": "vcs", "url": "https://github.com/mcguffin/acf-duplicate-repeater" }.
 - Include "mcguffin/acf-duplicate-repeater": "dev-master" in your composer file for last master's commits or a released tag.


Development
-----------

### Getting started:
```
git clone git@github.com:mcguffin/acf-duplicate-repeater.git
cd acf-duplicate-repeater
npm install
```

### Watching src folder
```
npm run dev
```

### Enable some fields and a custom post type for testing (and watch src folder at the same time)
```
npm run dev-test
```
Press <kbd>^C</kbd> in the terminal to stop.

Contributing
------------
 - **Issues, Pull Requests, Feature Requests:** are always welcome. (But please keep in mind, that I will only support ACF and ACF Pro core fields.)
 - **Having trouble with fields:** Please provide a json file with your field group definition. (see [ACF Local JSON](https://www.advancedcustomfields.com/resources/local-json/) for how to get one)
 - **3rd Party Field Support:** In order to keep a lean codebase and to avoid maintenance work, I won't add support non-ACF-fields. I would have to keep track of dozens of plugins. However since version 1.2 it is no rocket science to add support for your own fields: [Third Party Field Support](wiki/Third-Party-Fields).  
   Please feel free to share your knowledge in the wiki.
