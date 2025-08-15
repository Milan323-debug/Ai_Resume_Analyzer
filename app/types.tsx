/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

// Common interfaces used across the application
export interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

export type Tip = {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
};

export interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: {
    overallScore: number;
    ATS: {
      score: number;
      tips: Tip[];
    };
    toneAndStyle: {
      score: number;
      tips: Tip[];
    };
    content: {
      score: number;
      tips: Tip[];
    };
    structure: {
      score: number;
      tips: Tip[];
    };
    skills: {
      score: number;
      tips: Tip[];
      match: string[];
      missing: string[];
    };
  };
}

declare module 'react' {
  interface JSX {
    IntrinsicElements: {
      [elemName: string]: any;
    };
  }
}

export interface KVItem {
  key: string;
  value: string;
}
