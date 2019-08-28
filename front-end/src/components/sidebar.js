import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import Axios from "axios";

class Sidebar extends Component {
    constructor() {
        super()
        this.state = {
            user: {}
        }

    }
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }
    componentWillMount = async () => {
        let users = await Axios.get("http://localhost:4000/users")
        let user = users.data.find(u => u.username === localStorage.username)
        this.setState({ user })
    }


    logout = () => {
        this.props.logout()
    }

    render() {
        return (
            <div>

                <ul id="slide-out" className="sidenav">
                    {this.props.logged === undefined ? null : <li>
                        <div className="user-view center-align">
                            <div className="background">
                                <img src="https://ak3.picdn.net/shutterstock/videos/24223843/thumb/1.jpg"  />
                            </div>
                            <img className="circle" src={this.state.user.userimage} />
                            <span className="white-text name">Hello, <strong>{this.state.user.name}</strong></span>
                        </div>
                    </li>}
                    <li > <a className="waves-effect " href="/"><span>Home</span> </a></li>
                    <li><div className="divider"></div></li>
                    {this.props.logged === undefined ? <li > <a className=" waves-effect" href="/loggin"><span>Login/Register</span></a></li> : null}
                    {this.props.logged === undefined ? null : <li > <a className="waves-effect " href="/myItems"><span>My Items</span> </a></li>}
                    {this.props.logged === undefined ? null : <li > <a className=" waves-effect " href="/addItem"><span>Add Item</span></a></li>}
                    {this.props.logged === undefined ? null : <li > <a className=" waves-effect" href="/favorites"><span>Favorites</span></a></li>}
                    {this.props.logged === undefined ? null : <li > <a className=" waves-effect" href="/chats"><span>Chats</span></a></li>}
                    <li><div className="divider"></div></li>
                    {this.props.logged === undefined ? null : <li > <a className="waves-effect " href="/useredit"><span>Edit Profile</span> </a></li>}
                    {this.props.logged === undefined ? null : <li><a className="waves-effect" to="/" onClick={this.logout} >Logout</a> </li>}
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>

            </div>
        );
    }
}

export default Sidebar;