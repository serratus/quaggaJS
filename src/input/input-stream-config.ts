type InputStreamType = 'ImageStream' | 'LiveStream' | 'VideoStream';

export interface AreaConfig {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
}

export interface InputStreamConfig {
    area?: AreaConfig;
    constraints?: MediaTrackConstraints;
    halfSample?: boolean;
    length?: number;
    mime?: string;
    name?: string;
    sequence?: boolean;
    singleChannel?: boolean;
    size?: number;
    src?: string;
    target?: HTMLElement | string;
    type?: InputStreamType;
}
