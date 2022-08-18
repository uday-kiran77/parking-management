import React from "react";
import { QrReader } from "react-qr-reader";

export const QRreader = ({ setQrscan, setIsScanning, getToken }) => {
  return (
    <div>
      <div style={{ marginTop: 30 }}>
        <QrReader
          style={{ height: 150, width: 150 }}
          delay={1000}
          constraints={{ facingMode: { exact: "environment" } }}
          onResult={(result, error) => {
            if (!!result) {
              setQrscan(result?.text);
            }
          }}
        />
      </div>
    </div>
  );
};
