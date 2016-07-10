import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import createConfigOption from './ConfigOption';

function generateItems(keyValuePairs) {
    return keyValuePairs.map(([value, label]) => (
        <MenuItem key={value} value={value} primaryText={label} />
    ));
}

const availableReaders = [
    ['ean_reader', "EAN-13", true],
    ['ean_8_reader', "EAN-8"],
    ["upc_e_reader", "UPC-E"],
    ["code_39_reader", "CODE 39", true],
    ["codabar_reader", "Codabar"],
    ["code_128_reader", "CODE 128", true],
    ["i2of5_reader", "ITF", true],
];

let configOptions = {
    width: [[640, "640px"], [800, "800px"], [1280, "1280px"], [1920, "1920px"]],
    height: [[480, "480px"], [600, "600px"], [720, "720px"], [1080, "1080px"]],
    facingMode: [["user", "user"], ["environment", "environment"]],
    aspectRatio: [[1, '1/1'], [4 / 3, '4/3'], [16 / 9, '16/9'], [21 / 9, '21/9']],
    deviceId: [],
};

const generalOptions = {
    frequency: [[0, "full"], [1, "1Hz"], [2, "2Hz"], [5, "5Hz"],
                [10, "10Hz"], [15, "15Hz"], [20, "20Hz"]],
    numOfWorkers: [[0, "0"], [1, "1"], [2, "2"], [4, "4"], [8, "8"]],
};

let items = Object.keys(configOptions).reduce((result, option) => ({
    ...result,
    [option]: generateItems(configOptions[option]),
}), {});

let generalItems = Object.keys(generalOptions).reduce((result, option) => ({
    ...result,
    [option]: generateItems(generalOptions[option]),
}), {});

const selectStyle = {
};
const selectedItemStyle = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const SelectConfigOption = createConfigOption(SelectField);

export default class ConfigView extends React.Component {
    state = {
        devicesFetched: false,
        numOfWorkers: 2,
        frequency: 0,
        ...Object
            .keys(configOptions)
            .reduce((result, option) => ({...result, [option]: (configOptions[option][0] || [null])[0]}), {}),
    };

    handleChange = (event, index, value, category) => {
        this.setState({[category]: value});
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
                configOptions = {
                    ...configOptions,
                    deviceId: videoDevices,
                };
                items = {
                    ...items,
                    deviceId: generateItems(configOptions.deviceId),
                };
                this.setState({devicesFetched: true});
            });
    }
    render() {
        return (
          <div>
            <Subheader>Constraints</Subheader>
            <div style={{paddingLeft: 16, paddingRight: 16}}>
            {Object.keys(items).map(option => (
                <SelectConfigOption
                    fullWidth={true}
                    key={option}
                    option={option}
                    style={selectStyle}
                    labelStyle={selectedItemStyle}
                    value={this.state[option]}
                    onChange={this.handleChange}
                  floatingLabelText={option}
                >
                  {items[option]}
                </SelectConfigOption>
            ))}
          </div>
          <List>
            <Subheader>General</Subheader>
            <ListItem primaryText="locate" secondaryText="Detect Location" rightToggle={<Toggle />} />
            <div style={{paddingLeft: 16, paddingRight: 16}}>
                {Object.keys(generalItems).map(option => (
                    <SelectConfigOption
                        fullWidth={true}
                        key={option}
                        option={option}
                        style={selectStyle}
                        labelStyle={selectedItemStyle}
                        value={this.state[option]}
                        onChange={this.handleChange}
                      floatingLabelText={option}
                    >
                      {generalItems[option]}
                    </SelectConfigOption>
                ))}
            </div>
          </List>
          <List>
            <Subheader>Readers</Subheader>
            {availableReaders.map(([reader, label, enabled]) => (
                <ListItem
                    key={reader}
                    primaryText={label}
                    rightToggle={<Toggle defaultToggled={enabled ? enabled : false} />}
                />
            ))}
          </List>
        </div>
        );
    }
};
