
type JSONModuleVals = 'string' | 'number' | 'boolean' | 'array' | 'object'

interface JSONModuleArray {
    type: 'array'
    items: {
        type: JSONModuleVals,
        items?: JSONModuleArray | JSONModuleObject
    } | JSONModuleObject
    limitedItems?: boolean
    minItems?: number
    maxItems?: number
}

interface JSONModuleObject {
    type: 'object'
    properties: {
        [key:string]: JSONModuleArray | JSONModuleObject | { type: JSONModuleVals }
    }
    required?: string[]
    requiredTypes: boolean
}