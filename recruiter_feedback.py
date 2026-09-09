import re
import json
from textblob import TextBlob


# ============================================================
# 1. SAMPLE RECRUITER FEEDBACK
# ============================================================

sample_feedback = [
    "Good technical knowledge but communication needs improvement.",
    "Strong problem solving skills.",
    "Needs more practical project experience.",
    "Excellent Python skills and good analytical thinking.",
    "Communication is weak but technical knowledge is strong.",
    "Good coding ability and teamwork skills.",
    "Needs improvement in data structures and algorithms."
]


# ============================================================
# 2. SKILL LIST
# ============================================================
# These are the skills our NLP system will try to identify.

SKILLS = [
    "python",
    "java",
    "c++",
    "sql",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "data science",
    "data structures",
    "algorithms",
    "problem solving",
    "communication",
    "teamwork",
    "leadership",
    "analytical thinking",
    "coding",
    "programming",
    "project management",
    "database",
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "git",
    "github"
]


# ============================================================
# 3. POSITIVE WORDS
# ============================================================
# These words help us identify positive feedback.

POSITIVE_WORDS = [
    "good",
    "strong",
    "excellent",
    "great",
    "outstanding",
    "proficient",
    "skilled",
    "effective",
    "impressive",
    "well",
    "best"
]


# ============================================================
# 4. NEGATIVE / IMPROVEMENT WORDS
# ============================================================
# These words help us identify areas that need improvement.

NEGATIVE_WORDS = [
    "weak",
    "poor",
    "needs improvement",
    "needs to improve",
    "should improve",
    "requires improvement",
    "lacks",
    "lack",
    "needs more",
    "insufficient"
]


# ============================================================
# 5. TEXT PREPROCESSING
# ============================================================

def preprocess_text(text):
    """
    Cleans recruiter feedback.

    Steps:
    1. Convert text to lowercase.
    2. Remove unnecessary punctuation.
    3. Remove extra spaces.
    """

    # Convert to lowercase
    text = text.lower()

    # Remove punctuation
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()

    return text


# ============================================================
# 6. SENTIMENT ANALYSIS
# ============================================================

def analyze_sentiment(text):
    """
    Performs basic sentiment analysis using TextBlob.

    Returns:
        sentiment
        polarity
    """

    blob = TextBlob(text)

    polarity = blob.sentiment.polarity

    # Basic sentiment classification
    if polarity > 0.1:
        sentiment = "positive"

    elif polarity < -0.1:
        sentiment = "negative"

    else:
        sentiment = "neutral"

    return sentiment, round(polarity, 3)


# ============================================================
# 7. DETECT MIXED SENTIMENT
# ============================================================

def detect_mixed_sentiment(text):
    """
    Checks whether the feedback contains both
    positive and negative/improvement language.
    """

    text = text.lower()

    has_positive = False
    has_negative = False

    # Check positive words
    for word in POSITIVE_WORDS:
        if word in text:
            has_positive = True
            break

    # Check negative words
    for word in NEGATIVE_WORDS:
        if word in text:
            has_negative = True
            break

    # If both are present, feedback is mixed
    if has_positive and has_negative:
        return True

    return False


# ============================================================
# 8. SKILL EXTRACTION
# ============================================================

def extract_skills(text):
    """
    Finds skills mentioned in recruiter feedback.
    """

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        if skill in text:
            found_skills.append(skill)

    return found_skills


# ============================================================
# 9. FIND IMPROVEMENT AREAS
# ============================================================

def extract_improvement_areas(text):
    """
    Identifies skills that appear near improvement-related
    words or phrases.
    """

    text = text.lower()

    improvement_areas = []

    # Split feedback into smaller sentences
    sentences = re.split(r'[.!?]', text)

    for sentence in sentences:

        # Check if sentence contains improvement language
        contains_improvement = False

        for word in NEGATIVE_WORDS:
            if word in sentence:
                contains_improvement = True
                break

        # If improvement language is found,
        # check which skills are mentioned in that sentence.
        if contains_improvement:

            for skill in SKILLS:

                if skill in sentence:
                    if skill not in improvement_areas:
                        improvement_areas.append(skill)

    return improvement_areas


# ============================================================
# 10. EXTRACT POSITIVE FEEDBACK
# ============================================================

def extract_positive_feedback(text):
    """
    Finds sentences containing positive feedback.
    """

    sentences = re.split(r'[.!?]', text)

    positive_sentences = []

    for sentence in sentences:

        sentence = sentence.strip()

        if not sentence:
            continue

        sentence_lower = sentence.lower()

        for word in POSITIVE_WORDS:

            if word in sentence_lower:

                positive_sentences.append(sentence)

                break

    return positive_sentences


# ============================================================
# 11. EXTRACT NEGATIVE FEEDBACK
# ============================================================

def extract_negative_feedback(text):
    """
    Finds sentences containing negative or
    improvement-related feedback.
    """

    sentences = re.split(r'[.!?]', text)

    negative_sentences = []

    for sentence in sentences:

        sentence = sentence.strip()

        if not sentence:
            continue

        sentence_lower = sentence.lower()

        for word in NEGATIVE_WORDS:

            if word in sentence_lower:

                negative_sentences.append(sentence)

                break

    return negative_sentences


# ============================================================
# 12. GENERATE SIMPLE SUMMARY
# ============================================================

def generate_summary(
    sentiment,
    skills,
    improvement_areas,
    positive_feedback,
    negative_feedback
):
    """
    Generates a simple plain-language summary.
    """

    summary_parts = []

    # Positive part
    if positive_feedback:
        summary_parts.append(
            "The recruiter highlighted positive aspects of the candidate."
        )

    # Skills part
    if skills:

        skill_text = ", ".join(skills)

        summary_parts.append(
            f"Skills mentioned include {skill_text}."
        )

    # Improvement part
    if improvement_areas:

        improvement_text = ", ".join(improvement_areas)

        summary_parts.append(
            f"Areas needing improvement include {improvement_text}."
        )

    # If nothing specific was found
    if not summary_parts:

        summary_parts.append(
            "The feedback does not contain enough information "
            "for a detailed summary."
        )

    return " ".join(summary_parts)


# ============================================================
# 13. MAIN NLP FUNCTION
# ============================================================

def analyze_recruiter_feedback(feedback):
    """
    Main function of the Recruiter Feedback NLP module.

    Input:
        Recruiter feedback as a string.

    Output:
        Structured dictionary containing NLP results.
    """

    # ----------------------------------------
    # Step 1: Validate input
    # ----------------------------------------

    if not feedback or not feedback.strip():

        return {
            "error": "Feedback cannot be empty."
        }

    # ----------------------------------------
    # Step 2: Preprocess
    # ----------------------------------------

    cleaned_text = preprocess_text(feedback)

    # ----------------------------------------
    # Step 3: Sentiment
    # ----------------------------------------

    sentiment, polarity = analyze_sentiment(cleaned_text)

    # ----------------------------------------
    # Step 4: Check for mixed sentiment
    # ----------------------------------------

    if detect_mixed_sentiment(cleaned_text):

        sentiment = "mixed"

    # ----------------------------------------
    # Step 5: Extract skills
    # ----------------------------------------

    skills = extract_skills(cleaned_text)

    # ----------------------------------------
    # Step 6: Extract improvement areas
    # ----------------------------------------

    improvement_areas = extract_improvement_areas(cleaned_text)

    # ----------------------------------------
    # Step 7: Extract positive feedback
    # ----------------------------------------

    positive_feedback = extract_positive_feedback(feedback)

    # ----------------------------------------
    # Step 8: Extract negative feedback
    # ----------------------------------------

    negative_feedback = extract_negative_feedback(feedback)

    # ----------------------------------------
    # Step 9: Generate summary
    # ----------------------------------------

    summary = generate_summary(
        sentiment,
        skills,
        improvement_areas,
        positive_feedback,
        negative_feedback
    )

    # ----------------------------------------
    # Step 10: Create final result
    # ----------------------------------------

    result = {
        "feedback": feedback,
        "cleaned_feedback": cleaned_text,
        "sentiment": sentiment,
        "polarity": polarity,
        "positive_feedback": positive_feedback,
        "negative_feedback": negative_feedback,
        "skills_mentioned": skills,
        "areas_for_improvement": improvement_areas,
        "summary": summary
    }

    return result


# ============================================================
# 14. TEST THE NLP MODULE
# ============================================================

if __name__ == "__main__":

    print("=" * 60)
    print("PlaceMentor AI - Recruiter Feedback NLP")
    print("=" * 60)

    # Test feedback
    feedback = (
        "Good technical knowledge but communication needs improvement."
    )

    # Analyze feedback
    result = analyze_recruiter_feedback(feedback)

    # Display result
    print("\nRecruiter Feedback:")
    print(feedback)

    print("\nNLP Analysis:")
    print("-" * 60)

    print("Sentiment:", result["sentiment"])
    print("Polarity:", result["polarity"])

    print("\nPositive Feedback:")
    for item in result["positive_feedback"]:
        print("-", item)

    print("\nNegative Feedback:")
    for item in result["negative_feedback"]:
        print("-", item)

    print("\nSkills Mentioned:")
    for skill in result["skills_mentioned"]:
        print("-", skill)

    print("\nAreas for Improvement:")
    for area in result["areas_for_improvement"]:
        print("-", area)

    print("\nSummary:")
    print(result["summary"])

    print("\n" + "=" * 60)
    print("JSON OUTPUT")
    print("=" * 60)

    print(json.dumps(result, indent=4))