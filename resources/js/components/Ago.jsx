import { render, Component } from 'preact'
import { useState, useEffect } from 'preact/hooks'
        const terms = [
            {
                time: 45,
                divide: 60,
                text: "moins d'une minute"
            },
            {
                time: 90,
                divide: 60,
                text: 'environ une minute'
            },
            {
                time: 45 * 60,
                divide: 60,
                text: '%d minutes'
            },
            {
                time: 90 * 60,
                divide: 60 * 60,
                text: 'environ une heure'
            },
            {
                time: 24 * 60 * 60,
                divide: 60 * 60,
                text: '%d heures'
            },
            {
                time: 42 * 60 * 60,
                divide: 24 * 60 * 60,
                text: 'environ un jour'
            },
            {
                time: 30 * 24 * 60 * 60,
                divide: 24 * 60 * 60,
                text: '%d jours'
            },
            {
                time: 45 * 24 * 60 * 60,
                divide: 24 * 60 * 60 * 30,
                text: 'environ un mois'
            },
            {
                time: 365 * 24 * 60 * 60,
                divide: 24 * 60 * 60 * 30,
                text: '%d mois'
            },
            {
                time: 365 * 1.5 * 24 * 60 * 60,
                divide: 24 * 60 * 60 * 365,
                text: 'environ un an'
            },
            {
                time: Infinity,
                divide: 24 * 60 * 60 * 365,
                text: '%d ans'
            }
        ]



export default class Ago extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createdComment: null
        }
    }
    componentDidMount() {
        var datecreatedphp = new Date(this.props.created);
        var datetimestamps = datecreatedphp.getTime()
        let seconds = Math.round(new Date().getTime() - parseInt(datetimestamps)) / 1000
        let prefix = seconds > 0 ? 'Il y a ' : 'Dans'
        let wording = ""
        let term = null
        for (term of terms) {
            if (Math.abs(seconds) < term.time) {
                break
            }
        }
        let timeAgo = prefix + term.text.replace('%d', Math.round(seconds / term.divide))
        this.setState({createdComment: timeAgo})
    }
    render() {
        return (
            <span>{this.state.createdComment}</span>
        )
    }
}


