import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./search-bar";
import VideoDetail from "./video-detail";
const API_KEY = "AIzaSyAcwQhZEYnOhmMFto1sPU61VHTE3TG4oKQ";

class Video extends Component {
	constructor(props){
		super(props);
		this.state = {
			video: [],
			selectedVideo: null
		};
		this.videoSearch("bucketlist");
	}
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 1800);
		return(
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
			</div>
		);
	}
}

export default Video;