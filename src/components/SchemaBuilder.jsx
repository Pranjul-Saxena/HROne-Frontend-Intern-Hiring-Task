import React, { useState } from 'react';
import { Button, Row, Col, Tabs, Divider } from 'antd';
import FieldRow from './FieldRow';
import { generateSchema } from '../utils/generateSchema';


const SchemaBuilder = () => {
    const [fields, setFields] = useState([]);

    const addField = () => {
        setFields([...fields, { key: '', type: 'string', children: [] }]);
    };

    const updateField = (index, updatedField) => {
        const newFields = [...fields];
        newFields[index] = updatedField;
        setFields(newFields);
    };

    const deleteField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleSubmit = () => {
        const schema = generateSchema(fields);
        console.log('Submitted Schema:', schema);
        alert('Schema submitted successfully!\n' + JSON.stringify(schema, null, 2));
    };

    const handleDownload = () => {
        const schema = generateSchema(fields);
        const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'schema_file.json';
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div style={{ position: 'relative', zIndex: 10 }}>
                <h1 style={{ textAlign: 'center', marginBottom: 40 }}>
                    JSON Schema Builder
                </h1>

                <Tabs defaultActiveKey="builder" centered size="large">

                    <Row gutter={32} style={{ display: 'flex', padding: '20px', gap: '10px', margin: '5px' }}>
                        <Col xs={24} md={14}>
                            <div
                                style={{
                                    background: '#ffffff',
                                    padding: '24px',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
                                }}
                            >
                                {fields.map((field, index) => (
                                    <FieldRow
                                        key={index}
                                        field={field}
                                        onChange={(updatedField) => updateField(index, updatedField)}
                                        onDelete={() => deleteField(index)}
                                    />
                                ))}

                                <Button
                                    onClick={addField}
                                    type="default"
                                    block
                                    size="middle"
                                    style={{
                                        marginTop: 24,
                                        backgroundColor: '#e0e7ecff',
                                        color: '#1770edff',
                                        borderColor: '#7cb8ddff',
                                        fontWeight: '500',
                                    }}
                                >
                                    + Add Field
                                </Button>

                                <Divider style={{ margin: '24px 0' }} />

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Button
                                            type="primary"
                                            size="middle"
                                            block
                                            onClick={handleSubmit}
                                            style={{
                                                backgroundColor: '#1677ff',
                                                fontWeight: 'bold',
                                                padding: '8px 0',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Submit Schema
                                        </Button>
                                    </Col>

                                    <Col span={12}>
                                        <Button
                                            type="default"
                                            size="middle"
                                            block
                                            onClick={handleDownload}
                                            style={{
                                                backgroundColor: '',
                                                color: '',
                                                borderColor: '#b7eb8f',
                                                fontWeight: 'bold',
                                                padding: '8px 0',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Download Schema
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        {/* JSON Preview */}
                        <Col xs={24} md={10}>
                            <div
                                style={{
                                    background: '#ffffff',
                                    padding: '0px',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                    minHeight: 300,
                                    maxHeight: 500,
                                    overflow: 'auto',
                                }}
                            >
                                <h3 style={{ margin: 16 }}>
                                    Live JSON Preview
                                </h3>
                                <pre
                                    style={{
                                        background: '#f9f9f9',

                                        padding: '12px',
                                        borderRadius: '8px',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {JSON.stringify(generateSchema(fields), null, 2)}
                                </pre>
                            </div>
                        </Col>
                    </Row>
                </Tabs>
            </div>
        </div>
    );
};

export default SchemaBuilder;