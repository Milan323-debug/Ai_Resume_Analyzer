export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    },
  },
  {
    id: "6",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    },
  },
  {
    id: "4",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    },
  },
  {
    id: "5",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: []
      },
      toneAndStyle: {
        score: 90,
        tips: []
      },
      content: {
        score: 90,
        tips: []
      },
      structure: {
        score: 90,
        tips: []
      },
      skills: {
        score: 90,
        tips: []
      }
    },
  },
];

export const AIResponseFormat = `{
  "overallScore": 75,
  "ATS": {
    "score": 0,
    "tips": [
      {
        "type": "good|improve",
        "tip": "string",
        "explanation": "string"
      }
    ]
  },
  "toneAndStyle": {
    "score": 0,
    "tips": [
      {
        "type": "good|improve",
        "tip": "string",
        "explanation": "string"
      }
    ]
  },
  "content": {
    "score": 0,
    "tips": [
      {
        "type": "good|improve",
        "tip": "string",
        "explanation": "string"
      }
    ]
  },
  "structure": {
    "score": 0,
    "tips": [
      {
        "type": "good|improve",
        "tip": "string",
        "explanation": "string"
      }
    ]
  },
  "skills": {
    "score": 0,
    "tips": [
      {
        "type": "good|improve",
        "tip": "string",
        "explanation": "string"
      }
    ]
  }
}`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.

  Scoring Guidelines:
  - All scores should be on a scale of 0-100
  - 90-100: Excellent, nearly perfect
  - 80-89: Very good, minor improvements needed
  - 70-79: Good, but has several areas for improvement
  - 60-69: Fair, needs significant improvement
  - Below 60: Poor, major revisions needed

  ATS Score specifically should be based on:
  - Proper keyword matching with job description (30%)
  - Clear section headings and structure (20%)
  - Proper formatting and parsing (20%)
  - Use of standard section titles (15%)
  - Absence of complex formatting/tables/images (15%)

  Overall Score should be weighted average of:
  - ATS Score (35%)
  - Content Quality (25%)
  - Skills Match (20%)
  - Structure (10%)
  - Tone and Style (10%)

  For each category:
  1. Assign a score based on the guidelines above
  2. Provide 2-3 positive points (type: "good")
  3. Provide 2-4 improvement suggestions (type: "improve")
  4. Each improvement suggestion must include a detailed explanation

  The job title is: ${jobTitle}
  The job description is: ${jobDescription}

  Return ONLY a JSON object in exactly this format, with no additional text: ${AIResponseFormat}
  `;