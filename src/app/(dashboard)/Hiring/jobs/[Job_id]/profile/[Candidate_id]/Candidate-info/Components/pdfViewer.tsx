import React from "react";

interface PdfViewerPropsType {
  url: string;
}
function PdfViewer({ url }: PdfViewerPropsType) {
  return <iframe src={url} width={`90%`} height={`700px`} />;
}

export default PdfViewer;
