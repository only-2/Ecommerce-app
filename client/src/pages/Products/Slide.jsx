import React, { Component } from 'react'
import landingData from './landingData';


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
                    <div className={index === this.props.activeIndex ? 'prod_slide  active' : 'prod_slide'} key={index} style={{
                        backgroundImage: `url(${s.img})`,
                    }}>
                        <div className="prod_container">
                            <div className="prod_caption">
                            <h2>{s.heading}</h2>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default Slide;