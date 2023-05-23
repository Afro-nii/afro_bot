'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
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

/**
 * This metadata contains validation rules.
 */
var ValidationMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationMetadata(args) {
        /**
         * Validation groups used for this validation.
         */
        this.groups = [];
        /**
         * Specifies if validated value is an array and each of its item must be validated.
         */
        this.each = false;
        /*
         * A transient set of data passed through to the validation result for response mapping
         */
        this.context = undefined;
        this.type = args.type;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
            this.message = args.validationOptions.message;
            this.groups = args.validationOptions.groups;
            this.always = args.validationOptions.always;
            this.each = args.validationOptions.each;
            this.context = args.validationOptions.context;
        }
    }
    return ValidationMetadata;
}());

/**
 * Used to transform validation schemas to validation metadatas.
 */
var ValidationSchemaToMetadataTransformer = /** @class */ (function () {
    function ValidationSchemaToMetadataTransformer() {
    }
    ValidationSchemaToMetadataTransformer.prototype.transform = function (schema) {
        var metadatas = [];
        Object.keys(schema.properties).forEach(function (property) {
            schema.properties[property].forEach(function (validation) {
                var validationOptions = {
                    message: validation.message,
                    groups: validation.groups,
                    always: validation.always,
                    each: validation.each,
                };
                var args = {
                    type: validation.type,
                    target: schema.name,
                    propertyName: property,
                    constraints: validation.constraints,
                    validationTypeOptions: validation.options,
                    validationOptions: validationOptions,
                };
                metadatas.push(new ValidationMetadata(args));
            });
        });
        return metadatas;
    };
    return ValidationSchemaToMetadataTransformer;
}());

/**
 * Convert Map, Set to Array
 */
function convertToArray(val) {
    if (val instanceof Map) {
        return Array.from(val.values());
    }
    return Array.isArray(val) ? val : Array.from(val);
}

/**
 * This function returns the global object across Node and browsers.
 *
 * Note: `globalThis` is the standardized approach however it has been added to
 * Node.js in version 12. We need to include this snippet until Node 12 EOL.
 */
function getGlobal() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'window'.
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'window'.
        return window;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'self'.
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'self'.
        return self;
    }
}

// https://github.com/TylorS/typed-is-promise/blob/abf1514e1b6961adfc75765476b0debb96b2c3ae/src/index.ts
function isPromise(p) {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
}

/**
 * Storage all metadatas.
 */
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Private properties
        // -------------------------------------------------------------------------
        this.validationMetadatas = [];
        this.constraintMetadatas = [];
    }
    Object.defineProperty(MetadataStorage.prototype, "hasValidationMetaData", {
        get: function () {
            return !!this.validationMetadatas.length;
        },
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationSchema = function (schema) {
        var _this = this;
        var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
        validationMetadatas.forEach(function (validationMetadata) { return _this.addValidationMetadata(validationMetadata); });
    };
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationMetadata = function (metadata) {
        this.validationMetadatas.push(metadata);
    };
    /**
     * Adds a new constraint metadata.
     */
    MetadataStorage.prototype.addConstraintMetadata = function (metadata) {
        this.constraintMetadatas.push(metadata);
    };
    /**
     * Groups metadata by their property names.
     */
    MetadataStorage.prototype.groupByPropertyName = function (metadata) {
        var grouped = {};
        metadata.forEach(function (metadata) {
            if (!grouped[metadata.propertyName])
                grouped[metadata.propertyName] = [];
            grouped[metadata.propertyName].push(metadata);
        });
        return grouped;
    };
    /**
     * Gets all validation metadatas for the given object with the given groups.
     */
    MetadataStorage.prototype.getTargetValidationMetadatas = function (targetConstructor, targetSchema, always, strictGroups, groups) {
        var includeMetadataBecauseOfAlwaysOption = function (metadata) {
            // `metadata.always` overrides global default.
            if (typeof metadata.always !== 'undefined')
                return metadata.always;
            // `metadata.groups` overrides global default.
            if (metadata.groups && metadata.groups.length)
                return false;
            // Use global default.
            return always;
        };
        var excludeMetadataBecauseOfStrictGroupsOption = function (metadata) {
            if (strictGroups) {
                // Validation is not using groups.
                if (!groups || !groups.length) {
                    // `metadata.groups` has at least one group.
                    if (metadata.groups && metadata.groups.length)
                        return true;
                }
            }
            return false;
        };
        // get directly related to a target metadatas
        var originalMetadatas = this.validationMetadatas.filter(function (metadata) {
            if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // get metadatas for inherited classes
        var inheritedMetadatas = this.validationMetadatas.filter(function (metadata) {
            // if target is a string it's means we validate against a schema, and there is no inheritance support for schemas
            if (typeof metadata.target === 'string')
                return false;
            if (metadata.target === targetConstructor)
                return false;
            if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // filter out duplicate metadatas, prefer original metadatas instead of inherited metadatas
        var uniqueInheritedMetadatas = inheritedMetadatas.filter(function (inheritedMetadata) {
            return !originalMetadatas.find(function (originalMetadata) {
                return (originalMetadata.propertyName === inheritedMetadata.propertyName &&
                    originalMetadata.type === inheritedMetadata.type);
            });
        });
        return originalMetadatas.concat(uniqueInheritedMetadatas);
    };
    /**
     * Gets all validator constraints for the given object.
     */
    MetadataStorage.prototype.getTargetValidatorConstraints = function (target) {
        return this.constraintMetadatas.filter(function (metadata) { return metadata.target === target; });
    };
    return MetadataStorage;
}());
/**
 * Gets metadata storage.
 * Metadata storage follows the best practices and stores metadata in a global variable.
 */
function getMetadataStorage() {
    var global = getGlobal();
    if (!global.classValidatorMetadataStorage) {
        global.classValidatorMetadataStorage = new MetadataStorage();
    }
    return global.classValidatorMetadataStorage;
}

/**
 * Validation error description.
 */
var ValidationError = /** @class */ (function () {
    function ValidationError() {
    }
    /**
     *
     * @param shouldDecorate decorate the message with ANSI formatter escape codes for better readability
     * @param hasParent true when the error is a child of an another one
     * @param parentPath path as string to the parent of this property
     */
    ValidationError.prototype.toString = function (shouldDecorate, hasParent, parentPath) {
        var _this = this;
        if (shouldDecorate === void 0) { shouldDecorate = false; }
        if (hasParent === void 0) { hasParent = false; }
        if (parentPath === void 0) { parentPath = ""; }
        var boldStart = shouldDecorate ? "\u001B[1m" : "";
        var boldEnd = shouldDecorate ? "\u001B[22m" : "";
        var propConstraintFailed = function (propertyName) {
            return " - property ".concat(boldStart).concat(parentPath).concat(propertyName).concat(boldEnd, " has failed the following constraints: ").concat(boldStart).concat(Object.keys(_this.constraints).join(", ")).concat(boldEnd, " \n");
        };
        if (!hasParent) {
            return ("An instance of ".concat(boldStart).concat(this.target ? this.target.constructor.name : 'an object').concat(boldEnd, " has failed the validation:\n") +
                (this.constraints ? propConstraintFailed(this.property) : "") +
                (this.children
                    ? this.children.map(function (childError) { return childError.toString(shouldDecorate, true, _this.property); }).join("")
                    : ""));
        }
        else {
            // we format numbers as array indexes for better readability.
            var formattedProperty_1 = Number.isInteger(+this.property)
                ? "[".concat(this.property, "]")
                : "".concat(parentPath ? "." : "").concat(this.property);
            if (this.constraints) {
                return propConstraintFailed(formattedProperty_1);
            }
            else {
                return this.children
                    ? this.children
                        .map(function (childError) { return childError.toString(shouldDecorate, true, "".concat(parentPath).concat(formattedProperty_1)); })
                        .join("")
                    : "";
            }
        }
    };
    return ValidationError;
}());

/**
 * Validation types.
 */
var ValidationTypes = /** @class */ (function () {
    function ValidationTypes() {
    }
    /**
     * Checks if validation type is valid.
     */
    ValidationTypes.isValid = function (type) {
        var _this = this;
        return (type !== 'isValid' &&
            type !== 'getMessage' &&
            Object.keys(this)
                .map(function (key) { return _this[key]; })
                .indexOf(type) !== -1);
    };
    /* system */
    ValidationTypes.CUSTOM_VALIDATION = 'customValidation'; // done
    ValidationTypes.NESTED_VALIDATION = 'nestedValidation'; // done
    ValidationTypes.PROMISE_VALIDATION = 'promiseValidation'; // done
    ValidationTypes.CONDITIONAL_VALIDATION = 'conditionalValidation'; // done
    ValidationTypes.WHITELIST = 'whitelistValidation'; // done
    ValidationTypes.IS_DEFINED = 'isDefined'; // done
    return ValidationTypes;
}());

/**
 * Convert the constraint to a string to be shown in an error
 */
function constraintToString(constraint) {
    if (Array.isArray(constraint)) {
        return constraint.join(', ');
    }
    return "".concat(constraint);
}
var ValidationUtils = /** @class */ (function () {
    function ValidationUtils() {
    }
    ValidationUtils.replaceMessageSpecialTokens = function (message, validationArguments) {
        var messageString;
        if (message instanceof Function) {
            messageString = message(validationArguments);
        }
        else if (typeof message === 'string') {
            messageString = message;
        }
        if (messageString && Array.isArray(validationArguments.constraints)) {
            validationArguments.constraints.forEach(function (constraint, index) {
                messageString = messageString.replace(new RegExp("\\$constraint".concat(index + 1), 'g'), constraintToString(constraint));
            });
        }
        if (messageString &&
            validationArguments.value !== undefined &&
            validationArguments.value !== null &&
            typeof validationArguments.value === 'string')
            messageString = messageString.replace(/\$value/g, validationArguments.value);
        if (messageString)
            messageString = messageString.replace(/\$property/g, validationArguments.property);
        if (messageString)
            messageString = messageString.replace(/\$target/g, validationArguments.targetName);
        return messageString;
    };
    return ValidationUtils;
}());

/**
 * Executes validation over given object.
 */
var ValidationExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationExecutor(validator, validatorOptions) {
        this.validator = validator;
        this.validatorOptions = validatorOptions;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.awaitingPromises = [];
        this.ignoreAsyncValidations = false;
        // -------------------------------------------------------------------------
        // Private Properties
        // -------------------------------------------------------------------------
        this.metadataStorage = getMetadataStorage();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.execute = function (object, targetSchema, validationErrors) {
        var _this = this;
        var _a;
        /**
         * If there is no metadata registered it means possibly the dependencies are not flatterned and
         * more than one instance is used.
         *
         * TODO: This needs proper handling, forcing to use the same container or some other proper solution.
         */
        if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) === null || _a === void 0 ? void 0 : _a.enableDebugMessages) === true) {
            console.warn("No metadata found. There is more than once class-validator version installed probably. You need to flatten your dependencies.");
        }
        var groups = this.validatorOptions ? this.validatorOptions.groups : undefined;
        var strictGroups = (this.validatorOptions && this.validatorOptions.strictGroups) || false;
        var always = (this.validatorOptions && this.validatorOptions.always) || false;
        var targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(object.constructor, targetSchema, always, strictGroups, groups);
        var groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
        if (this.validatorOptions && this.validatorOptions.forbidUnknownValues && !targetMetadatas.length) {
            var validationError = new ValidationError();
            if (!this.validatorOptions ||
                !this.validatorOptions.validationError ||
                this.validatorOptions.validationError.target === undefined ||
                this.validatorOptions.validationError.target === true)
                validationError.target = object;
            validationError.value = undefined;
            validationError.property = undefined;
            validationError.children = [];
            validationError.constraints = { unknownValue: 'an unknown value was passed to the validate function' };
            validationErrors.push(validationError);
            return;
        }
        if (this.validatorOptions && this.validatorOptions.whitelist)
            this.whitelist(object, groupedMetadatas, validationErrors);
        // General validation
        Object.keys(groupedMetadatas).forEach(function (propertyName) {
            var value = object[propertyName];
            var definedMetadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type === ValidationTypes.IS_DEFINED; });
            var metadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type !== ValidationTypes.IS_DEFINED && metadata.type !== ValidationTypes.WHITELIST; });
            if (value instanceof Promise &&
                metadatas.find(function (metadata) { return metadata.type === ValidationTypes.PROMISE_VALIDATION; })) {
                _this.awaitingPromises.push(value.then(function (resolvedValue) {
                    _this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
                }));
            }
            else {
                _this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
            }
        });
    };
    ValidationExecutor.prototype.whitelist = function (object, groupedMetadatas, validationErrors) {
        var _this = this;
        var notAllowedProperties = [];
        Object.keys(object).forEach(function (propertyName) {
            // does this property have no metadata?
            if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
                notAllowedProperties.push(propertyName);
        });
        if (notAllowedProperties.length > 0) {
            if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
                // throw errors
                notAllowedProperties.forEach(function (property) {
                    var _a;
                    var validationError = _this.generateValidationError(object, object[property], property);
                    validationError.constraints = (_a = {}, _a[ValidationTypes.WHITELIST] = "property ".concat(property, " should not exist"), _a);
                    validationError.children = undefined;
                    validationErrors.push(validationError);
                });
            }
            else {
                // strip non allowed properties
                notAllowedProperties.forEach(function (property) { return delete object[property]; });
            }
        }
    };
    ValidationExecutor.prototype.stripEmptyErrors = function (errors) {
        var _this = this;
        return errors.filter(function (error) {
            if (error.children) {
                error.children = _this.stripEmptyErrors(error.children);
            }
            if (Object.keys(error.constraints).length === 0) {
                if (error.children.length === 0) {
                    return false;
                }
                else {
                    delete error.constraints;
                }
            }
            return true;
        });
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.performValidations = function (object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
        var customValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === ValidationTypes.CUSTOM_VALIDATION; });
        var nestedValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === ValidationTypes.NESTED_VALIDATION; });
        var conditionalValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === ValidationTypes.CONDITIONAL_VALIDATION; });
        var validationError = this.generateValidationError(object, value, propertyName);
        validationErrors.push(validationError);
        var canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
        if (!canValidate) {
            return;
        }
        // handle IS_DEFINED validation type the special way - it should work no matter skipUndefinedProperties/skipMissingProperties is set or not
        this.customValidations(object, value, definedMetadatas, validationError);
        this.mapContexts(object, value, definedMetadatas, validationError);
        if (value === undefined && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
            return;
        }
        if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
            return;
        }
        if ((value === null || value === undefined) &&
            this.validatorOptions &&
            this.validatorOptions.skipMissingProperties === true) {
            return;
        }
        this.customValidations(object, value, customValidationMetadatas, validationError);
        this.nestedValidations(value, nestedValidationMetadatas, validationError.children);
        this.mapContexts(object, value, metadatas, validationError);
        this.mapContexts(object, value, customValidationMetadatas, validationError);
    };
    ValidationExecutor.prototype.generateValidationError = function (object, value, propertyName) {
        var validationError = new ValidationError();
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.target === undefined ||
            this.validatorOptions.validationError.target === true)
            validationError.target = object;
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.value === undefined ||
            this.validatorOptions.validationError.value === true)
            validationError.value = value;
        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};
        return validationError;
    };
    ValidationExecutor.prototype.conditionalValidations = function (object, value, metadatas) {
        return metadatas
            .map(function (metadata) { return metadata.constraints[0](object, value); })
            .reduce(function (resultA, resultB) { return resultA && resultB; }, true);
    };
    ValidationExecutor.prototype.customValidations = function (object, value, metadatas, error) {
        var _this = this;
        metadatas.forEach(function (metadata) {
            _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach(function (customConstraintMetadata) {
                if (customConstraintMetadata.async && _this.ignoreAsyncValidations)
                    return;
                if (_this.validatorOptions &&
                    _this.validatorOptions.stopAtFirstError &&
                    Object.keys(error.constraints || {}).length > 0)
                    return;
                var validationArguments = {
                    targetName: object.constructor ? object.constructor.name : undefined,
                    property: metadata.propertyName,
                    object: object,
                    value: value,
                    constraints: metadata.constraints,
                };
                if (!metadata.each || !(Array.isArray(value) || value instanceof Set || value instanceof Map)) {
                    var validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
                    if (isPromise(validatedValue)) {
                        var promise = validatedValue.then(function (isValid) {
                            if (!isValid) {
                                var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                                error.constraints[type] = message;
                                if (metadata.context) {
                                    if (!error.contexts) {
                                        error.contexts = {};
                                    }
                                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                                }
                            }
                        });
                        _this.awaitingPromises.push(promise);
                    }
                    else {
                        if (!validatedValue) {
                            var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                        }
                    }
                    return;
                }
                // convert set and map into array
                var arrayValue = convertToArray(value);
                // Validation needs to be applied to each array item
                var validatedSubValues = arrayValue.map(function (subValue) {
                    return customConstraintMetadata.instance.validate(subValue, validationArguments);
                });
                var validationIsAsync = validatedSubValues.some(function (validatedSubValue) {
                    return isPromise(validatedSubValue);
                });
                if (validationIsAsync) {
                    // Wrap plain values (if any) in promises, so that all are async
                    var asyncValidatedSubValues = validatedSubValues.map(function (validatedSubValue) {
                        return isPromise(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue);
                    });
                    var asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(function (flatValidatedValues) {
                        var validationResult = flatValidatedValues.every(function (isValid) { return isValid; });
                        if (!validationResult) {
                            var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                            if (metadata.context) {
                                if (!error.contexts) {
                                    error.contexts = {};
                                }
                                error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                            }
                        }
                    });
                    _this.awaitingPromises.push(asyncValidationIsFinishedPromise);
                    return;
                }
                var validationResult = validatedSubValues.every(function (isValid) { return isValid; });
                if (!validationResult) {
                    var _b = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _b[0], message = _b[1];
                    error.constraints[type] = message;
                }
            });
        });
    };
    ValidationExecutor.prototype.nestedValidations = function (value, metadatas, errors) {
        var _this = this;
        if (value === void 0) {
            return;
        }
        metadatas.forEach(function (metadata) {
            var _a;
            if (metadata.type !== ValidationTypes.NESTED_VALIDATION && metadata.type !== ValidationTypes.PROMISE_VALIDATION) {
                return;
            }
            if (Array.isArray(value) || value instanceof Set || value instanceof Map) {
                // Treats Set as an array - as index of Set value is value itself and it is common case to have Object as value
                var arrayLikeValue = value instanceof Set ? Array.from(value) : value;
                arrayLikeValue.forEach(function (subValue, index) {
                    _this.performValidations(value, subValue, index.toString(), [], metadatas, errors);
                });
            }
            else if (value instanceof Object) {
                var targetSchema = typeof metadata.target === 'string' ? metadata.target : metadata.target.name;
                _this.execute(value, targetSchema, errors);
            }
            else {
                var error = new ValidationError();
                error.value = value;
                error.property = metadata.propertyName;
                error.target = metadata.target;
                var _b = _this.createValidationError(metadata.target, value, metadata), type = _b[0], message = _b[1];
                error.constraints = (_a = {},
                    _a[type] = message,
                    _a);
                errors.push(error);
            }
        });
    };
    ValidationExecutor.prototype.mapContexts = function (object, value, metadatas, error) {
        var _this = this;
        return metadatas.forEach(function (metadata) {
            if (metadata.context) {
                var customConstraint = void 0;
                if (metadata.type === ValidationTypes.CUSTOM_VALIDATION) {
                    var customConstraints = _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
                    customConstraint = customConstraints[0];
                }
                var type = _this.getConstraintType(metadata, customConstraint);
                if (error.constraints[type]) {
                    if (!error.contexts) {
                        error.contexts = {};
                    }
                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                }
            }
        });
    };
    ValidationExecutor.prototype.createValidationError = function (object, value, metadata, customValidatorMetadata) {
        var targetName = object.constructor ? object.constructor.name : undefined;
        var type = this.getConstraintType(metadata, customValidatorMetadata);
        var validationArguments = {
            targetName: targetName,
            property: metadata.propertyName,
            object: object,
            value: value,
            constraints: metadata.constraints,
        };
        var message = metadata.message || '';
        if (!metadata.message &&
            (!this.validatorOptions || (this.validatorOptions && !this.validatorOptions.dismissDefaultMessages))) {
            if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
                message = customValidatorMetadata.instance.defaultMessage(validationArguments);
            }
        }
        var messageString = ValidationUtils.replaceMessageSpecialTokens(message, validationArguments);
        return [type, messageString];
    };
    ValidationExecutor.prototype.getConstraintType = function (metadata, customValidatorMetadata) {
        var type = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
        return type;
    };
    return ValidationExecutor;
}());

var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Validator performs validation of the given object based on its metadata.
 */
var Validator = /** @class */ (function () {
    function Validator() {
    }
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
    };
    /**
     * Performs validation of the given object based on decorators or validation schema and reject on error.
     */
    Validator.prototype.validateOrReject = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return __awaiter$3(this, void 0, void 0, function () {
            var errors;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length)
                            return [2 /*return*/, Promise.reject(errors)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validateSync = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new ValidationExecutor(this, options);
        executor.ignoreAsyncValidations = true;
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return executor.stripEmptyErrors(validationErrors);
    };
    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------
    /**
     * Performs validation of the given object based on decorators or validation schema.
     * Common method for `validateOrReject` and `validate` methods.
     */
    Validator.prototype.coreValidate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new ValidationExecutor(this, options);
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return Promise.all(executor.awaitingPromises).then(function () {
            return executor.stripEmptyErrors(validationErrors);
        });
    };
    return Validator;
}());

/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
var defaultContainer = new (/** @class */ (function () {
    function class_1() {
        this.instances = [];
    }
    class_1.prototype.get = function (someClass) {
        var instance = this.instances.find(function (instance) { return instance.type === someClass; });
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    };
    return class_1;
}()))();
/**
 * Gets the IOC container used by this library.
 */
function getFromContainer(someClass) {
    return defaultContainer.get(someClass);
}

/**
 * This metadata interface contains information for custom validators.
 */
var ConstraintMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ConstraintMetadata(target, name, async) {
        if (async === void 0) { async = false; }
        this.target = target;
        this.name = name;
        this.async = async;
    }
    Object.defineProperty(ConstraintMetadata.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        /**
         * Instance of the target custom validation class which performs validation.
         */
        get: function () {
            return getFromContainer(this.target);
        },
        enumerable: false,
        configurable: true
    });
    return ConstraintMetadata;
}());

/**
 * Registers a custom validation decorator.
 */
function registerDecorator(options) {
    var constraintCls;
    if (options.validator instanceof Function) {
        constraintCls = options.validator;
        var constraintClasses = getFromContainer(MetadataStorage).getTargetValidatorConstraints(options.validator);
        if (constraintClasses.length > 1) {
            throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
        }
    }
    else {
        var validator_1 = options.validator;
        constraintCls = /** @class */ (function () {
            function CustomConstraint() {
            }
            CustomConstraint.prototype.validate = function (value, validationArguments) {
                return validator_1.validate(value, validationArguments);
            };
            CustomConstraint.prototype.defaultMessage = function (validationArguments) {
                if (validator_1.defaultMessage) {
                    return validator_1.defaultMessage(validationArguments);
                }
                return '';
            };
            return CustomConstraint;
        }());
        getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async));
    }
    var validationMetadataArgs = {
        type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
        target: options.target,
        propertyName: options.propertyName,
        validationOptions: options.options,
        constraintCls: constraintCls,
        constraints: options.constraints,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(validationMetadataArgs));
}

function buildMessage(impl, validationOptions) {
    return function (validationArguments) {
        var eachPrefix = validationOptions && validationOptions.each ? 'each value in ' : '';
        return impl(eachPrefix, validationArguments);
    };
}
function ValidateBy(options, validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
            name: options.name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: options.constraints,
            validator: options.validator,
        });
    };
}

var IS_NOT_EMPTY = 'isNotEmpty';
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function isNotEmpty(value) {
    return value !== '' && value !== null && value !== undefined;
}
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function IsNotEmpty(validationOptions) {
    return ValidateBy({
        name: IS_NOT_EMPTY,
        validator: {
            validate: function (value, args) { return isNotEmpty(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property should not be empty'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_NUMBER = 'isNumber';
/**
 * Checks if a given value is a number.
 */
function isNumber(value, options) {
    if (options === void 0) { options = {}; }
    if (typeof value !== 'number') {
        return false;
    }
    if (value === Infinity || value === -Infinity) {
        return options.allowInfinity;
    }
    if (Number.isNaN(value)) {
        return options.allowNaN;
    }
    if (options.maxDecimalPlaces !== undefined) {
        var decimalPlaces = 0;
        if (value % 1 !== 0) {
            decimalPlaces = value.toString().split('.')[1].length;
        }
        if (decimalPlaces > options.maxDecimalPlaces) {
            return false;
        }
    }
    return Number.isFinite(value);
}
/**
 * Checks if a value is a number.
 */
function IsNumber(options, validationOptions) {
    if (options === void 0) { options = {}; }
    return ValidateBy({
        name: IS_NUMBER,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isNumber(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a number conforming to the specified constraints'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_STRING = 'isString';
/**
 * Checks if a given value is a real string.
 */
function isString(value) {
    return value instanceof String || typeof value === 'string';
}
/**
 * Checks if a given value is a real string.
 */
function IsString(validationOptions) {
    return ValidateBy({
        name: IS_STRING,
        validator: {
            validate: function (value, args) { return isString(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a string'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_ARRAY = 'isArray';
/**
 * Checks if a given value is an array
 */
function isArray(value) {
    return Array.isArray(value);
}
/**
 * Checks if a given value is an array
 */
function IsArray(validationOptions) {
    return ValidateBy({
        name: IS_ARRAY,
        validator: {
            validate: function (value, args) { return isArray(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be an array'; }, validationOptions),
        },
    }, validationOptions);
}

/**
 * Validates given object by object's decorators or given validation schema.
 */
function validate$1(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions);
    }
}

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//const { IsNotEmpty, IsString } = require("class-validator");
var ChatBotConfig = /** @class */ (function () {
    function ChatBotConfig(twitchTokenEndpoint, twitchUsername, twitchClientId, twitchClientSecret, twitchAuthorizationCode, twitchChannel) {
        this.twitchTokenEndpoint = twitchTokenEndpoint;
        this.twitchUser = twitchUsername;
        this.twitchClientSecret = twitchClientSecret;
        this.twitchChannel = twitchChannel;
        this.twitchClientId = twitchClientId;
        this.twitchAuthorizationCode = twitchAuthorizationCode;
    }
    __decorate$1([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchTokenEndpoint", void 0);
    __decorate$1([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchUser", void 0);
    __decorate$1([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchClientId", void 0);
    __decorate$1([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchClientSecret", void 0);
    __decorate$1([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchAuthorizationCode", void 0);
    __decorate$1([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchChannel", void 0);
    return ChatBotConfig;
}());

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import { validate } from "class-validator";
const validate = new classvalidator();
var ConfigValidator = /** @class */ (function () {
    function ConfigValidator() {
    }
    ConfigValidator.readConfig = function (configPath) {
        return __awaiter$2(this, void 0, void 0, function () {
            var completeConfig, completeConfigErrors, err_1;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        const configJson = JSON.parse(fs.readFileSync(configPath));
                        //configJson = JSON.parse(require('fs').readFileSync(configPath));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.info("Validating Config...");
                        completeConfig = new ChatBotConfig(configJson.twitch.token_endpoint, configJson.twitch.username, configJson.twitch.client_id, configJson.twitch.client_secret, configJson.twitch.authorization_code, configJson.twitch.channel);
                        return [4 /*yield*/, validate(completeConfig)];
                    case 2:
                        completeConfigErrors = _a.sent();
                        if (completeConfigErrors.length > 0)
                            throw new InvalidTwitchConfigError("The provided mothership config is not valid, here are the issues: ".concat(completeConfigErrors.join()));
                        console.info("Config is valid.");
                        return [2 /*return*/, completeConfig];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof InvalidTwitchConfigError)
                            console.log(err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ConfigValidator;
}());

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//const { IsArray, IsNotEmpty, IsNumber, IsString } = require('class-validator');
var TwitchTokenDetails = /** @class */ (function () {
    function TwitchTokenDetails(access_token, refresh_token, expires_in_secs, scope, token_type) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in_secs = expires_in_secs;
        this.scope = scope;
        this.token_type = token_type;
    }
    __decorate([
        IsNotEmpty(),
        IsString()
    ], TwitchTokenDetails.prototype, "access_token", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], TwitchTokenDetails.prototype, "refresh_token", void 0);
    __decorate([
        IsNotEmpty(),
        IsNumber()
    ], TwitchTokenDetails.prototype, "expires_in_secs", void 0);
    __decorate([
        IsNotEmpty(),
        IsArray()
    ], TwitchTokenDetails.prototype, "scope", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], TwitchTokenDetails.prototype, "token_type", void 0);
    return TwitchTokenDetails;
}());

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TwitchTokenResponseValidator = /** @class */ (function () {
    function TwitchTokenResponseValidator() {
    }
    TwitchTokenResponseValidator.parseResponse = function (responseBody) {
        return __awaiter$1(this, void 0, void 0, function () {
            var tokenResponse, tokenDetails, completeConfigErrors, err_1;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenResponse = JSON.parse(JSON.stringify(responseBody));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.info("Validating Twitch Response");
                        tokenDetails = new TwitchTokenDetails(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in, tokenResponse.scope, tokenResponse.token_type);
                        return [4 /*yield*/, validate$1(tokenDetails)];
                    case 2:
                        completeConfigErrors = _a.sent();
                        if (completeConfigErrors.length > 0)
                            throw new InvalidTwitchResponseError("The answer from twitch token endpoint is not valid, \n                here are the issues: ".concat(completeConfigErrors.join()));
                        console.info("Twitch Response is valid.");
                        return [2 /*return*/, tokenDetails];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof InvalidTwitchResponseError)
                            console.log(err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TwitchTokenResponseValidator;
}());

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import * as BrowserFS from 'browserfs';
//import { configure } from '/browserfs/dist/node/index';
const fs$1 = BrowserFS.BFSRequire('fs');
var messageCounterMooki = 0;
var TwitchChatBot = /** @class */ (function () {
    function TwitchChatBot(config) {
        this.config = config;
        //axios = require('axios');
        this.tmi = require('tmi.js');
        this.fs = require('fs');
        this.mysql = require('mysql2/promise');
        this.path = require('path');
        this.ArrayList = require('arraylist');
        this.list = [];
        this.QuotesArray = [];
        this.fetch = require('node-fetch');
        this.pool = this.mysql.createPool({
            host: 'localhost',
            user: 'myuser',
            password: 'mypassword',
            database: 'mydatabase'
        });
        this.loadList();
    }
    TwitchChatBot.prototype.loadList = function () {
        var fileName = 'QuoteList.js';
        var fileContents = fs$1.readFileSync(fileName, 'utf-8');
        var list = fileContents.split('\n');
        this.QuotesArray = list;
    };
    TwitchChatBot.prototype.launch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.fetchAccessToken()];
                    case 1:
                        _a.tokenDetails = _b.sent();
                        this.tokenDetails.access_token;
                        this.twitchClient = new this.tmi.Client(this.buildConnectionConfig(this.config.twitchChannel, this.config.twitchUser, this.tokenDetails.access_token));
                        this.setupBotBehavior();
                        this.twitchClient.connect();
                        return [2 /*return*/];
                }
            });
        });
    };
    TwitchChatBot.prototype.fetchAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var axios;
            return __generator(this, function (_a) {
                axios = require('axios');
                // this.refreshTokenIfNeeded();
                console.log("Fetching Twitch OAuth Token");
                return [2 /*return*/, axios({
                        method: 'post',
                        url: this.config.twitchTokenEndpoint,
                        params: {
                            client_id: this.config.twitchClientId,
                            client_secret: this.config.twitchClientSecret,
                            code: this.config.twitchAuthorizationCode,
                            //code: accessToken,
                            grant_type: 'authorization_code',
                            redirect_uri: 'http://localhost',
                        },
                        responseType: 'json'
                    }).then(function (response) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, TwitchTokenResponseValidator.parseResponse(response.data)];
                                    case 1: 
                                    // handle success
                                    return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    }).catch(function (error) {
                        console.log("Failed to get Twitch OAuth Token");
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            throw new TwitchResponseError(error.response.data);
                        }
                        else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            throw new NoTwitchResponseError(error.request);
                        }
                        else {
                            // Something happened in setting up the request that triggered an Error
                            throw new MalformedTwitchRequestError(error.request);
                        }
                    })];
            });
        });
    };
    /*private refreshTokenIfNeeded() {
        const axios = require('axios');
       axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {    grant_type: 'refresh_token',
            refresh_token: "n7rn1b62quvmom2x2vknqw1usx8qh5q9ra54ogt4fo41tk0si8",
            client_id: this.config.twitchClientId,
            client_secret: this.config.twitchClientSecret,  }}).
                then(response => {
                accessToken = response.data.access_token;
                console.log("Accesstoken: ${accessToken}");})
                .catch(error => {  console.error(error);});
    
    //TODO if needed - twitch apparently only requires the token on login so it is good enough for now to just get a token on start-up.
        }*/
    TwitchChatBot.prototype.setupBotBehavior = function () {
        var _this = this;
        this.twitchClient.on('message', function (channel, tags, message, self) {
            if (self)
                return;
            var helloCommand = "!hello";
            var AfroSizeCommand = "!afroSize";
            if (message.startsWith('!ban')) {
                var copiedMessage_1 = message.slice(6);
                _this.twitchClient.say(channel, "WOT! ".concat(tags.username, "! just yeeted ") + copiedMessage_1 + " into the abyss foreva and eva");
            }
            if (message.startsWith('!despair'))
                _this.twitchClient.say(channel, 'Everything is going to be okay my little Pogchamp. Dont break yo little head over it, will you? <3 <3');
            if (channel === 'mukimooki') {
                messageCounterMooki++;
                if (messageCounterMooki === 30) {
                    _this.twitchClient.say(channel, 'QUASO');
                }
            }
            if (message.startsWith('!addDadjoke ') && tags.user === "afronii") {
                var copiedMessage = message.slice(12);
                console.log(copiedMessage);
                if (copiedMessage) {
                    _this.SaveJoke(copiedMessage);
                    _this.twitchClient.say(channel, copiedMessage + ' officially been added');
                }
            }
            //if(message === '!clip')
            //this.handleClipCommand(channel, authorizationCode, tags);
            if (message.startsWith('!so ')) {
                var copiedMessage_2 = message.slice(5);
                _this.twitchClient.say(channel, 'Go check out this lovely bean @' + copiedMessage_2 + ' at twitch.tv/' + copiedMessage_2);
            }
            if (message.startsWith('!join ') && channel === '#afronii') {
                var joinChannel = message.slice(6);
                _this.twitchClient.join(joinChannel);
                _this.twitchClient.say(channel, joinChannel + ' was added');
            }
            else if (message.startsWith('!leave ') && channel === '#afronii') {
                var leaveChannel = message.slice(7);
                _this.twitchClient.part(leaveChannel);
                _this.twitchClient.say(channel, leaveChannel + 'was added');
            }
            if (message.endsWith('Kappa')) {
                _this.twitchClient.say(channel, 'KappaRoss *');
            }
            if (message.startsWith('!dadjoke'))
                _this.giveDadjoke(channel);
            //! means a command is coming by, and we check if it matches the command we currently support
            if (message.startsWith('Right') || message.startsWith('right') || message.endsWith('right?'))
                _this.youRight(channel, tags);
            if (message === helloCommand)
                _this.sayHelloToUser(channel, tags);
            else if (message === AfroSizeCommand)
                _this.afroSize(channel, tags);
        });
    };
    TwitchChatBot.prototype.giveDadjoke = function (channel) {
        var Dadjoke = this.QuotesArray[Math.floor(Math.random() * this.QuotesArray.length)];
        this.twitchClient.say(channel, "" + Dadjoke + "");
    };
    TwitchChatBot.prototype.sayHelloToUser = function (channel, tags) {
        this.twitchClient.say(channel, "Hello, ".concat(tags.username, "! Welcome to the channel."));
    };
    TwitchChatBot.prototype.youRight = function (channel, tags) {
        this.twitchClient.say(channel, "The great me agrees, so you must be right!!! CoolCat ".concat(tags.username, " "));
    };
    TwitchChatBot.prototype.afroSize = function (channel, tags) {
        var Size = Math.floor(Math.random() * 100);
        this.twitchClient.say(channel, "AYO! ".concat(tags.username, " HAS A ") + Size + " METER IN DIAMETER AFRO PogChamp . So proud rn");
    };
    TwitchChatBot.prototype.SaveJoke = function (item) {
        this.QuotesArray.push(item);
        var listString = this.QuotesArray.join('\n');
        fs$1.writeFileSync('QuoteList.js', listString, 'utf-8');
    };
    TwitchChatBot.prototype.handleClipCommand = function (channel, accessToken, tags) {
        var _this = this;
        ({
            'Client-ID': this.config.twitchClientId,
        });
        this.createClip(channel, accessToken)
            .then(function (url) {
            _this.twitchClient.say(channel, "@".concat(tags.username, ", your clip has been created! Watch it here: ").concat(url));
        })
            .catch(function (error) {
            _this.twitchClient.say(channel, "@".concat(tags.username, ", there was an error creating your clip: ").concat(error));
        });
    };
    TwitchChatBot.prototype.fetchBroadcasterId = function (channelName, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.twitch.tv/helix/users?login=".concat(channelName);
                        headers = {
                            'Authorization': "Bearer ".concat(accessToken),
                            'Client-ID': this.config.twitchClientId,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fetch(url, { headers: headers })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        if (typeof data !== 'undefined' && data.data.length > 0) {
                            return [2 /*return*/, data.data[0].id];
                        }
                        else {
                            throw new Error("Channel ".concat(channelName, " not found"));
                        }
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching broadcaster ID for channel ".concat(channelName, ": ").concat(error_1));
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TwitchChatBot.prototype.createClip = function (channelName, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var broadcasterId, url, headers, body, response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.fetchBroadcasterId(channelName, accessToken)];
                    case 1:
                        broadcasterId = _a.sent();
                        url = "https://api.twitch.tv/helix/clips?broadcaster_id=".concat(broadcasterId);
                        headers = {
                            'Authorization': "Bearer ".concat(accessToken),
                            'Client-ID': '<your-client-id>',
                            'Content-Type': 'application/json'
                        };
                        body = {
                            'has_delay': false
                        };
                        return [4 /*yield*/, this.fetch(url, { method: 'Post', headers: headers, body: JSON.stringify(body) })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        if (typeof data !== 'undefined' && data.data.length > 0) {
                            return [2 /*return*/, data.data[0].edit_url];
                        }
                        else {
                            throw new Error('Error creating clip');
                        }
                    case 4:
                        error_2 = _a.sent();
                        console.error("Error creating clip: ".concat(error_2));
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TwitchChatBot.prototype.buildConnectionConfig = function (channel, username, accessToken) {
        return {
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: "".concat(username),
                password: "oauth:".concat(accessToken)
            },
            channels: ["".concat(channel), "".concat("BigBoiMoodyy"), "".concat("Lauroboros")]
        };
    };
    return TwitchChatBot;
}());

ConfigValidator.readConfig(('./config.json'))
    .then(function (config) { return new TwitchChatBot(config).launch(); });
