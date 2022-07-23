import { Renderer } from '@app/Renderer';
import { RendererOptions } from '@app/models';

export function createRenderer(canvas: HTMLCanvasElement, options: RendererOptions = {}): Renderer {
    if (!canvas) {
        throw new Error('Canvas not provided.');
    }

    if (
        !(typeof HTMLCanvasElement !== 'undefined' && canvas instanceof HTMLCanvasElement)
        && !(typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas)
    ) {
        throw new Error('Canvas is not the HTMLCanvasElement or OffscreenCanvas.');
    }

    if (!canvas.width || !canvas.height) {
        throw new Error('Canvas should have its dimensions set.');
    }

    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Unable to extract "2d" context from the canvas.')
    }

    const renderer = new Renderer(canvas.width, canvas.height, context);
    if (options.sampleSize) {
        renderer.setSampleSize(options.sampleSize);
        renderer.setWalkingSize(options.sampleSize);
    }
    if (options.walkingSize) {
        renderer.setWalkingSize(options.walkingSize);
    }
    return renderer;
}