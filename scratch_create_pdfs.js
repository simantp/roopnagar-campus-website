import fs from 'fs';

function createMinimalPdf(title) {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${title.length + 45} >>
stream
BT
/F1 24 Tf
50 700 Td
(${title}) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
00000000115 00000 n 
00000000246 00000 n 
00000000350 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
420
%%EOF`;
  return content;
}

fs.writeFileSync('public/rns_campus_profile.pdf', createMinimalPdf('Roopnagar Nandaraj Sangraula Campus Profile'));
fs.writeFileSync('public/rns_annual_report.pdf', createMinimalPdf('RNS Campus Annual Progress and Financial Report'));
console.log('Valid default PDFs created in public/ directory!');
