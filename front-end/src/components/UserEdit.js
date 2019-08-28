import React, { Component } from 'react';
import { storage } from '../config/fire'
import swal from 'sweetalert';
import Axios from 'axios';


class UserEdit extends Component {
    constructor() {
        super()
        this.state = {
            user: {},
            username: "",
            password: "",
            name: "",
            phone: "",
            image: null,
            imageurl: "",
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
                        this.setState({ imageurl: url });
                    })
                });
        } else {
            swal("Please Upload An Image!", {
                buttons: false,
                timer: 1000,
            });
        }
    }



    componentWillMount = async () => {
        let users = await Axios.get("http://localhost:4000/users")
        let user = users.data.find(u => u.username === localStorage.username)
        this.setState({ user, imageurl: user.userimage })
    }

    updateUser = async () => {
        let data = await Axios.get('http://localhost:4000/users')
        data = data.data
        let user = this.state.user
        let username = this.state.username
        let name = this.state.name
        let phone = this.state.phone
        let password = this.state.password
        let image = this.state.imageurl
        if (data.find(d => d.username === username.toLowerCase()) === undefined) {
            if (name == "") {
                name = user.name
            }
            if (username == "") {
                username = user.username
            }
            if (password == "") {
                password = user.password
            }
            if (phone == "") {
                phone = user.phone
            }
            if (image == "") {
                image = user.userimage
            }
            let update = {
                username: username.toLowerCase(),
                name: name,
                password: password,
                phone: phone,
                userimage: image
            }
            await Axios.put(`http://localhost:4000/user/${user._id}`, update)
            await swal(`updtae completed ! username: ${username},
            full name: ${name},
            password: ${password},
            phone: ${phone} `)
            localStorage.username = username
            window.location.reload()
        } else { swal("user name is alredy taken!") }

    }

    updateState = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }



    render() {
        let user = this.state.user
        return (
            <div>
                    <h1 className="hs">Edit Your Profile</h1>
                <div className="row" >
                    <div className="col s3"></div>
                    <div className="panels col s6">

                        <span > Full Name: </span><input className="popupText" type="text" name="name" placeholder={user.name} onChange={this.updateState} />

                        <span >Phone number:</span><input className="popupText" type="text" name="phone" placeholder={user.phone} onChange={this.updateState} />

                        <span >Username:</span><input className="popupText" type="text" name="username" placeholder={user.username} onChange={this.updateState} />


                        <span>Password:</span><input className="popupText" type="text" name="password" placeholder={user.password} onChange={this.updateState} />




                        <div className="center-align" >
                            <br />
                            <input id="file-input" type="file" onChange={this.handleChange} />   <button id="upload" className="btn waves-effect waves-light" onClick={this.handleUpload}>Upload</button>
                            <br></br> <progress id="progress" value={this.state.progress} max="100" />

                            <br />
                            <img src={this.state.imageurl} alt="Uploaded images" height="150" width="200" />
                        </div>

                        <button onClick={this.updateUser} >Update Profile</button>



                    </div>
                </div >
            </div>



        )
    }
}

export default UserEdit