import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// let city = this.input.value
// city.toUpperCase()

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zipcode: "",
            cities: [],
            errorMessage: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({zipcode: event.target.value});
    }

    handleSubmit(event) {
        if (!isZipCode(this.state.zipcode)) {
            alert(this.state.zipcode + ' is not a zip code.');
        }

        event.preventDefault();

        fetch(`http://ctp-zip-api.herokuapp.com/zip/${(this.state.zipcode)}`)
            .then(async response => {
                const data = await response.json();

                console.log(data)
                console.log(data[0].LocationText)

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                return data;
            })
            .then((data) => {
                this.setState({
                    cities: data
                });
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const {cities} = this.state;

        return (
            <>
            <form onSubmit={this.handleSubmit}>
                <label>
                    City:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            <div>
                {cities.map((city) => (
                    <ul key = {city.LocationText}>
                    <li>State: {city.State}</li>
                    <li>Location: {city.Lat}, {city.Long}</li>
                    <li>Population: {city.EstimatedPopulation}</li>
                    <li>Total Wages: {city.TotalWages}</li>
                    </ul>
                ))}
            </div>
            </>
        );
    }
}

export { App };
