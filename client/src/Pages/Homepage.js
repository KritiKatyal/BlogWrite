import React from 'react';
// Components
import AppNavbar from '../Components/AppNavbar'; // Navbvar
import Content from '../Components/Posts'; // Content

// Styles
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
	state = {
		posts: [],
		posts_len: 0
	}
	
	componentWillMount(){
		// fetch content from server in the mean show loading
		fetch("http://localhost:5000/api/posts/all", {method: "GET"}).then((response) => {
			return response.json()
		}).then((response) => {
			response = response.data
			if (response.length >= 1){

				// setting the state
				this.setState({
					posts: response,
					posts_len: 1
				});
			} else {
				this.setState({
					posts_len: -1
				});
			}
		}).catch((error) => {
			// logging the error
			console.log(error);
		})
	}

	render(){
		if (this.state.posts_len === 0){
			return (
				<div>
					<center>
						<AppNavbar />
						<div className="container">
							Loading...
						</div>
					</center>
				</div>
			)
		} else if (this.state.posts_len === -1) {
			return (
				<div>
					<center>
						<AppNavbar />
						<div className="container">
							204 - Post Not Found
						</div>
					</center>
				</div>
			)
		} else {
			return (
				<div>
					<AppNavbar />
					<div className="container">
						{ this.state.posts.map((post_info) => <Content post_info={post_info}/>)}
					</div>
				</div>
			);
		}
	}
}

export default App;
