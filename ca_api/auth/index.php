<?php
	include '../init.php';

	if($_POST['e']) {
		switch ($_POST['e']) {
			case 'login':
				$stmt = $conn->prepare("SELECT user_id_no, user_username, user_email, user_phone, user_key, user_password FROM ca_user WHERE user_username = ?");
				$stmt->execute(array($_POST['username']));
				$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

				if(count($results) > 0) {
					$result = $results[0];
					$user_id = $result['user_id_no'];

					if(password_verify($_POST['password'].$result['user_key'], $result['user_password'])){
						$token = generateRandomString(30);
						$stmt = $conn->prepare("UPDATE ca_user SET user_token = ? WHERE user_id_no = ?");
						$stmt->execute(array($token, $user_id));

						$_SESSION['token'] = $token;
			            $_SESSION['start'] = time(); 
			            $_SESSION['expire'] = $_SESSION['start'] + (30 * 60);

						echo json_encode(array(
							'status' => 'SUCCESS',
							'token' => $token,
							'sess' => session_id(),
							'user' => array(
								'id' => $result['user_id_no'],
								'username' => $result['user_username'],
								'email' => $result['user_email'],
								'phone' => $result['user_phone']
							)
						));
					} else {
						echo json_encode(array(
							'status' => 'FAIL',
							'msg' => 'Wrong Password'
						));
					}
				} else {
					echo json_encode(array(
						'status' => 'FAIL',
						'msg' => 'Username is not existing'
					));
				}
				break;

			case 'register':
				$key = generateRandomString(30);
				$hash = password_hash($_POST['password'].$key, PASSWORD_DEFAULT);
				$stmt = $conn->prepare("INSERT INTO ca_user (user_username, user_email, user_phone, user_password, user_key) VALUES (?, ?, ?, ?, ?)");
				$stmt->execute(array($_POST['username'], $_POST['email'], $_POST['phone'], $hash, $key));

				$user_id = $conn->lastInsertId();
				$uni_user_id = generateRandomString(15).$user_id;

				$stmt = $conn->prepare("UPDATE ca_user 
						SET user_id_no = ? 
						WHERE user_id = ?");
				$stmt->execute(array($uni_user_id, $user_id));

				echo json_encode(array(
					'status' => 'SUCCESS',
				));
				break;

			case 'checkExistingEmail':
				$stmt = $conn->prepare("SELECT user_id_no FROM ca_user WHERE user_email = ?");
				$stmt->execute(array($_POST['email']));
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
				$stmt = $conn->prepare("SELECT user_id_no FROM ca_user WHERE user_username = ?");
				$stmt->execute(array($_POST['username']));
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

			case 'sssToken':
				if (!isset($_SESSION['token'])) {
				    echo json_encode(array(
			    		'status' => 'FAIL',
			    		'msg' => 'Token is not exist'
			    	));
				} else {
					$now = time(); // Checking the time now when home page starts.

				    if ($now > $_SESSION['expire']) {
				        session_destroy();
				        echo json_encode(array(
				    		'status' => 'FAIL',
				    		'msg' => 'Session is expired'
				    	));
				    } else {
				    	$stmt = $conn->prepare("SELECT count(*) AS u FROM ca_user WHERE user_id_no = ? AND user_token = ?");
						$stmt->execute(array($_POST['id'], $_SESSION['token']));
						$result = $stmt->fetch(PDO::FETCH_ASSOC);

						if($result['u'] <= 0) {
							echo json_encode(array(
					    		'status' => 'FAIL',
			    				'msg' => 'Token is not match'
					    	));
						}else{
							echo json_encode(array(
					    		'status' => 'SUCCESS'
					    	));
						}
				    }
				}
				break;

			default:
				# code...
				break;
		}
	} else {
		echo json_encode(array(
    		'status' => 'ERROR',
    		'msg' => 'Wrong Request!'
    	));
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