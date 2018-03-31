import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
      match:  PropTypes.object
    };

    componentDidMount(){
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    };

    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.storeId,   JSON.stringify(this.state.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // Take a copy of the existing fishes
        const fishes = { ...this.state.fishes };
        // Add our new fish to their fishes variable
        fishes[`fish${ Date.now() }`] = fish;
        // Set the new fishes object to the state;
        // FYI, if the property and values are same we can just write
        // property. e.g. { fishes: fishes } is equal to  { fishes }
        this.setState({
           fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        //1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. Nullify the fish we want to delete
        fishes[key] = null;
        //3. Set the state to fishes
        this.setState({
            fishes: fishes
        });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        // Take a copy of state
        const order = { ...this.state.order };
        // Either add to the order or update the number in our order
        order[key] = order[key] + 1 || 1;
        // Call setState to update our state object
        this.setState({
            order: order
        });
    };

    removeFromOrder = (key) => {
        // Take a copy of state
        const order = { ...this.state.order };
        // Either add to the order or update the number in our order
        delete order[key];
        // Call setState to update our state object
        this.setState({
            order: order
        });
    };

    render(){
        return(
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline='Validating header' />
                    <ul className='fishes'>
                        {
                            Object.keys(this.state.fishes).map(key => {
                                return(
                                    <Fish key={key} index={key}
                                          details={this.state.fishes[key]}
                                          addToOrder={ this.addToOrder }/>
                                )
                            })
                        }
                    </ul>
                </div>

                <Order fishes={this.state.fishes}
                       order={this.state.order}
                       removeFromOrder={this.removeFromOrder}/>
                <Inventory  addFish={this.addFish}
                            loadSampleFishes={this.loadSampleFishes}
                            fishes={ this.state.fishes }
                            updateFish={this.updateFish}
                            deleteFish={this.deleteFish}
                            storeId={this.props.match.params.storeId}/>
            </div>
        )
    }
}

export default App;