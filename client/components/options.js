import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setOptions, setStations} from '../store';
import stops from '../data/subway-stops';


class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numStops: props.numStops,
      walkingDistance: props.walkingDistance
    };

    this.handleNumStopsMinus = this.handleNumStopsMinus.bind(this);
    this.handleNumStopsPlus = this.handleNumStopsPlus.bind(this);
    this.handleWalkingDistanceMinus = this.handleWalkingDistanceMinus.bind(this);
    this.handleWalkingDistancePlus = this.handleWalkingDistancePlus.bind(this);
    this.handlePanelContainerClick = this.handlePanelContainerClick.bind(this);
  }

  handleOptionsButtonClick() {
    document.getElementById('options-panel-container').classList
      .add('options-panel-container-active');
  }

  handlePanelContainerClick() {
    document.getElementById('options-panel-container').classList
      .remove('options-panel-container-active');

    this.props.dispatchSetOptions(this.state);
    if (this.props.homeStation) {
      this.props.dispatchSetStations(this.props.homeStation, this.props.line,
        this.state.numStops, stops);
    }
  }

  stopClickPropagation(evt) {
    evt.stopPropagation();
  }

  handleWalkingDistanceMinus() {
    if (this.state.walkingDistance > 0.2) { //.2 to fix math bug
      this.setState({
        walkingDistance: this.state.walkingDistance - 0.1
      });
    }
  }

  handleWalkingDistancePlus() {
    this.setState({
      walkingDistance: this.state.walkingDistance + 0.1
    });
  }

  handleNumStopsMinus() {
    if (this.state.numStops > 1) {
      this.setState({
        numStops: this.state.numStops - 1
      });
    }
  }

  handleNumStopsPlus() {
    this.setState({
      numStops: this.state.numStops + 1
    });
  }

  render() {
    return (
      <div>
        <div className="options-button" onClick={this.handleOptionsButtonClick}>
          <img src="images/settings-work-tool.png" />
        </div>
        <div
          id="options-panel-container"
          className="options-panel-container"
          onClick={this.handlePanelContainerClick}>
          <div
            className="options-panel"
            onClick={this.stopClickPropagation}>
            <div className="num-stops-option">
              <div className="option-title"><strong>Number of stops</strong></div>
              <div className="option-buttons">
                <div
                  className="option-button"
                  onClick={this.handleNumStopsMinus}>-</div>
                {this.state.numStops}
                <div
                  className="option-button"
                  onClick={this.handleNumStopsPlus}>+</div>
              </div>
            </div>
            <div className="walking-distance-option">
              <div className="option-title"><strong>Walking distance</strong></div>
              <div className="option-buttons">
                <div
                  className="option-button"
                  onClick={this.handleWalkingDistanceMinus}>-</div>
                {this.state.walkingDistance.toFixed(1)} mi
            <div
                  className="option-button"
                  onClick={this.handleWalkingDistancePlus}>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    homeStation: state.homeStation,
    line: state.activeLine,
    numStops: state.options.numStops,
    walkingDistance: state.options.walkingDistance
  };
};

const mapDispatch = dispatch => {
  return {
    dispatchSetOptions: options => {
      dispatch(setOptions(options));
    },
    dispatchSetStations: (homeStation, line, numStops, stops) => {
      dispatch(setStations(homeStation, line, numStops, stops));
    }
  };
};

export default connect(mapState, mapDispatch)(Options);

