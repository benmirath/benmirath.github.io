var app = app || {};
app.hf_view_model_language = Backbone.View.extend({
	tagName : "li",
	className : "languageOption",
	template : _.template( $('#hf_languageElement').html() ),
	
	render : function() {
		var languageTemplate = this.template(this.model.toJSON());
		this.$el.html(languageTemplate);
		return this;
	},
	events : {
		'click' : 'loadLanguage'
	},
	loadLanguage : function (e) {
		var strings = this.model.attributes.hf_language_strings;
		topMenu_model_header = strings.topMenu_model_header,
		topMenu_model_subHeader1 = strings.topMenu_model_subHeader1,
		topMenu_model_subHeader2 = strings.topMenu_model_subHeader2,
		topMenu_model_subHeader3 = strings.topMenu_model_subHeader3,
		//Custom Face Menu Content
		topMenu_model_subHeader3_signedOut_body = strings.topMenu_model_subHeader3_signedOut_body,
		topMenu_model_subHeader3_noPhoto_body = strings.topMenu_model_subHeader3_noPhoto_body,
		topMenu_model_subHeader3_takePhoto_body = strings.topMenu_model_subHeader3_takePhoto_body,
		topMenu_model_subheader3_photo_header1 = strings.topMenu_model_subheader3_photo_header1,
		topMenu_model_subheader3_photo_body1 = strings.topMenu_model_subheader3_photo_body1,
		topMenu_model_subheader3_photo_header2 = strings.topMenu_model_subheader3_photo_header2,
		topMenu_model_subheader3_photo_header3 = strings.topMenu_model_subheader3_photo_header3,
		topMenu_model_subheader3_reset = strings.topMenu_model_subheader3_reset,
		topMenu_model_subHeader3_upload = strings.topMenu_model_subHeader3_upload,
		topMenu_model_subHeader3_capture = strings.topMenu_model_subHeader3_capture,
		topMenu_model_subHeader3_snap = strings.topMenu_model_subHeader3_snap,
		topMenu_style_header = strings.topMenu_style_header,
		topMenu_style_subHeader1 = strings.topMenu_style_subHeader1,
		topMenu_style_subHeader2 = strings.topMenu_style_subHeader2,
		topMenu_style_subHeader3 = strings.topMenu_style_subHeader3,
		topMenu_length_header = strings.topMenu_length_header,
		topMenu_length_subHeader1 = strings.topMenu_length_subHeader1,
		topMenu_length_subHeader2 = strings.topMenu_length_subHeader2,
		topMenu_length_subHeader3 = strings.topMenu_length_subHeader3,
		topMenu_length_subHeader4 = strings.topMenu_length_subHeader4,
		topMenu_length_subHeader5 = strings.topMenu_length_subHeader5,
		topMenu_texture_header = strings.topMenu_texture_header,
		topMenu_texture_subHeader1 = strings.topMenu_texture_subHeader1,
		topMenu_texture_subHeader2 = strings.topMenu_texture_subHeader2,
		topMenu_texture_subHeader3 = strings.topMenu_texture_subHeader3,
		topMenu_texture_subHeader4 = strings.topMenu_texture_subHeader4,
		bottomMenu_colors = strings.bottomMenu_colors,
		bottomMenu_save = strings.bottomMenu_save,
		bottomMenu_save_saveButton = strings.bottomMenu_save_saveButton,
		bottomMenu_save_printButton = strings.bottomMenu_save_printButton
		bottomMenu_language = strings.bottomMenu_language,
		bottomMenu_language_header = strings.bottomMenu_language_header,
		bottomMenu_account = strings.bottomMenu_account,
		//Account Menu
		bottomMenu_account_signedOut_header = strings.bottomMenu_account_signedOut_header,
		bottomMenu_account_signedIn_header = strings.bottomMenu_account_signedIn_header,
		bottomMenu_account_register_header = strings.bottomMenu_account_register_header,
		bottomMenu_account_delete_header = strings.bottomMenu_account_delete_header,
		bottomMenu_account_remember_header = strings.bottomMenu_account_remember_header,
		bottomMenu_account_fieldEmail = strings.bottomMenu_account_fieldEmail,
		bottomMenu_account_fieldPassword = strings.bottomMenu_account_fieldPassword,
		bottomMenu_account_fieldPasswordConfirm = strings.bottomMenu_account_fieldPasswordConfirm,
		bottomMenu_account_checkRemember = strings.bottomMenu_account_checkRemember,
		bottomMenu_account_buttonSignIn = strings.bottomMenu_account_buttonSignIn,
		bottomMenu_account_buttonSignOut = strings.bottomMenu_account_buttonSignOut,
		bottomMenu_account_buttonForgot = strings.bottomMenu_account_buttonForgot,
		bottomMenu_account_buttonSend = strings.bottomMenu_account_buttonSend;
		bottomMenu_account_buttonRegister = strings.bottomMenu_account_buttonRegister,
		bottomMenu_account_buttonDelete = strings.bottomMenu_account_buttonDelete,
		bottomMenu_account_buttonUpdate = strings.bottomMenu_account_buttonUpdate,
		bottomMenu_account_buttonYes = strings.bottomMenu_account_buttonYes,
		bottomMenu_account_buttonNo = strings.bottomMenu_account_buttonNo,
		bottomMenu_account_selectGender = strings.bottomMenu_account_selectGender,
		bottomMenu_account_selectGender_female = strings.bottomMenu_account_selectGender_female,
		bottomMenu_account_selectGender_male = strings.bottomMenu_account_selectGender_male,
		bottomMenu_account_selectLanguage = strings.bottomMenu_account_selectLanguage,
		//Errors
		errorMessage_general = strings.errorMessage_general,
		errorMessage_changeGender = strings.errorMessage_changeGender,
		errorMessage_passwordFieldMatch = strings.errorMessage_passwordFieldMatch;		

		language_render_topMenu();
		language_render_bottomMenu();
		language_render_customFace();
	}
});