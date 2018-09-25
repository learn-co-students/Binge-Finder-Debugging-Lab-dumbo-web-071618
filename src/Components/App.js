import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
	state = {
		shows: [],
		searchTerm: "",
		selectedShow: "",
		episodes: [],
		filterByRating: "",
	}

	componentDidMount = () => {
		Adapter.getShows().then(shows => {
			console.log(shows)
			this.setState({shows: shows})
		})
	}

	componentDidUpdate = () => {
		window.scrollTo(0, 0)
	}

	handleSearch = (e) => {
		this.setState({ searchTerm: e.target.value.toLowerCase() })
	}

	handleFilter = (e) => {
		!e.target.value ? this.setState({ filterByRating:"" }) : this.setState({ filterByRating: e.target.value})
	}

	selectShow = (show) => {
		console.log(show)
		Adapter.getShowEpisodes(show.id)
			.then( (episodes) => {
					console.log(episodes)
					this.setState({
						selectedShow: show,
						episodes: episodes
					}
				)}
			)
	}

	displayShows = () => {
		console.log(this.state)
		let filteredShows = this.filterShows()
		return this.state.searchTerm ? this.displayBySearchTerm(filteredShows) : filteredShows
	}

	displayBySearchTerm = (shows) => {
		return shows.filter( s => {
			return s.name.toLowerCase().includes(this.state.searchTerm)
		})
	}

	filterShows = () => {
		if (this.state.filterByRating) {
			return this.state.shows.filter((s) => {
				return s.rating.average >= parseInt(this.state.filterByRating)
			})
		} else {
			return this.state.shows
		}
	}

	render (){
		return (
			<div>
				<Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
				<Grid celled>
					<Grid.Column width={5}>
						{!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
					</Grid.Column>
					<Grid.Column width={11}>
						<TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default App;
