export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve" | "unsatisfactory";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve" | "unsatisfactory";
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
      };
      skills: {
        score: number; //max 100
        matchedSkills: string[]; //["React", "TypeScript", ....]
        missingSkills: string[]; //["Docker", "CI/CD", "AWS" ....]
        tips: {
          type: "good" | "improve" | "unsatisfactory";
          explanation: string; //explain in detail here
        }[]; //give 2-3 tips
      };
      experience: {
        analysis: string,   // general analysis in 1–2 sentences
        recommendedMetrics: string[]  // ["Improved X by Y%", "Reduced latency ..."] //give 2-3 tips based on resume and job description
      },
      keywords: {
        missingKeywords: string; //extracted from job description in comparison with resume
        tips: string[];            //advice for keyword usage (2-3 tips)
      };
      summary: {
         alignmentScore: number,  // same as ATS score or recalculated
         tips: {
            type: "good" | "improve" | "unsatisfactory";
            explanation: string; //explain in detail here
         }[]; // 3–4 sentences explaining resume summary quality
      };
      aiSuggestions: {
           improvedSummary: string; // single improved resume summary paragraph
      };
    }`;