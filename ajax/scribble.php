<?php

OCP\JSON::checkLoggedIn();
OCP\JSON::callCheck();

$tmpl = new OCP\Template("files_markdown", "scribble");
$page = $tmpl->fetchPage();
OCP\JSON::success(array('data' => array('page'=>$page)));
