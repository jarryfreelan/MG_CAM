<?php
	include 'init.php';

	switch ($_POST['e']) {
		case 'login':
			$stmt = $conn->prepare("SELECT user_id, user_name, user_email, user_phone, user_img_url, user_password FROM user WHERE user_email = ?");
			$stmt->execute(array($_POST['email']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				$result = $results[0];
				$userID = $result['user_id'];

				if(password_verify($_POST['password'], $result['user_password'])){
					$token = generateRandomString();
					$stmt = $conn->prepare("UPDATE user SET user_token = ? WHERE user_id = ?");
					$stmt->execute(array($token, $userID));

					echo json_encode(array(
						'status' => 'success',
						'token' => $token,
						'user' => array(
							'name' => $result['user_name'],
							'email' => $result['user_email'],
							'phone' => $result['user_phone'],
							'img' => $result['user_img_url']
						)
					));
				} else {
					echo json_encode(array(
						'status' => 'fail',
						'msg' => 'Wrong Password'
					));
				}
			} else {
				echo json_encode(array(
					'status' => 'fail',
				));
			}
			break;

		case 'loginWithFacebook':

			$stmt = $conn->prepare("SELECT user_id FROM user WHERE user_email = ?");
			$stmt->execute(array($_POST['email']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				$result = $results[0];
				$userID = $result['user_id'];

				$stmt = $conn->prepare("UPDATE user 
						SET user_facebook_id = ?, user_name = ?, user_email = ?, user_phone = ?, user_img_url = ?, user_token = ?
						WHERE user_id = ?");
				$stmt->execute(array($_POST['facebookID'], $_POST['name'], $_POST['email'], $_POST['mobileNo'], $_POST['img'], $_POST['token'], $userID));

			} else {
				$stmt = $conn->prepare("INSERT INTO user (user_facebook_id, user_name, user_email, user_phone, user_img_url, user_token) VALUES (?, ?, ?, ?, ?, ?)");
				$stmt->execute(array($_POST['facebookID'], $_POST['name'], $_POST['email'], $_POST['mobileNo'], $_POST['img'], $_POST['token']));
			}

			echo json_encode(array(
				'status' => 'success',
				'token' => $_POST['token'],
				'user' => array(
					'name' => $_POST['name'],
					'email' => $_POST['email'],
					'phone' => $_POST['mobileNo'],
					'img' => $_POST['img']
				)
			));
			break;

		case 'loginWithGoogle':

			$stmt = $conn->prepare("SELECT user_id FROM user WHERE user_email = ?");
			$stmt->execute(array($_POST['email']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				$result = $results[0];
				$userID = $result['user_id'];

				$stmt = $conn->prepare("UPDATE user 
						SET user_google_id = ?, user_name = ?, user_email = ?, user_phone = ?, user_img_url = ?, user_token = ?
						WHERE user_id = ?");
				$stmt->execute(array($_POST['googleID'], $_POST['name'], $_POST['email'], $_POST['mobileNo'], $_POST['img'], $_POST['token'], $userID));

			} else {
				$stmt = $conn->prepare("INSERT INTO user (user_google_id, user_name, user_email, user_phone, user_img_url, user_token) VALUES (?, ?, ?, ?, ?, ?)");
				$stmt->execute(array($_POST['googleID'], $_POST['name'], $_POST['email'], $_POST['mobileNo'], $_POST['img'], $_POST['token']));
			}

			echo json_encode(array(
				'status' => 'success',
				'token' => $_POST['token'],
				'user' => array(
					'name' => $_POST['name'],
					'email' => $_POST['email'],
					'phone' => $_POST['mobileNo'],
					'img' => $_POST['img']
				)
			));
			break;

		case 'register':
			$hash = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);
			$stmt = $conn->prepare("INSERT INTO user (user_name, user_email, user_phone, user_password) VALUES (?, ?, ?, ?)");
			$stmt->execute(array($_POST['name'], $_POST['email'], $_POST['mobileNo'], $hash));
			echo json_encode(array(
				'status' => 'success',
			));
			break;

		case 'checkExistingEmail':
			$stmt = $conn->prepare("SELECT user_id FROM user WHERE user_email = ?");
			$stmt->execute(array($_POST['email']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				echo json_encode(array(
					'status' => 'Error',
					'msg' => 'This email is already being used'
				));
			}else{
				echo json_encode(array(
					'status' => 'success',
				));
			}
			break;

		case 'checkExistingPhone':
			$stmt = $conn->prepare("SELECT user_id FROM user WHERE user_phone = ?");
			$stmt->execute(array($_POST['mobileNo']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				echo json_encode(array(
					'status' => 'Error',
					'msg' => 'This phone number is already being used'
				));
			}else{
				echo json_encode(array(
					'status' => 'success',
				));
			}
			break;

		default:
			# code...
			break;
	}

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