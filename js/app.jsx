import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

    class SearchBar extends React.Component{
      constructor(props) {
        super(props);

        this.state = {
          searchName: '',
        }
      }

      // handleSubmit=(event) => {
      //   event.preventDefault();
      //    console.log( this.state.searchName );
      // }

      handleChange= (event) => {
        const name = event.target.value;
        function searchNameUpperCase(string){
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        this.setState({
          searchName : searchNameUpperCase(name),
        })
      }


      render() {
        return (
          <div>
              <form onSubmit={this.handleSubmit}>
                  <label>
                      Search for Country:
                      <input type='text' value={this.state.searchName} onChange={this.handleChange}></input>
                    </label>
                    <input type='submit' value='Search'></input>
              </form>
              <CountryInfo></CountryInfo>
          </div>
      )
      }
    }


    class CountryInfo extends React.Component {
        constructor(props){
          super(props);
            this.state = {
                name          : false,
                altSpellings  : false,
                capital       : false,
            };
        }

        componentDidMount(){
            fetch(`https://restcountries.eu/rest/v2/name/${this.state.searchName}`)
                .then( resp => resp.json() )
                .then(data => {
                  if (!data[0]) {
                    this.setState({
                      name : "No such country",
                    })
                  } else {
                    const name = data[0].name;
                    const altSpellings = data[0].altSpellings;
                    const capital = data[0].capital;
                    console.log(name);
                    this.setState({
                      name,
                      altSpellings,
                      capital,
                    });
                  }

              });
        }

        render() {
            if (this.state.name === false){
                return null;
            }

            return (
              <div>
                <p>Country: {this.state.name}</p>
                <p>Alternative spellings: {this.state.altSpellings}</p>
                <p>Capital: {this.state.capital}</p>
              </div>
            );
        }
    }

    ReactDOM.render(
      <div>
        <SearchBar></SearchBar>

        </div>,
        document.querySelector('#app')
    );
});
