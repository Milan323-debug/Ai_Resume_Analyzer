import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "./../../constants/index";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    {
      name: "description",
      content: "Smart feedback for your ResumeAnalyzer app",
    },
  ];
}

export default function Home() {

    const { auth}= usePuterStore();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!auth.isAuthenticated) navigate('/auth?next=/'); 
    }, [auth.isAuthenticated]); 

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover ">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Welcome to ResumeAnalyzer</h1>
          <h2>Your one-stop solution for resume feedback and improvement.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
