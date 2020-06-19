import React, { Component } from "react";
import { analytics } from "../utils/api";
import { randomUrl } from "../utils/Utils";

export default WrappedComponent => class x extends Component {
	tick() {
		analytics({ page: this.props.activePage, type: "alive" }).catch((errors) => {

		});
	}

	componentWillMount() {
		randomUrl();
	}

	componentDidUpdate() {
		clearInterval(this.interval);
		this.interval = setInterval(() => this.tick(), 3000);
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 3000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return <WrappedComponent {...this.props} />;
	}
};