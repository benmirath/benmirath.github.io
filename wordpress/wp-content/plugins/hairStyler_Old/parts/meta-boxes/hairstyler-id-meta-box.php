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
				'columns' => 12,
				'choices' => array(
					'female' => 'Female',
					'male' => 'Male'
				)
			),
			array(
				'type' => 'select',
				'field' => 'hairstyle_length',
				'label' => 'Length',
				'columns' => 12,
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
				'columns' => 12,
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
				'columns' => 12,
				'choices' => array(
					'salon' => 'Salon',
					'celebrity' => 'Celebrity'
				)
			)
	    )
  	));  
	piklist('field', array(
	    'type' => 'group'
	    ,'field' => 'hairstyle_color_main'
	    ,'label' => 'Hairstyle Color Main'
	    ,'list' => false
	    ,'add_more' => true
	    ,'description' => 'Fill in different colors associated with the hairstle here.'
		,'fields' => array(
			array(
				'type' => 'select',
				'field' => 'hairstyle_color',
				'label' => 'Color',
				'columns' => 12,
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
				'type' => 'file',
				'field' => 'hairstyle_image',
				'label' => 'Image File',
				'columns' => 12
				// ,
				// 'options' => array(
				// 	'basic' => true
				// )
			)
		)
	));  
?>