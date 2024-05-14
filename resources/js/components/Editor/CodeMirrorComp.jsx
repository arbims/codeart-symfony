import { render, Component } from 'preact'

import CodeMirror from "codemirror";
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neo.css'

export default class CodeMirrorComp extends Component {
  
  constructor(props) {
    super();
  }
  componentDidMount() {
    let editor = document.querySelector(".markedtext");
    let codeMirrorEditor = CodeMirror.fromTextArea(editor, {
      mode: "markdown",
      tabMode: "indent",
      theme: "neo",
      lineWrapping: true,
      viewportMargin: Infinity,
      cursorBlinkRate: 0,
      showMarkdownLineBreaks: true
    });
    this.props.onReady(codeMirrorEditor);
  }

  render(props) {
    return (
      <div>
        <textarea name="content" class="markedtext" value={props.content} id={this.props.id} />
      </div>
    );
  }
}