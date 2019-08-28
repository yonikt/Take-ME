import React, { Component } from 'react';
import axios from 'axios'
import { storage } from '../config/fire'
import swal from 'sweetalert';
class addItem extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            category: "",
            condition: "",
            location: "",
            description: "",
            image: null,
            url: '',
            progress: 0
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }
    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }
    handleUpload = () => {
        if (this.state.image !== null) {
            const { image } = this.state;
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ url });
                    })
                });
        } else {
            swal("Please Upload An Image!", {
                buttons: false,
                timer: 1000,
            });
        }
    }


    update = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    addNewItem = async () => {
        let url
        if (this.state.url === "") {
            url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
        } else { url = this.state.url }
        const username = localStorage.username
        let users = await axios.get('http://localhost:4000/users')
        users = users.data
        const result = users.find(d => d.username === username)
        const phone = result.phone
        const name = result.name
        const item = {
            owned: localStorage.username,
            title: this.state.title,
            category: this.state.category,
            condition: this.state.condition,
            location: this.state.location,
            description: this.state.description,
            image: url,
            phone,
            name,
            date: new Date()
        }
        if (this.state.condition !== "" && this.state.category !== "" && this.state.title !== "" && this.state.location !== "" && this.state.description !== "") {

            return axios.post("http://localhost:4000/item", item)
                .then(res => { console.log(res.data) }).then(window.location.reload())
        } else { swal("Please fill in all fields !") }
    }

    render() {
        return (
            <div>
                <h1 className="hs">Add New Item - It's Easy!</h1>
                <div className="row">
                    <div className="col s3" ></div>
                    <div className="panels col s6 ">

                        <label for="fname">Item Name</label>
                        <input onChange={this.update} name="title" value={this.state.title} type="text" ></input>

                        <label for="fname">Location</label>
                        <input onChange={this.update} name="location" value={this.state.location} type="text" ></input>

                        <label for="fname">Description</label>
                        <input onChange={this.update} name="description" value={this.state.description} type="text" ></input>


                        <label for="lname">Item Category</label>



                        <select class="browser-default col s12" type='select-one' onChange={this.update} name="category">

                            <option value="">Choose Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Mobile Phones">Mobile Phones</option>
                            <option value="Furnitures">Furnitures</option>
                            <option value="Books">Books</option>
                            <option value="Home Appliances">Home Appliances</option>
                            <option value="Others">Others</option>
                        </select>
                        <br></br>
                        <label for="country">Item Condition</label>
                        <select class="browser-default col s12" type='select-one' onChange={this.update} name="condition">

                            <option value="">Choose Condition</option>
                            <option value="Good As New">Good As New</option>
                            <option value="Good Enough">Good Enough</option>
                            <option value="Very Used">Very Used</option>
                        </select>


                        <div className="center-align" >
                            <br />
                            <input id="file-input" type="file" onChange={this.handleChange} />   <button id="upload" className="btn waves-effect waves-light" onClick={this.handleUpload}>Upload</button>
                            <br></br> <progress id="progress" value={this.state.progress} max="100" />

                            <br />
                            <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
                        </div>
                        <button id="add" class="btn waves-effect waves-light" onClick={this.addNewItem}>Add New Item </button>



                    </div>
                </div >
            </div>
        )
    }
}
export default addItem