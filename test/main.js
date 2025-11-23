const { AnotherJSONModuleValidator } = require("../dist/ajmv.cjs.js");

const JsonModule = {
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
    required: ['name', 'year', 'tags', 'arr'],
    requiredTypes: true
};

const ajmv = new AnotherJSONModuleValidator();

const baseValid = {
    name: 'verty',
    year: 2000,
    tags: {
        staff: ['admin', 'editor']
    },
    arr: [1, 2, 3, 4, 5]
};

if (ajmv.validator(JsonModule, baseValid)) {
    console.log('ALL_OK');
}
else {
    console.log('Errors:', ajmv.getErrors().join('\n'));
}
