import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import ReactDOM from "react-dom"


beforeEach(() => {
  jest.spyOn(console, 'error')
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore()
})
it("renders without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<App/>,div);
  ReactDOM.unmountComponentAtNode(div);
});
