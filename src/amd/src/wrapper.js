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
///import {get_string as getString} from 'core/str';
import {getFilePicker} from 'editor_tiny/options';

export class Editor {
    globalVars = {editor: null, popup: null, backdrop: null, appReact: null};

    open(editor){
        this.globalVars.editor = editor;

        var url = M.cfg.wwwroot;
        var js = url +"/lib/editor/atto/plugins/recitautolink/react/build/index.js";
        //var css = url +"/lib/editor/atto/plugins/recitautolink/build/index.css";
        
        var content = document.createElement('div');
        content.setAttribute('id', 'recitautolink_container');
        this.createPopup(content);
        
        if (!document.getElementById('recitautolink')){
            var script = document.createElement('script');
            script.onload = this.loadUi.bind(this);
            script.setAttribute('src', js);
            script.setAttribute('id', 'recitautolink');
            script.setAttribute('type', 'text/javascript');
            document.getElementsByTagName('head')[0].appendChild(script);
            /*script = document.createElement('link');
            script.setAttribute('href', css);
            script.setAttribute('rel', 'stylesheet');
            document.getElementsByTagName('head')[0].appendChild(script);*/
        }else{
            this.loadUi();
        }
    }

    createPopup(content) {        
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'autolink_popup');        
        modal.setAttribute('style', 'overflow-y: hidden;');

        let inner2 = document.createElement('div');
        inner2.classList.add('modal-dialog');
        inner2.classList.add('modal-xl');
        modal.appendChild(inner2);

        let inner = document.createElement('div');
        inner.classList.add('modal-content');
        inner2.appendChild(inner);

        let header = document.createElement('div');
        header.classList.add('modal-header');
        header.innerHTML = "<h2>"+M.util.get_string('pluginname', 'atto_recitautolink')+"</h2>";
        inner.appendChild(header);

        let btn = document.createElement('button');
        btn.classList.add('close');
        btn.innerHTML = '<span aria-hidden="true">&times;</span>';
        btn.setAttribute('data-dismiss', 'modal');
        btn.onclick = this.destroy.bind(this);
        header.appendChild(btn);
        
        let body = document.createElement('div');
        body.classList.add('modal-body');
        inner.appendChild(body);
        body.appendChild(content);
        
        document.body.appendChild(modal);
        this.globalVars.popup = modal;

        this.globalVars.popup.classList.add('show');

        this.globalVars.backdrop = document.createElement('div');
        this.globalVars.backdrop.classList.add('modal-backdrop', 'fade', 'show');
        this.globalVars.backdrop.setAttribute('data-backdrop', 'static');
        document.body.appendChild(this.globalVars.backdrop);
    }

    destroy(){
        this.globalVars.popup.classList.remove('show');
        this.globalVars.backdrop.classList.remove('show');
        this.globalVars.popup.remove();
        this.globalVars.backdrop.remove();

        if(this.globalVars.appReact){
            this.globalVars.appReact.unmount();
        }
    }          

    loadUi(){
        if (window.openRecitAutolinkUI){
            this.globalVars.appReact = window.openRecitAutolinkUI(this);
        }
    }

    close(code){
        this.destroy();
        if (code){
            this.globalVars.editor.execCommand('mceFocus');
            this.globalVars.editor.execCommand('mceInsertContent', false, code);
            this.globalVars.popup.close();
        }
    }
}