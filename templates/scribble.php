<head>
<link type="text/css" rel="stylesheet" href="../../../apps/files_markdown/css/myscript/myscript.css">
<link type="text/css" rel="stylesheet" href="../../../apps/files_markdown/css/myscript/introjs.css">
<link type="text/css" rel="stylesheet" href="../../../apps/files_markdown/css/myscript/webdemo.css">
<link type="text/css" rel="stylesheet" href="../../../apps/files_markdown/css/myscript/checkbox.css">
<link type="text/css" rel="stylesheet" href="../../../apps/files_markdown/css/myscript/webdemo-text.css">
<link type="text/css" rel="stylesheet" href="../../../apps/files_markdown/css/myscript/button.css">

<style>
[touch-action="none"]{ -ms-touch-action: none; touch-action: none; }
[touch-action="auto"]{ -ms-touch-action: auto; touch-action: auto; }
[touch-action="pan-x"]{ -ms-touch-action: pan-x; touch-action: pan-x; }
[touch-action="pan-y"]{ -ms-touch-action: pan-y; touch-action: pan-y; }
[touch-action="pan-x pan-y"],[touch-action="pan-y pan-x"]{ -ms-touch-action: pan-x pan-y; touch-action: pan-x pan-y; }
</style>
</head>

<body>
	<html>
<div id="help-div" style="display: none;">
<div class="toast-content">
<a class="close" href="#">×</a>
<div class="gestures center tutorial">
<img alt="Illustration of a shuttle" src="../../../apps/files_markdown/img/myscript/shuttle.svg" class="Card-Illustration" width="60">
<h2>Tutorial</h2>
<p>Discover the MyScript text editor across a guided tour.</p>
<a role="button" class="tutorial-button" id="tutorial">Launch</a>
</div>
<h1>Gestures</h1>
<div class="gestures">
<h3>Erase</h3>
<p>Scratch thoroughly and cover all the characters.</p>
<div class="gestures-img-container">
<img src="../../../apps/files_markdown/img/myscript/FR_Scratch_Bad.png">
<img src="../../../apps/files_markdown/img/myscript/FR_Scratch_Good.png">
</div>
</div>
<div class="gestures">
<h3>Break</h3>
<p>Draw a straight vertical line downwards. Start above characters and end well below the baseline.</p>
<div class="gestures-img-container">
<img src="../../../apps/files_markdown/img/myscript/FR_Break_Bad.png">
<img src="../../../apps/files_markdown/img/myscript/FR_Break_Good.png">
</div>
</div>
<div class="gestures">
<h3>Join</h3>
<p>Draw a straight vertical line upwards. Start well below the baseline and end above characters.</p>
<div class="gestures-img-container">
<img src="../../../apps/files_markdown/img/myscript/FR_Join_Bad.png">
<img src="../../../apps/files_markdown/img/myscript/FR_Join_Good.png">
</div>
</div>
</div>
</div>

<div id="help-overlay" style="opacity: 0; visibility: hidden;">

</div>

<header>
<a id="info-header-link" class="ooo-link-info" href="#">
</a>
</header>

<nav class="">
<div class="button-div">
<a id="undo" class="nav-btn btn-fab-mini btn-lightBlue">
<img src="../../../apps/files_markdown/img/myscript/undo.svg">
</a>
<a id="redo" class="nav-btn btn-fab-mini btn-lightBlue" disabled="true">
<img src="../../../apps/files_markdown/img/myscript/redo.svg">
</a>
</div>
<select id="language" class=""><option value="af_ZA">Afrikaans</option><option value="az_AZ">Azərbaycanca</option><option value="be_BY">Беларуская</option><option value="bg_BG">Български</option><option value="bs_BA">Bosanski</option><option value="ca_ES">Català</option><option value="ceb_PH">Sinugboanon</option><option value="cs_CZ">Čeština</option><option value="da_DK">Dansk</option><option value="de_AT">Deutsch (Österreich)</option><option value="de_DE">Deutsch</option><option value="el_GR">Ελληνικά</option><option value="en_CA">English (Canada)</option><option value="en_GB">English (United Kingdom)</option><option value="en_PH">English (Philippines)</option><option value="en_US" selected="selected">English (United States)</option><option value="es_CO">Español (Colombia)</option><option value="es_ES">Español (España)</option><option value="es_MX">Español (México)</option><option value="et_EE">Eesti</option><option value="eu_ES">Euskara</option><option value="fi_FI">Suomi</option><option value="fil_PH">Filipino</option><option value="fr_CA">Français (Canada)</option><option value="fr_FR">Français (France)</option><option value="ga_IE">Gaeilge</option><option value="gl_ES">Galego</option><option value="hr_HR">Hrvatski</option><option value="hu_HU">Magyar</option><option value="hy_AM">Հայերեն</option><option value="id_ID">Bahasa Indonesia</option><option value="is_IS">Íslenska</option><option value="it_IT">Italiano</option><option value="ja_JP">日本語</option><option value="ka_GE">ქართული</option><option value="kk_KZ">Қазақша</option><option value="ko_KR">한국어</option><option value="lt_LT">Lietuvių</option><option value="lv_LV">Latviešu</option><option value="mg_MG">Malagasy</option><option value="mk_MK">Македонски</option><option value="mn_MN">Монгол</option><option value="ms_MY">Bahasa Melayu (Malaysia)</option><option value="nl_BE">Nederlands (België)</option><option value="nl_NL">Nederlands</option><option value="no_NO">Norsk (Bokmål)</option><option value="pl_PL">Polski</option><option value="pt_BR">Português (Brasil)</option><option value="pt_PT">Português (Portugal)</option><option value="ro_RO">Română</option><option value="ru_RU">Русский</option><option value="sk_SK">Slovenčina</option><option value="sl_SI">Slovenščina</option><option value="sq_AL">Shqip</option><option value="sr_Cyrl_RS">Српски</option><option value="sr_Latn_RS">Srpski</option><option value="sv_SE">Svenska</option><option value="sw_TZ">Kiswahili</option><option value="tr_TR">Türkçe</option><option value="tt_RU">Татарча</option><option value="uk_UA">Українська</option><option value="vi_VN">Tiếng Việt</option><option value="zh_CN">中文 (中国)</option><option value="zh_HK">中文 (香港)</option><option value="zh_TW">中文 (台灣)</option></select>
</nav>
<div id="editor" touch-action="none" class="ms-editor" style="font-size: 10px;">
</div>

<script type="text/javascript" src="../../../apps/files_markdown/js/myscript/pep.js"></script>
<script type="text/javascript" src="../../../apps/files_markdown/js/myscript/intro.js"></script>
<script type="text/javascript" src="../../../apps/files_markdown/js/myscript/myscript.js"></script>
<script type="text/javascript" src="../../../apps/files_markdown/js/myscript/configuration.js"></script>
<script type="text/javascript" src="../../../apps/files_markdown/js/myscript/text-intro.js"></script>

</html>
</body>

