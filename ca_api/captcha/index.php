<?php

	header('Access-Control-Allow-Origin: *');
	
	session_id($_GET['s']);
	session_start();

	$captcha_text = generateRandomString(6);
	$_SESSION['captcha'] = $captcha_text; 

	$image = imagecreate(60, 32);

	$colors = [];
 
	$red = rand(125, 175);
	$green = rand(125, 175);
	$blue = rand(125, 175);
	 
	for($i = 0; $i < 5; $i++) {
	  $colors[] = imagecolorallocate($image, $red - 20*$i, $green - 20*$i, $blue - 20*$i);
	}

	imagefill($image, 0, 0, $colors[0]);
 
	for($i = 0; $i < 10; $i++) {
	  imagesetthickness($image, rand(2, 10));
	  $rect_color = $colors[rand(1, 4)];
	  imagerectangle($image, rand(-10, 190), rand(-10, 10), rand(-10, 190), rand(40, 60), $rect_color);
	}

	$text_color = imagecolorallocate($image, 255, 255, 255);

	imagestring($image, 4, 4, 8, $captcha_text, $text_color);

	header('Content-Type: image/jpeg'); 
	imagepng($image);
	imagedestroy($image);
 	
 	function generateRandomString($length = 20) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}

?>