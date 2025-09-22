// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 *
 * @module      tiny_recitautolink/plugin
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */

import {getTinyMCE} from 'editor_tiny/loader';
import {getPluginMetadata} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {component, pluginName, buttonName} from './common';
import {Editor} from './wrapper';
import * as Configuration from './configuration';
import * as Options from './options';

// eslint-disable-next-line no-async-promise-executor
export default new Promise(async (resolve) => {
    const bseditor = new Editor();
    const [
        tinyMCE,
        pluginMetadata,
    ] = await Promise.all([
        getTinyMCE(),
        getPluginMetadata(component, pluginName),
    ]);

    const ButtonTitle = await getString('pluginname', component);

    //Custom SVG icon: [[ \ ]]
   const customIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 134" width="24" height="24" fill="#000000" focusable="false">
   <g transform="translate(-10,0)">
  <!-- Outer left bracket -->
  <path d="M31.158,14.617c4.037,0,7.309-3.271,7.309-7.308S35.196,0,31.158,0H16.542c-4.037,0-7.309,3.272-7.309,7.309V126.68
           c0,4.034,3.271,7.307,7.309,7.307h14.616c4.037,0,7.309-3.271,7.309-7.307c0-4.037-3.271-7.31-7.309-7.31h-7.308V14.617H31.158z"></path>
            </g>
   <g transform="translate(10,0)">
  <!-- Inner left bracket -->
  <path d="M51.158,14.617c4.037,0,7.309-3.271,7.309-7.308S55.196,0,51.158,0H36.542c-4.037,0-7.309,3.272-7.309,7.309V126.68
           c0,4.034,3.271,7.307,7.309,7.307h14.616c4.037,0,7.309-3.271,7.309-7.307c0-4.037-3.271-7.31-7.309-7.31h-7.308V14.617H51.158z"></path>
   </g>
  <!-- Right brackets moved together -->
  <g transform="translate(20,0)">
    <!-- Outer right bracket -->
    <path d="M112.829,119.37c-4.037,0-7.31,3.271-7.31,7.31c0,4.034,3.272,7.307,7.31,7.307h14.615c4.037,0,7.309-3.271,7.309-7.307
         V7.309c0-4.037-3.271-7.309-7.309-7.309H112.829c-4.037,0-7.31,3.272-7.31,7.309s3.272,7.308,7.31,7.308h7.307V119.37H112.829z"></path>
      </g>
        <g transform="translate(80,0)">
    <!-- Inner right bracket -->
    <path d="M92.829,119.37c-4.037,0-7.31,3.271-7.31,7.31c0,4.034,3.272,7.307,7.31,7.307h14.615c4.037,0,7.309-3.271,7.309-7.307
         V7.309c0-4.037-3.271-7.309-7.309-7.309H92.829c-4.037,0-7.31,3.272-7.31,7.309s3.272,7.308,7.31,7.308h7.307V119.37H92.829z"></path>
      </g>

  <!-- Backslash -->
  <line y2="124" stroke="currentcolor" stroke-width="6" stroke-linecap="round" x2="85" y1="10" x1="109"></line>
</svg>

`;


    // Register plugin
    tinyMCE.PluginManager.add(`${component}/plugin`, (editor) => {
        Options.register(editor);

        const icon = 'doublebracket';
        editor.ui.registry.addIcon(icon, customIconSvg);

        editor.ui.registry.addButton(buttonName, {
            icon,
            tooltip: ButtonTitle,
            onAction: () => bseditor.open(editor),
        });

        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: ButtonTitle,
            onAction: () => bseditor.open(editor),
        });

        return pluginMetadata;
    });

    resolve([`${component}/plugin`, Configuration]);
});
