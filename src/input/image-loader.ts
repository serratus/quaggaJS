import { findTagsInObjectURL, Tags } from './exif-helper';

export interface ImageInfo {
    image: HTMLImageElement;
    tags?: Tags;
}

export class ImageLoader {
    static async load(
        baseUri: string,
        callback: (_: Array<ImageInfo>) => void,
        offset: number,
        size: number,
        sequence: boolean
    ): Promise<void> {
        const imageSrcs = new Array<string>(size);
        const loadedImages = new Array<ImageInfo>(size);
        const notLoadedImages = new Array<HTMLImageElement>();

        if (sequence === false) {
            imageSrcs[0] = baseUri;
        } else {
            for (let i = 0; i < size; i++) {
                imageSrcs[i] = `${baseUri}image-${('00' + (offset + i)).slice(-3)}.jpg`;
            }
        }

        imageSrcs.forEach(src => {
            const image = new Image();
            notLoadedImages.push(image);
            image.onload = () => loaded(image);
            image.src = src;
        });

        async function loaded(loadedImage: HTMLImageElement): Promise<void> {
            for (let x = 0; x < notLoadedImages.length; x++) {
                if (notLoadedImages[x] === loadedImage) {
                    notLoadedImages.splice(x, 1);
                    // TODO: assume the index is the same
                    for (let y = 0; y < imageSrcs.length; y++) {
                        const imageName = imageSrcs[y].substr(imageSrcs[y].lastIndexOf('/'));
                        if (loadedImage.src.lastIndexOf(imageName) !== -1) {
                            loadedImages[y] = { image: loadedImage };
                            break;
                        }
                    }
                    break;
                }
            }
            if (notLoadedImages.length === 0) {
                if (process.env.NODE_ENV !== 'production') {
                    console.log('Images loaded');
                }
                try {
                    if (sequence === false) {
                        const firstImage = loadedImages[0];
                        firstImage.tags = await findTagsInObjectURL(baseUri);
                    }
                } catch (ex) {
                    console.log(ex);
                } finally {
                    callback(loadedImages);
                }
            }
        }
    }
}
