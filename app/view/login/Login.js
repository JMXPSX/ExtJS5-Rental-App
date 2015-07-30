Ext.define('Packt.view.login.Login', { // #1
	extend: 'Ext.window.Window', 	   // #2	

	xtype: 'login-dialog',	

	requires: [
		'Packt.view.login.LoginController'
	],

	controller: 'login',		   // #3

	autoShow: true,					   // #4
	height: 170,					   // #5
	width: 360,                        
	layout: {
		type: 'fit'					   // #7
	},
	iconCls: 'fa fa-key fa-lg',	       // #8
	title: 'Login',                    // #9
	closeAction: 'hide',               // #10
	closable: false,                   // #11
	draggable: false,                  // #12
	resizable: false,                  // #13

	items: [
		{
			xtype: 'form',             // #14
			reference: 'form',
			bodyPadding: 15,		   // #15
			defaults: {				   // #16
				xtype: 'textfield',    // #17
				anchor: '100%',		   // #18
				labelWidth: 60,		   // #19
				allowBlank: false,       // #21
				vtype: 'alphanum',       // #22
				minLength: 3,            // #23
				msgTarget: 'under',	
				listeners: {
					specialKey: 'onTextFieldSpecialKey'
				} 
			},
			items: [
				{
					name: 'user',
					fieldLabel: 'User',
					maxLength: 25
					
				},
				{
					inputType: 'password',  // #20
					name: 'password',
					fieldLabel: 'Password',
					id: 'password',
					maxLength: 15,
					// vtype: 'customPass', --> getting an error here when enabled #1
					//msgTarget: 'side'
					enableKeyEvents: true,
					listeners: {
						keypress: 'onTextFieldKeyPress'
					}					
					
				}
				
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							iconCls: 'fa fa-times fa-lg',
							text: 'Cancel',
							listeners: {
								click: 'onButtonClickCancel'
							}
						},
						{
							xtype: 'button',
							formBind: true,
							iconCls: 'fa fa-sign-in fa-lg',
							text: 'Submit',
							listeners: {
								click: 'onButtonClickSubmit'
							}
						}	
					]
				}
			]			

		}		
	]

});

