export declare class LRUCache<T> {
    private readonly cache;
    private capacity;
    constructor(capacity: number);
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    setCapacity(capacity: number | undefined): void;
    private prune;
}
//# sourceMappingURL=LRUCache.d.ts.map