import { render, Component } from 'preact'
import marked from "marked";
import hljs from 'highlightjs';

export default class Markdown extends Component {
  constructor(props) {
    super();
  }

  renderMarkdown() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      highlight: function(code) {
        return '<code class="hljs">'+hljs.highlightAuto(code).value +'</code>';
      }
    });
    
    //et content = highlightjs.highlight(this.props.content)
    return marked(this.props.content);
  }

  render(props) {
    return (
      <div
          id="content_markdown" class="mirror_content markdown-body"
        dangerouslySetInnerHTML={{ __html: this.renderMarkdown() }}
      />
    );
  }
}