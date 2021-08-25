import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Header from "./Header";

export const App = () => (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
