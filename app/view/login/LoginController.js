Ext.define('Packt.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login',

	requires: [
		//'Packt.view.login.CapsLockTooltip', --> getting an error here if enabled #2
		'Packt.util.Util'		
	],

	onTextFieldSpecialKey: function(field, e, options) { 
		if (e.getKey() === e.ENTER) {
			this.doLogin();
		}
	}, 

	onTextFieldKeyPress: function(field, e, options) {
		var charCode = e.getCharCode(),
            me = this;

        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){

            if(me.capslockTooltip === undefined){
                me.capslockTooltip = Ext.widget('capslocktooltip');
            }

            me.capslockTooltip.show();

        } else {

            if(me.capslockTooltip !== undefined){
                me.capslockTooltip.hide();
            }
        }


	},

	onButtonClickCancel: function(button, e, options) {		
		this.lookupReference('form').reset();
	},

	onButtonClickSubmit: function(button, e, options) {		
		var me = this;
		if (me.lookupReference('form').isValid()){
			me.doLogin();
		}
	},

	doLogin: function() {
		var me = this,
			form = me.lookupReference('form'); 

			this.getView().mask('Authenticating... Please Wait...');

			form.submit({
				clientValidation: true,
				url: 'php/security/login.php',
				scope: me,
				success: 'onLoginSuccess',	
				failure: 'onLoginFailure'
			});

	},

	onLoginFailure: function(form, action) {		
		console.log(action);
		this.getView().unmask();

		// var result = Ext.JSON.decode(action.response.responseText, true);
		var result = Packt.util.Util.decodeJSON(action.response.responseText);

		/*if(!result){
			result = {};
			result.success = false;
			result.msg = action.response.responseText;
		}*/

		switch (action.failureType){
			case Ext.form.action.Action.CLIENT_INVALID:				
				/*Ext.Msg.show({
					title: 'Error!',
					msg: 'Form fields may not be submitted with invalid values',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});*/
				Packt.util.Util.showErrorMsg('Form fields may not be submitted with an invalid value');
			break;
			case Ext.form.action.Action.CONNECT_FAILURE:
				/*Ext.Msg.show({
					title: 'Error!',
					msg: 'Form fields may not be submitted with invalid values',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});*/
				Packt.util.Util.showErrorMsg(action.response.responseText);
			break;
			case Ext.form.action.Action.SERVER_INVALID:
				/*Ext.Msg.show({
					title: 'Error!',
					msg: result.msg,
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});*/
				Packt.util.Util.showErrorMsg(result.msg);
		}

	},

	onLoginSuccess: function(form, action) {
		console.log('YES');
		this.getView().unmask();
		this.getView().close();
		Ext.create('Packt.view.main.Main');
	}
});