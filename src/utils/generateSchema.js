export const generateSchema = (fields) => {
    const schema = {};

    fields.forEach((field) => {
        if (!field.key) return;

        if (field.type === 'string') {
            schema[field.key] = "string";
        } else if (field.type === 'number') {
            schema[field.key] = 0;
        } else if (field.type === 'nested') {
            schema[field.key] = generateSchema(field.children);
        }
    });

    return schema;
};