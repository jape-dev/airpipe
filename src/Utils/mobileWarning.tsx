import React, { useState, useEffect, ComponentType } from "react";

// Define a generic type for the props of the component that will be wrapped
type WithMobileWarningProps = {
  shouldShowWarning: boolean;
};

// Define the type for the HOC
export const withMobileWarning = <P extends object>(
  WrappedComponent: ComponentType<P>,
  shouldShowWarning: boolean
) => {
  return (props: P) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 900);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <>
        {shouldShowWarning && isMobile ? (
          <div className="mobile-warning">
            Hi there, thanks for using AirPipe. Currently we only run on desktop
            screens. Please use a desktop browser or largen your current
            screensize.
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};
