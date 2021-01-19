import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' }; // constructor isnt necessary

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(  // Location
            (position) => this.setState({ lat: position.coords.latitude }), // we called setState!!!!
            (err) => this.setState({ errorMessage: err.message })
            
        );
    }

    componentDidUpdate() {
        console.log('MY COMPONENT WAS JUST UPDATED - IT RERENDERED!');
    }

    renderContent() { //conditional rendering!
        if (this.state.errorMessage && !this.state.lat) { // if we have an error message and we do not have a latitude 
            return <div>Error: {this.state.errorMessage}</div>
            }
    
            if (!this.state.errorMessage && this.state.lat) { // if i do not have an error message and i have a latitude
            return <SeasonDisplay lat={this.state.lat}/>
            }
    
            return <Spinner message="Please accept location request"/>;  // if the first two conditions arent met, this will print
    }

    //React says we have to define render
    render() { 
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));