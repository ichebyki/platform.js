
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }


  /*--------------------------------------------------------------------------*/

  var uos = 'UNKNOWN';
  var ubit = 999;
  var detected = "";
  var installer_name = "";
  var installer_link = ".";
  var comments = {en: "", ru: ""};

  var lang = "en";
  if (document.currentScript.attributes.lang) {
    lang = document.currentScript.attributes.lang;
  }

  /* testing */
    /*platform.os.family = 'UNKNOWN';
    platform.os.architecture = 64;*/
  /* end testing */

  if (platform.os.family) {
    if (platform.os.family.match(/windows/i)) { /* Windows */
      uos = 'windows';
      detected = "Windows";
      installer_name = detected;
      comments["en"] = "Windows 7 and higher is required";
      comments["ru"] = "требуется версия Windows 7 или выше";
    } else if (platform.os.family.match(/linux/i)  /* Linux, "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE" */
      || platform.os.family.match(/Ubuntu/i)
      || platform.os.family.match(/Debian/i)
      || platform.os.family.match(/Fedora/i)
      || platform.os.family.match(/Red Hat/i)
      || platform.os.family.match(/SuSE/i))
    {
      uos = 'linux';
      detected = "Linux";
      installer_name = detected;
      comments["en"] = "";
      comments["ru"] = "";
    } else if (platform.os.family.match(/os x/i)) { /* OS X */
      uos = 'macos';
      detected = "macOS";
      installer_name = detected;
      comments["en"] = "version 10.7 or higher is required";
      comments["ru"] = "требуется версия 10.7 или выше";
    } else {
      uos = 'UNKNOWN';
      detected = "UNKNOWN";
      installer_name = detected;
      comments["en"] = "";
      comments["ru"] = "";
    }

    if (platform.os.architecture === 64) {
      ubit = 64;
      if (detected === "Windows" || detected === "Linux") {
        detected = detected + " 64-bit";
      }
    } else if (platform.os.architecture === 32) {
      ubit = 32;
      if (detected === "Windows" || detected === "Linux") {
        detected = detected + " 32-bit";
      }
    } else {
      ubit = 999;
    }
  }

  var links = {
    bit32: {
      windows : '/downloads/ugene_tiny_loader_win_x86.html',
      linux: '/downloads/ugene_tiny_loader_linux_x86.html',
      macos: '/downloads/ugene_installer_mac_x64.html'
    },
    bit64: {
      windows : '/downloads/ugene_tiny_loader_win_x86.html',
      linux: '/downloads/ugene_tiny_loader_linux_x64.html',
      macos: '/downloads/ugene_installer_mac_x64.html'
    },
    all: 'download_all_html',
    release_notes: 'release_notes'
  };

  var download_body_content = '';


  if (lang === "ru") { /*************************** <!--:ru--> ***************************/
    download_body_content += '<h2>Скачать UGENE</h2>' +
      '<div style="margin: 0;">' +
      '  <div style="margin-bottom: 24px;">Текущая версия UGENE: <b>1.31.0</b> (август, 2018). См. <a class="content" href="'
      + links.release_notes + '">краткое описание новой версии</a>.</div>';

    if (uos !== 'UNKNOWN') {
      download_body_content += '  <div style="margin-bottom: 6px;">Мы определили вашу операционную систему как <span class="emphasize_words">'
        + detected + '</span>.</div>';
    }

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      download_body_content += 'Выберите пакет для вашей операционной системы:'
      download_body_content += '<ul class="general_content">\n' +
        '<li><a href="' + links['bit64']['linux'] + '"><span class="emphasize_words">UGENE онлайн-инсталлятор для Linux (64-бит)</span></a></li>\n' +
        '<li><a href="' + links['bit32']['linux'] + '"><span class="emphasize_words">UGENE онлайн-инсталлятор для Linux (32-бит)</span></a></li>\n' +
        '</ul>';
    } else if (uos !== 'UNKNOWN') {
      if (ubit !== 32 && ubit !== 64) {
        ubit = 64;
      }
      download_body_content +=
        '  <div style="margin-bottom: 24px;">Рекомендованная сборка для загрузки <a style="color: inherit;" href="' + links['bit' + ubit][uos]
        + '" ><span class="emphasize_words">UGENE онлайн-инсталлятор для '
        + installer_name + '</span></a>.</div>' +
        '';
    } else if (uos === 'UNKNOWN') {
      download_body_content += 'Выберите пакет для вашей операционной системы:'
      download_body_content += '<ul class="general_content">\n' +
        '<li><a href="' + links['bit64']['windows'] + '"><span class="emphasize_words">UGENE онлайн-инсталлятор для Windows</span></a></li>\n' +
        '<li><a href="' + links['bit64']['macos'] + '"><span class="emphasize_words">UGENE онлайн-инсталлятор для macOS</span></a></li>\n' +
        '<li><a href="' + links['bit64']['linux'] + '"><span class="emphasize_words">UGENE онлайн-инсталлятор для Linux (64-бит)</span></a></li>\n' +
        '<li><a href="' + links['bit32']['linux'] + '"><span class="emphasize_words">UGENE онлайн-инсталлятор для Linux (32-бит)</span></a></li>\n' +
        '</ul>';
    } else {
      ;
    }

    download_body_content +=
      '  <div style="margin-bottom:42px;">Хотите скачать другой пакет? Перейдите по <a class="content" href="' + links.all + '">данной ссылке</a>.</div>' +
      '';

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      ;
    } else if (uos !== 'UNKNOWN') {
      download_body_content +=
        '  <div class="downloads_button">' +
        '    <a style="text-decoration: none;color: inherit;" href="' + links['bit' + ubit][uos]
        + '"><div class="downloads_button_main">Скачать онлайн-инсталлятор для ' + installer_name + '</div></a>' +
        '    <div class="downloads_button_comment">' + comments["ru"] + '</div>' +
        '  </div>' +
        '</div>' +
        '';
    }
  }
  else { /*************************** <!--:en--> ***************************/
    download_body_content += '<h2>Download UGENE</h2>' +
      '<div style="margin: 0;">' +
      '  <div style="margin-bottom: 24px;">Current stable version is <b>1.31.0</b> (August, 2018). See <a class="content" href="'
      + links.release_notes + '">release notes</a>.</div>';

    if (uos !== 'UNKNOWN') {
      download_body_content += '  <div style="margin-bottom: 6px;">We detected your operating system as <span class="emphasize_words">'
        + detected + '</span>.</div>';
    }

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      download_body_content += 'Select a package for your operating system:'
      download_body_content += '<ul class="general_content">\n' +
        '<li><a href="' + links['bit64']['linux'] + '"><span class="emphasize_words">UGENE Online Installer for Linux 64-bit</span></a></li>\n' +
        '<li><a href="' + links['bit32']['linux'] + '"><span class="emphasize_words">UGENE Online Installer for Linux 32-bit</span></a></li>\n' +
        '</ul>';
    } else if (uos !== 'UNKNOWN') {
      if (ubit !== 32 && ubit !== 64) {
        ubit = 64;
      }
      download_body_content +=
        '  <div style="margin-bottom: 24px;">Recommended download is <a style="color: inherit;" href="' + links['bit' + ubit][uos]
        + '" ><span class="emphasize_words">UGENE Online Installer for '
        + installer_name + '</span></a>.</div>' +
        '';
    } else if (uos === 'UNKNOWN') {
      download_body_content += 'Recommended download is one of the following::'
      download_body_content += '<ul class="general_content">\n' +
        '<li><a href="' + links['bit64']['windows'] + '"><span class="emphasize_words">UGENE Online Installer for Windows</span></a></li>\n' +
        '<li><a href="' + links['bit64']['macos'] + '"><span class="emphasize_words">UGENE Online Installer for macOS</span></a></li>\n' +
        '<li><a href="' + links['bit64']['linux'] + '"><span class="emphasize_words">UGENE Online Installer for Linux 64-bit</span></a></li>\n' +
        '<li><a href="' + links['bit32']['linux'] + '"><span class="emphasize_words">UGENE Online Installer for Linux 32-bit</span></a></li>\n' +
        '</ul>';
    } else {
      ;
    }

    download_body_content +=
      '  <div style="margin-bottom:42px;">Do you need another package? <a class="content" href="' + links.all + '">View all options</a>.</div>' +
      '';

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      ;
    } else if (uos !== 'UNKNOWN') {
      download_body_content +=
        '  <div class="downloads_button">' +
        '    <a style="text-decoration: none;color: inherit;" href="' + links['bit' + ubit][uos]
        + '"><div class="downloads_button_main">Download Online Installer for ' + installer_name + '</div></a>' +
        '    <div class="downloads_button_comment">' + comments["en"] + '</div>' +
        '  </div>' +
        '</div>' +
        '';
    }
  }

  /*--------------------------------------------------------------------------*/

  // Export download_body_content.

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose download_body_content on the global object to prevent errors when download_body_content is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.download_body_content = download_body_content;

    // Define as an anonymous module so download_body_content can be aliased through path mapping.
    define(function() {
      return download_body_content;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(download_body_content, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.download_body_content = download_body_content;
  }
}.call(this));
