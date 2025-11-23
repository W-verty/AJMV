# AJMV - Another JSON Module Validator

Valide objetos JavaScript/JSON contra módulos de definição de tipos de forma simples e flexível.

## Descrição

AJMV (Another JSON Module Validator) é uma biblioteca TypeScript/JavaScript para validação de objetos com base em módulos de definição semelhantes a JSON Schema, mas com sintaxe simplificada. Permite definir tipos, propriedades obrigatórias, arrays e restrições de itens, facilitando a validação de dados em aplicações Node.js ou front-end.

## Instalação

Clone este repositório e instale as dependências:

```bash
npm install
```

## Build (Distribuição)

Para gerar os arquivos de distribuição minificados para múltiplas plataformas (CommonJS, ESM, UMD):

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## Uso Básico

```typescript
import { AnotherJSONModuleValidator } from "./ajmv.class.js"

const ajmv = new AnotherJSONModuleValidator();

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
```

## API

- `validator(module, base)`: Valida o objeto `base` conforme o módulo de definição.
- `getErrors()`: Retorna um array de mensagens de erro da última validação.

## Tipos de Módulo

Veja exemplos e tipos em `src/globa.d.ts`.

## Licença

[MIT](https://github.com/W-verty/AJMV/tree/main?tab=MIT-1-ov-file)