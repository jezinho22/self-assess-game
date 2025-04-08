"use client";

import { createContext, useState, useEffect } from "react";

// here we are creating our context that the user will use later
export const LandingContext = createContext(0);

// here we are creating our provider )the thing that wraps around our whole App)
export function LandingProvider({ children }) {
	// declare our state variables as normal, but within the provider itself
	const [landingMessage, setLandingMessage] = useState("Hello!!!");
	useEffect(() => {
		setLandingMessage("Wowsers");
	}, []);
	console.log(landingMessage);
	// we are returning our Provider so we can use this around our App, and giving values that we want the children to be able to access
	return (
		<LandingContext.Provider value={{ landingMessage, setLandingMessage }}>
			{children}
		</LandingContext.Provider>
	);
}
