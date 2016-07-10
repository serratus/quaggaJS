import React from 'react';

export default (Component) => (class ConfigOption extends React.Component {
    static propTypes = {
        option: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
    };

    _handleChange = (event, key, payload) => {
        this.props.onChange(event, key, payload, this.props.option);
    }

    render() {
        const {
            option,
            onChange,
            ...rest,
        } = this.props;
        return (
            <Component {...rest} onChange={this._handleChange} />
        );
    }
});
