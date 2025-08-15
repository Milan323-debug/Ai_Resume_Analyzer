import React from "react";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const meta = () => {
  return [
    { title: "Resume Analyzer" },
    {
      name: "description",
      content: "Smart feedback for your ResumeAnalyzer app",
    },
  ];
};

const WipeButton: React.FC = () => (
  <Link 
    to="/wipe" 
    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    Wipe All Data
  </Link>
);

const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <img src="/images/resume-scan-2.gif" alt="scan" className="w-[200px]" />
  </div>
);

const ResumeList: React.FC<{resumes: Resume[]}> = ({resumes}) => (
  <div className="resumes-section">
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
);

const UploadPrompt: React.FC = () => (
  <div className="flex flex-col items-center justify-center mt-10 gap-4">
    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
      Upload your resume
    </Link>
  </div>
);

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
      if (!auth.isAuthenticated) navigate('/auth?next=/'); 
    }, [auth.isAuthenticated, navigate]); 

    useEffect(() => {
      const loadResumes = async () => {
        setLoadingResumes(true);

        const resumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
        ));
        
        console.log("Resumes loaded:", parsedResumes);
        setResumes(parsedResumes || []);
        setLoadingResumes(false);
      };
      loadResumes();
    }, [kv]);

    return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover relative">
        <Navbar />
        <section className="main-section relative">
          <div className="page-heading py-16">
            <h1>Welcome to ResumeAnalyzer</h1>
            {!loadingResumes && resumes.length === 0 ? (
              <h2>No resumes found. Please upload your resume for analysis.</h2>
            ) : (
              <h2>
                Review your resumes and get smart feedback to improve them.
              </h2>
            )}
          </div>

          {/* Wipe button positioned relative to page content and restyled to match theme */}
          {!loadingResumes && resumes.length > 0 && (
            <div className="absolute top-6 right-6 z-20">
              <Link
                to="/wipe"
                aria-label="Wipe all data"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-purple-600 hover:to-indigo-500 text-white rounded-full text-sm shadow-2xl ring-1 ring-white/20 transition-transform transform hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Wipe All Data
              </Link>
            </div>
          )}

          {loadingResumes && (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/resume-scan-2.gif" alt="scan" className="w-[200px]" />
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume: Resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}

          {!loadingResumes && resumes.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
              <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                Upload your resume
              </Link>
            </div>
          )}
        </section>
      </main>
  );
}
