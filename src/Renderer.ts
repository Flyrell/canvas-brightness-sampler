import { DrawCallbackFn } from '@app/models';

export class Renderer {
    private static readonly colorRange = 255;
    private _sampleSize = 1;
    private _sampleArray: number[] = [];

    constructor(
        private _width: number,
        private _height: number,
        private _context: CanvasRenderingContext2D,
    ) {}

    getSampleSize(): number {
        return this._sampleSize;
    }

    setSampleSize(sampleSize: number): void {
        this._sampleSize = sampleSize;
        this._sampleArray = Renderer.createSampleArray(sampleSize);
    }

    render(cb: DrawCallbackFn, clearCanvas: boolean = true): void {
        if (!this._sampleArray.length) {
            this._sampleArray = Renderer.createSampleArray(this.getSampleSize());
        }

        for (const pixelRow of Renderer.createSampleIterable(this._width, this.getSampleSize())) {
            for (const pixelCol of Renderer.createSampleIterable(this._height, this.getSampleSize())) {
                const sampleSize = this.getSampleSize();
                const brightness = this.getPixelBrightness(pixelRow, pixelCol, sampleSize);
                if (clearCanvas) {
                    this._context.clearRect(pixelRow, pixelCol, sampleSize, sampleSize);
                }
                cb(brightness, this._context, pixelRow, pixelCol);
            }
        }
    }

    getPixelBrightness(posX: number, posY: number, sampleSize: number): number {
        const pixelSize = 4;
        const pixel = this._context.getImageData(posX, posY, sampleSize, sampleSize);
        const pixelValues = [];
        for (const col of this._sampleArray) {
            for (const row of this._sampleArray) {
                const prefix = (col * sampleSize + row) * pixelSize;
                const alpha = (pixel.data[prefix + 3] / Renderer.colorRange);
                for (const color of [0, 1, 2]) {
                    pixelValues.push(pixel.data[prefix + color] * alpha);
                }
            }
        }

        return pixelValues.reduce((sum, value) => sum + value, 0) / pixelValues.length;
    }

    private static createSampleIterable(size: number, sampleSize: number): number[] {
        return Array.from({ length: Math.ceil(size / sampleSize) }, (_, i) => i * sampleSize);
    }

    private static createSampleArray(sampleSize: number): number[] {
        return Array.from({ length: sampleSize }, (_, i) => i);
    }
}