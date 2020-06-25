import React, { Component } from 'react'
import landingData from './landingData';
import { NavLink } from 'react-router-dom';

class Slide extends Component {
    state = {
        landing: landingData
    };

    componentWillMount() {
        this.setState({
            landing: landingData[this.props.slider]
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.landing.map((s, index) =>
                    <div className={index === this.props.activeIndex ? 'slide  active' : 'slide'} key={index} style={{
                        backgroundImage: `url(${s.img})`,
                    }}>
                        <div className="container">
                            <div className="caption fix-caption">
                            <h2 className="slide-h2">{s.heading}</h2>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default Slide;