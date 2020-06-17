import React, {useEffect, useState} from 'react';
import {Col, FormGroup, Input, Label, Row} from "reactstrap";

const CustomInput = (props: any) => {
    const {type} = props;
    const [value, setValue] = useState(props.value);
    const onChange = (e: any) => {
        setValue(e.target.value);
        props.onChange(e);
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.value]);
    return (
        <Row>
            <Col md="4" {...props.labelContainer}>
                <Label size="sm" htmlFor={props.name}>{props.label}:</Label>
            </Col>
            <Col xs="12" md="6" {...props.inputContainer}>
                {type === 'textarea' && <textarea
                    rows={props.rows || 3}
                    id={props.name} name={props.name} className={`input-sm ${props.className}`}
                    placeholder={props.placeholder}
                    value={value}
                    onChange={onChange}
                />}
                {type === 'radio' && <RadioItems {...props} value={value} onChange={onChange}/>}
                {type !== 'textarea' && type !== 'radio' && <Input
                    type={type || "text"}
                    bsSize="sm" id={props.name} name={props.name} className="input-sm"
                    placeholder={props.placeholder}
                    value={value}
                    // defaultValue={props.value}
                    onChange={onChange}
                >{props.children}</Input>}
            </Col>
        </Row>
    );
}
let Text, Password, Date;
Text = Password = Date = (props: any) => (
    <CustomInput {...props} />
);
const Select = (props: any) => (
    <CustomInput {...props} type={'select'}>
        {props.firstOptionText && <option value="">{props.firstOptionText}</option>}
        {(props.optionsData || []).map((option: any, index: number) => (
            <option value={option.value} key={option.value}>{option.text}</option>
        ))}
    </CustomInput>
);

const RadioItems = (props: any) => (
    (props.itemsData || []).map((item: any, index: number) => (
        <FormGroup
            key={String(index)}
            check={true}
            inline={props.inline}
            className='mt-1'>
            <Input
                className="form-check-input"
                type="radio" id={props.prefix + item.value} name={props.name}
                value={item.value} onChange={props.onChange}
                checked={props.value === item.value}
            />
            <Label className="form-check-label" htmlFor={props.prefix + item.value}>{item.text}</Label>
        </FormGroup>
    ))
)

const Radio = (props: any) => (<CustomInput {...props} type={'radio'}/>)

const TextArea = (props: any) => <CustomInput {...props} type={'textarea'}/>;

export default {
    Text,
    Password,
    Date,
    TextArea,
    Select,
    Radio
};
