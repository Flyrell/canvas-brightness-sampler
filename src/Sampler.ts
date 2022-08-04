import { Signal } from '@app/Signal';
import { Context, DrawCallbackFn } from '@app/models';

export class Sampler {
    private static readonly colorRange = 255;
    private _sampleSize = 0;
    private _skipSize = 1;
    private _signal = new Signal();

    constructor(
        private _width: number,
        private _height: number,
        private _context: Context,
    ) {}

    getSampleSize(): number {
        return this._sampleSize;
    }

    getSkipSize(): number {
        return this._skipSize;
    }

    getSignal(): Signal {
        return this._signal;
    }

    getContext(): Context {
        return this._context;
    }

    setSampleSize(sampleSize: number): void {
        this._sampleSize = sampleSize;
    }

    setSkipSize(skipSize: number): void {
        this._skipSize = skipSize;
        if (this._width % this._skipSize !== 0 || this._height % this._skipSize !== 0) {
            console.warn('Skip size should be a divider of canvas\' width and height');
        }
    }

    sample(cb: DrawCallbackFn): void {
        const skipSize = this.getSkipSize();
        const widthSteps = Math.ceil(this._width / skipSize);
        const heightSteps = Math.ceil(this._height / skipSize);
        for (let pixelCol = 0; pixelCol < widthSteps; pixelCol += skipSize) {
            for (let pixelRow = 0; pixelRow < heightSteps; pixelRow += skipSize) {
                const brightness = this.getPixelBrightness(pixelCol, pixelRow);
                cb(brightness, pixelCol, pixelRow);
            }
        }
        this.getSignal().send();
    }

    private getPixelBrightness(posX: number, posY: number): number {
        const pixelDataSize = 4;
        const pixelValues = [];
        const sampleSize = this.getSampleSize();

        const endPosX = sampleSize * 2 + 1
            + (posX - sampleSize > 0 ? 0 : posX - sampleSize)
            + (this._width - (posX + sampleSize) > 0 ? 0 : this._width - (posX + sampleSize));
        const endPosY = sampleSize * 2 + 1
            + (posY - sampleSize > 0 ? 0 : posY - sampleSize)
            + (this._height - (posY + sampleSize) > 0 ? 0 : this._height - (posY + sampleSize));
        const startPosX = posX - sampleSize < 0 ? 0 : posX - sampleSize;
        const startPosY = posY - sampleSize < 0 ? 0 : posY - sampleSize;

        const pixel = this._context.getImageData(startPosX, startPosY, endPosX, endPosY);
        for (let col = 0; col < endPosX; col++) {
            for (let row = 0; row < endPosY; row++) {
                const prefix = (col * sampleSize + row) * pixelDataSize;
                const alpha = (pixel.data[prefix + 3] / Sampler.colorRange);
                for (const color of [0, 1, 2]) {
                    pixelValues.push(pixel.data[prefix + color] * alpha);
                }
            }
        }

        return pixelValues.reduce((sum, value) => sum + value, 0) / pixelValues.length;
    }
}