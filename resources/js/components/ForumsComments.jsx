import { render, Component } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'
import $ from 'jquery'
import Editor from './Editor'
import Markdown from './Editor/Markdown'
import hljs from "highlightjs";
import { getForumsComments, postFormusComment, removeForumsComment, editForumsComment } from '../api/Api'
import Ago from './Ago'

export default class Comments extends Component {

    constructor(props) {
        super(props)
        this.sendComment = this.sendComment.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.onSubmitEditComment = this.onSubmitEditComment.bind(this)
        this.state = {
            forumscomments: [],
            comment: '',
            showForm: false,
            showComments: false,
            editing: null,
            user_id: null
        }
    }

    componentDidMount() {
        let el = document.getElementById('preact-forums-comments')
        let id = el.getAttribute('data-id')
        let model = el.getAttribute('data-type')
        let UserId = el.getAttribute('data-userId')
        if (UserId) {
            this.setState({ showForm: true })
            this.setState({ user_id: UserId })
        }
        getForumsComments(id, model).then((response) => {
            this.setState({
                forumscomments: response,
                showComments: true
            })
        });
    }

    sendComment() {
        let postId = document.getElementById('preact-forums-comments').getAttribute('data-id')
        let postType = document.getElementById('preact-forums-comments').getAttribute('data-type')
        let content = document.querySelector('[name=content]').value
        let data = { content: content, forums_post_id: postId }
        if (data.content) {
            postFormusComment(data).then((response) => {
                let newComment = response
                this.setState({ forumscomments: this.state.forumscomments.concat(newComment) })
            });
        } else {
            $('#flash').empty()
            $('#flash').show()
            $('#flash').append('<div class="alert alert-danger alert-border"> Enter un message </div>')
            setInterval(function () {
                $('#flash').slideUp()
            }, 2000)
        }
    }

    editComment(comment) {
        this.setState({ editing: comment.id })
    }
    onSubmitEditComment(e, comment) {
        e.preventDefault()
        let content = document.querySelector('[name=content]').value
        let data = { content: content, commentId: comment.id }
        if (data.content) {
            editForumsComment(data).then((response) => {
                comment.content = content
                this.setState({ editing: null })
            });
        } else {
            $('#flash').empty()
            $('#flash').show()
            $('#flash').append('<div class="alert alert-danger alert-border"> Enter un message </div>')
            setInterval(function () {
                $('#flash').slideUp()
            }, 2000)
        }
    }

    cancelEditing() {
        this.setState({ editing: null })
    }

    deleteComment(comment) {
        if (window.confirm('Voulez vous supprimer le commentaire')) {
            removeForumsComment(comment.id).then((response) => {
                if (response.data.success == true) {
                    var stringId = '#comment-' + comment.id
                    $(stringId).slideUp()
                }
            });
        }
    }

    render(props, { forumscomments }) {
        return <div class="container blog-text">
            <hr />
            <h3>Liste des reponses </h3>
            {this.state.showComments === false &&
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }
            {this.state.showComments === true &&
                forumscomments.map((comment, key) =>
                    <div className="comment-list" id={'comment-' + comment.id}>
                        <div class="row">
                            <div class="col-md-1 col-2">
                                <img class="comment-user-image" src={comment.user.avatar !== null ? '/img/users/' + comment.user.avatar : '/img/profil.jpg'} alt="" />
                            </div>
                            <div class="col-md-11 col-10">
                                <div class="comment-content">
                                    <h4 class="comment-username user-comment-forums-detail">{comment.user.email} <span class="comment-date" ><Ago created={comment.created} /></span>
                                        {this.state.showForm === true && this.state.user_id == comment.user.id &&
                                            <span>
                                                <a onClick={() => (this.editComment(comment))} class="comment_btn edit_comment" ><i className="fa fa-pencil"></i> Editer</a>
                                                <a onClick={() => (this.deleteComment(comment))} class="comment_btn delete_comment" ><i className="fa fa-trash"></i> Supprimer</a>
                                            </span>
                                        }
                                    </h4>
                                    <div class="comment-comment">
                                        {this.state.editing !== comment.id ? <Markdown content={comment.content} />
                                            :
                                            <form onSubmit={(e) => (this.onSubmitEditComment(e, comment))}>
                                                <Editor value={comment.content} id={'comment' + comment.id}></Editor>
                                                <button class="btn btn-primary btn-comment" type="submit">Editer</button>
                                                <a class="btn btn-default btn-comment-cancel" onClick={this.cancelEditing}>Annuller</a>
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {this.state.showForm === true &&
                <Editor onSubmitData={this.sendComment} postform={true} />
            }

        </div>
    }
}
