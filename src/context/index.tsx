import { PropsWithChildren } from "react";
import { AuthenticationProvider } from "./authentication";
import { LogProvider } from "./log";
import DataProvider from "./data";

export function Providers(props: PropsWithChildren) {
  return (
    <DataProvider>
      <AuthenticationProvider>
        <LogProvider>{props.children}</LogProvider>
      </AuthenticationProvider>
    </DataProvider>
  );
}
