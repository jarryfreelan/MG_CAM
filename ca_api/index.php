<?php
	include 'init.php';

	if (!isset($_SESSION['token'])) {
	    exit(json_encode(array(
    		'status' => 'TOKEN_FAIL',
    		'msg' => 'Token is not exist'
    	)));
	} else {
		$now = time(); // Checking the time now when home page starts.

	    if ($now > $_SESSION['expire']) {
	        session_destroy();
	        exit(json_encode(array(
	    		'status' => 'TOKEN_FAIL',
	    		'msg' => 'Session is expired'
	    	)));
	    } else {
	    	$stmt = $conn->prepare("SELECT count(*) AS u FROM ca_user WHERE user_id_no = ? AND user_token = ?");
			$stmt->execute(array($_POST['id'], $_SESSION['token']));
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			if($result['u'] <= 0) {
				exit(json_encode(array(
		    		'status' => 'TOKEN_FAIL',
    				'msg' => 'Token is not match'
		    	)));
			}
	    }
	}

	switch ($_POST['e']) {

		case 'updateProfile':
			$stmt = $conn->prepare("UPDATE ca_user SET user_username = ?, user_email = ?, user_phone = ?, user_country = ? WHERE user_id_no = ?");
			$stmt->execute(array($_POST['username'], $_POST['email'], $_POST['phone'], $_POST['country'], $_POST['id']));

			$stmt = $conn->prepare("SELECT user_id_no, user_username, user_email, user_phone, user_country, user_key, user_password FROM ca_user WHERE user_id_no = ?");
			$stmt->execute(array($_POST['id']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			$result = $results[0];
			echo json_encode(array(
				'status' => 'SUCCESS',
				'user' => array(
					'id' => $result['user_id_no'],
					'username' => $result['user_username'],
					'email' => $result['user_email'],
					'phone' => $result['user_phone'],
					'country' => $result['user_country']
				)
			));
			break;

		case 'updatePass':

			$stmt = $conn->prepare("SELECT user_password, user_key FROM ca_user WHERE user_id_no = ?");
			$stmt->execute(array($_POST['id']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				$result = $results[0];

				if(password_verify($_POST['old'].$result['user_key'], $result['user_password'])){
					$key = generateRandomString(30);
					$hash = password_hash($_POST['new'].$key, PASSWORD_DEFAULT);

					$stmt = $conn->prepare("UPDATE ca_user SET user_password = ?, user_key = ? WHERE user_id_no = ?");
					$stmt->execute(array($hash, $key, $_POST['id']));

					echo json_encode(array(
						'status' => 'SUCCESS',
						'msg' => 'Password is changed successfully'
					));
				} else {
					echo json_encode(array(
						'status' => 'FAIL',
						'msg' => 'Old Password is incorrect'
					));
				}
			} else {
				echo json_encode(array(
					'status' => 'FAIL',
					'msg' => 'Username is not existing'
				));
			}
			break;

		case 'checkExistingEmail':
			$stmt = $conn->prepare("SELECT user_id_no FROM ca_user WHERE user_email = ? AND user_id_no <> ?");
			$stmt->execute(array($_POST['email'], $_POST['id']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				echo json_encode(array(
					'status' => 'ERROR',
					'msg' => 'This email is already being used'
				));
			}else{
				echo json_encode(array(
					'status' => 'SUCCESS',
				));
			}
			break;

		case 'checkExistingUsername':
			$stmt = $conn->prepare("SELECT user_id_no FROM ca_user WHERE user_username = ? AND user_id_no <> ?");
			$stmt->execute(array($_POST['username'], $_POST['id']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if(count($results) > 0) {
				echo json_encode(array(
					'status' => 'ERROR',
					'msg' => 'This username is already being used'
				));
			}else{
				echo json_encode(array(
					'status' => 'SUCCESS',
				));
			}
			break;

		case 'activate2FA':
			$stmt = $conn->prepare("UPDATE ca_user SET user_secret = ?, user_2fa = 1 WHERE user_id_no = ?");
			$stmt->execute(array($_POST['secret'], $_POST['id']));

			echo json_encode(array(
				'status' => 'SUCCESS',
			));
			break;

		case 'deactivate2FA':
			$g = new \Google\Authenticator\GoogleAuthenticator();

			$stmt = $conn->prepare("SELECT user_secret FROM ca_user WHERE user_id_no = ?");
			$stmt->execute(array($_POST['id']));
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

			$result = $results[0];

			if ($g->checkCode($result['user_secret'], $_POST['code2fa'])) {

			  	$stmt = $conn->prepare("UPDATE ca_user SET user_secret = '', user_2fa = 0 WHERE user_id_no = ?");
				$stmt->execute(array($_POST['id']));

				echo json_encode(array(
					'status' => 'SUCCESS',
				));

			} else {
			  	echo json_encode(array(
					'status' => 'ERROR',
					'msg' => '2FA code is incorrect'
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