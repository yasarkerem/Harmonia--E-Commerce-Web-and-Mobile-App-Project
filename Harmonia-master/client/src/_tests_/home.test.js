import React from 'react';
 
import ReactDOM from "react-dom"
import { inferTo } from '@react-spring/core';
import { fireEvent, render } from "@testing-library/react"
import Home from './../Pages/Home';
import {accountType,isLoggedIn} from './../Pages/Account'; 

import Account from './../Pages/Account'; 

beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });
  
  describe("navbar elements", ()=>{
    it("navbar",()=>{
        const {queryByTitle} = render(<Home />);
        const btn = queryByTitle("b1");
        expect(btn.innerHTML).toBe("Home");
    });
    it("navbar2",()=>{
        const {queryByTitle} = render(<Home />);
        const btn = queryByTitle("b2");
        expect(btn.innerHTML).toBe("Products");
    });
    
    it("loggin-in", ()=> {
      
    });
    it("navbar after logged-in",async ()=> {
      const {queryByTitle} = render(<Account/>);
      const input1 = queryByTitle("email");
      fireEvent.change(input1,{target:{value: "jesus@christ.god"}});
      const input2 = queryByTitle("password");
      fireEvent.change(input2,{target:{value: "omgjesus"}});
      const btn = queryByTitle("dummyButton");
      fireEvent.click(btn);
      console.log(await isLoggedIn);
      console.log(await accountType);
      });
  })

 