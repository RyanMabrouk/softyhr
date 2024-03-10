import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AslLeaveWebSite() {
  const router = useRouter();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        const confirmationMessage =
          "Changes you made may not be saved. Are you sure you want to leave?";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (
        unsavedChanges &&
        !window.confirm(
          "Changes you made may not be saved. Are you sure you want to leave?",
        )
      ) {
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [unsavedChanges, router.events]);
  return <div>AslLeaveWebSite</div>;
}

export default AslLeaveWebSite;
