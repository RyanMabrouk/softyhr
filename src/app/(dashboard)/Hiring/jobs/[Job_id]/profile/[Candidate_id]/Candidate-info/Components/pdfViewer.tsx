import React from "react";

interface PdfViewerPropsType {
  url: string;
}
function PdfViewer({ url }: PdfViewerPropsType) {
  return <iframe src={url} width={`50%`} height={`500px`} />;
}

export default PdfViewer;
