/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    overflow: scroll;
`;

const Table = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 0.8rem;
    margin: 10px auto 45px;
    text-align: left;
    max-width: 1100px;
    width: 100%;

    th, td {
        padding: 10px 20px;
        border: 1px solid #dfdfdf;
    }

    th {
        letter-spacing: 1px;
    }

    tr {
        background-color: #fff;
    }

    tr:nth-child(2n) {
        background-color: #f5f5f5;
    }
`;

const Input = styled.input`
    width: 140px;
`;

function Knobs(props) {
    const fields = {
        bool: ({ current, name }) => (
            <Input
                type="checkbox"
                checked={current}
                onChange={e => props.onChange(name, e.target.checked)}
            />
        ),
        number: ({ current, max, min, name, step }) => (
            <Input
                type="number"
                defaultValue={current}
                max={max}
                min={min}
                onBlur={e => props.onChange(name, e.target.value)}
                step={step}
            />
        ),
        Object: ({ current }) => (
            <span>{current || '-'}</span>
        ),
        string: ({ current, name }) => (
            <Input
                type="text"
                defaultValue={current}
                onBlur={e => props.onChange(name, e.target.value)}
            />
        ),
        default: ({ current, name, type }) => (
            <Input
                type={type}
                defaultValue={current}
                onBlur={e => props.onChange(name, e.target.value)}
            />
        ),
    };

    return (
        <Root>
            <Table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Current</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.entries(props.knobs).map((entry) => {
                        const name = entry[0];
                        const options = entry[1];
                        const makeField = fields[options.type] || fields.default;
                        const field = makeField({ ...options, name });
                        const defaultValue = options.type === 'string' && options.default
                            ? `'${options.default}'`
                            : `${options.default}`;

                        return (
                            <tr key={name}>
                                <td>{name}</td>
                                <td>{options.type}</td>
                                <td>{defaultValue}</td>
                                <td>{field}</td>
                                <td>{options.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Root>
    );
}

export default Knobs;
