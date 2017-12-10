'use strict';

import JSONFormatter from '../../../../../dist/json-formatter';

let lineNumber;

export function jsonStringToHTML(jsonString, jsonpFunctionName) {
  lineNumber = jsonpFunctionName === null ? 1 : 2;
  return tokenize(jsonString)
    .then((rootKeyValueOrValue) => {
      const gutterWidth = 1 + (lineNumber.toString().length * 0.5) + 'rem';
      const gutter = document.createElement('div');
      gutter.id = 'gutter';
      gutter.style.width = gutterWidth;

      // Make div#formattedJson and append the root keyValueOrValue
      const divFormattedJson = document.createElement('div');
      divFormattedJson.id = 'formattedJson';
      divFormattedJson.style.marginLeft = gutterWidth;
      divFormattedJson.appendChild(rootKeyValueOrValue);

      // Top and tail with JSONP padding if necessary
      if (jsonpFunctionName !== null) {
        divFormattedJson.innerHTML =
          `<div id="jsonpOpener" line-number="1">${jsonpFunctionName}(</div>
             ${divFormattedJson.innerHTML}
           <div id="jsonpCloser" line-number="${lineNumber}">)</div>`;
      }

      // Return the HTML
      return gutter.outerHTML + divFormattedJson.outerHTML;
    });
}

function tokenize(jsonString) {
  // let json;
  // try {
  //   json = JSON.parse(jsonString);
  // } catch(e) {
  //   return false;
  // }

  // const formatter = new JSONFormatter(json, 2, { hoverPreviewEnabled: true }, json);
  // const html = formatter.render();

  return Promise.resolve(document.createElement('div'));
}
