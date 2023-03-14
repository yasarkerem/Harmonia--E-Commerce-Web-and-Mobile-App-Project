import React from 'react';
 
import ReactDOM from "react-dom"
import { inferTo } from '@react-spring/core';
import { fireEvent, render } from "@testing-library/react"
import Products from './../Pages/Products';
import Navbar from './../Pages/navbar';
import Account from './../Pages/Account';
import Cart from './../Pages/cart'; 
import Orders from './../Pages/orders';
import Logout from './../Pages/logout';
import Home from './../Pages/logout';
import PageNotFound from './../Pages/PageNotFound';
beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  });


  //NAVBAR TESTS
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Navbar></Navbar>,div);
});



it("check navbar buttons - 1", () =>{
    const {queryByTitle} = render(<Navbar />);
    const btn = queryByTitle("b1");
    expect(btn).toBeTruthy();


})

it("check navbar buttons - 2", () =>{
    const {queryByTitle} = render(<Navbar />);
    const btn = queryByTitle("b2");
    expect(btn).toBeTruthy();


})
it("check navbar buttons - 3", () =>{
    const {queryByTitle} = render(<Navbar />);
    const btn = queryByTitle("b3");
    expect(btn).toBeTruthy();


})
it("check navbar buttons - 4", () =>{
    const {queryByText} = render(<Navbar />);
    const btn = queryByText("Log Out");
    expect(btn).toBeTruthy();


})
it("check navbar buttons - 5", () =>{
    const {queryByText} = render(<Navbar />);
    const btn = queryByText("Orders");
    expect(btn).toBeTruthy();


})
it("check navbar buttons - 6", () =>{
    const {queryByText} = render(<Navbar />);
    const btn = queryByText("Log In/Sign Up");
    expect(btn).toBeTruthy();
})

it("check navbar buttons - 7", () =>{
    const {queryByText} = render(<Navbar />);
    const btn = queryByText("Show Requests");
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


//cart tests

it("crash test cart", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Cart></Cart>,div);
});

describe("Check Message", ()=>{
    it("onClick", ()=>{
        const {queryByRole} = render(<Account/>);
        const btn = queryByRole("p");
        expect(btn.innerHTML).toBe("Our Purpose Is To Sustainably Make the Pleasure.");
    })
});

//cart tests

it("crash test products", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Products></Products>,div);
});

describe("Check products message", ()=>{
    it("onClick", ()=>{
        const {queryByRole} = render(<Products/>);
        const btn = queryByRole("p");
        expect(btn.innerHTML).toBe("Our Purpose Is To Sustainably Make the Pleasure.");
    })
});

describe("userCheck cases" , () => {
   
    test('search elm',() =>{
        const {queryByPlaceholderText} = render(<Products/>);
        const input1 = queryByPlaceholderText("Type to search");
        fireEvent.change(input1,{target:{value: "Zeon"}});
       
        expect(input1.innerHTML).toBe("Zeon");
       });



})

test('bar exist',() =>{
    const {queryByTitle} = render(<Products/>);
    const input1 = queryByTitle("search");
    fireEvent.change(input1,{target:{value: "Zeon"}});
   
    expect(input1).toBeTruthy();
   });


   //logout tests
   it("logout test - 1 (home text)", () =>{
    const {queryByText} = render(<Logout />);
    const btn = queryByText("Home");
    expect(btn).toBeTruthy();
})

it("logout test - 2 (logo)", () =>{
    const {queryByRole} = render(<Logout />);
    const btn = queryByRole("Logo");
    fireEvent.click(btn);
    expect(btn).toBeTruthy();


})

//Page Not Found Test
it("PNF test - 1", () =>{
    const {queryByText} = render(<PageNotFound />);
    const btn = queryByText("Sorry");
    expect(btn).toBeTruthy();
})

it("pNF test - 1", () =>{

    const {queryByRole} = render(<Logout />);
    const btn = queryByRole("Logo");
    expect(btn).toBeTruthy();


})

//Home Test

it("Home test - 1", () =>{
    const {queryByText} = render(<Home />);
    const btn = queryByText("Give Yourself");
    expect(btn).toBeTruthy();

    
})

it("Home test - 2", () =>{
    const {queryByText} = render(<Home />);
    const btn = queryByText("A New Style!");
    expect(btn).toBeTruthy();


})

it("Home test - 3", () =>{
    const {queryByText} = render(<Home />);
    const btn = queryByText("Exclusively Available on Hermonia");
    expect(btn).toBeTruthy();


})

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

describe("clickButton11", ()=>{
    it("onClick", ()=>{
        const {queryByTitle} = render(<Account/>);
        const btn = queryByTitle("navbutton");
        expect(btn.innerHTML).toBe("Login");

    })

})

//check register button text
describe("clickButton22", ()=>{
    it("onClick", ()=>{
        const {queryByTitle} = render(<Account />);
        const btn = queryByTitle("navbutton2");
        expect(btn.innerHTML).toBe("Register");
    })
});