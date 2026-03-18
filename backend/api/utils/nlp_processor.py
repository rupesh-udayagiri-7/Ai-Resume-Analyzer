import re

COMMON_SKILLS = set([
    "python", "java", "c++", "c#", "javascript", "typescript", "react", "angular", "vue",
    "node.js", "django", "flask", "spring", "html", "css", "sql", "mysql", "postgresql",
    "mongodb", "aws", "azure", "gcp", "docker", "kubernetes", "machine learning", "ai",
    "nlp", "data science", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch",
    "git", "linux", "agile", "scrum", "devops", "ci/cd", "rest", "graphql", "go", "ruby"
])

# Graceful spacy load
try:
    import spacy
    nlp = spacy.load("en_core_web_sm")
    USE_SPACY = True
except Exception as e:
    print(f"Warning: spacy could not be loaded ({e}). Falling back to regex.")
    USE_SPACY = False

def extract_skills(text: str) -> list[str]:
    text_lower = text.lower()
    found_skills = set()
    
    if USE_SPACY:
        doc = nlp(text_lower)
        for token in doc:
            if token.text in COMMON_SKILLS:
                found_skills.add(token.text)
        for chunk in doc.noun_chunks:
            if chunk.text in COMMON_SKILLS:
                found_skills.add(chunk.text)
    else:
        # Fallback dictionary matching
        words = re.findall(r'\b\w+\b', text_lower)
        for w in words:
            if w in COMMON_SKILLS:
                found_skills.add(w)
        # Check bi-grams for multi-word skills like "machine learning"
        for idx in range(len(words)-1):
            bigram = f"{words[idx]} {words[idx+1]}"
            if bigram in COMMON_SKILLS:
                found_skills.add(bigram)
                
    return list(found_skills)

def preprocess_text(text: str) -> str:
    text_lower = text.lower()
    if USE_SPACY:
        doc = nlp(text_lower)
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct and not token.is_space]
        return " ".join(tokens)
    else:
        # Fallback simple cleaner
        words = re.findall(r'\b\w+\b', text_lower)
        # Remove a few common stop words
        stop_words = {"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with"}
        tokens = [w for w in words if w not in stop_words]
        return " ".join(tokens)
