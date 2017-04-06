import {findTagsInObjectURL} from './exif_helper';
import {Source} from './SourceInterface';

class ImageSource extends Source {
    constructor() {
        super("IMAGE");
        this._$image = null;
        this._src = null;
        this.tags = null;
        this.colorChannels = 3;
    }

    applyConstraints(newConstraints) {
        this.constraints = newConstraints;
        this.colorChannels = this.constraints.channels || this.colorChannels;
        return this._applyInput(this.constraints.src)
            ._loadResource()
            .then(() => findTagsInObjectURL(this._src, ['orientation']))
            .then((tags) => {this.tags = tags;})
            .then(this._determineDimensions.bind(this))
            .then(() => this);
    }

    _loadResource() {
        return new Promise((resolve, reject) => {
            if (this._src || !this._$image.complete) {
                this._$image.addEventListener('load', resolve, false);
                this._$image.addEventListener('error', reject, false);
                if (this._src) {
                    console.log(`Setting src = ${this._src}`);
                    this._$image.src = this._src;
                }
            } else {
                return resolve();
            }
        });
    }

    _applyInput(input) {
        if (typeof input === 'string') {
            // data or url, or queryString
            this._$image = new Image();
            this._src = input;
        } else if (input instanceof HTMLImageElement) {
            this._$image = input;
        } else if (input instanceof File) {
            this._$image = new Image();
            this._src = URL.createObjectURL(input);
        } else {
            throw new Error("fromImage needs a src, HTMLImageElement or File");
        }
        return this;
    }

    _determineDimensions() {
        let width = this._$image.naturalWidth;
        let height = this._$image.naturalHeight;
        let desiredWidth = this.constraints.width;
        if (this.tags && this.tags.orientation) {
            switch (this.tags.orientation) {
            case 6:
            case 8:
                width = this._$image.naturalHeight;
                height = this._$image.naturalWidth;
            }
        }

        const imageAR = width / height;
        const calculatedWidth = imageAR > 1 ? desiredWidth : Math.floor((imageAR) * desiredWidth);
        const calculatedHeight = imageAR > 1 ? Math.floor((1 / imageAR) * desiredWidth) : desiredWidth;

        this._dimensions = {
            viewport: {
                width,   // AR
                height, // AR
                x: 0,                         // AR
                y: 0,                         // AR
            },
            canvas: {
                width: calculatedWidth,     // AR
                height: calculatedHeight,   // AR
            },
        };
    }

    getDimensions() {
        return this._dimensions;
    }

    getDrawable() {
        return this._$image;
    }

    getLabel() {
        return this._$image.src;
    }
}

export function fromImage(constraints = {width: 800, height: 800, channels: 3}) {
    const imageSource = new ImageSource();
    return imageSource.applyConstraints(constraints);
}
