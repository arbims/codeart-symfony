import { render, Component } from 'preact'
import $ from 'jquery'
import CodeMirrorComp from "./Editor/CodeMirrorComp";
import Markdown from "./Editor/Markdown";

export default class Editor extends Component {
  constructor(props) {
    super();
    this.setEditor = this.setEditor.bind(this);
    this.setBold = this.setBold.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setCodeBlock = this.setCodeBlock.bind(this)
    this.setResize = this.setResize.bind(this)
    this.onSubmitData = this.onSubmitData.bind(this)
    this.state = {
      value: "",
      editor: null
    };
  }

  componentWillMount() {

    let $textarea = document.getElementById('editor-content')
    if ($textarea !== null) {
      let $value = $textarea.value
      this.setState({ value: $value })
      $textarea.remove()
    }
    if (this.props.value != undefined) {
      this.setState({ value: this.props.value })
    }
  }

  setEditor(editor) {
    let _this = this;
    _this.setState({ editor })
    editor.on("keyup", function () {
      _this.setState({
        value: editor.getDoc().getValue()
      });
    });
  }

  setItalic(e) {
    e.preventDefault()
    this.state.editor.getDoc().replaceSelection('*' + this.state.editor.getDoc().getSelection() + '*')
    this.state.editor.focus()
    this.refreshContent()
  }

  setBold(e) {
    e.preventDefault()
    this.state.editor.getDoc().replaceSelection('**' + this.state.editor.getDoc().getSelection() + '**')
    this.state.editor.focus()
    this.refreshContent()
  }

  setCodeBlock(e) {
    e.preventDefault()
    this.state.editor.getDoc().replaceSelection('```\n' + this.state.editor.getDoc().getSelection() + '```\n')
    this.state.editor.focus()
    this.refreshContent()
  }

  setResize(e) {
    e.preventDefault()
    let element = document.querySelector('.md_editor')
    if (element.classList.contains('fullscreen')) {
      element.classList.remove('fullscreen')
    } else {
      element.classList.add('fullscreen')
    }
  }

  refreshContent() {
    this.setState({
      value: this.state.editor.getDoc().getValue()
    })
  }

  onReset() {
    this.setState({ value: '' })
  }

  onSubmitData(e) {
    e.preventDefault()
    this.props.onSubmitData()
    this.setState({ value: '' })
    this.state.editor.getDoc().setValue('')
  }

  render(props, { value }) {
    return (
      <div>
        {props.postform === true ?
          <form onSubmit={this.onSubmitData}>
            <hr />
            <h2>Repondre</h2>
            <div className="col-md-12">
              <div id="flash"></div>
              <div className="md_editor">
                <div className="mdeditor_toolbar">
                  <button className="mdeditor_bold" onClick={this.setBold}>b</button>
                  <button className="mdeditor_italic" onClick={this.setItalic}>i</button>
                  <button className="mdeditor_code" onClick={this.setCodeBlock}>c</button>
                  <button className="mdeditor_resize" onClick={this.setResize}>f</button>
                </div>
                <CodeMirrorComp content={value} onReady={this.setEditor} />
              </div>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-success btn-comment">Envoyer</button>
            </div>
          </form>
          :
          <div className="col-md-12">
            <div id="flash"></div>
            <div className="md_editor" id={'edit-' + this.props.id}>
              <div className="mdeditor_toolbar">
                <button className="mdeditor_bold" onClick={this.setBold}>b</button>
                <button className="mdeditor_italic" onClick={this.setItalic}>i</button>
                <button className="mdeditor_code" onClick={this.setCodeBlock}>c</button>
                <button className="mdeditor_resize" onClick={this.setResize}>f</button>
              </div>
              <CodeMirrorComp content={value} onReady={this.setEditor} id={this.props.id} />
            </div>
          </div>}
      </div>
    );
  }
}
