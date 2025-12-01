// Enhanced PDF parser using PDF.js
export async function extractPDFTextAdvanced(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    
    if (typeof window !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const textItems = textContent.items
        .filter(item => item.str && item.str.trim())
        .sort((a, b) => {
          const yDiff = Math.abs(b.transform[5] - a.transform[5]);
          if (yDiff < 5) return a.transform[4] - b.transform[4]; // Same line, sort by x
          return b.transform[5] - a.transform[5]; // Different lines, sort by y
        });
      
      let currentY = null;
      let pageText = '';
      
      textItems.forEach(item => {
        const y = Math.round(item.transform[5]);
        
        if (currentY !== null && Math.abs(currentY - y) > 5) {
          pageText += '\n';
        }
        
        pageText += item.str + ' ';
        currentY = y;
      });
      
      fullText += pageText + '\n';
    }
    
    // Clean text
    fullText = fullText
      .replace(/\s+/g, ' ')
      .replace(/\n\s+/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    if (fullText.length < 20) {
      throw new Error('Could not extract readable text');
    }
    
    return fullText;
  } catch (error) {
    throw new Error('PDF extraction failed. Please copy-paste text manually.');
  }
}