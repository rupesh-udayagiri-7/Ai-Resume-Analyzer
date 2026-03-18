from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .nlp_processor import preprocess_text, extract_skills

def calculate_match(resume_text: str, jd_text: str):
    """
    Calculates the match score between the given resume text and job description text.
    Also identifies missing skills.
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
        suggestions.append("Your resume phrasing differs significantly from the job description. Try to use similar terminology.")
    if missing_skills:
        suggestions.append(f"Consider learning or highlighting these missing key skills: {', '.join(missing_skills[:5])}.")
    if not resume_skills:
        suggestions.append("We couldn't detect many standard technical skills in your resume. Make sure you clearly list your tech stack.")
        
    if not suggestions:
        suggestions.append("Great job! Your resume aligns well with the job description.")
        
    return {
        "match_score": score_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions
    }
