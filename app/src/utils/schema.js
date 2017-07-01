const standardSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    x: {
      type: 'number'
    },
    y: {
      type: 'number',
    },
    groupId: {
      type: 'number'
    }
  },
  required: ['id', 'x', 'y', 'groupId'],
  additionalProperties: false
}

const imageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    x: {
      type: 'number'
    },
    y: {
      type: 'number',
    }
  },
  required: ['id', 'x', 'y'],
  additionalProperties: false
}

const groupSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    color: {
      type: 'string'
    }
  },
  required: ['id', 'color'],
  additionalProperties: false
}

export const fileSchema = {
  type: 'object',
  properties: {
    standards: {
      type: 'array',
      items: standardSchema
    },
    images: {
      type: 'array',
      items: imageSchema
    },
    groups: {
      type: 'array',
      items: groupSchema
    }
  },
  additionalProperties: false
}
