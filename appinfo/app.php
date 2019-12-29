<?php
//load the required files
OCP\Util::addscript( 'files_markdown', 'editor');
OCP\Util::addStyle( 'files_markdown', 'preview' );
OCP\Util::addStyle( 'files_markdown', 'highlight-default' );

OCP\Util::addStyle('chooser', 'jqueryFileTree');
OCP\Util::addscript('chooser', 'jquery.easing.1.3');
OCP\Util::addscript('chooser', 'jqueryFileTree');

OCP\Util::addscript( 'files_markdown', 'myscript/simple_text');
OCP\Util::addscript( 'files_markdown', 'myscript/simple_text_mobile');

OCP\Util::addscript( 'files_markdown', 'myscript/erase_letter');
OCP\Util::addscript( 'files_markdown', 'myscript/erase_word');
OCP\Util::addscript( 'files_markdown', 'myscript/break_word');
OCP\Util::addscript( 'files_markdown', 'myscript/break_word_mobile');
OCP\Util::addscript( 'files_markdown', 'myscript/break_line');
OCP\Util::addscript( 'files_markdown', 'myscript/join_word');
OCP\Util::addscript( 'files_markdown', 'myscript/join_line');

