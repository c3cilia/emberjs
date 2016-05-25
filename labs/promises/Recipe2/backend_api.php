<?php
		$url = 'https://developer.mozilla.org/en-US/search.json/';

		$json_content = file_get_contents($url);
		exit($json_content); 
?>