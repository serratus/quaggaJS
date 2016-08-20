import React from 'react';
import Quagga from '../../../../dist/quagga';

export default class Scanner extends React.Component {
    static propTypes = {
        onDetected: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        config: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this._scanner = Quagga
            .config(props.config)
            .fromSource({
                ...this.props.config.inputStream,
                target: '.overlay__content',
            });
    }

    _onCancel = (e) => {
        e.preventDefault();
        if (this._scanUntilResult) {
            this._scanUntilResult.cancel();
            this._scanUntilResult = null;
        }
    }

    componentDidMount() {
        this._scanUntilResult = this._scanner.toPromise();
        this._scanUntilResult.promise
            .then(this.props.onDetected)
            .catch(this.props.onCancel);
    }

    render() {
        return (
            <div className="overlay__content" />
        );
    }

    componentWillUnmount() {
        this._scanner
            .removeEventListener('detected', this.props.onDetected)
            .stop();
    }
}
