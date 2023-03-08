import React, { useState } from "react";

import { useForm } from "react-hook-form"
import { Navbar } from "./navbar";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

const MySupport = () =>{

    const initState = {
        firstLast:"",
        email:"",
        contactNumber:"",
    };

    const [initialValues, setInitialValues] = useState(initState)
    const onSubmit =(values) =>{
        console.log("Values:::", values);
        console.log("Values:::", JSON.stringify(values));
    };

    const onError= (error) =>{
        console.log("ERROR:::", error)
    };


    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: {errors}
    } = useForm({
        mode:"onTouched",
        reValidateMode:"onSubmit",
        defaultValues:initialValues
    });



    return(
        <Container>
            <h1 className="footer mt-auto py-3 text-center" style={{ color: "white" }}>How can we help?</h1>
            <Form onSubmit={handleSubmit(onSubmit,onError)} style={{ color: "white" }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>First and Last Name</Form.Label>
                    <Form.Control type="text"  placeholder="" {...register("firstLast",{required: "Please enter your first and last name."})}></Form.Control>
                    {errors.firstLast && (
                        <Form.Text className="text-danger">
                            {errors.firstLast.message}
                        </Form.Text>
                    )}<br/>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="" {...register("email",{required:"Please enter a valid email."})}></Form.Control>
                    {errors.email &&(
                        <Form.Text className="text-danger">
                            {errors.email.message}
                        </Form.Text>
                    )}
                    <br/>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="number" placeholder="" {...register("contactNumber", {required:"Please enter a valid phone number."})}></Form.Control>
                    {errors.contactNumber &&(
                        <Form.Text className="text-danger">
                            {errors.contactNumber.message}
                        </Form.Text>
                    )}
                    <br/>
                    <Form.Label>Please describe the issue you are having.</Form.Label>
                    <Form.Control type="text" placeholder=""></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export {MySupport as Support};