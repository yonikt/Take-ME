import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Axios from 'axios';
import swal from 'sweetalert';

class SpecificItem extends Component {
    constructor() {
        super()
        this.state = {
            item: {}
        }
    }


    favorite = async (e) => {
        if (localStorage.username) {
            const id = e.target.id
            let users = await Axios.get("http://localhost:4000/users")
            let user = await users.data.find(u => u.username === localStorage.username)
            let exist = await user.favorites.find(f => f === id)
            if (!exist) {
                user.favorites.push(id)
                let update = { ["favorites"]: user.favorites }
                await Axios.put(`http://localhost:4000/user/${user._id}`, update)
                swal("Item added to your favorite's list")
            }
            else { swal("Item is allredy exist") }
        } else { swal("Please login !") }
    }

    getIdForMessage = (e) => {
        this.props.getIdForMessage(e.target.id)
    }

    componentWillMount = async () => {
        let itemId = this.props.id
        console.log(itemId)
        let data = await Axios.get("http://localhost:4000/items")
        let items = data.data
        let item = items.find(i => i._id == itemId)
        item.date = item.date.slice(0, 10)
        this.setState({ item })
    }

    render() {
        let m = this.state.item
        console.log(m)
        return (
            <div className="containerss">
                <div className="card">
                    <div className="slider">
                        <div className="main-carousel">
                            <div className="static-banner tag">Category : {m.category}</div>
                            <button className="static-banner fav"><i className="fas fa-fw fa-heart"></i></button>
                            <div className="carousel-cell">
                                <button onClick={this.favorite} id={m._id} className="btn-floating btn-small waves-effect waves-light purple">♡</button>
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

                            <li><i className="fas fa-fw fa-bed"></i>Uploaded At : {m.date}</li>
                        </ul>
                        <div className="titulo">Title : {m.title}</div>
                        <div className="desc">{m.description}</div>
                        <Link to="/message"><button id={m._id} onClick={this.getIdForMessage} className="purple">Send Message</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SpecificItem