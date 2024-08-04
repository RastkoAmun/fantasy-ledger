"use client";
import React from "react";
import apolloClient from "@/state/remote/apolloClient";
import { ApolloProvider } from "@apollo/client";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default Providers;
