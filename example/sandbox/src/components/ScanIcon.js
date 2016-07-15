import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ActionScanBarcode = (props) => (
  <SvgIcon {...props}>
    <path transform="translate(2, -3)" d="M0 4h4v20h-4zM6 4h2v20h-2zM10 4h2v20h-2zM16 4h2v20h-2zM24 4h2v20h-2zM30 4h2v20h-2zM20 4h1v20h-1zM14 4h1v20h-1zM27 4h1v20h-1zM0 26h2v2h-2zM6 26h2v2h-2zM10 26h2v2h-2zM20 26h2v2h-2zM30 26h2v2h-2zM24 26h4v2h-4zM14 26h4v2h-4z"/>
  </SvgIcon>
);

ActionScanBarcode = pure(ActionScanBarcode);
ActionScanBarcode.displayName = 'ActionAccessibility';
ActionScanBarcode.muiName = 'SvgIcon';

export default ActionScanBarcode;
