import { Renderer } from '@app/Renderer';

export function createRenderer(canvas: HTMLCanvasElement): Renderer {
    if (!canvas) {
        throw new Error('Canvas not provided.');
    }

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('Canvas is not the HTMLCanvasElement.');
    }

    if (!canvas.width || !canvas.height) {
        throw new Error('Canvas should have its dimensions set.');
    }

    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Unable to extract "2d" context from the canvas.')
    }

    return new Renderer(canvas.width, canvas.height, context);
}