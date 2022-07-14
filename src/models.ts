export type DrawCallbackFn = (
    brightness: number,
    context: CanvasRenderingContext2D,
    positionX: number,
    positionY: number,
) => void;