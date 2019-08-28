import React, { Component } from 'react';
import Axios from 'axios';

class last10Items extends Component {
    constructor() {
        super()
        this.state = {
            items: []
        }
    this.getItems()
    }

    specificitemId=(e)=>{
        let id = e.target.id
        this.props.specificitemId(id)
    }

    getItems = async () => {
        let data = await Axios.get("http://localhost:4000/items")
        let items = data.data
        this.setState({ items })
    }
    render() {

        return (
            <div id="cssSlider">
                <div id="sliderImages" >
                    {this.state.items.map(i =>  <img  onClick={this.specificitemId} src={i.image} id={i._id} alt="" />)}
                    <div style={{ clear: "left" }}></div>
                </div>
            </div>

        )
    }
}

export default last10Items