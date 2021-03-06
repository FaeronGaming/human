declare class Human {
    tf: any;
    draw: any;
    package: any;
    version: string;
    config: any;
    fx: any;
    state: string;
    numTensors: number;
    analyzeMemoryLeaks: boolean;
    checkSanity: boolean;
    firstRun: boolean;
    perf: any;
    image: any;
    models: any;
    facemesh: any;
    age: any;
    gender: any;
    emotion: any;
    body: any;
    hand: any;
    sysinfo: any;
    constructor(userConfig?: {});
    profile(): {};
    analyze(...msg: any[]): void;
    sanity(input: any): "input is not defined" | "input must be a tensor" | "backend not loaded" | null;
    simmilarity(embedding1: any, embedding2: any): number;
    load(userConfig?: null): Promise<void>;
    checkBackend(force?: boolean): Promise<void>;
    detectFace(input: any): Promise<{
        confidence: number;
        boxConfidence: number;
        faceConfidence: number;
        box: any;
        mesh: any;
        meshRaw: any;
        boxRaw: any;
        annotations: any;
        age: number;
        gender: string;
        genderConfidence: number;
        emotion: string;
        embedding: any;
        iris: number;
    }[]>;
    detect(input: any, userConfig?: {}): Promise<unknown>;
    warmupBitmap(): Promise<any>;
    warmupCanvas(): Promise<unknown>;
    warmupNode(): Promise<unknown>;
    warmup(userConfig: any): Promise<any>;
}
export { Human as default };
