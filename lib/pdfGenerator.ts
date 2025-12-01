import jsPDF from 'jspdf';

export function generateResumePDF(resumeText: string, filename: string = 'optimized-resume.pdf') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;
  
  const lines = resumeText.split('\n');
  
  lines.forEach((line: string) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      yPosition += 4;
      return;
    }
    
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Style headers (all caps sections)
    if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3 && !trimmedLine.includes('|')) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(trimmedLine, margin, yPosition);
      yPosition += 8;
    }
    // Style job titles/companies (contains |)
    else if (trimmedLine.includes('|')) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(trimmedLine, margin, yPosition);
      yPosition += 6;
    }
    // Style bullet points
    else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const bulletText = doc.splitTextToSize(trimmedLine, pageWidth - (margin * 2) - 10);
      bulletText.forEach((bulletLine: string) => {
        doc.text(bulletLine, margin + 5, yPosition);
        yPosition += 5;
      });
    }
    // Regular text
    else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const textLines = doc.splitTextToSize(trimmedLine, pageWidth - (margin * 2));
      textLines.forEach((textLine: string) => {
        doc.text(textLine, margin, yPosition);
        yPosition += 5;
      });
    }
  });
  
  doc.save(filename);
}

export function previewResume(resumeText: string): string {
  // Convert resume text to HTML for preview
  const lines = resumeText.split('\n');
  let html = '<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">';
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      html += '<br>';
      return;
    }
    
    // Check if line is a header (all caps or starts with specific patterns)
    if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3) {
      html += `<h2 style="color: #2563eb; margin-top: 20px; margin-bottom: 10px; font-size: 16px; font-weight: bold;">${trimmedLine}</h2>`;
    }
    // Check if line is a job title or company (contains | or specific patterns)
    else if (trimmedLine.includes('|') || /^\w+.*\s+\|\s+\w+/.test(trimmedLine)) {
      html += `<h3 style="color: #1f2937; margin-top: 15px; margin-bottom: 5px; font-size: 14px; font-weight: 600;">${trimmedLine}</h3>`;
    }
    // Check if line is a bullet point
    else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
      html += `<p style="margin: 5px 0; margin-left: 20px; color: #374151;">${trimmedLine}</p>`;
    }
    // Regular paragraph
    else {
      html += `<p style="margin: 8px 0; color: #374151; line-height: 1.5;">${trimmedLine}</p>`;
    }
  });
  
  html += '</div>';
  return html;
}

export function downloadAsText(content: string, filename: string = 'resume.txt') {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}