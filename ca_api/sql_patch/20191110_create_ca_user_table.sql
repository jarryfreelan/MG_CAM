CREATE TABLE `ca_user` (
  `user_id` int(11) NOT NULL,
  `user_id_no` varchar(30) NOT NULL DEFAULT '',
  `user_first_name` varchar(50) NOT NULL DEFAULT '',
  `user_last_name` varchar(20) NOT NULL DEFAULT '',
  `user_dob` date NOT NULL DEFAULT '0000-00-00',
  `user_email` varchar(50) NOT NULL DEFAULT '',
  `user_email_coinpayment` varchar(50) NOT NULL DEFAULT '',
  `user_phone` varchar(20) NOT NULL DEFAULT '',
  `user_country` varchar(30) NOT NULL DEFAULT '',
  `user_secret` text NOT NULL,
  `user_2fa` tinyint(4) NOT NULL DEFAULT '0',
  `user_otp` tinyint(4) NOT NULL DEFAULT '0',
  `user_username` varchar(20) NOT NULL DEFAULT '',
  `user_password` text NOT NULL,
  `user_key` varchar(50) NOT NULL DEFAULT '',
  `user_token` text NOT NULL,
  `user_created_by` int(11) NOT NULL DEFAULT '0',
  `user_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_by` int(11) NOT NULL DEFAULT '0',
  `user_updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ca_user`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `ca_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;