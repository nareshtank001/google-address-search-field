Ext.define('Ext.ux.GoogleAddressSearchField', {
	extend: 'Ext.field.Text',

	xtype: 'googleaddresssearchfield',
	requires: ['Ext.Panel','Ext.dataview.List','Ext.form.FieldSet'],

	config: {
		listeners: {
			scope:this,
			keyup: 'onKeyUp'
		}
	},

	destroyPanel: false,

	initialize: function(){
		this.googleAutoSearchService = new google.maps.places.AutocompleteService();
		this.callParent();
		this.getComponent().on({
			scope: this,
			keyup: 'onKeyUp',
			focus: 'addResultPanel'
		});
	},

	addResultPanel: function() {

		var me = this;
		this.destroyPanel = false;
		this.resultPanel = Ext.create('Ext.Panel',{
			modal: true,
			hideOnMaskTap: true,
			height: '180px',
			width: '94%',
			layout: 'fit',
			margin: '-9px 0 0 0',
			items: [
				{
					xtype: 'list',
					itemHeight: 30,
					itemTpl: '<div style="font-size: 13px">{description}</div>',
					store: Ext.create("Ext.data.Store",{
						fields: ['description']
					}),
					listeners: {
						itemtap: function( list, index, item, record ) {
							me.setValue( record.get('description'));
							me.destroyPanel = true;
							me.resultPanel.hide( );
						}
					}
				}
			],
			listeners: {
				hide: function(panel){
					me.destroyResultPanel( panel, me)
				}
			}
		});

		Ext.Viewport.add( me.resultPanel );

	},

	destroyResultPanel: function( panel, field ) {

		if( field.destroyPanel ) {
			panel.destroy();
		}

	},

	onKeyUp: function() {

		this.destroyPanel = true;

		if( this.resultPanel.isHidden( ) ) {

			this.resultPanel.showBy(this,'tc-bc' );

		}

		var resultList = this.resultPanel.query('list')[0];

		if(this.getValue().length > 0 ) {

			this.googleAutoSearchService.getQueryPredictions({ input: this.getValue() }, function(result){

				resultList.getStore().removeAll();

				if(result) {

					resultList.getStore().add(result);

				}

			});

		} else {

			resultList.getStore().removeAll();

		}

	}
});