/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

//Ext.require('Packt.view.login.Login');

Ext.define('Packt.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Packt',

    views: [
    	'login.Login'
    ],

    controllers: [
    	//'Root'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
        Ext.tip.QuickTipManager.init();

        var me = this;

        var task = new Ext.util.DelayedTask(function() {

        	me.splashscreen.fadeOut({
        		duration: 1000,
        		remove: true
        	});

        	me.splashscreen.next().fadeOut({
        		duration: 1000,
        		remove: true,
        		listeners: {
        			afteranimate: function(el, startTime, eOpts){    
        				console.log('YES');		

                        // Ext.Msg.alert('TEST', 'Ready to go!');

                        /*Ext.create('Ext.window.Window', {
                            title: 'Hello',
                            height: 200,
                            width: 400,
                            layout: 'fit',
                            items: {  // Let's put an empty grid in just to illustrate fit layout
                                xtype: 'grid',
                                border: false,
                                columns: [{header: 'World'}],                 // One header just for show. There's no data,
                                store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
                            }
                        }).show();*/                        

    					Ext.widget('login-dialog');  

    					console.log('SUCCESS');	
        			}
        		}
        	});

        });

    	task.delay(2000);
		
    },

    init: function() {

    	var me = this;

    	me.splashscreen = Ext.getBody().mask(
			'Loading Application', 'splashscreen'
    	);

    	me.splashscreen.addCls('splashscreen');

    	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0],{
			cls: 'x-splash-icon'
    	});

    }
});
