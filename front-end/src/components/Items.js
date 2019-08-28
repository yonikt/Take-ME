import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Axios from 'axios';
import swal from 'sweetalert';

class Items extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            input: "",
            select: "category",
        }
    }

    update = async (event) => {
        const value = event.target.value;
        const name = event.target.name;

        await this.setState({
            [name]: value
        })
    }


    async componentWillMount() {
        let items = await Axios.get('http://localhost:4000/items')
        items = items.data
        const data = items.filter(i => i.owned !== localStorage.username)
        this.setState({ items: data })
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
            else { swal("Item is exist") }
        } else { swal("Please login !") }
    }

    getIdForMessage = (e) => {
        this.props.getIdForMessage(e.target.id)
    }

    render() {
        let select = this.state.select
        let input = this.state.input
        let items = this.state.items
        return (
            <div  >
                <h1 className="hs">Items</h1>
                <div className="row">
                    <div className="inputt  col s7">
                        <input id="favs-input" className="inputt center-align" placeholder="Search" name="input" type="text" value={this.state.input} onChange={this.update} />
                    </div>
                    <div className="col s2">
                        <select id="favs" className="browser-default" type='select-one' name="select" onChange={this.update}  >

                            <option value="category" >category</option>
                            <option value="date" >date</option>
                            <option value="condition" >condition</option>
                            <option value="description" >description</option>
                            <option value="location" >location</option>
                        </select>
                    </div>
                </div>

                {items.filter(f => f[select].toUpperCase().includes(input.toUpperCase())).map(m =>
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
                                    <span className="total"> <span className="total-edit" contenteditable>Uploaded By : {m.name}</span></span> <br></br>
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

                )}


            </div>
        )
    }
}
export default Items