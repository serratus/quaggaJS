import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import createConfigOption from './ConfigOption';

let configSections = [{
    name: "Constraints",
    path: ["inputStream", "constraints"],
    options: {
        width: [[640, "640px"], [800, "800px"], [1280, "1280px"], [1920, "1920px"]],
        height: [[480, "480px"], [600, "600px"], [720, "720px"], [1080, "1080px"]],
        facingMode: [["user", "user"], ["environment", "environment"]],
        aspectRatio: [[1, '1/1'], [4 / 3, '4/3'], [16 / 9, '16/9'], [21 / 9, '21/9']],
        deviceId: [],
    },
}, {
    name: "General",
    path: [],
    options: {
        locate: true,
        numOfWorkers: [[0, "0"], [1, "1"], [2, "2"], [4, "4"], [8, "8"]],
        frequency: [[0, "full"], [1, "1Hz"], [2, "2Hz"], [5, "5Hz"],
                    [10, "10Hz"], [15, "15Hz"], [20, "20Hz"]],
    },
}, {
    name: "Reader",
    path: ["decoder", "readers"],
    options: {
        ean_reader: false,
        ean_8_reader: false,
        upc_e_reader: false,
        code_39_reader: false,
        codabar_reader: false,
        code_128_reader: false,
        i2of5_reader: false,
    },
}, {
    name: "Locator",
    path: ["locator"],
    options: {
        halfSample: true,
        patchSize: [
            ["x-small", "x-small"],
            ["small", "small"],
            ["medium", "medium"],
            ["large", "large"],
            ["x-large", "x-large"],
        ],
    },
}];

const selectStyle = {
};

const selectedItemStyle = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const reducer = function reduce(state, path, value) {
    if (path.length === 1 && typeof value === 'boolean' && Array.isArray(state)) {
        const index = state.indexOf(path[0]);
        if (index !== -1 && value || index === -1 && !value) {
            return state;
        } else if (index !== -1 && !value) {
            const newArray = state.slice();
            newArray.splice(index, 1);
            return newArray;
        } else {
            return state.concat([path[0]]);
        }
    }
    if (path.length === 0) {
        return value;
    }
    const [part, ...rest] = path;
    return Object.assign({}, state, {[part]: reduce(state[part], rest, value)});
};

const get = function get(object, path) {
    if (Array.isArray(object) && (typeof path[0] === 'string')) {
        return object.indexOf(path[0]) !== -1;
    }
    if (path.length === 0) {
        return object;
    }
    const [part, ...rest] = path;
    return get(object[part], rest);
};

const getConfigByPath = function(object, path) {
    return get(object, ['config'].concat(path));
};

const SelectConfigOption = createConfigOption(SelectField);
const ToggleConfigOption = createConfigOption(Toggle);

export default class ConfigView extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        config: React.PropTypes.object.isRequired,
    };

    state = {
        devicesFetched: false,
    };

    handleChange = (event, index, value, path) => {
        const newState = reducer(this.props.config, path, value);
        this.props.onChange(newState);
    }

    handleToggle = (event, value, path) => {
        return this.handleChange(event, 0, value, path);
    }

    componentWillMount() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                const videoDevices = devices
                    .filter(info => info.kind === 'videoinput')
                    .map(videoDevice => ([
                        videoDevice.deviceId,
                        videoDevice.label,
                    ]));
                const constraints = configSections
                    .map((section, index) => (section.name === "Constraints" ? {section, index} : null))
                    .filter(sectionIndex => !!sectionIndex)[0];
                configSections = configSections.slice();
                constraints.section = {
                    ...constraints.section,
                    options: {
                        ...constraints.section.options,
                        deviceId: [[0, "no preference"]].concat(videoDevices),
                    },
                };
                configSections[constraints.index] = constraints.section;
                this.setState({devicesFetched: true});
            });
    }

    render() {
        return (<div>{
            configSections.map(section => (
                <List>
                    <Subheader>{section.name}</Subheader>
                    {Object.keys(section.options).map(option => {
                        const path = section.path.concat([option]);
                        if (typeof section.options[option] === 'boolean') {
                            return (
                                <ListItem
                                    key={option}
                                    path={path}
                                    primaryText={option}
                                    rightToggle={
                                        <ToggleConfigOption
                                            onToggle={this.handleToggle}
                                            path={path}
                                            toggled={!!getConfigByPath(this.props, path)} />
                                    }
                                />
                            );
                        } else {
                            return (
                                <div style={{paddingLeft: 16, paddingRight: 16}}>
                                    <SelectConfigOption
                                        fullWidth={true}
                                        key={option}
                                        path={path}
                                        style={selectStyle}
                                        labelStyle={selectedItemStyle}
                                        value={getConfigByPath(this.props, path)}
                                        onChange={this.handleChange}
                                        floatingLabelText={option}
                                    >
                                    {section.options[option].map(([value, label]) => (
                                            <MenuItem key={value} value={value} primaryText={label} />
                                    ))}
                                    </SelectConfigOption>
                                </div>
                            );
                        }
                    })}
                </List>
            ))
        }</div>);
    }
};
