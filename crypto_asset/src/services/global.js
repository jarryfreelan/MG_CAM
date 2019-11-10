var constData = {
	auth_url: '',
  api_url: '',
  upload_file_url: '',
}

if(location.hostname === 'localhost' || location.hostname === 'localhost:8080' || location.hostname === 'localhost:8081' || location.hostname === 'localhost:8082'){
	constData.auth_url = 'http://localhost/freelancer/bitcoin/ca_api/auth/'
	constData.api_url = 'http://localhost/freelancer/bitcoin/ca_api/'
	constData.upload_file_url = 'http://localhost/freelancer/bitcoin/fileupload/'
} else {
	constData.auth_url = 'http://localhost/ca_api/auth/'
	constData.api_url = 'http://localhost/ca_api/'
	constData.upload_file_url = 'http://localhost/ca_api/fileupload/'
}

export const globalConstData = constData