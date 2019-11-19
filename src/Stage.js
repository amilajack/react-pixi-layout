import React from 'react';
import PropTypes from 'prop-types';
import { PixiContext, ReactPixiLayout } from './index';
import Application from './elements/Application';

export default class Stage extends React.Component {

  static propTypes = {
    antialias: PropTypes.bool,
    autoStart: PropTypes.bool,
    backgroundColor: PropTypes.number,
    clearBeforeRender: PropTypes.bool,
    forceCanvas: PropTypes.bool,
    forceFXAA: PropTypes.bool,
    legacy: PropTypes.bool,
    powerPreference: PropTypes.string,
    preserveDrawingBuffer: PropTypes.bool,
    resolution: PropTypes.number,
    roundPixels: PropTypes.bool,
    sharedLoader: PropTypes.bool,
    sharedTicker: PropTypes.bool,
    transparent: PropTypes.bool,
    children: PropTypes.node,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  state = {
    context: {
      application: null
    }
  };

  componentDidMount () {
    const props = { view: this._canvas, ...this.props };

    this._applicationElement = new Application(props);
    this._applicationContainer = ReactPixiLayout.createContainer(this._applicationElement);

    this.setState({ context: { application: this._applicationElement.application } });

    ReactPixiLayout.injectIntoDevTools({
      findFiberByHostInstance: ReactPixiLayout.findFiberByHostInstance,
      bundleType: 1,
      version: '16.8.6',
      rendererPackageName: 'react-pixi-layout'
    });

    ReactPixiLayout.updateContainer(this.wrapProvider(), this._applicationContainer, this);
  }

  componentDidUpdate (prevProps) {
    this._applicationElement.applyProps(prevProps, this.props);

    ReactPixiLayout.updateContainer(this.wrapProvider(), this._applicationContainer, this);
  }

  componentWillUnmount () {
    debugger;

    ReactPixiLayout.updateContainer(null, this._applicationContainer, this);

    this._applicationElement.destroy();
    this._applicationElement = null;
    this._applicationContainer = null;

    if (this.props.onApplication) {
      this.props.onApplication(null);
    }
  }

  wrapProvider () {
    return (
      <PixiContext.Provider value={ this.state.context }>
        { this.props.children }
      </PixiContext.Provider>
    );
  }

  render () {
    return <canvas ref={ ref => this._canvas = ref } />;
  }

}
