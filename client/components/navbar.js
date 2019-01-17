import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFood} from '../store'

class Navbar extends Component {
  componentDidMount() {
    this.props.loadFoodData()
    console.log('food loaded!')
  }

  render() {
    console.log('this.props', this.props)
    const restaurants = this.props.food
    console.log('restaurants', restaurants)
    return (
      <div>
        <h1>NYC Restaurant Inspection Results</h1>
        <nav />
        <hr />
        <h2>Where should my friend eat?</h2>
        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Grade</th>
              <th>Borough</th>
            </tr>
          </thead>
          <tbody>
            {restaurants ? (
              restaurants.map(restaurant => (
                <tr key={restaurant.camis}>
                  <td>{restaurant.dba}</td>
                  <td>{restaurant.inspections[0].grade}</td>
                  <td>{restaurant.boro}</td>
                </tr>
              ))
            ) : (
              <div>No restaurants loaded</div>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    food: state.food
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadFoodData: function() {
      dispatch(fetchFood())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
