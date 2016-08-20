import React from 'react';
import Scanner from './Scanner';

export default class App extends React.Component {
    state = {
        scanning: false
    };

    _startScanning = (e) => {
        e.preventDefault();
        if (!this.state.scanning) {
            this.setState({scanning: true});
        }
    };

    _stopScanning = () => {
        this.setState({scanning: false});
    };

    _handleResult = (result) => {
        this._stopScanning();
        this.refs.eanInput.value = result.codeResult.code;
    }
    render() {
        return (
            <div>
                <form>
                    <div className="input-field">
                        <label>EAN:</label>
                        <input className="ean" ref="eanInput" type="text" />
                        <button type="button" onClick={this._startScanning} className="icon-barcode button scan"></button>
                    </div>
                </form>
                {this.state.scanning &&
                    <Scanner onDetected={this._handleResult} onCancel={this._stopScanning} />}
            </div>
        );
    }
}
