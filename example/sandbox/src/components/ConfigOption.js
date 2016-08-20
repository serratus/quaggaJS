import React from 'react';

export default (Component) => (class ConfigOption extends React.Component {
    static propTypes = {
        path: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func,
        onToggle: React.PropTypes.func,
    };

    _handleChange = (event, key, payload) => {
        this.props.onChange(event, key, payload, this.props.path);
    }

    _handleToggle = (event, value) => {
        this.props.onToggle(event, value, this.props.path);
    }

    render() {
        const {
            path,
            onChange,
            onToggle,
            ...rest,
        } = this.props;
        if (onChange) {
            return <Component {...rest} onChange={this._handleChange} />;
        } else if (onToggle) {
            return <Component {...rest} onToggle={this._handleToggle} />;
        }
        return null;
    }
});
