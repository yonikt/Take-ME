import React, { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username1: "",
            password1: "",
            username2: "",
            phone: "",
            name: "",
            password2: "",
            password3: ""
        }
    }
    update = async (event) => {
        const value = event.target.value;
        const name = event.target.name;
        await this.setState({
            [name]: value
        });
    }
    changeLogged = () => {
        this.props.changeLogged()
    }
    login = async () => {
        let data = await axios.get('http://localhost:4000/users')
        data = data.data
        if (this.state.username1 !== "" && this.state.password1 !== "") {
            if (data.find(d => d.username === this.state.username1.toLowerCase() && d.password === this.state.password1)) {
                const username = this.state.username1.toLowerCase()
                localStorage.username = username
                this.changeLogged()
            } else {
                {
                    swal("Wrong UserName Or Password", {
                        buttons: false,
                        timer: 1000,
                    });
                }
            }
        } else {
            {
                swal("Missing Fields", {
                    buttons: false,
                    timer: 1000,
                });
            }
        }

    }
    addUser = async () => {
        let data = await axios.get('http://localhost:4000/users')
        data = data.data
        console.log(data)
        if (this.state.username2 !== "" && this.state.password2 !== "" && this.state.password3 !== "" && this.state.phone !== "" && this.state.name !== "") {
            if (this.state.password2 === this.state.password3) {
                console.log(data.find(d => d.username === this.state.username2))
                if (data.find(d => d.username === this.state.username2.toLowerCase()) === undefined) {
                    this.setState({login:true})
                    const user = {
                        username: this.state.username2.toLowerCase(),
                        password: this.state.password2,
                        phone: this.state.phone,
                        name: this.state.name.toLowerCase(),
                        userimage: "https://a.imge.to/2019/08/22/mgkcF.png",
                        favorites: [],
                        chats: []
                    }
                    axios.post('http://localhost:4000/user', user, function (res) {
                        res.end()
                    })
                    const username = this.state.username2.toLowerCase()
                    localStorage.username = username
                    this.changeLogged()
                } else {
                    swal("username already exist")
                }
            }
            else {
                swal("Wrong Password")
            }
        } else {
            swal("Missing Fields")
        }
    }


    signUp = () => {
        const container = document.getElementById('container')
        return container.classList.add("right-panel-active")
    }

    signIn = () => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active")
    }

    add = () => {
        this.addUser()
        this.signUp()
    }

    enter = () => {
        this.login()
        this.signIn()
    }


    render() {
        return (
            <div id="welcome">
                <br></br>
                <div class="container" id="container">
                    <div class="form-container sign-up-container">
                        <form>
                            <h1>Create Account</h1>

                            <input type="text" placeholder="Your Name" name="name" value={this.state.name} onChange={this.update} />
                            <input type="text" placeholder="User Name" name="username2" value={this.state.username2} onChange={this.update} />
                            <input type="text" placeholder="Phone Number" name="phone" value={this.state.phone} onChange={this.update} />
                            <input type="password" placeholder="Password" name="password2" value={this.state.password2} onChange={this.update} />
                            <input type="password" placeholder="Confirm Password" name="password3" value={this.state.password3} onChange={this.update} />

                            <button onClick={this.add}>Sign Up</button>
                        </form>
                    </div>

                    <div class="form-container sign-in-container">
                        <form>
                            <h1>Sign in</h1> <br></br>

                            <input type="text" name="username1" placeholder="Username" value={this.state.username1} onChange={this.update}></input>
                            <input type="password" name="password1" placeholder="Password" value={this.state.password1} onChange={this.update}></input>

                            <button onClick={this.enter}>Sign In</button>
                        </form>
                    </div>

                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button onClick={this.enter} class="ghost" id="signIn">Sign In</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start instantly</p>
                                <button onClick={this.signUp} class="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login