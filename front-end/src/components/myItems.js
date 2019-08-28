import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
class myItems extends Component {
    constructor() {
        super()
        this.state = {
            myItems: []
        }
    }

    async componentWillMount() {
        let items = await Axios.get('http://localhost:4000/items')
        let myItems = items.data.filter(i => i.owned === localStorage.username)
        this.setState({ myItems })
        console.log(this.state.myItems)
    }
    delete = async (e) => {
        const id = e.target.id
        console.log(e.target)
        await Axios.delete(`http://localhost:4000/item/${id}`, function (res) {
            res.end()
        })
        let items = await Axios.get('http://localhost:4000/items')
        let myItems = items.data.filter(i => i.owned === localStorage.username)
        this.setState({ myItems })
        swal("Item deleted")
    }

    render() {
        return (
            <div >
                <h1 className="hs">My Items</h1>
                {this.state.myItems.map(m =>
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
                            </div>
                        </div>
                    </div>
                )}
            </div>




        )
    }
}

export default myItems