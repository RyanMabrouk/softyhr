import { Pagination } from "@nextui-org/react";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();
interface PdfViewerPropsType {
  url: string | null;
}

function PdfViewer({ url }: PdfViewerPropsType) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem]">
      <div className="min-h-[800px] min-w-[630px] border-b border-t border-gray-18">
        <Document
          file={{ url:  url || "" }}
          className={"self-center"}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <Pagination
        className="self-center"
        color={"success"}
        total={numPages}
        initialPage={1}
        onChange={(page: number) => setPageNumber(page)}
      />
    </div>
  );
}

export default PdfViewer;
