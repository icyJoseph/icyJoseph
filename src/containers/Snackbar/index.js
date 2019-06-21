import { useEffect, useState } from "react";

function Snackbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = e =>
      e.data.type === "WORKER_UPDATE" ? setShow(true) : () => {};

    window.addEventListener("message", handler, false);
    return () => window.removeEventListener("message", handler, false);
  }, []);

  useEffect(() => {
    async function loadSnackbar() {
      const { createSnackbar } = await import(
        /* webpackChunkName: "snackbar"*/ "@egoist/snackbar"
      );

      await import(/* webpackChunkName: "snackbar-css"*/ "./index.css");

      createSnackbar("New version!", {
        timeout: 4000,
        actions: [
          {
            text: "Dismiss",
            style: {
              color: "#CDD3DE",
              fontSize: "14px"
            },
            callback(button, snackbar) {
              snackbar.destroy();
            }
          },
          {
            text: "Apply",
            style: {
              color: "#F99157",
              fontSize: "14px"
            },
            callback(button, snackbar) {
              if (
                window.confirm("New version requires a page reload. Reload?")
              ) {
                snackbar.destroy();
                window.location.reload(true);
              }
            }
          }
        ]
      });
    }
    if (show) {
      loadSnackbar();
    }
  }, [show]);

  return null;
}

export default Snackbar;
