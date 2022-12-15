import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";

const sxStyle = {
  position: "relative",
  height: "100%",
  width: "100%",
};

export const Canvas = (props: { code: string }) => {
  const [frameSrc, setFrameSrc] = useState<string>("");

  const chart = `
  <html>
      <body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3"></script>
        <script>
            ${props.code}
        </script>
      </body>
  </html>
  `;

  // Use the useEffect hook to update the iframe when the code changes.
  useEffect(() => {
    setFrameSrc(`data:text/html;charset=utf-8,${encodeURIComponent(chart)}`);
  }, [props.code]);

  return (
    <Paper elevation={3} sx={{ height: "75vh" }}>
      <iframe
        src={frameSrc}
        frameBorder="0"
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      />
    </Paper>
  );
};
