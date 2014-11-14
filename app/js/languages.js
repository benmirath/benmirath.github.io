var currentLanguage;
var topMenu_model_header = "Model",
	topMenu_model_subHeader1 = "Female",
	topMenu_model_subHeader2 = "Male",
	topMenu_model_subHeader3 = "Your Face",
	//Custom Face Menu Content
	topMenu_model_subHeader3_signedOut_body = "Please sign in to enable the custom photo feature.",
	topMenu_model_subHeader3_noPhoto_body = "Let's get started! Would you like to upload a previous photo, or take a new one right now?",
	topMenu_model_subHeader3_takePhoto_body = "For the best result, make sure the space is well lit and that you use the silhoutte over the preview as a guide.",
	topMenu_model_subheader3_photo_header1 = "Is the picture okay?",
	topMenu_model_subheader3_photo_body1 = "Then start styling your hair!",
	topMenu_model_subheader3_photo_header2 = "Almost? Adjust it!",
	topMenu_model_subheader3_photo_header3 = "No? Try again!",
	topMenu_model_subheader3_reset = "Reset",
	topMenu_model_subHeader3_upload = "Upload Picture",
	topMenu_model_subHeader3_capture = "Take Picture",
	topMenu_model_subHeader3_snap = "Snap Picture",
	topMenu_style_header = "Style",
	topMenu_style_subHeader1 = "All",
	topMenu_style_subHeader2 = "Salon",
	topMenu_style_subHeader3 = "Celebrity",
	topMenu_length_header = "Length",
	topMenu_length_subHeader1 = "All",
	topMenu_length_subHeader2 = "Short",
	topMenu_length_subHeader3 = "Medium",
	topMenu_length_subHeader4 = "Long",
	topMenu_length_subHeader5 = "Updo",
	topMenu_texture_header = "Texture",
	topMenu_texture_subHeader1 = "All",
	topMenu_texture_subHeader2 = "Straight",
	topMenu_texture_subHeader3 = "Wavy",
	topMenu_texture_subHeader4 = "Curly",
	bottomMenu_colors = "Hair Colors",
	bottomMenu_save = "Save/Share",
	bottomMenu_save_saveButton = "Save to your device",
	bottomMenu_save_printButton = "Print",
	bottomMenu_language = "Language",
	bottomMenu_language_header = "Choose your language",
	bottomMenu_account = "Account",
	//Account Menu
	bottomMenu_account_signedOut_header = "Please enter your account info",
	bottomMenu_account_signedIn_header = "Update your account settings",
	bottomMenu_account_register_header = "Please fill out the form below to register your account:",
	bottomMenu_account_delete_header = "Are you sure you want to delete your account?",
	bottomMenu_account_remember_header = "Enter the email connected to your account below, and we'll email you a new password",
	bottomMenu_account_fieldEmail = "Email",
	bottomMenu_account_fieldPassword = "Password",
	bottomMenu_account_fieldPasswordConfirm = "Confirm Password",
	bottomMenu_account_checkRemember = "Remember Me",
	bottomMenu_account_buttonSignIn = "Sign In",
	bottomMenu_account_buttonSignOut = "Sign Out",
	bottomMenu_account_buttonForgot = "Forgot Password",
	bottomMenu_account_buttonSend = "Send New Password"
	bottomMenu_account_buttonRegister = "Register",
	bottomMenu_account_buttonDelete = "Delete Account",
	bottomMenu_account_buttonUpdate = "Update Settings",
	bottomMenu_account_buttonYes = "Yes",
	bottomMenu_account_buttonNo = "No",
	bottomMenu_account_selectGender = "Gender",
	bottomMenu_account_selectGender_female = "Female",
	bottomMenu_account_selectGender_male = "Male",
	bottomMenu_account_selectLanguage = "Language",
	//Errors
	errorMessage_general = "Something seems to have gone wrong. Please reload the tool",
	errorMessage_changeGender = "Gender changed to ",
	errorMessage_passwordFieldMatch = "Please make sure that both password fields match.";



function language_topMenu_model () {
	$('#topMenuModel').html(topMenu_model_header);
	$('#Model_Female').html(topMenu_model_subHeader1);
	$('#Model_Male').html(topMenu_model_subHeader2);
	$('#Model_YourFace').html(topMenu_model_subHeader3);
}
function language_topMenu_style () {
	$('#topMenuStyle').html(topMenu_style_header);
	$('#Style_All').html(topMenu_style_subHeader1);
	$('#Style_Salon').html(topMenu_style_subHeader2);
	$('#Style_Celebrity').html(topMenu_style_subHeader3);
}
function language_topMenu_length () {
	$('#topMenuLength').html(topMenu_length_header);
	$('#Length_All').html(topMenu_length_subHeader1);
	$('#Length_Short').html(topMenu_length_subHeader2);
	$('#Length_Medium').html(topMenu_length_subHeader3);
	$('#Length_Long').html(topMenu_length_subHeader4);
	$('#Length_Updo').html(topMenu_length_subHeader5);
}
function language_topMenu_texture () {
	$('#topMenuTexture').html(topMenu_texture_header);
	$('#Texture_All').html(topMenu_texture_subHeader1);
	$('#Texture_Straight').html(topMenu_texture_subHeader2);
	$('#Texture_Wavy').html(topMenu_texture_subHeader3);
	$('#Texture_Curly').html(topMenu_texture_subHeader4);
}
function language_bottomMenu_colors () {
	$('#bottomMenuColor').html(bottomMenu_colors);
}
function language_bottomMenu_save () {
	$('#bottomMenuSave').html(bottomMenu_save);
	$('#share_save').val(bottomMenu_save_saveButton);
	$('#share_print').val(bottomMenu_save_printButton);
}
function language_bottomMenu_language () {
	$('#bottomMenuLanguage').html(bottomMenu_language);
	$('#language_header').html(bottomMenu_language_header);
}
function language_bottomMenu_account () {
	$('#bottomMenuAccount').html(bottomMenu_account);

	$('#account_signedOut_header').html(bottomMenu_account_signedOut_header);
	$('#account_signedOut_email').html(bottomMenu_account_fieldEmail);
	$('#account_signedOut_password').html(bottomMenu_account_fieldPassword);
	$('#account_signedOut_remember').html(bottomMenu_account_checkRemember);
	$('#hf_signedOutSignIn').val(bottomMenu_account_buttonSignIn);
	$('#hf_signedOutForgotPassword').val(bottomMenu_account_buttonForgot);
	$('#hf_signedOutRegister').val(bottomMenu_account_buttonRegister);

	$('#account_signedIn_header').html(bottomMenu_account_signedIn_header);
	$('#account_signedInGender_header').html(bottomMenu_account_selectGender);
	$('#hf_signedInGender_Female').html(bottomMenu_account_selectGender_female);
	$('#hf_signedInGender_Male').html(bottomMenu_account_selectGender_male);
	$('#hf_signedInUpdateSettings').val(bottomMenu_account_buttonUpdate);
	$('#hf_signedInSignOut').val(bottomMenu_account_buttonSignOut);
	$('#hf_signedInDelete').val(bottomMenu_account_buttonDelete);

	$('#account_register_header').html(bottomMenu_account_register_header);
	$('#account_register_email').html(bottomMenu_account_fieldEmail);
	$('#account_register_password').html(bottomMenu_account_fieldPassword);
	$('#account_register_passwordConfirm').html(bottomMenu_account_fieldPasswordConfirm);
	$('#account_register_gender').html(bottomMenu_account_selectGender);
	$('#hf_registerGender_Female').html(bottomMenu_account_selectGender_female);
	$('#hf_registerGender_Male').html(bottomMenu_account_selectGender_male);
	$('#accountMenuInputButton').val(bottomMenu_account_buttonRegister);

	$('#account_delete_header').html(bottomMenu_account_delete_header);
	$('#hf_deleteYes').val(bottomMenu_account_buttonYes);
	$('#hf_deleteNo').val(bottomMenu_account_buttonNo);

	$('#account_forgot_header').html(bottomMenu_account_remember_header);
	$('#hf_forgotSend').val(bottomMenu_account_buttonSend);
}
function language_customFace_buttons () {
	$('.customFace_upload h2').each(function () {
		$(this).html(topMenu_model_subHeader3_upload);
	});
	$('.customFace_capture h2').each(function () {
		$(this).html(topMenu_model_subHeader3_capture);
	});
	$('.customFace_snap h2').each(function () {
		$(this).html(topMenu_model_subHeader3_snap);
	});
}
function language_customFace_signedOut () {
	$('#customFace_signedOut_header').html(topMenu_model_subHeader3_signedOut_body);
}
function language_customFace_noPhoto () {
	$('#customFace_noPhoto_header1').html(topMenu_model_subHeader3_noPhoto_body);
}
function language_customFace_takePhoto () {
	$('#customFace_takePhoto_header').html(topMenu_model_subHeader3_takePhoto_body);
}
function language_customFace_photo () {
	$('#customFace_photo_header1').html(topMenu_model_subheader3_photo_header1);
	$('#customFace_photo_header2').html(topMenu_model_subheader3_photo_header2);
	$('#customFace_photo_header3').html(topMenu_model_subheader3_photo_header3);
	$('#customFace_photo_body').html(topMenu_model_subheader3_photo_body1);
	$('#customFace_controls_reset').html(topMenu_model_subheader3_reset);
}
function language_render_topMenu() {
	language_topMenu_model();
	language_topMenu_style();
	language_topMenu_length();
	language_topMenu_texture();
}
function language_render_bottomMenu () {
	language_bottomMenu_colors();
	language_bottomMenu_save();
	language_bottomMenu_language();
	language_bottomMenu_account();
}
function language_render_customFace () {
	language_customFace_buttons();
	language_customFace_signedOut();
	language_customFace_noPhoto();
	language_customFace_takePhoto();
	language_customFace_photo();
}