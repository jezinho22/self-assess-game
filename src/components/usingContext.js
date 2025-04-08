"use client";
import { useContext } from "react";
import { LandingContext } from "@/utils/provider";

export default function UsingContext() {
	const { landingMessage } = useContext(LandingContext);
	// const landingMessage = myArse;

	console.log("landingMessage: ", landingMessage);
	return <h1 className="text-3xl">{landingMessage}</h1>;
}
