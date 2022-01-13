import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
            zipcodes: [],
            errorMessage: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({city: event.target.value});
        //NEW20%YORK
    }

    handleSubmit(event) {
        event.preventDefault();

        const city = this.state.city;
        const cityArr = city.toUpperCase().split("")

        // Replace all spaces with %20 for URL
        for (let char = 0; char < cityArr.length; char++) {
            if (cityArr[char] === " ") {
                cityArr.splice(char, 1, "%20");
            }
        }

        const cityURL = cityArr.join('');

        fetch(`http://ctp-zip-api.herokuapp.com/city/${cityURL}`)
            .then(async response => {
                const data = await response.json();

                console.log(data)
                console.log(data[0])

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
                    zipcodes: data
                });
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const {zipcodes} = this.state;

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        City:
                        <input type="text" placeholder = "ex: Brooklyn" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <div>
                    <ul>Zip Codes Associated With This City:
                        {zipcodes.map((zip) => (
                            <li>{zip}</li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
}

export { App };
