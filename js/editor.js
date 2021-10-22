/* global OCA, marked, hljs, MathJax */

OCA.Files_Markdown = {};

OCA.Files_Markdown.overWriteEditor = function () {
	if (window.hideFileEditor) {
		var hideFileEditorOriginal = window.hideFileEditor;
		var justHideFileEditorOriginal = window.justHideFileEditor;
		var reopenEditorOriginal = window.reopenEditor;
	}
	// Fades out the editor.
	window.hideFileEditor = function (noReload) {
		$('div#content-wrapper').css('overflow-y', 'auto');
		hideFileEditorOriginal(noReload);
		if ($('#editor').attr('data-edited') === 'true') {
			$('#md_preview').hide();
		} else {
			$('#md_preview').remove();
		}
	};
	
	window.justHideFileEditor = function (noReload) {
		$('div#content-wrapper').css('overflow-y', 'auto');
		justHideFileEditorOriginal(noReload);
		if ($('#editor').attr('data-edited') === 'true') {
			$('#md_preview').hide();
		} else {
			$('#md_preview').remove();
		}
	};

	// Reopens the last document
	window.reopenEditor = function () {
		reopenEditorOriginal();
		$('#md_preview').show();
	};
};

OCA.Files_Markdown.mathJaxLoaded = false;
OCA.Files_Markdown.markedLoadPromise = null;
OCA.Files_Markdown.highlightLoaded = null;

OCA.Files_Markdown.Editor = function (editor, head, dir) {
	if(typeof this.wrapper === 'undefined'){
		$('#preview_wrapper').remove();
		this.editor = editor;
		this.head = head;
		this.dir = dir;
		this.preview = $('<div/>');
		this.wrapper = $('<div/>');
	}
};

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

OCA.Files_Markdown.Editor.prototype.init = function (editorSession) {
	this.preview.attr('id', 'md_preview');
	this.wrapper.attr('id', 'preview_wrapper');
	this.wrapper.append(this.preview);
	this.editor.parent().append(this.wrapper);
	if($(window).width()>768){
		this.editor.css('width', '49.2%');
	}
	$('.ace_gutter').css('width', '0');
	$('.ace_scroller').css('left', '0');
	$('div#content-wrapper').css('overflow-y', 'hidden');
	var onChange = this._onChange.bind(this, editorSession);
	var getUrl = this.getUrl.bind(this);

	$.when(
		this.loadMarked(),
		this.loadHighlight()
	).then(function () {
			editorSession.on('change', onChange);
			onChange();

			var renderer = new marked.Renderer();
			renderer.image = function (href, title, text) {
				var out = '<img src="' + getUrl(href) + '" alt="' + text + '"';
				if (title) {
					out += ' title="' + title + '"';
				}
				out += this.options.xhtml ? '/>' : '>';
				return out;
			};
			
			renderer.link = function(href, title, text) {
			  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
			  if (href === null) {
			    return text;
			  }
			  var out = '<a href="' + getUrl(escape(href)) + '"';
			  if (title) {
			    out += ' title="' + title + '"';
			  }
			  out += '>' + text + '</a>';
			  return out;
			};

			marked.setOptions({
				highlight: function (code) {
					return hljs.highlightAuto(code).value;
				},
				renderer: renderer
			});
			onChange();
		});
	this.loadMathJax();
	
	if(!$('#body-public').length && $('#permissions').length && (parseInt($('#permissions').val()) & OC.PERMISSION_CREATE) !== 0){
		$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').before('<button id="insert_image">'+t('files_markdown', 'Insert image')+'</button>');
		$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').before('<button id="insert_scribble">'+t('files_markdown', 'Insert scribble')+'</button>');
	}
	
	$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').before('<button id="toggle_editor">'+t('files_markdown', 'Hide editor')+'</button>');
	$('.viewcontainer:not(.hidden) #editorcontrols #toggle_editor').unbind();
	$('.viewcontainer:not(.hidden) #editorcontrols #toggle_editor').click(OCA.Files_Markdown.Editor.prototype.toggleEditor);
	
	$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').before('<button id="toggle_preview">'+t('files_markdown', 'Hide preview')+'</button>');
	$('.viewcontainer:not(.hidden) #editorcontrols #toggle_preview').unbind();
	$('.viewcontainer:not(.hidden) #editorcontrols #toggle_preview').click(OCA.Files_Markdown.Editor.prototype.togglePreview);
		
	$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').after('<div id="choose_image_dialog" display="none">\
			<div class="loadFolderTree"></div>\
			<div class="file" style="visibility: hidden; display:inline;"></div>\
		</div>');
	
	$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').after('<div id="insert_scribble_dialog" display="none"></div>');
	
	OCA.Files_Markdown.Editor.prototype.initDialog();
};

OCA.Files_Markdown.Editor.prototype.togglePreview = function () {
	if($('#preview_wrapper').hasClass('hidden')){
		$('#preview_wrapper').removeClass('hidden');
		$('#editor').width('49.2%');
		window.aceEditor.renderer.updateFull(true);
		$('.viewcontainer:not(.hidden) #editorcontrols #toggle_preview').text(t('files_markdown', 'Hide preview'));
	}
	else{
		$('#preview_wrapper').addClass('hidden');
		$('#editor').width('100%');
		window.aceEditor.renderer.updateFull(true);
		$('.viewcontainer:not(.hidden) #editorcontrols #toggle_preview').text(t('files_markdown', 'Show preview'));
	}
}

OCA.Files_Markdown.Editor.prototype.toggleEditor = function () {
	if($('#editor').hasClass('hidden')){
		$('#editor').removeClass('hidden');
		$('#preview_wrapper').css('width', '51.0%');
		//window.aceEditor.renderer.updateFull(true);
		$('.viewcontainer:not(.hidden) #editorcontrols #toggle_editor').text(t('files_markdown', 'Hide editor'));
	}
	else{
		$('#editor').addClass('hidden');
		$('#preview_wrapper:not(.hidden)').css('width', '90.7%');
		//window.aceEditor.renderer.updateFull(true);
		$('.viewcontainer:not(.hidden) #editorcontrols #toggle_editor').text(t('files_markdown', 'Show editor'));
	}
}

OCA.Files_Markdown.Editor.prototype.getUrl = function (path) {
	if (!path) {
		return path;
	}
	if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://' || path.substr(0, 3) === '://') {
		return path;
	} else {
		if (path.substr(0, 2) == ':/' && $('#app-content-notes:visible').length) {
			// Support Joplin-style image links
			path = path.replace(/:/, '/'+$('#app-content-notes:visible').attr('basedir')+'/.resource');
		}
		if (path.substr(0, 1) !== '/') {
			path = this.dir + '/' + path;
		}
		if(path.endsWith('.md')){
			return OC.generateUrl('apps/files/?dir={dir}&file={file}', {
				dir: OC.dirname(path),
				file: OC.basename(path)
			});
		}
		else{
			return OC.generateUrl('apps/files/ajax/download.php?dir={dir}&files={file}', {
				dir: OC.dirname(path),
				file: OC.basename(path)
			});
		}
	}
};

OCA.Files_Markdown.Editor.prototype._onChange = function (editorSession) {
	var text = editorSession.getValue();
	var html = marked(text);
	this.preview.html(html);
	if (window.MathJax) {
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.preview[0]]);
	}
};

OCA.Files_Markdown.Editor.prototype.loadMarked = function () {
	if (!OCA.Files_Markdown.markedLoadPromise) {
		OCA.Files_Markdown.markedLoadPromise = OC.addScript('files_markdown', 'marked');
	}
	return OCA.Files_Markdown.markedLoadPromise;
};

OCA.Files_Markdown.Editor.prototype.loadHighlight = function () {
	if (!OCA.Files_Markdown.highlightLoadPromise) {
		OCA.Files_Markdown.highlightLoadPromise = OC.addScript('files_markdown', 'highlight.pack');
	}
	return OCA.Files_Markdown.highlightLoadPromise;
};

OCA.Files_Markdown.Editor.prototype.paste_scribble = function () {
	var scribbleText = $('#editor.ms-editor .more-menu .options-label-button[data-clipboard-text]').attr('data-clipboard-text');
	var editorSession = window.aceEditor.getSession();
	editorSession.insert(window.aceEditor.getCursorPosition(), scribbleText);
}

OCA.Files_Markdown.Editor.prototype.loadMathJax = function () {
	if (OCA.Files_Markdown.mathJaxLoaded) {
		return;
	}
	OCA.Files_Markdown.mathJaxLoaded = true;
	var script = document.createElement("script");
	script.type = "text/x-mathjax-config";
	script[(window.opera ? "innerHTML" : "text")] =
		"MathJax.Hub.Config({\n" +
		"  tex2jax: {ignoreClass: 'ace_content',  inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" +
		"});"+
		"MathJax.Hub.Config({\n" +
		"  TeX: {extensions: ['mhchem.js']}\n" +
		"});";
	this.head.appendChild(script);

	var path = OC.filePath('files_markdown', 'js', 'mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML');

	//insert using native dom to prevent jquery from removing the script tag
	script = document.createElement("script");
	script.src = path;
	this.head.appendChild(script);
};

OCA.Files_Markdown.Editor.prototype.chosenFile = '';

OCA.Files_Markdown.Editor.prototype.insertImage = function (file) {
	var text = "!["+OCA.Files_Markdown.Editor.prototype.chosenFile+"](/"+OCA.Files_Markdown.Editor.prototype.chosenFile+")";
	window.aceEditor.insert(text);
};

OCA.Files_Markdown.Editor.prototype.bindScribbleEditor = function () {
	var tutoLaunched = false;
	var editorElement = $('#editor.ms-editor').get(0);
	
	/**
	 * Attach an editor to the document
	 * @param {Element} The DOM element to attach the ink paper
	 * @param {Object} The recognition parameters
	 */
	MyScript.register(editorElement, {
		recognitionParams: {
			type: 'TEXT',
			protocol: 'WEBSOCKET',
			apiVersion: 'V4',
			server: {
				useWindowLocation: configuration.useWindowLocation,
				scheme: configuration.scheme,
				host: configuration.host,
				applicationKey: configuration.write.applicationKey,
				hmacKey: configuration.write.hmacKey
			}
		}
	});
	
	var languageElement = document.getElementById('language');
	var undoElement = document.getElementById('undo');
	var redoElement = document.getElementById('redo');
	
	editorElement.addEventListener('changed', function (evt) {
		/**
		 * Launch the tutorial when editor is loaded and no item in local storage
		 */
		/*if (!localStorage.getItem("tutorialLaunched") && !tutoLaunched) {
			console.log('ok');
			setTimeout(() => startIntro($("#insert_scribble_dialog").get(0)), 500);
			tutoLaunched = true;
		}*/
		if (!evt.detail.canUndo === true) {
			undoElement.setAttribute('disabled', `${!evt.detail.canUndo}`);
		} else {
			undoElement.removeAttribute('disabled');
		}
		if (!evt.detail.canRedo === true) {
			redoElement.setAttribute('disabled', `${!evt.detail.canRedo}`);
		} else {
			redoElement.removeAttribute('disabled');
		}
	});
		
	editorElement.addEventListener('loaded', function (evt) {
		/**
		 * Retrieve the list of available recognition languages
		 * @param {Object} The editor recognition parameters
		 */
		var currentLanguage = evt.target.editor.configuration.recognitionParams.v4.lang;
		var res = MyScript.getAvailableLanguageList();
		
		if (languageElement.options.length === 0) {
			Object.keys(res.result).forEach(function (key) {
				var selected = currentLanguage === key;
				languageElement.options[languageElement.options.length] = new Option(res.result[key], key, selected, selected);
			});
		}
	});
	
	languageElement.addEventListener('change', function (e) {
		var configuration = editorElement.editor.configuration;
		//The path to the language depend of the version of API you are using.
		configuration.recognitionParams.v4.lang = e.target.value;
		editorElement.editor.configuration = configuration;
	});
	
	undoElement.addEventListener('click', function () {
		editorElement.editor.undo();
	});
	
	redoElement.addEventListener('click', function () {
		editorElement.editor.redo();
	});
	
	var infoLink = document.querySelector('#info-header-link');
	
	infoLink.addEventListener('click', function () {
		document.querySelector('#help-div').style.display = 'block';
		document.querySelector('#help-overlay').style.visibility = 'visible';
		document.querySelector('#help-overlay').style.opacity = '0.7';
		var videos = document.getElementsByClassName('video');
		Array.from(videos).forEach(function (video) {
			video.play();
		});
	});
	
	const closeElement = document.querySelector('.close');
	closeElement.addEventListener('click', function () {
		document.querySelector('#help-div').style.display = 'none';
		document.querySelector('#help-overlay').style.opacity = '0';
		document.querySelector('#help-overlay').style.visibility = 'hidden';
	});
	
	var tutorial = document.querySelector('#tutorial');
	tutorial.addEventListener('click', function () {
		startIntro($("#insert_scribble_dialog").get(0));
	});
	
	window.addEventListener('resize', function () {
		editorElement.editor.resize();
	});
}

OCA.Files_Markdown.Editor.prototype.initDialog = function (file) {
	var buttons = {};
	buttons[t("files_markdown", "Choose")] = function() {
			OCA.Files_Markdown.Editor.prototype.insertImage();
			choose_image_dialog.dialog("close");
 		};
 		buttons[t("files_markdown", "Cancel")] = function() {
			choose_image_dialog.dialog("close");
 		};
 		choose_image_dialog = $("#choose_image_dialog").dialog({//create dialog, but keep it closed
			title: t("files_markdown", "Choose image"),
			height: 440,
			width: $(window).width()<620?'100%':620,
			modal: true,
			dialogClass: "no-close",
			autoOpen: false,
			resizeable: false,
			draggable: false,
			buttons: buttons,
				folder: '/',
		});
		buttons = {};
		buttons[t("files_markdown", "Cancel")] = function() {
			insert_scribble_dialog.dialog("close");
		};
		buttons[t("files_markdown", "OK")] = function() {
			OCA.Files_Markdown.Editor.prototype.paste_scribble();
			insert_scribble_dialog.dialog("close");
		};
		insert_scribble_dialog = $("#insert_scribble_dialog").dialog({//create dialog, but keep it closed
		title: t("files_markdown", "Insert scribble"),
		height: 540,
		width: '90%',
		modal: false,
		dialogClass: "no-close",
		autoOpen: false,
		resizeable: true,
		draggable: true,
		buttons: buttons,
			folder: '/',
	});

		$("#insert_scribble_dialog").on('dialogclose', function(){
		$('.ui-widget-overlay').show();
		$('#editor.ace_editor').show();
		$('#preview_wrapper').show();
	});
		
	$('.viewcontainer:not(.hidden) #editorcontrols #insert_image').unbind();
	$('.viewcontainer:not(.hidden) #editorcontrols #insert_image').click(function(){
		choose_image_dialog.dialog('open');
		choose_image_dialog.show();
		$('#choose_image_dialog div.loadFolderTree').fileTree({
			//root: '/',
			script: '../../apps/chooser/jqueryFileTree.php',
			multiFolder: false,
			selectFile: true,
			selectFolder: false,
			folder: '',
			file: '',
			group: ''
		},
		// single-click
		function(file) {
			OCA.Files_Markdown.Editor.prototype.chosenFile = file;
		},
		// double-click
		function(file) {
			//if(file.indexOf("/", file.length-1)!=-1){// folder double-clicked
			OCA.Files_Markdown.Editor.prototype.insertImage();
			choose_image_dialog.dialog("close");
			// }
		});
	});
	
//create a reference to the old `.html()` function
	var htmlOriginal = $.fn.html;

	// redefine the `.html()` function to accept a callback
	$.fn.html = function(html,callback){
	  // run the old `.html()` function with the first parameter
	  var ret = htmlOriginal.apply(this, arguments);
	  // run the callback (if it is defined)
	  if(typeof callback == "function"){
	    callback();
	  }
	  // make sure chaining is not broken
	  return ret;
	}

	$('.viewcontainer:not(.hidden) #editorcontrols #insert_scribble').unbind();
	$('.viewcontainer:not(.hidden) #editorcontrols #insert_scribble').click(function(){
		insert_scribble_dialog.dialog('open');
		insert_scribble_dialog.show();

		$.ajax(OC.linkTo('files_markdown', 'ajax/scribble.php'), {
			type: 'GET',
			success: function(jsondata){
				if(jsondata) {
					$('#insert_scribble_dialog').html(jsondata.data.page, OCA.Files_Markdown.Editor.prototype.bindScribbleEditor);
				}
			},
			error: function(data) {
				alert("Unexpected error!");
			}
		});
	});

};

$(document).ready(function () {
	
	if (OCA.Files && !$('body#body-public').length) {
		OCA.Files.fileActions.register('text/markdown', 'Edit', OC.PERMISSION_READ, '', function (filename, context) {
			window.showFileEditor(context.dir, filename, context.id, context.owner).then(function () {
				var editor = new OCA.Files_Markdown.Editor($('#editor'), $('head')[0], context.dir);
				OCA.Files_Markdown.Editor.prototype.editor = editor;
				window.aceEditor.setAutoScrollEditorIntoView(true);
				editor.init(window.aceEditor.getSession());
			});
		});
		OCA.Files.fileActions.setDefault('text/markdown', 'Edit');

		OCA.Files_Markdown.overWriteEditor();
		
	}
	
});
