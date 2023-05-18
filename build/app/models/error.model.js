var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var InvalidTwitchConfigError = /** @class */ (function (_super) {
    __extends(InvalidTwitchConfigError, _super);
    function InvalidTwitchConfigError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'InvalidTwitchConfigError';
        _this.message = errorMessage;
        return _this;
    }
    return InvalidTwitchConfigError;
}(Error));
export { InvalidTwitchConfigError };
var NoTwitchResponseError = /** @class */ (function (_super) {
    __extends(NoTwitchResponseError, _super);
    function NoTwitchResponseError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'NoTwitchResponseError';
        _this.message = errorMessage;
        return _this;
    }
    return NoTwitchResponseError;
}(Error));
export { NoTwitchResponseError };
var InvalidTwitchResponseError = /** @class */ (function (_super) {
    __extends(InvalidTwitchResponseError, _super);
    function InvalidTwitchResponseError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'InvalidTwitchResponseError';
        _this.message = errorMessage;
        return _this;
    }
    return InvalidTwitchResponseError;
}(Error));
export { InvalidTwitchResponseError };
var TwitchResponseError = /** @class */ (function (_super) {
    __extends(TwitchResponseError, _super);
    function TwitchResponseError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'TwitchResponseError';
        _this.message = errorMessage;
        return _this;
    }
    return TwitchResponseError;
}(Error));
export { TwitchResponseError };
var MalformedTwitchRequestError = /** @class */ (function (_super) {
    __extends(MalformedTwitchRequestError, _super);
    function MalformedTwitchRequestError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'MalformedTwitchRequestError';
        _this.message = errorMessage;
        return _this;
    }
    return MalformedTwitchRequestError;
}(Error));
export { MalformedTwitchRequestError };
