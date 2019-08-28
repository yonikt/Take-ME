import React, { Component } from 'react';
import Axios from 'axios';
class Chats extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            messages: [],
            inputStatus: false,
            toUsername: "",
            message: ""
        }
    }
    getData = async () => {
        let data = await Axios.get('http://localhost:4000/users')
        data = data.data
        data = data.find(d => d.username === localStorage.username)
        console.log(data)
        data = data.chats
        this.setState({
            data
        })
    }
    getMessages = (e) => {
        const inputStatus = true
        const username = e.target.id
        let messages = this.state.data.find(i => i.to === username).messages
        messages.reverse()
        if (messages.length > 20) {
            messages = messages.splice(0, 20)
        }
        messages.reverse()
        this.setState({
            messages,
            inputStatus,
            toUsername: username
        })
    }
    update = async (event) => {
        const value = event.target.value;
        const name = event.target.name;

        await this.setState({
            [name]: value
        })
    }
    insertMessage = async (e) => {
        const data = {
            from: localStorage.username,
            to: this.state.toUsername,
            message: this.state.message
        }
        await Axios.post('http://localhost:4000/chat', data, function (res) {
            res.end()
        })
        await this.getData()
        this.getMessages({ target: { id: this.state.toUsername } })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <div>
                <div class="chat">
                    <div class="chatUsers">
                        {this.state.data.map(i => <div onClick={this.getMessages} class="chatUser" id={i.to}>{i.to}</div>)}
                    </div>
                    <div class="chatMessages">
                        {this.state.messages.map(i => i.status === "Send" ? <div class="leftMessage">You: {i.text}</div> : <div class="rightMessage">{i.text}</div>)}
                        {this.state.inputStatus ? <div><input value={this.state.message} name="message" onChange={this.update} type="text"></input><button onClick={this.insertMessage} id={this.state.toUsername}>Send Messages</button></div> : null}
                    </div>

                </div>
            </div>
        )
    }
}

export default Chats