import { render, Component } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'
import $ from 'jquery'
import { editComment, getComments, postComment, removeComment } from '../api/Api'
import Ago from './Ago';


/**
 * Lister un commentaire
 * @param {comment}  
 */
function Comment({ comment, userId }) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(comment.content);

    function deleteComment(comment) {
        if (window.confirm('Voulez vous supprimer le commentaire')) {
            removeComment(comment.id).then((response) => {
                console.log(response)
                if (response.data.success == true) {
                    var stringId = '#comment-' + comment.id
                    $(stringId).slideUp()
                }
            });
        }
    }

    function setEditComment(comment) {
        setEditing(comment.id)
    }

    function cancelEditing() {
        setEditing(false)
    }

    function onSubmitEditComment(e, comment) {
        e.preventDefault()
        let data = { content: value, commentId: comment.id }
        if (data.content) {
            editComment(comment.id, data).then((response) => {
                comment.content = value
                setEditing(null)
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

    function onInput(e) {
        setValue(e.target.value)
    }

    return <div className="comment-list">
        <div class="comment-content" id={'comment-' + comment.id}>
            <div class="row">
                <div class="col-lg-1 col-md-2 col-2">
                    <img class="comment-user-image" src={comment.user.avatar !== null ? '/img/users/' + comment.user.avatar : '/img/profil.jpg'} alt="" />
                </div>
                <div class="col-lg-11 col-md-10 col-10">
                    <h4 class="comment-username">{comment.user.email} <span class="comment-date"><Ago created={comment.created} /></span></h4>
                    {userId == comment.user.id &&
                        <div class="comment-user-btn">
                            <a onClick={() => setEditComment(comment)}  class="comment_btn edit_comment" ><i className="fa fa-pencil"></i> Editer</a>
                            <a onClick={() => deleteComment(comment)} class="comment_btn delete_comment" ><i className="fa fa-trash"></i> Supprimer</a>
                        </div>
                    }
                </div>
                <div className="col-md-11 offset-1">
                {editing !== comment.id &&
                        <div class="comment-comment">
                            {comment.content}
                        </div>
                    }
                </div>
            </div>
            {editing === comment.id &&
                <>
                    <div className="col-md-1"> </div>
                    <div className="col-md-10">
                        <div class="comment-comment">
                            <form onSubmit={(e) => (onSubmitEditComment(e, comment))}>
                                <div className="col-md-12">
                                    <div id="flash"></div>
                                    <textarea name="commentaire" className="form-control edit_blog_comment" id="commentaire_edit" value={value} onKeyUp={onInput}></textarea>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn btn-primary btn-comment" type="submit">Editer</button>
                                    <a className="btn btn-default btn-comment-cancel" onClick={cancelEditing}>Annuller</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
}



/**
 * creation d'un formulaire
 * envoyer le formulaire
 */
function CommentForm({ postId, onCommentAdd }) {

    const [comment, setComment] = useState(null);
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        let el = document.getElementById('preact-comments')
        let UserId = el.getAttribute('data-userId')
        if (UserId) {
            setShowForm(true)
        }
    })

    function onInput(e) {
        setComment(e.target.value)
    }

    function sendComment(e) {
        e.preventDefault()
        let data = { content: comment, post_id: postId }
        if (data.content) {
            postComment(data).then((response) => {
                onCommentAdd(response)
            });
        } else {
            $('#flash').empty()
            $('#flash').show()
            $('#flash').append('<div class="alert alert-danger alert-border"> Enter un message </div>')
            setInterval(function () {
                $('#flash').slideUp()
            }, 2000)
        }
        setComment(null)
    }

    return <>
        <hr />
        {showForm === true &&
            <form onSubmit={sendComment}>
                <div className="col-md-12">
                    <div id="flash"></div>
                    <textarea name="commentaire" className="form-control" id="commentaire" placeholder="Votre commentaire ..." onKeyUp={onInput} value={comment}></textarea>
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-success btn-comment">Envoyer</button>
                </div>
            </form>
        }
    </>
}

/**
 * composant principale
 * gestion d'etat des comentaires
 */
export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.addComment = this.addComment.bind(this)
        this.state = {
            comments: [],
            postId: null,
            postType: null,
            userId: null
        }
    }

    componentDidMount() {
        let el = document.getElementById('preact-comments')
        let postId = el.getAttribute('data-id')
        let postType = el.getAttribute('data-type')
        let userId = el.getAttribute('data-userId')
        this.setState({ postId: postId })
        this.setState({ postType: postType })
        this.setState({ userId: userId })
        getComments(postId, postType).then((response) => {
            this.setState({
                comments: response,
                showComments: true
            })
        });
    }

    addComment(newComment) {
        this.setState({ comments: this.state.comments.concat(newComment) })
    }

    render(props, { comments, postId, userId }) {

        return <div class="container blog-text">
            <hr />
            <h3>Liste des Commentaires </h3>
            {this.state.showComments === false &&
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }
            {this.state.showComments === true &&
                comments.map((comment, key) =>
                    <Comment comment={comment} userId={userId} />
                )}
            <CommentForm postId={postId} onCommentAdd={this.addComment} />
        </div>

    }
}
