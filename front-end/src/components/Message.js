import React, { Component } from 'react';
import axios from 'axios'
class Message extends Component {
    constructor() {
        super()
        this.state = {
            toUsername: "",
            message: ""
        }
    }
    update = async (event) => {
        const value = event.target.value;
        const name = event.target.name;

        await this.setState({
            [name]: value
        })
    }
    getUser = async () => {
        const id = this.props.id
        let data = await axios.get('http://localhost:4000/items')
        data = data.data
        const username = data.find(d => d._id === id).owned
        this.setState({
            toUsername: username
        })
    }
    insertMessage = async (e) => {
        const data = {
            from: localStorage.username,
            to: this.state.toUsername,
            message: this.state.message
        }
        await axios.post('http://localhost:4000/chat', data, function (res) {
            res.end()
        })
        this.setState({
            message: ""
        })
    }
    componentDidMount() {
        this.getUser()
    }
    render() {
        return (
            <div>
                <h2>To: {this.state.toUsername}</h2>
                <input value={this.state.message} name="message" onChange={this.update} type="text"></input>
                <button id={this.state.toUsername} onClick={this.insertMessage}>Send Message</button>
            </div>
        )
    }
}

export default Message