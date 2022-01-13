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

        if (this.state.city === "") {
            alert('Please enter a city');
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
                    zipcodes: data,
                    errorMessage: null
                });
            })
            .catch(error => {
                this.setState({ city: "",
                zipcodes: [],
                errorMessage: "No Results"});
            });
    }

    render() {
        const {zipcodes} = this.state;

        return (
            <div className='App'>
                <div className='input-base'>
                    <h1>City Search</h1>
                    <div id='search-field'>
                <form onSubmit={this.handleSubmit}>
                    <label id='city' name='city'>
                        City:
                        <input 
                        type="text" 
                        placeholder = "ex: Brooklyn" 
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        />
                    </label>
                    <span></span>
                    <button type="submit" value="Submit">Submit</button>
                </form>
                </div>
                </div>

                <div>
                    <div className='container'>
                    <div className='container-top'>Zip Codes Associated With This City:</div>
                    <ul>
                        {zipcodes.map((zip) => (

                            <li className='label'>{zip}</li> 

                        ))}

                    </ul>
                    </div>
                    <div>{this.state.errorMessage}</div>
                </div>

            </div>
        );
    }
}

export { App };
