function language_topMenu_Model (id) {
	console.log(id);

	switch (id) {
		case "Model_Female":
			return "Female";
			break;
		case "Model_Male":
			return "Male";
			break;
		case "Model_YourFace":
			return "Your Face";
			break;

		case "Style_Salon":
			return "Salon";
			break;
		case "Style_Celebrity":
			return "Celebrity";
			break;
	
		case "Length_Short":
			return "Short";
			break;
		case "Length_Medium":
			return "Medium";
			break;
		case "Length_Long":
			return "Long";
			break;
		case "Length_Updo":
			return "Updo";
			break;

		case "Texture_Straight":
			return "Straight";
			break;
		case "Texture_Curly":
			return "Curly";
			break;
		case "Texture_Wavy":
			return "Wavy";
			break;

		case "Style_All":
		case "Length_All":
		case "Texture_All":
			return "All";
			break;
		default:
			return "Script Error";
		break;
	}
}