<?php
/*
Title: Hairstyle ID
Post Type: hairstyle
*/

  	piklist('field', array(
	    'type' => 'group'
	    ,'field' => 'hairstyle_id_data'
	    ,'label' => 'Hairstyle Data'
	    // ,'list' => false
	    ,'description' => 'Fill in categorization information for the hairstyle here.'
	    ,'fields' => array(
			array(
				'type' => 'text',
				'field' => 'hairstyle_id',
				'label' => 'ID',
				'columns' => 12,
				'attributes' => array(
					'placeholder' => 'Please enter an ID'
				)
			),
			array(
				'type' => 'select',
				'field' => 'hairstyle_gender',
				'label' => 'Gender',
				'columns' => 6,
				'choices' => array(
					'female' => 'Female',
					'male' => 'Male'
				)
			),
			array(
				'type' => 'select',
				'field' => 'hairstyle_length',
				'label' => 'Length',
				'columns' => 6,
				'choices' => array(
					'short' => 'Short',
					'medium' => 'Medium',
					'large' => 'Large'
				)
			),
			array(
				'type' => 'select',
				'field' => 'hairstyle_texture',
				'label' => 'Texture',
				'columns' => 6,
				'choices' => array(
					'straight' => 'Straight',
					'wavy' => 'Wavy',
					'curly' => 'Curly'
				)
			),
			array(
				'type' => 'select',
				'field' => 'hairstyle_style',
				'label' => 'Style',
				'columns' => 6,
				'choices' => array(
					'salon' => 'Salon',
					'celebrity' => 'Celebrity'
				)
			),
			array(
				'type' => 'file',
				'field' => 'hairstyle_default_image',
				'label' => 'Default Image File',
				'columns' => 12
			),
			array(
				'type' => 'file',
				'field' => 'hairstyle_monochrome_image',
				'label' => 'Monochrome Image File',
				'columns' => 12
			)
	    )
  	));  
	piklist('field', array(
	    'type' => 'group',
	    'field' => 'hairstyle_color_main',
	    'label' => 'Hairstyle Color Main',
	    'list' => false,
	    'add_more' => true,
	    'description' => 'Fill in different colors associated with the hairstle here.',
		'fields' => array(			  
			// array(
			// 	'type' => 'file',
			// 	'field' => 'hairstyle_default_image',
			// 	'label' => 'Default Image File',
			// 	'columns' => 6
			// 	// ,
			// 	// 'options' => array(
			// 	// 	'basic' => true
			// 	// )
			// ),
			// array(
			// 	'type' => 'file',
			// 	'field' => 'hairstyle_monochrome_image',
			// 	'label' => 'Monochrome Image File',
			// 	'columns' => 6
			// 	// ,
			// 	// 'options' => array(
			// 	// 	'basic' => true
			// 	// )
			// )
			// ,
			// array(
			// 	'add_more' => true,
				array(
					'type' => 'select',
					'field' => 'hairstyle_color_name',
					'label' => 'Color Name',
					'columns' => 6,
					'choices' => array(
						'original' => 'Original',
						'black' => 'Black',
						'brown' => 'Brown',
						'grey' => 'Grey',
						'pink' => 'Pink',
						'blonde' => 'Blonde',
						'red' => 'Red',
						'white' => 'White'
					)
				),
				array(
				    'type' => 'colorpicker',
				    // 'add_more' => true,
				    'field' => 'hairstyle_color_val',
				    'label' => 'Hair Color',
				    'columns' => 6,
				    'on_post_status' => array(
				      'value' => 'lock'
				    )
				)
			)
		// )
	));  
?>



<!-- a:7:{
	s:12:"hairstyle_id";
	a:1:{
		i:0;
		s:5:"00002";
	}
	s:16:"hairstyle_gender";
	a:1:{
		i:0;
		s:6:"female";
	}
	s:16:"hairstyle_length";
	a:1:{
		i:0;
		s:5:"large";
	}
	s:17:"hairstyle_texture";
	a:1:{
		i:0;
		s:4:"wavy";
	}
	s:15:"hairstyle_style";
	a:1:{
		i:0;
		s:9:"celebrity";
	}
	s:23:"hairstyle_default_image";
	a:1:{
		i:0;
		a:1:{
			i:0;
			s:0:"";
		}
	}
	s:26:"hairstyle_monochrome_image";
	a:1:{
		i:0;
		a:1:{
			i:0;
			s:0:"";
		}
	}
}


 -->


