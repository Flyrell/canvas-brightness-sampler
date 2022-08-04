export class Signal {
    promises: Array<() => void> = [];

    send(): void {
        this.promises.forEach(resolve => resolve());
        this.promises = [];
    }

    receive(): Promise<void> {
        return new Promise<void>(resolve => this.promises.push(resolve));
    }
}

/*
       Usage:
       const signal = new Signal();
       // ...
       signal.receive().then(() => /* do whatever *\/);
       signal.receive().then(() => /* do whatever *\/);
       signal.receive().then(() => /* do whatever *\/);
       signal.receive().then(() => /* do whatever *\/);
       signal.send();
 */