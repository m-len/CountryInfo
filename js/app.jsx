import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
    class BookInfo extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                name : false,
            };
        }

        componentDidMount(){
            fetch(`https://restcountries.eu/rest/v2/name/${this.props.countryName}`)
                .then( resp => resp.json() )
                .then(data => {
                  if (!data[0]) {
                    this.setState({
                      name : "No such country",
                    })
                  } else {
                    const name= data[0].name;
                    console.log(name);
                    this.setState({
                      name,
                    });
                  }

              });
        }

        render() {
            if (this.state.name === false){
                return null;
            }

            return <h1>{this.state.name}</h1>;
        }
    }

    ReactDOM.render(
        <BookInfo countryName="Colombia"/>,
        document.querySelector('#app')
    );
});
