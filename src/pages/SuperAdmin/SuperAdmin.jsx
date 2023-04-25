import React from "react";
import { Button } from "react-bootstrap";

function SuperAdmin() {

  const downloadFile = (e) => {
    e.preventDefault();
    fetch("http://localhost:9100/superadmin/download", {
      headers: {
        'Content-Type' : 'application/text',
        'Authorization' : 'Bearer ' + localStorage.getItem("token")
      }
      }).then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `logs.txt`,
        );
   
        // Append to html link element page
        document.body.appendChild(link);
   
        // Start download
        link.click();
   
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }

  return (
    <Button variant="success" className="mt-[10%] w-[25%] ml-[37%]" onClick={(e) => downloadFile(e)}>Download Consent Logs</Button>
  );
}

export default SuperAdmin;
