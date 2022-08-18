import React from "react";
import date from "date-and-time";

export const TokenDetails = ({ token }) => {
  return (
    <div className="mt-5">
      <p className="text-xl font-bold underline">Token Details</p>
      <table className="text-left w-fit  mt-2">
        <tbody>
          <tr>
            <th>Token Id</th>
            <th className="font-light pl-5">{token.id}</th>
          </tr>
          <tr>
            <th>Vehicle Number</th>
            <th className="font-light pl-5">{token.vehNumber}</th>
          </tr>
          <tr>
            <th>Vehicle Type</th>
            <th className="font-light pl-5">{token.vehType}</th>
          </tr>
          {token.entry && (
            <>
              <tr>
                <th>Entry Date</th>
                <th className="font-light pl-5">
                  {date.format(new Date(token.entry), "ddd, MMM DD YY")}
                </th>
              </tr>
              <tr>
                <th>Entry Time</th>
                <th className="font-light pl-5">
                  {date.format(new Date(token.entry), "hh:mm A")}
                </th>
              </tr>
            </>
          )}

          {token.exit && (
            <>
              <tr>
                <th>Exit Date</th>
                <th className="font-light pl-5">
                  {token.exit
                    ? date.format(new Date(token.exit), "ddd, MMM DD YY")
                    : "-"}
                </th>
              </tr>
              <tr>
                <th>Exit Time</th>
                <th className="font-light pl-5">
                  {token.exit
                    ? date.format(new Date(token.exit), "hh:mm A")
                    : "-"}
                </th>
              </tr>
              <tr>
                <th>Amount</th>
                <th className="font-light pl-5">
                  {token.amount ? token.amount : "0"} $
                </th>
              </tr>
            </>
          )}
          {token.createdBy && (
            <tr>
              <th>Created By</th>
              <th className="font-light pl-5">{token.createdBy}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
