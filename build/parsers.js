(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parsers = void 0;
    exports.parsers = {
        /**
         * Transform git timestamp to unix timestamp
         */
        timestamp: (a) => +a * 1000,
        /**
         * Transform parents string to a clean array
         */
        parents: (a) => a.split(' ').filter(b => b),
        /**
         * Transform refs string to a clean array
         */
        refs: (a) => a.replace(/[\(\)]/g, '')
            .replace('->', ',')
            .split(', ')
            .map((a) => a.trim())
            .filter((a) => a)
    };
});
