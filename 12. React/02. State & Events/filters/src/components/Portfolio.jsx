import React, { Component } from 'react';
import Toolbar from './Toolbar';
import ProjectList from './ProjectList';
import jsonData from '../assets/data.json';

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: 'All',
            projects: jsonData
        };
    }

    handleFilter = (filter) => {
        const filteredProjects = filter === 'All'
            ? jsonData
            : jsonData.filter(item => item.category === filter);

        this.setState({
            selectedFilter: filter,
            projects: filteredProjects
        });
    };

    render() {
        const filters = ["All", "Websites", "Flayers", "Business Cards"];

        return (
            <>
                <Toolbar
                    filters={filters}
                    selected={this.state.selectedFilter}
                    onSelectFilter={this.handleFilter}
                />
                <ProjectList projects={this.state.projects} />
            </>
        );
    }
}
