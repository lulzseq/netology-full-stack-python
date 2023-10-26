import React, { Component } from 'react';

export default class ProjectList extends Component {
    render() {
        const { projects } = this.props;
        const projectItem = projects.map((item, index) => (
            <div key={index} className='project'>
                <img src={item.img} alt={item.category} />
            </div>
        ));

        return (
            <div className='projects'>
                {projectItem}
            </div>
        );
    }
}
