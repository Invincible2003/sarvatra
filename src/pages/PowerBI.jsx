import React from "react";

export default function PowerBI() {
  const powerBIUrl =
    "https://app.powerbi.com/reportEmbed?reportId=f582b893-90f7-4cd0-9fbe-66173a20201b&autoAuth=true&ctid=b8b32acb-f158-413f-90bd-ad4479a28acd"; //  your copied link

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Power BI Dashboard</h2>

      <div className="bg-white p-4 rounded shadow">
        <iframe
          title="Power BI Report"
          width="100%"
          height="600"
          src={powerBIUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}