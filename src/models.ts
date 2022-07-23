export type Canvas = HTMLCanvasElement | OffscreenCanvas;
export type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export interface RendererOptions {
    sampleSize?: number;
    walkingSize?: number;
}

export type DrawCallbackFn = (
    brightness: number,
    positionX: number,
    positionY: number,
) => void;