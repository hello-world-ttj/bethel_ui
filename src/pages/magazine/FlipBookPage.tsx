import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { BsChevronLeft, BsChevronRight, BsPrinter, BsX } from "react-icons/bs";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfFlipViewer = () => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(450);
  const [pageHeight, setPageHeight] = useState<number>(600);
  const [actualPageDimensions, setActualPageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    if (url) setPdfUrl(decodeURIComponent(url));

    const handleResize = () => {
      const width = Math.min(window.innerWidth * 0.35, 500);
      let height;

      if (actualPageDimensions) {
        const aspectRatio =
          actualPageDimensions.height / actualPageDimensions.width;
        height = width * aspectRatio;
      } else {
        height = width * 1.414;
      }

      const maxHeight = window.innerHeight * 0.75;
      if (height > maxHeight) {
        height = maxHeight;
      }

      setPageWidth(width);
      setPageHeight(height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [actualPageDimensions]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page: any) => {
    if (!actualPageDimensions) {
      const { width, height } = page;
      setActualPageDimensions({ width, height });
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) flipBookRef.current.pageFlip().flipNext();
  };

  const goToPreviousPage = () => {
    if (flipBookRef.current) flipBookRef.current.pageFlip().flipPrev();
  };

  const onFlip = (e: any) => setCurrentPage(e.data);

  const handlePrint = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex flex-col">
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.close()}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow"
          >
            <BsX size={18} />
            Close
          </button>

          {numPages > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-2 rounded-lg border border-blue-100">
              <span className="text-gray-700 font-semibold text-sm">
                {currentPage + 1} / {numPages}
              </span>
            </div>
          )}
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 flex items-center gap-2 transition-all shadow-sm border border-gray-200"
          >
            <BsPrinter size={18} />
            Print
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center relative p-8 overflow-x-hidden overflow-y-auto">
        {pdfUrl ? (
          <Document
            key={pdfUrl}
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center p-12">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Loading PDF...</p>
              </div>
            }
            error={
              <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-xl max-w-md text-center shadow-lg">
                <p className="font-semibold text-lg mb-2">Failed to load PDF</p>
                <p className="text-sm">
                  Please check the PDF URL and try again.
                </p>
              </div>
            }
          >
            {numPages > 0 && (
              <div className="relative group flex justify-center items-center">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className={`absolute -left-16 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-4 shadow-xl transition-all backdrop-blur-sm border border-gray-200 ${
                    currentPage === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-70 hover:opacity-100"
                  } z-30`}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <BsChevronLeft size={8} />
                </button>

                <div
                  className="perspective-container"
                  style={{ perspective: "2000px" }}
                >
                  <HTMLFlipBook
                    size="stretch"
                    minWidth={pageWidth}
                    maxWidth={pageWidth}
                    minHeight={pageHeight}
                    maxHeight={pageHeight}
                    showCover={false}
                    mobileScrollSupport={true}
                    onFlip={onFlip}
                    className="shadow-2xl"
                    ref={flipBookRef}
                    width={pageWidth}
                    height={pageHeight}
                    maxShadowOpacity={0.5}
                    startPage={0}
                    drawShadow={true}
                    flippingTime={600}
                    usePortrait={false}
                    onChangeOrientation={true}
                    startZIndex={0}
                    autoSize={false}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    {...({} as any)}
                  >
                    {Array.from({ length: numPages }, (_, i) => (
                      <div
                        key={i}
                        style={{ width: pageWidth }}
                        className="bg-white flex items-center justify-center shadow-lg border border-gray-200"
                      >
                        <Page
                          pageNumber={i + 1}
                          width={pageWidth}
                          onLoadSuccess={onPageLoadSuccess}
                          renderTextLayer={true}
                          renderAnnotationLayer={false}
                        />
                      </div>
                    ))}
                  </HTMLFlipBook>
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === numPages - 1}
                  className={`absolute -right-16 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-4 shadow-xl transition-all backdrop-blur-sm border border-gray-200 ${
                    currentPage === numPages - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-70 hover:opacity-100"
                  } z-30`}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <BsChevronRight size={8} />
                </button>
              </div>
            )}
          </Document>
        ) : (
          <div className="bg-white border border-gray-200 text-gray-700 p-12 rounded-xl text-center shadow-xl max-w-md">
            <p className="text-xl font-semibold mb-2">No PDF URL provided</p>
            <p className="text-gray-500 text-sm">
              Please provide a valid PDF URL in the query parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfFlipViewer;
