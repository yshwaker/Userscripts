// ==UserScript==
// @name         Github PR file advanced filter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  collapse/expand PR file diff with regex/glob filters
// @author       yshwaker
// @match        https://github.com/*/*/pull/*/files*
// @require      https://unpkg.com/minimatch@1.0.0/minimatch.js
// @grant        none
// ==/UserScript==
;(function() {
  'use strict';

  const patternInput = document.createElement('input');
  patternInput.placeholder = 'Glob';

  const toggle = document.createElement('button');
  toggle.innerHTML = 'Toggle';
  toggle.className = 'btn btn-primary btn-sm col-3 mt-2';
  toggle.onclick = function() {
    const fileNodes = document.querySelectorAll('.file');
    return [...fileNodes].forEach(node => {
      const title = node.querySelector('.file-info .link-gray-dark').title;
      if (minimatch(title, patternInput.value)) {
        node.querySelector('.js-details-target') && node.querySelector('.js-details-target').click();
      }
    });
  }

  const container = document.createElement('div');
  container.className = 'select-menu-filters';

  const textFilterContainer = document.createElement('div');
  textFilterContainer.className = 'select-menu-text-filter';


  const menuHeader = document.querySelector('.diffbar-item.js-file-filter .select-menu-modal .select-menu-header');

  textFilterContainer.append(patternInput);
  textFilterContainer.append(toggle);
  container.append(textFilterContainer);
  menuHeader.insertAdjacentElement('afterend', container);


})();

