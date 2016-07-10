import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import TuneIcon from 'material-ui/svg-icons/image/tune';

import Scanner from './Scanner';
import ScanIcon from './ScanIcon';
import ConfigView from './ConfigView';

export default class App extends React.Component {
    state = {
        drawerOpen: false,
        scanning: false,
        currentView: 'root',
        scannedCodes: [{
            codeResult: {
                code: "FANAVF1461710",
                format: "code_128",
            },
            timestamp: new Date(),
        }],
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
        this.setState({
            scannedCodes: [{...result, timestamp: new Date()}]
            .concat(this.state.scannedCodes)});
    }

    _navigateTo = (route) => {
        this.setState({
            drawerOpen: false,
            currentView: route,
        });
    }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={this._onRequestChange}
                >
                    <ConfigView />
                </Drawer>
                <AppBar
                    style={{position: 'fixed', top: '0px'}}
                    title="QuaggaJS"
                    iconElementLeft={<IconButton onTouchTap={this._handleToggle}><TuneIcon /></IconButton>}
                    onLeftIconButtonTouchTap={this._handleToggle}
                    />
                <FloatingActionButton
                    secondary={true}
                    onMouseDown={this._startScanning}
                    style={{position: 'fixed', right: 0, bottom: 0, margin: '0 1em 1em 0'}}
                >
                    <ScanIcon />
                </FloatingActionButton>
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
                    <Scanner onDetected={this._handleResult} onCancel={this._stopScanning} />
                </Dialog>
                <div style={{paddingTop: '64px'}}>
                    {this.state.currentView === 'root' && this.state.scannedCodes.map((scannedCode, i) => (
                        <Card key={i} style={{margin: '0.5em 0.25em 0em'}}>
                            <CardTitle
                                titleStyle={{textOverflow: 'ellipsis', overflow: 'hidden'}}
                                title={scannedCode.codeResult.code}
                                subtitle={scannedCode.codeResult.format}
                            />
                            <CardText>
                                Scanned on {scannedCode.timestamp.toLocaleString()}
                            </CardText>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}
