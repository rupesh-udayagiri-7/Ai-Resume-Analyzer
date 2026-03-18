import io
import docx
from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_file) -> str:
    """
    Extracts text from an uploaded PDF file stream.
    """
    try:
        text = extract_text(io.BytesIO(pdf_file.read()))
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""

def extract_text_from_docx(docx_file) -> str:
    """
    Extracts text from an uploaded DOCX file stream.
    """
    try:
        doc = docx.Document(io.BytesIO(docx_file.read()))
        full_text = []
        for para in doc.paragraphs:
            full_text.append(para.text)
        text = ' '.join(full_text)
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    except Exception as e:
        print(f"Error extracting DOCX: {e}")
        return ""

def extract_text_from_file(file_obj, filename: str) -> str:
    """
    Determines file type from extension and extracts text.
    """
    if filename.lower().endswith(".pdf"):
        return extract_text_from_pdf(file_obj)
    elif filename.lower().endswith(".docx"):
        return extract_text_from_docx(file_obj)
    else:
        # Fallback for plain text
        try:
            return file_obj.read().decode('utf-8')
        except:
            return ""

def is_resume_heuristic(text: str) -> bool:
    """
    Determines if the extracted text is likely a resume using a simple heuristic point system.
    Looks for common sections, words, and patterns (like emails/phone numbers).
    """
    import re
    text_lower = text.lower()
    score = 0
    
    # Common resume section headers
    keywords = [
        "education", "experience", "work history", "employment", 
        "skills", "projects", "summary", "objective", "certifications", 
        "languages", "activities", "achievements", "volunteer",
        "bachelor", "master", "phd", "university", "college", "degree"
    ]
    
    # Award points for presence of keywords
    for kw in keywords:
        if kw in text_lower:
            score += 1
            
    # Check for email pattern
    if re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text):
        score += 2
        
    # Check for phone number pattern (very basic check)
    if re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text):
        score += 2
        
    # Check for linkedIn or GitHub URls
    if 'linkedin.com' in text_lower or 'github.com' in text_lower:
        score += 1
        
    # A typical resume should have at least some of these indicators.
    # threshold can be tweaked. 4 is a reasonable starting point 
    # (e.g., has an email, phone number, and a couple of keywords).
    return score >= 3
