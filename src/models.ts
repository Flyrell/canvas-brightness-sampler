export interface RendererOptions {
    sampleSize?: number;
    walkingSize?: number;
}

export type DrawCallbackFn = (
    brightness: number,
    context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    positionX: number,
    positionY: number,
) => void;