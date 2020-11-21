"use strict";
exports.__esModule = true;
exports.isCancel = void 0;
var Cancel = /** @class */ (function () {
    function Cancel(message) {
        this.message = message;
    }
    return Cancel;
}());
exports["default"] = Cancel;
function isCancel(value) {
    return value instanceof Cancel;
}
exports.isCancel = isCancel;
