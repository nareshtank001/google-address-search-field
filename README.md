# google-address-search-field

<b>Google Address Search Field Description</b>

The GoogleAddressSearchField extension for Sencha Touch 2.x extends Ext.field.Text and provides the ability to search address from google.
It's look like auto suggest dropdown for address from google.
When user type in field it's open pop-up window with search result and on select address from list it will be set as value in field.


<b>Installation</b>
	
add google api script in index.html

	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"></script>


Add a requires to GoogleAddressSearchField in your app.js file (or the direct view that uses it)

requires: [
	'Ext.ux.GoogleAddressSearchField'
]


The GoogleAddressSearchField class extends Ext.field.Text making standard textfield methods available. For example, methods such as getValue and SetValue are all viable.

<b>Class and xtype</b>

Ext.ux.GoogleAddressSearchField (xtype: googleaddresssearchfield)



<b>Note: The example application was generated using Sencha Touch 2.3.1</b>

