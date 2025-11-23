namespace Types {
    export const valtype = ['string', 'number', 'boolean', 'object', 'array'];
}

function inPlainObject(obj: any): boolean {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export class AnotherJSONModuleValidator {
    private errosMessage: string[];
    private warningsMessage: string[];

    constructor() {
        this.errosMessage = [];
        this.warningsMessage = [];
    }

    public getErrors(): string[] {
        return this.errosMessage;
    }

    public getWarnings(): string[] {
        return this.warningsMessage;
    }

    public validator(module: JSONModuleObject | JSONModuleArray, base: any): boolean {
        if (typeof module !== 'object' || module === null) {
            this.errosMessage.push('Module must be a non-null object');
            return false;
        }

        if(!inPlainObject(base)) {
            this.errosMessage.push('Base must be a non-null object');
            return false;
        }

        switch (module.type) {
            case 'object':
                return this.validateObjectModule(module, base);
            case 'array':
                return this.validateArrayModule(module, base);
            default:
                this.errosMessage.push(`Invalid module type: ${(module as any).type}`);
                break;
        }

        return false;
    }

    private validateObjectModule(module: JSONModuleObject, base: any): boolean {
        const keys = Object.keys(base);

        for (const req of module.required || []) {

            if (keys.indexOf(req) < 0) {
                this.errosMessage.push(`Required property '${req}' is missing in base object`);
                continue;
            }
        }

        for (const key of keys) {
            const property = module.properties[key];

            if (module.required) {
                if(!module.required.includes(key)) {
                    if(module.requiredTypes) {
                        this.errosMessage.push(`Property '${key}' must be included in required array when requiredTypes is true`);
                    } else {
                        this.warningsMessage.push(`Property '${key}' is not defined in module properties`);
                    }
                    continue;
                }
            }

            if (Types.valtype.includes(property.type)) {
                if (property.type === 'object') {
                    if(!inPlainObject(base[key])) {
                        this.errosMessage.push(`Property '${key}' is expected to be an object`);
                        continue;
                    }
                    this.validateObjectModule(property as JSONModuleObject, base[key]);

                } else if (property.type === 'array') {
                    if(!Array.isArray(base[key])) {
                        this.errosMessage.push(`Property '${key}' is expected to be an array`);
                        continue;
                    }
                    this.validateArrayModule(property as JSONModuleArray, base[key]);
                } else {
                    if(Types.valtype.indexOf(typeof base[key]) < 0) {
                        this.errosMessage.push(`Property '${key}' is expected to be of type '${property.type}'`);
                        continue;
                    }
                }
            } else {
                this.errosMessage.push(`Invalid property type for key '${key}': ${property.type}`);
            }
        }

        return this.errosMessage.length === 0;
    }

    private validateArrayModule(module: JSONModuleArray, base: any): boolean {
        //console.log(module);

        if (module.limitedItems) {
            if (typeof module.minItems === 'number' && base.length < module.minItems) {
                this.errosMessage.push(`Array has fewer items (${base.length}) than the minimum required (${module.minItems})`);

            } else if (typeof module.maxItems === 'number' && base.length > module.maxItems) {
                this.errosMessage.push(`Array has more items (${base.length}) than the maximum allowed (${module.maxItems})`);
            }
        }

        for (let i = 0; i < base.length; i++) {
            const item = base[i];

            if (Types.valtype.includes(module.items.type)) {
                if (module.items.type === 'object') {
                    if(!inPlainObject(item)) {
                        this.errosMessage.push(`Array item at index ${i} is expected to be an object`);
                        continue;
                    }
                    this.validateObjectModule(module.items as JSONModuleObject, item);

                } else if (module.items.type === 'array') {
                    if(!Array.isArray(item)) {
                        this.errosMessage.push(`Array item at index ${i} is expected to be an array`);
                        continue;
                    }
                    this.validateArrayModule(module.items as JSONModuleArray, item);
                } else {
                    if(Types.valtype.indexOf(typeof item) < 0) {
                        this.errosMessage.push(`Array item at index ${i} is expected to be of type '${module.items.type}'`);
                        continue;
                    }
                }
            } else {
                this.errosMessage.push(`Invalid item type in array module: ${module.items.type}`);
            }
        }

        return this.errosMessage.length === 0;
    }
}