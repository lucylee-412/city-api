import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
            zipcodes: [],
            errorMessage: null,
            isSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({city: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.city === "") {
            alert('Please enter a city');
        }

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
                    const error = response.statusText;
                    return Promise.reject(error);
                }

                return data;
            })
            .then((data) => {
                this.setState({
                    zipcodes: data,
                    errorMessage: null,
                    isSubmitted: true
                });
            })
            .catch(error => {
                this.setState({
                    city: "",
                    zipcodes: [],
                    errorMessage: "No results",
                    isSubmitted: true
                });
            });
    }

    render() {
        const {zipcodes} = this.state;

        const renderZip = () => {
            if (this.state.errorMessage !== "No results") {
                return <div className='container'>
                    <div className='container-top'>Zip Codes Associated With This City:</div>
                    <ul>
                        {zipcodes.map((zip) => (
                            <li key={zip}>{zip}</li>
                        ))}
                    </ul>
                </div>;
            }
            else {
                return <div>{this.state.errorMessage}</div>
            }
        }

        return (
            <>
                <div className='App'>
                    <div className='input-base'>
                        <h1>City Search</h1>
                        <div id='search-field'>
                    <form onSubmit={this.handleSubmit}>
                        <label id='city' name='city'>
                            City:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                        </div>
                    </div>

                {this.state.isSubmitted && renderZip()}
                </div>
            </>
        );
    }
}

export { App };
