export async function extractPDFText(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to string and look for text patterns
    let rawText = '';
    for (let i = 0; i < uint8Array.length - 1; i++) {
      const char = String.fromCharCode(uint8Array[i]);
      if (char.match(/[\x20-\x7E]/)) { // Printable ASCII
        rawText += char;
      } else if (char === '\n' || char === '\r') {
        rawText += '\n';
      }
    }
    
    let extractedText = '';
    
    // Method 1: Extract text between parentheses (PDF text objects)
    const textMatches = rawText.match(/\(([^)]+)\)/g) || [];
    const basicText = textMatches
      .map(match => match.replace(/[()]/g, ''))
      .filter(t => t.length > 0 && /[a-zA-Z0-9@.\s]/.test(t))
      .join(' ');
    
    extractedText += basicText + ' ';
    
    // Method 2: Extract from Tj operators (single text)
    const tjMatches = rawText.match(/\(([^)]+)\)\s*Tj/g) || [];
    tjMatches.forEach(match => {
      const text = match.replace(/\(|\)\s*Tj/g, '');
      if (text.length > 0 && /[a-zA-Z]/.test(text)) {
        extractedText += text + ' ';
      }
    });
    
    // Method 3: Extract from TJ operators (array text)
    const tjArrayMatches = rawText.match(/\[([^\]]+)\]\s*TJ/g) || [];
    tjArrayMatches.forEach(match => {
      const content = match.replace(/\[|\]\s*TJ/g, '');
      const words = content.match(/\(([^)]+)\)/g) || [];
      words.forEach(word => {
        const clean = word.replace(/[()]/g, '');
        if (clean.length > 0 && /[a-zA-Z]/.test(clean)) {
          extractedText += clean + ' ';
        }
      });
    });
    
    // Clean and format the extracted text
    extractedText = extractedText
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\n')
      .replace(/\\t/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s@.,!?()\-\/\n:;]/g, '')
      .trim();
    
    // Add line breaks for better structure
    extractedText = extractedText
      .replace(/(EXPERIENCE|EDUCATION|SKILLS|PROJECTS|SUMMARY|PROFILE|OBJECTIVE)/gi, '\n$1')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (extractedText.length < 20) {
      throw new Error('Could not extract readable text from PDF');
    }
    
    return extractedText;
  } catch (error) {
    throw new Error('PDF text extraction failed. Please copy and paste the text manually.');
  }
}