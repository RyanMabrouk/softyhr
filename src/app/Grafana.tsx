"use client";
import { useEffect } from "react";
import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
function Grafana() {
  useEffect(() => {
    if (!(window as any).faro) {
      initializeFaro({
        url: "https://faro-collector-prod-eu-west-2.grafana.net/collect/9d533f339dc67a61608a70148d225f63",
        app: {
          name: "softyhr",
          version: "1.0.0",
          environment: "production",
        },
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
        ],
      });
    }
  }, []);

  // ...
  return null;
}
export default Grafana;
