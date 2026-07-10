import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .nlp_processor import preprocess_text, extract_skills

def calculate_ats_score(resume_text: str):
    """
    Calculates a structural ATS optimization score (out of 100) based on typical ATS criteria:
    - Section presence (Education, Experience, Skills, Projects)
    - Contact Info presence (Email, Phone)
    - Length / Word count
    """
    score = 0
    suggestions = []
    
    text_lower = resume_text.lower()
    
    # 1. Contact Details Check (20 points total)
    has_email = bool(re.search(r'[\w\.-]+@[\w\.-]+\.\w+', resume_text))
    has_phone = bool(re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\+\d{1,3}[-.\s]?\d{1,10}\b', resume_text))
    
    if has_email:
        score += 10
    else:
        suggestions.append("Missing email address. Ensure your professional email is clearly visible.")
        
    if has_phone:
        score += 10
    else:
        suggestions.append("Missing phone number. Provide a valid contact number for recruiters.")

    # 2. Structural Sections Check (70 points total)
    sections = {
        "experience": (["experience", "work history", "employment", "professional background", "history"], 25, "Standard 'Work Experience' section header not detected. Clearly label your employment history."),
        "education": (["education", "academic", "university", "degree", "qualification"], 20, "Standard 'Education' section header not detected."),
        "skills": (["skills", "technical skills", "technologies", "expertise", "competencies"], 15, "Standard 'Skills' section header not detected. Group key terms under a clear heading."),
        "projects": (["projects", "personal projects", "portfolio", "key projects"], 10, "Consider adding a standard 'Projects' section to highlight hands-on work.")
    }
    
    for section_name, (keywords, points, suggestion) in sections.items():
        found = False
        for keyword in keywords:
            if re.search(r'\b' + re.escape(keyword) + r'\b', text_lower):
                found = True
                break
        if found:
            score += points
        else:
            suggestions.append(suggestion)

    # 3. Length / Word Count Check (10 points total)
    word_count = len(re.findall(r'\b\w+\b', resume_text))
    if 300 <= word_count <= 1000:
        score += 10
    elif 150 <= word_count < 300 or 1000 < word_count <= 1500:
        score += 5
        suggestions.append(f"Your resume word count ({word_count}) is slightly outside the optimal range. Try to keep it between 300-1000 words.")
    else:
        suggestions.append(f"Unusual word count ({word_count}). Extremely short (<150 words) or long (>1500 words) resumes face parsing errors in standard ATS systems.")

    return {
        "ats_score": score,
        "ats_suggestions": suggestions
    }

def calculate_match(resume_text: str, jd_text: str):
    """
    Calculates the match score between the given resume text and job description text.
    Also calculates the structural ATS score and identifies missing skills.
    """
    # 1. Preprocess both texts
    clean_resume = preprocess_text(resume_text)
    clean_jd = preprocess_text(jd_text)
    
    # 2. Extract Skills
    resume_skills = set(extract_skills(resume_text))
    jd_skills = set(extract_skills(jd_text))
    
    # Identify matching and missing skills
    matched_skills = list(resume_skills.intersection(jd_skills))
    missing_skills = list(jd_skills.difference(resume_skills))
    
    # 3. Calculate TF-IDF Cosine Similarity
    vectorizer = TfidfVectorizer()
    try:
        tfidf_matrix = vectorizer.fit_transform([clean_jd, clean_resume])
        # tfidf_matrix[0] is JD, tfidf_matrix[1] is Resume
        match_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        match_score = 0.0
        
    # Convert match score to percentage and round it
    score_percentage = round(match_score * 100, 2)
    
    # Generation of simple actionable suggestions
    suggestions = []
    if score_percentage < 50:
        suggestions.append("Your resume phrasing differs significantly from the job description. Try incorporating exact terminology from the requirements.")
    if missing_skills:
        suggestions.append(f"Highlight these missing key skills: {', '.join(missing_skills[:5])}.")
    if not resume_skills:
        suggestions.append("We couldn't detect standard industry skills. Ensure your tech stack is explicitly listed.")
        
    # Calculate structural ATS score
    ats_results = calculate_ats_score(resume_text)
    
    # Combine suggestions
    all_suggestions = suggestions + ats_results["ats_suggestions"]
    if not all_suggestions:
        all_suggestions.append("Great job! Your resume aligns well with the job description.")
        
    return {
        "match_score": score_percentage,
        "ats_score": ats_results["ats_score"],
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": all_suggestions
    }
