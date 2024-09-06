import PyPDF2
from typing import BinaryIO


def parsePdf(file: BinaryIO):
    reader = PyPDF2.PdfReader(file)
    extractedText = []
    for page in reader.pages:
        text = page.extract_text()
        extractedText.append(text)
    return extractedText
