import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './components/Login';
import Items from './components/Items';
import Sidebar from './components/sidebar';
import MyItems from './components/myItems';
import AddItem from './components/addItem';
import Favorites from './components/Favorites';
import UserEdit from './components/UserEdit';
import Last10Items from './components/last10Items';
import SpecificItem from './components/SpecificItem';
import Chats from './components/Chats';
import Message from './components/Message';

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      logged: localStorage.username,
      messageId: "",
      itemId: false,
    }
  }

  specificitemId = (id) => {

    this.setState({ itemId: id })

  }


  changeLogged = () => {
    const status = localStorage.username
    this.setState({
      logged: status
    })
  }
  logout = () => {
    localStorage.clear()
    const status = undefined
    this.setState({
      logged: status
    })
    window.location.replace("http://localhost:3000")
  }
  getIdForMessage = (id) => {
    this.setState({
      messageId: id
    })
  }


  render() {
    return (
      <Router>
        <div className="row" >
          <div className="center-align col s1  #e3f2fd blue lighten-5" >
            <Sidebar logged={this.state.logged} logout={this.logout} />
          </div>

          <div className="col s10" ><h3 >One Man's Trash Is Another Man's Treasure</h3></div>

          <div className="col s1" >
            <a href="http://localhost:3000" ><img src="https://a.imge.to/2019/08/22/mgkcF.png" width="100"></img></a>
          </div>
        </div>
        <Route path="/" exact render={() => <div className="row center-align "  >
          <div className="col s2" ></div>
          <div className="col s6" >
          <Route path="/" exact render={() => <Last10Items specificitemId={this.specificitemId} />} />
          </div>
        </div>} />
        {this.state.logged === undefined ? <Route path="/loggin" exact render={() => <Login changeLogged={this.changeLogged} />} /> : null}
        {this.state.logged === undefined ? <Route path="/myItems" exact render={() => <Login changeLogged={this.changeLogged} />} /> : <Route path="/myItems" exact render={() => <MyItems />} />}
        {this.state.logged === undefined ? <Route path="/addItem" exact render={() => <Login changeLogged={this.changeLogged} />} /> : <Route path="/addItem" exact render={() => <AddItem />} />}
        {this.state.logged === undefined ? <Route path="/favorites" exact render={() => <Login changeLogged={this.changeLogged} />} /> : <Route path="/favorites" exact render={() => <Favorites  getIdForMessage={this.getIdForMessage} />} />}
        {this.state.logged === undefined ? <Route path="/useredit" exact render={() => <Login changeLogged={this.changeLogged} />} /> : <Route path="/useredit" exact render={() => <UserEdit />} />}
       {this.state.itemId? <Redirect to ="/item" />: null } 
       <Route path="/item" exact render={() => <SpecificItem getIdForMessage={this.getIdForMessage} id={this.state.itemId} />} />
        {this.state.logged === undefined ? <Route path="/chats" exact render={() => <Login changeLogged={this.changeLogged} />} /> : <Route path="/chats" exact render={() => <Chats />} />}
        {this.state.logged === undefined ? <Route path="/message" exact render={() => <Login changeLogged={this.changeLogged} />} /> : <Route path="/message" exact render={() => <Message id={this.state.messageId} />} />}
        <Route path="/" exact render={() => <Items getIdForMessage={this.getIdForMessage} />} />
      </Router>
    )
  }
}
export default App