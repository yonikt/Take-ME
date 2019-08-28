import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            id: [],
            items: [],
        }
    }

    findId = async () => {
        const username = localStorage.username
        let users = await Axios.get('http://localhost:4000/users')
        users = users.data
        const result = users.find(d => d.username === username)
        this.setState({ id: result.favorites })
        console.log(this.state.id)
    }


    findItems = async () => {
        let allItems = await Axios.get('http://localhost:4000/items')
        let items = []
        for (let d of this.state.id) {
            let item = allItems.data.find(i => i._id === d)
            if (item !== undefined) {
                items.push(item)
            }
        }
        this.setState({ items: items })
    }

    componentWillMount = async () => {
        await this.findId()
        await this.findItems()
    }

    getIdForMessage = (e) => {
        this.props.getIdForMessage(e.target.id)
    }
    
    delete = async (e) => {
        const id = e.target.id
        console.log(id)
        let users = await Axios.get("http://localhost:4000/users")
        let user = await users.data.find(u => u.username === localStorage.username)
        console.log(user)
        let newid = await user.favorites.filter(f => f !== id)
        let update = { ["favorites"]: newid }
        await Axios.put(`http://localhost:4000/user/${user._id}`, update)
        swal("item is deleted")
        window.location.reload()
    }

    render() {
        return (
            <div className="">
                <h1 className="hs">Favorite Items</h1>
                {this.state.items.map(m =>
                    <div className="containerss">
                        <div className="card">
                            <div className="slider">
                                <div className="main-carousel">
                                    <div className="static-banner tag">Category : {m.category}</div>
                                    <button className="static-banner fav"><i className="fas fa-fw fa-heart"></i></button>
                                    <div className="carousel-cell">
                                        <button class="btn-floating btn-small waves-effect waves-light red" onClick={this.delete} >  <i id={m._id} class="material-icons">delete</i></button>
                                        <img className="pic" src={m.image} ></img>
                                    </div>
                                </div>
                            </div>
                            <div className="info">
                                <div className="precio">
                                    <span className="total"> <span className="total-edit" contenteditable>Location : {m.location} | </span></span>
                                    <span className="total"> <span className="total-edit" contenteditable>Uploaded By : {m.name}</span></span><br></br>
                                    <span className="total"> <span className="total-edit" contenteditable>Phone : {m.phone}</span></span>
                                </div>
                                <ul className="carac">
                                    <li><i className="fas fa-fw fa-bed"></i>Condition : {m.condition}</li> <br></br>

                                    <li><i className="fas fa-fw fa-bed"></i>Uploaded At : {m.date.slice(0, 10)}</li>
                                </ul>
                                <div className="titulo">Title : {m.title}</div>
                                <div className="desc">{m.description}</div>
                                <Link to="/message"><button id={m._id} onClick={this.getIdForMessage} className="purple">Send Message</button></Link>
                            </div>
                        </div>
                    </div>

                )
                }
            </div>
        )
    }
}

export default Favorites