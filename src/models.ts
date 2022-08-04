export type Canvas = HTMLCanvasElement | OffscreenCanvas;
export type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export interface SamplerOptions {
    /**
     * How many pixels (around the current pixel) are traversed in order to get the sample.
     * Default: 0 (only the current pixel is taken into consideration)
     */
    sampleSize?: number;

    /**
     * How many pixels are we going to skip (on each iteration) while traversing the canvas.
     * Default: 1 (going pixel-by-pixel)
     */
    skipSize?: number;
}

export type DrawCallbackFn = (
    brightness: number,
    positionX: number,
    positionY: number,
) => void;