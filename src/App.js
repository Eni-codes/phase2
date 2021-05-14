import React, { Component } from 'react'
import { Route, Switch, Link}  from 'react-router-dom'
import './App.css';
import CardContainer from './components/CardContainer'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar'
import { SignalCellularNull } from '@material-ui/icons';

// import {Cards} from './components/Cards'

const BASE_URL = "http://localhost:3000/restaurants"


export default class App extends Component {

 state = {
   restaurants:[],
   display: "NavBar",
   filter: "All",
   searchText: ""
 }
 

componentDidMount(){
    fetch(BASE_URL)
  .then(res => res.json())
  .then(restaurants => this.setState({
    
    restaurants : restaurants
   }))
 }
   handleSearchtext = (text) =>{
  this.setState({searchText: text})
}

changeFilter = (filter) => this.setState({filter: filter})

cardsDisplay = () => {
  let displayCards = [...this.state.restaurants]
  if(this.state.filter !== "All"){
    displayCards= this.state.restaurants.filter(restaurant => restaurant.Location === this.state.filter )
    return displayCards.filter(restaurant => restaurant.Name?.toLowerCase().includes(this.state.searchText))} 
  // displayCards ( searchText = (text) => text.Name.toLowerCase().includes(this.state.searchText))
// }
  else {
// debugger
  return displayCards.filter (restaurant => restaurant.Name?.toLowerCase().includes(this.state.searchText))
}
}


// filterRestaurant = ()=> {
//   const allFiltered = this.state.restaurants.filter(restaurant => restaurant.Name.includes(this.state.searchText))
//   return allFiltered
// }
  // const filteredRestaurants = this.state.restaurants.filter(restaurantObj => restaurantObj.Name.includes(this.state.searchText.toLowerCase()) || restaurantObj.Name.toLowerCase().includes(this.state.searchText.toLowerCase()))
  
  render () {
     console.log (this.cardsDisplay())
   return (
    <div className="App">
      <NavBar/>
    <Switch>
      <Route path="/restaurants">
      <CardContainer changeFilter={this.changeFilter} restaurants ={this.cardsDisplay()} handleSearchtext ={this.handleSearchtext}/>
      </Route>
    </Switch>
    <Route path="/" component ={Home} />
   
    </div>
   )
  }
}
