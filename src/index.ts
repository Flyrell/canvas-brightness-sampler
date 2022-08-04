import { Signal } from '@app/Signal';
import { Sampler } from '@app/Sampler';
import { Context, Canvas, SamplerOptions, DrawCallbackFn } from '@app/models';

export function createSampler(canvas: Canvas, options: SamplerOptions = {}): Sampler {
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

    const sampler = new Sampler(canvas.width, canvas.height, context);
    if (options.sampleSize) {
        sampler.setSampleSize(options.sampleSize);
    }
    if (options.skipSize) {
        sampler.setSkipSize(options.skipSize);
    }

    return sampler;
}

export { Sampler, SamplerOptions, Signal, Canvas, Context, DrawCallbackFn };