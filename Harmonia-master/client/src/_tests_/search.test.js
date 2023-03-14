import React from 'react';
 
import ReactDOM from "react-dom"
import { inferTo } from '@react-spring/core';
import { fireEvent, render } from "@testing-library/react"
import Products from './../Pages/Products';


beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });

it("searchrendercheck",()=>{
    const {queryByTitle} = render(<Products />);
    const input = queryByTitle("search");
    expect(input).toBeTruthy();
})

describe("changInInput", ()=>{
    it("onChange",()=>{
        const {queryByTitle} = render(<Products/>);
        const input = queryByTitle("search");
        fireEvent.change(input,{target:{value: "testValue"}});
        expect(input.value).toBe("testValue");

    })

})