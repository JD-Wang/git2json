export declare const parsers: {
    /**
     * Transform git timestamp to unix timestamp
     */
    timestamp: (a: string) => number;
    /**
     * Transform parents string to a clean array
     */
    parents: (a: string) => string[];
    /**
     * Transform refs string to a clean array
     */
    refs: (a: string) => string[];
};
