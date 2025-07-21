import React from 'react';
import { Input, Select, Button, Space } from 'antd';

const { Option } = Select;

const FieldRow = ({ field, onChange, onDelete }) => {
    const updateKey = (e) => onChange({ ...field, key: e.target.value });
    const updateType = (value) => {
        const updated = { ...field, type: value };
        if (value !== 'nested') updated.children = [];
        onChange(updated);
    };

    const addNestedField = () => {
        onChange({
            ...field,
            children: [...(field.children || []), { key: '', type: 'string', children: [] }],
        });
    };

    const updateNestedField = (index, nestedField) => {
        const updatedChildren = [...(field.children || [])];
        updatedChildren[index] = nestedField;
        onChange({ ...field, children: updatedChildren });
    };

    const deleteNestedField = (index) => {
        const updatedChildren = [...field.children];
        updatedChildren.splice(index, 1);
        onChange({ ...field, children: updatedChildren });
    };

    return (
        <div style={{ marginBottom: 12, paddingLeft: 16, borderLeft: '3px solid #ccc' }}>
            <Space style={{ marginBottom: 8 }}>
                <Input
                    placeholder="Field Name"
                    value={field.key}
                    onChange={updateKey}
                    style={{ width: 200 }}
                />
                <Select value={field.type} onChange={updateType} style={{ width: 150 }} placeholder="Field Type">
                    <Option value="string">string</Option>
                    <Option value="number">number</Option>
                    <Option value="float">float</Option>
                    <Option value="boolean">boolean</Option>
                    <Option value="objectId">objectId</Option>
                    <Option value="array">array</Option>
                    <Option value="nested">nested</Option>
                </Select>
                <Button danger onClick={onDelete}>
                    Delete
                </Button>
            </Space>

            {field.type === 'nested' && (
                <div style={{ marginTop: 8, paddingLeft: 24 }}>
                    {field.children.map((child, index) => (
                        <FieldRow
                            key={index}
                            field={child}
                            onChange={(updatedChild) => updateNestedField(index, updatedChild)}
                            onDelete={() => deleteNestedField(index)}
                        />
                    ))}
                    <Button onClick={addNestedField} size="small" style={{ marginTop: 8 }}>
                        + Add Nested Field
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FieldRow;