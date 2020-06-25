import React, { Component } from 'react'
import landingData from './landingData';
import { NavLink } from 'react-router-dom';

class Slide extends Component {
    state = {
        landing: landingData
    };

    componentWillMount() {
        const val = landingData[this.props.slider];
        // this.props.setLength(val.length)
        this.setState({
            landing: val
        })
        // console.log(landingData[key].length)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.landing.map((s, index) =>
                    <div className={index === this.props.activeIndex ? 'slide  active' : 'slide'} key={index} style={{
                        backgroundImage: `url(${s.img})`,
                    }}>
                        <div className="container">
                            <div className="caption">
                                <h2>{s.heading}</h2>
                                <p>{s.desc}</p>
                                <NavLink exact to='/viewCart'>Shop Now</NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default Slide;