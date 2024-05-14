import { render, Component, createRef } from 'preact'
import Pusher from 'pusher-js'
import { getCountNotif, getNotif } from '../api/Api'
import $ from 'jquery'

export default class Notifications extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			pusher: null,
			notifications: [],
			channel: null,
			countnotif: "",
			show: false,
			laod: false
		}
		this.toggle = this.toggle.bind(this)
		this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
	}
	componentDidMount() {
		console.log(this.state.laod)
		let localLoad = localStorage.getItem('load');
		//const notifInetrval = setInterval(() => {
		if (this.state.laod === false && localLoad == null) {
			localStorage.setItem('load', true);
			this.countNotifications();
			this.getNotification();
			this.state.laod = true;
		}	else {
			this.setState({
				notifications: JSON.parse(localStorage.getItem('LocalListNotif'))
			})
			this.setState({
				countnotif: localStorage.getItem('LocalCountNotif')
			})
		}
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	setWrapperRef(node) {
    this.wrapperRef = node;
  }

	handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if(this.state.show === true) {
				this.setState({
					show: false
				})
			}
    }
  }
	
	getNotification() {
		getNotif().then((response) => {
			console.log(response.notifications)
			localStorage.setItem('LocalListNotif', JSON.stringify(response.notifications)); 
			this.setState({
				notifications: response.notifications
			})
		})
	}

	toggle(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			show: !this.state.show
		})
	}

	countNotifications() {
		getCountNotif().then((response) => {
			localStorage.setItem('LocalCountNotif', response.notifications_count); 
			this.setState({
				countnotif: response.notifications_count
			})
		})
	}

	render (props, {countnotif, notifications}) {
		return (<div class="notif" ref={this.setWrapperRef} >
			<li class="nav-item">
    		<a class="nav-link link_notification" href="#" data-clicked="false" onClick={(e) => (this.toggle(e))}>
	        <i class="fa fa-bell notifications_icon" aria-hidden="true">
	        	{countnotif > 0 &&
	            <span class="notifications_count">{countnotif}</span>  
	        	}
	        </i>
		    </a>
			</li>
			{this.state.show == true &&
			<div class="notifications show_notifications">
    		<div class="content_notif">
					{console.log(JSON.stringify(notifications))}
    			{notifications.map((notif, i) =>
    				<div class="notifications_body" key={i} >
	            <a href="" transition="notification-item" class="notifications_item">
	                <img src={notif.user.avatar !== null ? '/img/users/' + notif.user.avatar : '/img/profil.jpg'} className='notifications_avatar'/>
	                <div class="notifications_text">
	                    <p><b>{notif.user.username}</b> à participé dans le sujet <span>«{notif.name}»</span></p>
	                </div>
	            </a>
        		</div>
  				)}
	        <div class="notifications_body">
            <a href="#" transition="notification-item" class="notifications_item">
              <div class="notifications_text">
                <p>Nouveau message</p>
              </div>
            </a>
        	</div>
        </div>
      </div>
			} 
		</div>)
	}
}