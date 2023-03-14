import React,{useEffect, useState}  from 'react';
import { shallow } from 'enzyme';
import Account from './../Pages/Account'; 
import ReactDOM from "react-dom"
import { inferTo } from '@react-spring/core';
import { render ,fireEvent} from "@testing-library/react"


beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });
  
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Account></Account>,div);
});

//check button is successfully rendered
it("check log-reg animation button", () =>{
    const {queryByTitle} = render(<Account />);
    const btn = queryByTitle("dummyButton");
    expect(btn).toBeTruthy();


})

//check login button text
describe("clickButton1", ()=>{
    it("onClick", ()=>{
        const {queryByTitle} = render(<Account/>);
        const btn = queryByTitle("navbutton");
        expect(btn.innerHTML).toBe("Login");

    })

})

//check register button text
describe("clickButton2", ()=>{
    it("onClick", ()=>{
        const {queryByTitle} = render(<Account />);
        const btn = queryByTitle("navbutton2");
        expect(btn.innerHTML).toBe("Register");
    })
});


describe("userCheck cases" , () => {
   
    test('wrong email',() =>{
        const {queryByTitle} = render(<Account/>);
        const input1 = queryByTitle("email");
        fireEvent.change(input1,{target:{value: "taon@gmail.com"}});
        const input2 = queryByTitle("password");
        fireEvent.change(input2,{target:{value: "tkasdsdsaad"}});
        const btn = queryByTitle("dummyButton");
        fireEvent.click(btn);
       });



    test('correct email, wrong password', async() =>{

        const {queryByTitle} = render(<Account/>);
        const input1 = queryByTitle("email");
        fireEvent.change(input1,{target:{value: "merto@gmail.com"}});
        const input2 = queryByTitle("password");
        fireEvent.change(input2,{target:{value: "12321312"}});
        const btn = queryByTitle("dummyButton");
        fireEvent.click(btn);

    });
    test('valid account', async() =>{

        const {queryByTitle} = render(<Account/>);
        const input1 = queryByTitle("email");
        fireEvent.change(input1,{target:{value: "jesus@christ.god"}});
        const input2 = queryByTitle("password");
        fireEvent.change(input2,{target:{value: "omgjesus"}});
        const btn = queryByTitle("dummyButton");
        fireEvent.click(btn);

    });

})






