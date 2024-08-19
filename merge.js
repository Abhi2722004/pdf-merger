const mergepdfs = async (p1, p2) => {
  try {
      const PDFMerger = await import('pdf-merger-js');
      const merger = new PDFMerger.default();

      await merger.add(p1);  // merge all pages. parameter is the path to file and filename.
      await merger.add(p2);  // merge only page 2

      await merger.save('public/merged.pdf'); // save under given name and reset the internal document
      console.log('PDFs merged successfully');
  } catch (error) {
      console.error('Error merging PDFs:', error);
  }
};

module.exports = { mergepdfs };
