import { AnotherJSONModuleValidator } from "./ajmv.class.js"

const JsonModule:JSONModuleObject = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        year: { type: 'number' },
        tags: {
            type: 'object',
            properties: {
                staff: {
                    type: 'array',
                    items: { type: 'string' }
                }
            }
        },
        arr: {
            type: 'array',
            items: { type: 'number' }
        }
    },
    required: ['name', 'tags', 'arr'],
    requiredTypes: true
}

const ajmv = new AnotherJSONModuleValidator();

const baseValid = {
    name: 'verty',
    tags: {
        staff: ['Owner', 'Manager', 'Developer']
    },
    arr: [1, 2, 3, 4, 5]
}

if(!ajmv.validator(JsonModule, baseValid)) {
    console.log('Errors:', ajmv.getErrors().join('\n'));
    process.exit();
}

console.log('ALL_OK');
console.log('Warnings:', ajmv.getWarnings().join('\n'));