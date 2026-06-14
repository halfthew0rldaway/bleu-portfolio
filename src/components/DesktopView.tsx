import React from "react";
import { useIsMobile } from "../hooks/useWindowSize";
import { DesktopEnvironment } from "./DesktopEnvironment";
import { MobileEnvironment } from "./MobileEnvironment";

export const DesktopView = () => {
  const isMobile = useIsMobile();

  return <>{isMobile ? <MobileEnvironment /> : <DesktopEnvironment />}</>;
};
