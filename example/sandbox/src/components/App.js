import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import TuneIcon from 'material-ui/svg-icons/image/tune';

import Scanner from './Scanner';
import ScanIcon from './ScanIcon';
import ScannedCode from './ScannedCode';
import ConfigView from './ConfigView';
import {persist, load} from '../utils/Storage';

const cleanConfig = config => {
    if (typeof config.inputStream.constraints.deviceId === 'number') {
        config.inputStream.constraints.deviceId = null;
    }
    return config;
};

const defaultConfig = {
    frequency: 5,
    numOfWorkers: 2,
    locate: true,
    inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
            width: 800,
            height: 600,
            deviceId: 0,
            facingMode: "environment",
        },
        area: {
            top: "0%",
            right: "0%",
            left: "0%",
            bottom: "0%",
        },
    },
    decoder: {
        readers: [
            'ean_reader',
            'code_39_reader',
            'code_128_reader',
        ],
    },
    locator: {
        halfSample: true,
        patchSize: "medium",
    },
};

export default class App extends React.Component {
    state = {
        drawerOpen: false,
        scanning: false,
        currentView: 'root',
        config: load("config") || defaultConfig,
        scannedCodes: load('scannedCodes') || [],
    };

    _handleToggle = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }
    _handleClose = () => this.setState({drawerOpen: false});
    _onRequestChange = drawerOpen => {
        this.setState({drawerOpen});
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
        const scannedCodes =
            [{
                angle: result.angle,
                box: result.box,
                codeResult: {
                    code: result.codeResult.code,
                    direction: result.codeResult.direction,
                    format: result.codeResult.format,
                },
                line: result.line,
            }]
            .concat(this.state.scannedCodes);
        this.setState({scannedCodes});
        persist('scannedCodes', scannedCodes);
    }

    _navigateTo = (route) => {
        this.setState({
            drawerOpen: false,
            currentView: route,
        });
    }

    _handleConfigChange = config => {
        this.setState({config: cleanConfig(config)});
        persist("config", config);
    }

    _handleDelete = (scannedCode) => {
        const index = this.state.scannedCodes.indexOf(scannedCode);
        if (index !== -1) {
            const newArray = this.state.scannedCodes.slice();
            newArray.splice(index, 1);
            this.setState({scannedCodes: newArray});
            persist('scannedCodes', newArray);
        }
    }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={this._onRequestChange}
                >
                    <ConfigView config={this.state.config} onChange={this._handleConfigChange} />
                </Drawer>
                <AppBar
                    style={{position: 'fixed', top: '0px'}}
                    title="QuaggaJS"
                    iconElementLeft={<IconButton onTouchTap={this._handleToggle}><TuneIcon /></IconButton>}
                    onLeftIconButtonTouchTap={this._handleToggle}
                    />
                <Dialog
                    style={{paddingTop: '0px'}}
                    bodyStyle={{padding: '0.5rem'}}
                    repositionOnUpdate={false}
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this._stopScanning}/>,
                    ]}
                    modal={true}
                    contentStyle={{width: '95%', maxWidth: '95%', height: '95%', maxHeight: '95%'}}
                    open={this.state.scanning}
                >
                    <Scanner
                        config={this.state.config}
                        onDetected={this._handleResult}
                        onCancel={this._stopScanning} />
                </Dialog>
                <div style={{paddingTop: '64px'}}>
                    {this.state.currentView === 'root' && this.state.scannedCodes.length === 0 &&
                        <Card style={{margin: '0.5em 0.25em 0em'}}>
                            <CardText>
                                Nothing scanned yet
                            </CardText>
                        </Card>
                    }
                    {this.state.currentView === 'root' && this.state.scannedCodes.map((scannedCode, i) => (
                        <ScannedCode
                            key={i}
                            scannedCode={scannedCode}
                            onDelete={this._handleDelete.bind(this, scannedCode)} />
                    ))}
                </div>
                <FloatingActionButton
                    secondary={true}
                    onMouseDown={this._startScanning}
                    style={{position: 'fixed', right: 0, bottom: 0, margin: '0 1em 1em 0'}}
                >
                    <ScanIcon />
                </FloatingActionButton>
            </div>
        );
    }
}
