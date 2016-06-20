import React from 'react';
import Quagga from '../../../../dist/quagga';

export default class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this._scanner = Quagga
            .decoder({readers: ['code_128_reader']})
            .locator({patchSize: 'medium'})
            .throttle(500)
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
        if (this._scanUntilResult) {
            this._scanUntilResult.cancel();
            this._scanUntilResult = null;
        }
    }
    render() {
        return (
            <div className="overlay__content">
                <div className="overlay__close" onClick={this._onCancel}>X</div>
            </div>
        );
    }
    componentDidMount() {
        this._scanUntilResult = this._scanner.toPromise();
        this._scanUntilResult.promise
            .then(this.props.onDetected)
            .catch(this.props.onCancel);
    }

    componentWillUnmount() {
        this._scanner
            .removeEventListener('detected', this.props.onDetected)
            .stop();
    }
}
