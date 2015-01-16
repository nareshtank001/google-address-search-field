Ext.define('GoogleAddressSearchField.view.Main', {
     extend: 'Ext.form.Panel',
    xtype: 'main',
  
    config: {
        
		
        items: [
            {
            	xtype: 'toolbar',
            	docked: 'top',
                title: 'Welcome',
                
              
            },
            {
               xtype: 'fieldset',
               items: [
               	{
               	
               		xtype: 'googleaddresssearchfield',
               		labelAlign: 'top',
               		label: 'Google Address Search'
               	}
               ]
            }
        ]
    }
});
