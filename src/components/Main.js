import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import * as FoursquareAPI from './../services/FoursquareAPI';

/**
 * Handle Google Maps JavaScript API errors.
 */
document.addEventListener('DOMcontentLoaded', e => {
    let script = document.getElementsByTagsName('script')[1];
    script.onerror = e => {
        console.error('Google Maps JavaScript API doesn’t work right now.');
        let parent = document.getElementById('root');
        let child = document.createElement('div');
        child.innerHTML = '<p>Sorry, Google Maps JavaScript API doesn’t work right now.</p>';
        parent.appendChild(child);
    }
});

class Main extends Component {
    /**
     * Set an empty state for `locations` and `details`.
     */
    state = {
        locations: '',
        likes: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    /**
     * Set initial state as `locations: 'all'`.
     */
    componentDidMount() {
        this.setState({ locations: 'all' });
    }

    /**
     * Filter locations on user input.
     */
    filterLocations = location => {
        this.setState({
            locations: location,
            showingInfoWindow: false,
            activeMarker: null
        });
    }

    /**
     * Hide the active InfoWindow on user input.
     */
    onMapClicked = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    /**
     * Show an InfoWindow for the marker on user input.
     */
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });

        let id;
        if (this.state.selectedPlace.name === 'Epicuro') {
            id = '50a6c6b8e4b00084f2bda94e';
        } else if (this.state.selectedPlace.name === 'Twiggy Cafè') {
            id = '4bb1ed21f964a52030ab3ce3';
        } else if (this.state.selectedPlace.name === 'Cinema Teatro Nuovo') {
            id = '4cdef8d9ffcf37041c741682';
        } else if (this.state.selectedPlace.name === 'Multisala Impero Varese') {
            id = '4c83b0c82f1c236a81c44443';
        } else if (this.state.selectedPlace.name === 'Fabbrica Pizza') {
            id = '4c93a042a25fef3b17591323';
        } else if (this.state.selectedPlace.name === 'La Paranza') {
            id = '4d56fe08143ca0932e8ac2fc';
        }

        /**
         * Get likes from Foursquare API
         */
        FoursquareAPI.getLikes(id)
            .then(likes => {
                this.setState({
                    likes: likes
                });
            });
    }

    render() {
        const { google } = this.props;

        /**
         * Bars in Varese, Italy.
         */
        const bars = [
            {
                key: '50a6c6b8e4b00084f2bda94e',
                name: 'Epicuro',
                position: {
                    lat: 45.8208798,
                    lng: 8.8260072
                },
                title: 'via Carlo Cattaneo, 12'
            },
            {
                key: '4bb1ed21f964a52030ab3ce3',
                name: 'Twiggy Cafè',
                position: {
                    lat: 45.8216388,
                    lng: 8.8313047
                },
                title: 'via Carlo De Cristoforis, 15'
            }
        ];

        /**
         * Cinemas in Varese, Italy.
         */
        const cinemas = [
            {
                key: '4cdef8d9ffcf37041c741682',
                name: 'Cinema Teatro Nuovo',
                position: {
                    lat: 45.8243427,
                    lng: 8.8353508
                },
                title: 'viale dei Mille, 39'
            },
            {
                key: '4c83b0c82f1c236a81c44443',
                name: 'Multisala Impero Varese',
                position: {
                    lat: 45.8165071,
                    lng: 8.8268493
                },
                title: 'via Giuseppe Bernascone, 13'
            }
        ];

        /**
         * Restaurants in Varese, Italy.
         */
        const restaurants = [
            {
                key: '4c93a042a25fef3b17591323',
                name: 'Fabbrica Pizza',
                position: {
                    lat: 45.819079,
                    lng: 8.82607
                },
                title: 'via Giuseppe Ferrari, 5'
            },
            {
                key: '4d56fe08143ca0932e8ac2fc',
                name: 'La Paranza',
                position: {
                    lat: 45.8179862,
                    lng: 8.8311692
                },
                title: 'via Emilio Morosini, 13'
            }
        ];

        return (
            <main className="app__content">
                <aside className="app__content__sidebar">
                    <h1 className="app__content__sidebar__name">Neighborhood Map</h1>
                    <select
                        className="app__content__sidebar__filter"
                        onChange={ e => this.filterLocations(e.target.value) }
                        value={ this.state.locations || 'all' }
                    >
                        <option disabled value="">Filter…</option>
                        <option value="all">All</option>
                        <option value="bars">Bars</option>
                        <option value="cinemas">Cinemas</option>
                        <option value="restaurants">Restaurants</option>
                    </select>
                </aside>
                <section aria-label="Map of Varese, Italy" className="app__content__section" role="presentation">
                    <Map
                        className="app__content__section__map"
                        google={ google }
                        initialCenter={{
                            lat: 45.8208649,
                            lng: 8.8281438
                        }}
                        onClick={ this.onMapClicked }
                        zoom={ 15 }
                    >
                        {
                            this.state.locations === 'bars' || this.state.locations === 'all' ? bars.map(bar => (
                                <Marker
                                    animation={ this.state.activeMarker ? (bar.name === this.state.activeMarker.name ? 1 : 0) : 0 }
                                    key={ bar.key }
                                    name={ bar.name }
                                    onClick={ this.onMarkerClick }
                                    position={ bar.position }
                                    title={ bar.title }
                                />
                            )) : null
                        }
                        {
                            this.state.locations === 'cinemas' || this.state.locations === 'all' ? cinemas.map(cinema => (
                                <Marker
                                    animation={ this.state.activeMarker ? (cinema.name === this.state.activeMarker.name ? 1 : 0) : 0 }
                                    key={ cinema.key }
                                    name={ cinema.name }
                                    onClick={ this.onMarkerClick }
                                    position={ cinema.position }
                                    title={ cinema.title }
                                />
                            )) : null
                        }
                        {
                            this.state.locations === 'restaurants' || this.state.locations === 'all' ? restaurants.map(restaurant => (
                                <Marker
                                    animation={ this.state.activeMarker ? (restaurant.name === this.state.activeMarker.name ? 1 : 0) : 0 }
                                    key={ restaurant.key }
                                    name={ restaurant.name }
                                    onClick={ this.onMarkerClick }
                                    position={ restaurant.position }
                                    title={ restaurant.title }
                                />
                            )) : null
                        }
                        <InfoWindow
                            marker={ this.state.activeMarker }
                            visible={ this.state.showingInfoWindow }
                        >
                            <div>
                                <h2>{ this.state.selectedPlace.name }</h2>
                                <p>{ this.state.selectedPlace.title }</p>
                                <p>Likes: { this.state.likes } (powered by <a href="https://developer.foursquare.com/">Foursquare</a>)</p>
                            </div>
                        </InfoWindow>
                    </Map>
                </section>
            </main>
        );
    }
}

/**
 * Initialize Google Maps JavaScript API.
 */
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCqLjHpxjIttLIx0h865-RDzkvnRdSn73E'
})(Main);