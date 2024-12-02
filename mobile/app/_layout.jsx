import React from "react";
import { IdProvider } from "../scripts/idContext";
import { Slot} from "expo-router";

export default Layout = () => {
    return (
        <IdProvider>
                <Slot />
        </IdProvider>
    )
}