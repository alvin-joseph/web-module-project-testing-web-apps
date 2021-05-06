import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const emailInput = () => screen.getByLabelText(/email/i);
const firstnameInput = () => screen.getByLabelText(/first name/i);
const lastnameInput = () => screen.getByLabelText(/last name/i);
const messageInput = () => screen.getByLabelText(/message/i);
const button = () => screen.getByRole("button");

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    //header exists
    const header = screen.getByText('Contact Form');
    //asserts
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    //type into input
    userEvent.type(firstnameInput(), "fred");
    //find error
    const firstnameError = await screen.findByTestId("error");
    //console.log(firstnameError);
    //assert
    expect(firstnameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    //locate and click submit button
    userEvent.click(button());
    //error messages populate
    const contactError = await screen.findAllByTestId("error");
    //console.log(contactError);
    //assert
    expect(contactError[0]).toBeInTheDocument();
    expect(contactError[1]).toBeInTheDocument();
    expect(contactError[2]).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    //type into first and last name
    userEvent.type(firstnameInput(), "freddie");
    userEvent.type(lastnameInput(), "mercury");

    //find and click button
    userEvent.click(button());
    //find error
    const emailError = await screen.findByTestId("error");
    //console.log(emailError);
    //assert
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    //find and type in email input
    userEvent.type(emailInput(), "blablablabla");
    //console.log(emailInput());
    
    //find error message
    const emailError = await screen.findByText("Error: email must be a valid email address.");
    //assert
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    //type into firstname and email
    userEvent.type(firstnameInput(), "freddie");
    userEvent.type(emailInput(), "email@email.com");

    //find and click button
    userEvent.click(button());

    //find error message
    const lastnameError = await screen.findByText("Error: lastName is a required field.")
    //assert
    expect(lastnameError).toBeInTheDocument();
    //console.log(lastnameError);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    //falsy
    //not exist in the document
    //Message:does not exist

    render(<ContactForm/>);
    //type into first/last/email
    userEvent.type(firstnameInput(), "freddie");
    userEvent.type(lastnameInput(), "mercury");
    userEvent.type(emailInput(), "email@email.com");

    //find and click button
    userEvent.click(button());

    //find first/last/email submit
    const firstnameOutput = await screen.findByText("First Name:")
    const lastnameOutput = await screen.findByText("Last Name:")
    const emailOutput = await screen.findByText("Email:")

    //see if message exists
    const messageOutput = screen.queryByText("Message:");

    //assert
    expect(firstnameOutput).toBeInTheDocument();
    expect(lastnameOutput).toBeInTheDocument();
    expect(emailOutput).toBeInTheDocument();

    expect(messageOutput).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    //type into first/last/email/message
    userEvent.type(firstnameInput(), "freddie");
    userEvent.type(lastnameInput(), "mercury");
    userEvent.type(emailInput(), "email@email.com");
    userEvent.type(messageInput(), "blablablablabla");

    //find and click button
    userEvent.click(button());

    //find first/last/email submit
    const firstnameOutput = await screen.findByText("First Name:")
    const lastnameOutput = await screen.findByText("Last Name:")
    const emailOutput = await screen.findByText("Email:")
    const messageOutput = await screen.findByText("Message:")

    //assert
    expect(firstnameOutput).toBeInTheDocument();
    expect(lastnameOutput).toBeInTheDocument();
    expect(emailOutput).toBeInTheDocument();
    expect(messageOutput).toBeInTheDocument();
    //console.log(messageOutput);
});