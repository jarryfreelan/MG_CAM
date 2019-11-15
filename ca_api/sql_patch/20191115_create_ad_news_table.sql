CREATE TABLE `ad_news` (
  `news_id` int(11) NOT NULL,
  `news_sdate` date NOT NULL,
  `news_edate` date NOT NULL,
  `news_title` text NOT NULL,
  `news_content` text NOT NULL,
  `news_active` int(11) NOT NULL DEFAULT '1',
  `news_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `news_update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ad_news`
  ADD PRIMARY KEY (`news_id`);

ALTER TABLE `ad_news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;