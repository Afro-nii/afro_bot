"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MalformedTwitchRequestError = exports.TwitchResponseError = exports.InvalidTwitchResponseError = exports.NoTwitchResponseError = exports.InvalidTwitchConfigError = void 0;
class InvalidTwitchConfigError extends Error {
    constructor(errorMessage) {
        super();
        this.name = 'InvalidTwitchConfigError';
        this.message = errorMessage;
    }
}
exports.InvalidTwitchConfigError = InvalidTwitchConfigError;
class NoTwitchResponseError extends Error {
    constructor(errorMessage) {
        super();
        this.name = 'NoTwitchResponseError';
        this.message = errorMessage;
    }
}
exports.NoTwitchResponseError = NoTwitchResponseError;
class InvalidTwitchResponseError extends Error {
    constructor(errorMessage) {
        super();
        this.name = 'InvalidTwitchResponseError';
        this.message = errorMessage;
    }
}
exports.InvalidTwitchResponseError = InvalidTwitchResponseError;
class TwitchResponseError extends Error {
    constructor(errorMessage) {
        super();
        this.name = 'TwitchResponseError';
        this.message = errorMessage;
    }
}
exports.TwitchResponseError = TwitchResponseError;
class MalformedTwitchRequestError extends Error {
    constructor(errorMessage) {
        super();
        this.name = 'MalformedTwitchRequestError';
        this.message = errorMessage;
    }
}
exports.MalformedTwitchRequestError = MalformedTwitchRequestError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9lcnJvci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLHdCQUF5QixTQUFRLEtBQUs7SUFHL0MsWUFBWSxZQUFvQjtRQUM1QixLQUFLLEVBQUUsQ0FBQztRQUhaLFNBQUksR0FBRywwQkFBMEIsQ0FBQTtRQUk3QixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFQRCw0REFPQztBQUVELE1BQWEscUJBQXNCLFNBQVEsS0FBSztJQUc1QyxZQUFZLFlBQW9CO1FBQzVCLEtBQUssRUFBRSxDQUFDO1FBSFosU0FBSSxHQUFHLHVCQUF1QixDQUFBO1FBSTFCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQVBELHNEQU9DO0FBRUQsTUFBYSwwQkFBMkIsU0FBUSxLQUFLO0lBR2pELFlBQVksWUFBb0I7UUFDNUIsS0FBSyxFQUFFLENBQUM7UUFIWixTQUFJLEdBQUcsNEJBQTRCLENBQUE7UUFJL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBUEQsZ0VBT0M7QUFFRCxNQUFhLG1CQUFvQixTQUFRLEtBQUs7SUFHMUMsWUFBWSxZQUFvQjtRQUM1QixLQUFLLEVBQUUsQ0FBQztRQUhaLFNBQUksR0FBRyxxQkFBcUIsQ0FBQTtRQUl4QixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFQRCxrREFPQztBQUVELE1BQWEsMkJBQTRCLFNBQVEsS0FBSztJQUdsRCxZQUFZLFlBQW9CO1FBQzVCLEtBQUssRUFBRSxDQUFDO1FBSFosU0FBSSxHQUFHLDZCQUE2QixDQUFBO1FBSWhDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQVBELGtFQU9DIn0=