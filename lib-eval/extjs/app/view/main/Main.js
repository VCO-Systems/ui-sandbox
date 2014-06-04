/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('extjs.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        region: 'north',
        html: '<b>Item</b>',
        width: 250,
        split: true,
        tbar: [{
            text: 'List',
            handler: 'onClickButton'
        },
        {
            text: 'Links',                      
            menu: {
                xtype: 'menu',                          
                items: [{
                        text: 'C_VAS',
                        iconCls: 'edit'
                    }]                          
            }
        },
        {
            text: 'Actions',                      
            menu: {
                xtype: 'menu',                          
                items: [{
                        text: 'Add',
                        iconCls: 'edit'
                    },
                    {
                        text: 'Change',
                        iconCls: 'edit'
                    },
                    {
                        text: 'Delete',
                        iconCls: 'edit'
                    }]                          
            }
        }
        ]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Criteria',
            html: '',
            items: [
                    {
						xtype: 'form',
						layout: 'form',
						collapsible: true,
						id: 'simpleForm',
						url: 'save-form.php',
						frame: true,
						title: 'Simple Form',
						bodyPadding: '5 5 0',
						width: 350,
						fieldDefaults: {
						    msgTarget: 'side',
						    labelWidth: 75,
						    labelAlign: 'top',
						},
						defaultType: 'textfield',
						items: [{
				            fieldLabel: 'Style Desc:',
				            name: 'txtStyleDesc',
				            allowBlank:true
				        }, {
				            fieldLabel: 'Barcode:',
				            name: 'txtBarcode',
				            allowBlank:true
				        }],
                    }
                  ]
        
        },
        {
            title: 'The Data',
            //layout: 'fit',
            items: [{
                xtype: 'grid',
                title: 'Simpsons',
                selType: 'checkboxmodel',
                selModel: {
                	checkOnly: true,
                	injectCheckbox: 0
                },
                store: {
                    fields:['name', 'email', 'phone'],
                    data:[
                        { name: 'Lisa',  email: "lisa@simpsons.com",
                          phone: "555-111-1224"  },
                        { name: 'Bart',  email: "bart@simpsons.com",
                          phone: "555-222-1234" },
                        { name: 'Homer', email: "home@simpsons.com",
                          phone: "555-222-1244"  },
                        { name: 'Marge', email: "marge@simpsons.com",
                          phone: "555-222-1254"  }
                    ],
                    proxy: {
                        type: 'memory'
                    }
                },
                columns: [
                    { text: 'Name',  dataIndex: 'name' },
                    { text: 'Email', dataIndex: 'email', flex: 1},
                    { text: 'Phone', dataIndex: 'phone' }
                ],
             // paging bar on the bottom
                bbar: Ext.create('Ext.PagingToolbar', {
                    //store: store,
                    displayInfo: true,
                    displayMsg: 'Displaying topics {0} - {1} of {2}',
                    emptyMsg: "No topics to display",
                    items:[
                        '-', {
                        text: 'Show Preview',
                        //pressed: pluginExpanded,
                        enableToggle: true,
                        toggleHandler: function(btn, pressed) {
                            var preview = Ext.getCmp('gv').getPlugin('preview');
                            preview.toggleExpanded(pressed);
                        }
                    }]
                }),
            }
            
            ]
        }]
    }]
});

Ext.define('User', {
    extend: 'Ext.data.Model',
    
});

var userStore = Ext.create('Ext.data.Store', {
    model: 'User',
    autoLoad: true,
    pageSize: 4,
    url: 'data/users/json',
    reader: {
    	type: 'json',
    	root: 'users',
    	totalProperty: 'total'
    }
});

Ext.create('Ext.grid.Panel', {
    store: userStore,
    width: 400,
    height: 200,
    title: 'Application Users',
    columns: [
        {
            text: 'Name',
            width: 100,
            sortable: false,
            hideable: false,
            dataIndex: 'name'
        },
        {
            text: 'Email Address',
            width: 150,
            dataIndex: 'email',
            hidden: true
        },
        {
            text: 'Phone Number',
            flex: 1,
            dataIndex: 'phone'
        }
    ]
});