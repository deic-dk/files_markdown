/* global OCA, marked, hljs, MathJax */

OCA.Files_Markdown = {};

OCA.Files_Markdown.overWriteEditor = function () {
	if (window.hideFileEditor) {
		var hideFileEditorOriginal = window.hideFileEditor;
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

OCA.Files_Markdown.Editor.prototype.init = function (editorSession) {
	this.preview.attr('id', 'md_preview');
	this.wrapper.attr('id', 'preview_wrapper');
	this.wrapper.append(this.preview);
	this.editor.parent().append(this.wrapper);
	this.editor.css('width', '49.2%');
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

			marked.setOptions({
				highlight: function (code) {
					return hljs.highlightAuto(code).value;
				},
				renderer: renderer
			});
			onChange();
		});
	this.loadMathJax();
	
	$('.viewcontainer:not(.hidden) #editorcontrols #editor_close').before('<button id="insert_image">'+t('files_markdown', 'Insert image')+'</button>');

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
		return OC.generateUrl('apps/files/ajax/download.php?dir={dir}&files={file}', {
			dir: OC.dirname(path),
			file: OC.basename(path)
		});
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
		"  TeX: {extensions: ['[MathJax]/extensions/mhchem.js']}\n" +
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
	    width: 620,
	    modal: true,
	    dialogClass: "no-close",
	    autoOpen: false,
	    resizeable: false,
	    draggable: false,
	    buttons: buttons,
		  folder: '/',
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
};

$(document).ready(function () {
	
	if (OCA.Files) {
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
