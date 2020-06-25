import React, { Component } from 'react';
import Slide from './Slide';
import landingData from './landingData';
import '../../index.css';
class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeIndex: 0,
          length: landingData.length,
          interval:null
        };
      }
      componentDidMount(){
        this.autoplay();
      }
      componentWillUnmount(){
        clearInterval(this.interval);
      }
    
      autoplay = ()=>{
        setTimeout(this.goToNextSlide(),4000);
      }
      goToPrevSlide = ()=> {
        let index = this.state.activeIndex;
        let length = this.state.length;
        if (index < 1) {
          index = length - 1;
        }
        else {
          index--;
        }
        this.setState({
          ...this.state,
          activeIndex: index
        });
        clearInterval(this.interval);
        this.interval = setInterval(this.autoplay,4000);
      }
    
      goToNextSlide = ()=> {
        let index = this.state.activeIndex;
        // console.log(index);
        let length = this.state.length;
        // console.log(length);
    
        if (index === length - 1) {
          index = 0
        }
        else {
          index++;
        }
        this.setState({
          ...this.state,
          activeIndex: index
        });
        clearInterval(this.interval);
        this.interval = setInterval(this.autoplay,4000);
      }
    
      render() {
        // console.log(this.state.activeIndex);
        // console.log(this.state.length);
        
        
        return (
          <React.Fragment>
            <div className="home">
              <Slide activeIndex={this.state.activeIndex} />
              <div className="controls">
                <div className="prev" onClick={this.goToPrevSlide}>
                  <i className="fas fa-angle-left"></i>
                </div>
                <div className="next" onClick={this.goToNextSlide}>
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </React.Fragment>
    
        );
      }
}
 
export default Slider;