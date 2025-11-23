 # AJMV - Another JSON Module Validator

 Validate JavaScript/JSON objects against compact, schema-like module definitions.

 ## Description

 AJMV (Another JSON Module Validator) is a lightweight TypeScript/JavaScript library for validating objects using simplified module definitions similar to JSON Schema. It supports declaring types, required properties, nested objects, arrays, and item constraints—useful for both Node.js and browser projects.

 ## Installation

 Clone the repository and install dependencies:

 ```bash
 npm install
 ```

 ## Build (Distribution)

 To generate minified distribution files for multiple targets (CommonJS, ESM, UMD):

 ```bash
 npm run build
 ```

 Build artifacts are written to the `dist/` folder.

 ## Basic Usage

 ```typescript
 import { AnotherJSONModuleValidator } from './ajmv.class.js';

 const ajmv = new AnotherJSONModuleValidator();

 const ModuleObject: JSONModuleObject = {
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
 };

 const baseValid = {
   name: 'Verty',
   tags: {
     staff: ['Owner', 'Manager', 'Developer']
   },
   arr: [1, 2, 3, 4, 5]
 };

 if (!ajmv.validator(ModuleObject, baseValid)) {
   console.log('Errors:', ajmv.getErrors().join('\n'));
   process.exit(1);
 }

 console.log('ALL_OK');
 console.log('Warnings:', ajmv.getWarnings().join('\n'));
 ```

 ## API

 - `validator(module, base)`: Validate the `base` object against the provided module definition.
 - `getErrors()`: Returns an array of error messages from the last validation.
 - `getWarnings()`: Returns an array of warnings from the last validation.

 ## Module Types

 See `src/globa.d.ts` for type definitions and examples.

 ## Next Update

 - A function for parsing and generating a module.

 ## License

 [MIT](https://github.com/W-verty/AJMV/tree/main?tab=MIT-1-ov-file)