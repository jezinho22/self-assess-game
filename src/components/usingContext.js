"use client";
import { useContext } from "react";
import { LandingContext } from "@/utils/provider";

// provider provides the context
// this component gets landingMessage from it
// can't use it directly in a page
// but can work it out in this client component and then get rendered on the page
// wonder if it will set a useState and trigger action in the provider?

export default function UsingContext() {
	const { landingMessage } = useContext(LandingContext);

	console.log("landingMessage: ", landingMessage);
	return <h1 className="text-3xl">{landingMessage}</h1>;
}
