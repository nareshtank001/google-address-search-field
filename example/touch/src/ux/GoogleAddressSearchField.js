Ext.define('Ext.ux.GoogleAddressSearchField', {
    extend : 'Ext.field.Text',
    xtype : 'googleaddresssearchfield',

    requires : [
        'Ext.Panel',
        'Ext.dataview.List'
    ],

    config : {
        autoSearchService : true,
        itemTpl           : '{description}',
        resultPanel       : null,
        store             : null,
        valueField        : 'description'
    },

    initialize : function() {

        var me = this;

        me.callParent();

        me.getComponent().on({
            scope : me,
            keyup : 'onKeyUp',
            focus : 'addResultPanel'
        });

    },

    applyAutoSearchService : function(opts) {

        return new google.maps.places.AutocompleteService(opts);

    },

    addResultPanel : function() {

        var me    = this,
            panel = Ext.create('Ext.Panel',{
                modal         : true,
                hideOnMaskTap : true,
                height        : 180,
                width         : '94%',
                layout        : 'fit',
                margin        : '-9px 0 0 0',
                items         : [
                    {
                        xtype      : 'list',
                        itemHeight : 30,
                        itemTpl    : me.getItemTpl(),
                        store      : me.getStore(),
                        listeners  : {
                            itemtap : function(list, index, item, record) {
                                me.setValue(record.get(me.getValueField()));

                                panel.hide();
                            }
                        }
                    }
                ]
            });

        me.setResultPanel(panel);

        Ext.Viewport.add(panel);

    },

    destroy : function() {

        var me    = this,
            panel = this.getResultPanel();

        panel.destroy();

        me.setResultPanel(null);
        me.getAutoSearchService(null);

        me.callParent();

    },

    onKeyUp: function() {

        var me          = this,
            value       = me.getValue(),
            resultPanel = me.getResultPanel(),
            resultStore = me.getStore();

        if (resultPanel.isHidden()) {

            resultPanel.showBy(me, 'tc-bc');

        }

        if (value) {

            me.getAutoSearchService().getQueryPredictions({ input : value }, function(result) {

                resultStore.removeAll();

                if (result) {

                    resultStore.add(result);

                }

            });

        } else {

            resultStore.removeAll();

        }

    }
});