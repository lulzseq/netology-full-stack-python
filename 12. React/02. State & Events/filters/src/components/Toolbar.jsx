import React, { Component } from 'react'

export default class Toolbar extends Component {

    render() {
        const { filters, selected, onSelectFilter } = this.props;

        const button = filters.map((name, index) =>

            <button key={index} className={'button' + (selected === name ? ' selected' : '')}
                onClick={() => { onSelectFilter(name) }}>{name}</button>
        )

        return (
            <div className='buttons'>{button}</div>
        )
    }
}
