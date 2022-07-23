import { DrawCallbackFn } from '@app/models';

export class Renderer {
    private static readonly colorRange = 255;
    private _sampleSize = 1;
    private _walkingSize = 1;

    constructor(
        private _width: number,
        private _height: number,
        private _context: CanvasRenderingContext2D,
    ) {}

    getSampleSize(): number {
        return this._sampleSize;
    }

    getWalkingSize(): number {
        return this._walkingSize;
    }

    setSampleSize(sampleSize: number): void {
        this._sampleSize = sampleSize;
    }

    setWalkingSize(walkingSize: number): void {
        this._walkingSize = walkingSize;
    }

    render(cb: DrawCallbackFn): void {
        const walkingSize = this.getWalkingSize()
        for (const pixelRow of Renderer.createWalkingIterable(this._width, walkingSize)) {
            for (const pixelCol of Renderer.createWalkingIterable(this._height, walkingSize)) {
                const brightness = this.getPixelBrightness(pixelRow, pixelCol);
                cb(brightness, this._context, pixelRow, pixelCol);
            }
        }
    }

    getPixelBrightness(posX: number, posY: number): number {
        const pixelSize = 4;
        const pixelValues = [];
        const sampleSize = this.getSampleSize();

        const sampleSizeCol = sampleSize * 2 + 1
            + (posX - sampleSize > 0 ? 0 : posX - sampleSize)
            + (this._width - (posX + sampleSize) > 0 ? 0 : this._width - (posX + sampleSize));
        const sampleSizeRow = sampleSize * 2 + 1
            + (posY - sampleSize > 0 ? 0 : posY - sampleSize)
            + (this._height - (posY + sampleSize) > 0 ? 0 : this._height - (posY + sampleSize));
        const startPosX = posX - sampleSize < 0 ? 0 : posX - sampleSize;
        const startPosY = posY - sampleSize < 0 ? 0 : posY - sampleSize;

        const pixel = this._context.getImageData(startPosX, startPosY, sampleSizeCol - 1, sampleSizeRow - 1);
        for (const col of Renderer.createSampleArray(sampleSizeCol)) {
            for (const row of Renderer.createSampleArray(sampleSizeRow)) {
                const prefix = (col * sampleSize + row) * pixelSize;
                const alpha = (pixel.data[prefix + 3] / Renderer.colorRange);
                for (const color of [0, 1, 2]) {
                    pixelValues.push(pixel.data[prefix + color] * alpha);
                }
            }
        }

        return pixelValues.reduce((sum, value) => sum + value, 0) / pixelValues.length;
    }

    private static createWalkingIterable(size: number, sampleSize: number): number[] {
        return Array.from({ length: Math.ceil(size / sampleSize) }, (_, i) => i * sampleSize);
    }

    private static createSampleArray(sampleSize: number): number[] {
        return Array.from({ length: sampleSize }, (_, i) => i);
    }
}