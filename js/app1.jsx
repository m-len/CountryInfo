import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

        class CountryApp extends React.Component {
              constructor(props) {
                super(props);
                this.state = {
                  name: undefined,
                  capital : undefined,
                  altSpellings : undefined,
                  region : undefined,
                  population : undefined,
                  timezones : undefined,

                };
              };


              static defaultProps = {
                name: 'Colombia',
              };


              _getCountryInfo = (name) => {
                const main = this;
                let query = null;
                main.setState({
                    infoStatus: 'loading'
                });
                if (!name || name == '') {
                  query = this.props.name;
                } else {
                  query = name;
                }
                fetch(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`)
                .then( function(response) {
                  return response;
                })
                .then( function(response) {
                  setTimeout( function() {
                    main.setState({
                    infoStatus: 'loaded'
                  });
                  }, 300);
                  return response.json();
                })
                .then( function(data) {
                  main.setState({
                    name: data[0].name,
                    capital : data[0].capital,
                    altSpellings : data[0].altSpellings,
                    region : data[0].region,
                    population : data[0].population,
                    timezones : data[0].timezones,

                  });
                })
                .catch( function() {
                  main.setState({
                    infoStatus: 'error'
                  });
                })
              };


              componentWillMount() {
                this._getCountryInfo();
              };


              _handleSubmit = (event) => {
                event.preventDefault();
                this._getCountryInfo(event.target.search.value);
              };


              render() {
                const {
                  name,
                  capital,
                  altSpellings,
                  region,
                  population,
                  timezones,
                  infoStatus
                } = this.state;
                let data = null;
                if (infoStatus == 'loaded') {
                  data = <div className="CountryInfo">
                      <div className="countryName">
                        <div>{name} <span></span></div>
                      </div>
                      <div className="countryInfo">
                        <div>Capital: <span> {capital}</span></div>
                        <div>Alternative Names: <span> {altSpellings[0]}, {altSpellings[1]}, {altSpellings[2]} </span></div>
                        <div>Region: <span> {region}</span></div>
                        <div>Population: <span> {population}</span></div>
                        <div>Timezones: <span> {timezones}</span></div>
                      </div>
                    </div>
                } else if (infoStatus == 'loading') {
                  data = <div className="info loading">Loading country data...</div>
                } else if (infoStatus == 'error') {
                  data = <div className="info error">Error while loading country data. Try again later.</div>
                }
                return (
                  <div className="CountryApp">
                    <div className="CountryQuery">
                      <form onSubmit={this._handleSubmit}>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search a Country..."
                        />
                      </form>
                    </div>
                    {data}
                  </div>
                );
              };
              }

ReactDOM.render(<CountryApp />, document.getElementById('app'));
});
