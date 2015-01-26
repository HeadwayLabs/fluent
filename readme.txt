=== Fluent Framework ===
Contributors: nohalfpixels
Tags: options, options page, metaboxes, post meta, author meta, options framework, admin page creator
Requires at least: 3.8
Tested up to: 3.9.1
Stable tag: 1.0.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Fluent Framework is a WordPress Plugin/Framework which allows you to create and manage options pages, meta boxes, author meta, taxonomy meta and much more.

== Description ==

Fluent Framework

http://no-half-pixels.github.io/Fluent-Framework/

WordPress Options and Meta Information with a difference.

Standardized Definition and Access of Data

The WordPress Fluent Framework provides standardized definitions, and access to options and additional meta information for any data types.

The Framework has been designed to be simple and feature rich. We know there are many options frameworks already available, but none were quite right for our needs.

With the Fluent Framework we had a few important goals, listed to the right.

We truly belive in DRY (Dont Repeat Yourself) Development, and we have implemented this methodology through the framework, taking all of the differences between different parts of WordPress and providing a front layer which is consistent.

We also have design each field type and the way they are utilized, so we create a field once, and use it across any instance. This provides great streamlined code, consistent design, and as a result all fields will work in any application*.

*The only exception to this rule in the Group Field when nested other group fields. It functions 100% across all instances, but we are still working out a few css issues when using on profile pages due to the size/layout of the nested items.

== Installation ==

You can install/use Fluent in two ways. As a plugin, or by including the framework within a theme or plugin. Below are the steps for both methods:

A. Install as a plugin

1. Upload the `fluent-framework` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

B. Include within a theme/plugin

1. Copy the `fluent-framework` folder into the theme/plugin directory
2. Define the framework url like so (obviously providing the correct url to the framework folder):
   ```php
	if(!defined(‘FLUENT_URL')){
		define(‘FLUENT_URL', plugins_url( ‘/fluent’-framework, __FILE__ ));   
	}
   ```
3. Include the `fluent-framework.php` file.

== Frequently Asked Questions ==

== Screenshots ==

== Changelog ==

= 1.0.7 =
* Added crosses to multiselect
* Added background field

= 1.0.6 =
* Added vertical group layout
* Added sections tabs (only displays tabs in metabox type instances (page,post), will display as normal in other instances)
* Added group styling for taxonomy pages (be carefull with this, nested groups still wont look right)
* Added group type to the example usage for txonomy and user (to demonstrate they function properly, but also to examine how they look)
* Removed some unused files to reduce framework size

= 1.0.5 =
* Added underscore enqueue on color field
* Added default font size and line height to font field
* Added font preview background color switcher button
* Added site_option_{$option_name} filter to return default schema if not set (identical to option_{$option_name} but for multisite)
* Added Fluent_Store class for storing instances for later access (more features for this in later versions)
* Moved Fluent Taxonomy meta example to the created Fluent_Taxonomy instead of categories
* Added Ace field type
* Added Support Form Class
* Added example usage of Support Form Class to a custom field in the options panel
* Added example usage of Support Form Class as a dashboard widget
* Added example usage of Support Form Class as a help tab

= 1.0.4 =
* Network options pages now use get_site_option for saving values instead of primary site options table.

= 1.0.3 =
* Fixed typo in example usage for Fluent_Options_Meta 'post-types' > 'post_types'
* Fixed messages array notice undefined index in Fluent_Post_Type

= 1.0.2 =
* Added options page arg to disable restore
* Added filter fluent/options/page/$option_name/restore/message to options page
* Added filter fluent/options/page/$option_name/saved/message to options page
* Added action fluent/options/page/$option_name/restore/messages to options page
* Added action fluent/options/page/$option_name/saved/messages to options page
* Added messages array to options page args to allow custom message on save notice, restore notice, save button and save box area
* Added filter fluent/options/page/$option_name/save/button to options page
* Added options page args to hide the last updated text
* Added action fluent/options/page/$option_name/save on save
* Added Fluent_Post_Type class for post type creation
* Added Fluent_Taxonomy class for taxonomy creation
* Added image select field type

= 1.0.1 =
* Enabled Network Options Pages
* Fixed nested enqueue bug
* Removed Unused Files
* Updated git url in package.json file
* Added role lock on sections
* Added capability lock on sections
* Added 'created_fields' javascript event
* Moved sortable group javascript to be run on created_fields event
* Moved localize variables to base options class
* Restructured javascript required functions making it easier to extend in the future
* Fixed default value for select element
* Added role lock on fields
* Added capability lock on fields
* Updated example.php and demo class to include new field and section options
* Fixed required fields showing errors on restore action
* Added conditional display to fields based on field value(s), multiple conditions allowed - not for group fields
* Added export field
* Added fluent/options/save filter to allow alteration of values before save
* Added import field
* Added ability to save fields as on there own in the database for querying
* Added javascript change event on color field selection
* Added grunt curl task for fetching google fonts data (only done through grunt and data saved in file, which is accessed by font field if used). we will update this file with every release of the framework. Developers can update this if they want by running the grunt task `grunt googlefonts`
* Added basic font selector with family/color/line-height/font-size properties, loaded google fonts with preview (google fonts are loaded on hover of selection to reduce page load times)
* Renamed example.php to example-usage.php for a better demo
* Removed demo class in favour of using the example-usage.php file to save duplication of code

= 1.0.0 =
* First Release

== Upgrade Notice ==

= 1.0.1 =
* All backwards compatable, no changes needed
* Export field will show as "you need to save the options before this is available" message for already saved values until they are resaved then the field will work as normal

= 1.0.0 =
* Nothing to see here yet