ownCloud Markdown Editor
=================

Extends the texteditor in ownCloud with a live preview for markdown files

![Markdown Editor](https://i.imgur.com/UAIocNZ.png)

The editor also supports LaTeX math using MathJax.  
Math should be surrounded by a `$` for inline math or `$$` for a math block.

![LaTeX math](https://i.imgur.com/5SpOaoc.png)

Besides embedding images from the web, you can also embed images stored on your ownCloud

![Embed Images](https://i.imgur.com/OfRnjcN.png)

Requirements
---

This requires ownCloud and the text editor app to be installed from ownCloud 7 or higher.

Installation
---

- Clone the app into the owncloud apps directory:

    ``git clone https://github.com/icewind1991/files_markdown.git``

- Activate the App.

    ``occ app:enable files_markdown``
