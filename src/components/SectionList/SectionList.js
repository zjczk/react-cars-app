import React, { Component } from 'react';

import Section from '../Section/Section';
import './SectionList.css'; 

class SectionList extends Component {

    renderSections = () => {
        return this.props.sections.map((section, index) => 
            <li key={index}>
             <Section
            name={section}
            click={() => this.props.clicked(index)}
            />
            </li>);
    }

    render() {
        return(
            <ul className="SectionList">
            <p className="Message">{this.props.message}</p>
            {this.renderSections()}
            </ul>
        );
    }
}

export default SectionList;
