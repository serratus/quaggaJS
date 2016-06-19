import React from 'react';
import Quagga from '../../../../dist/quagga';

export default class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this._scanner = Quagga
            .decoder({readers: ['ean_reader']})
            .locator({patchSize: 'medium'})
            .fromSource({
                target: '.overlay__content',
                constraints: {
                    width: 800,
                    height: 600,
                    facingMode: "environment"
                }
            });
        this._onCancel = this._onCancel.bind(this);
    }
    _onCancel(e) {
        e.preventDefault();
        this.props.onCancel();
    }
    render() {
        return (
            <div className="overlay">
                <div className="overlay__content">
                    <div className="overlay__close" onClick={this._onCancel}>X</div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this._scanner
            .addEventListener('detected', this.props.onDetected)
            .start();
    }

    componentWillUnmount() {
        this._scanner
            .removeEventListener('detected', this.props.onDetected)
            .stop();
    }
}
