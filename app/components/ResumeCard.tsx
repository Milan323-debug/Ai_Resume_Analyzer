import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore} from "~/lib/puter";


const ResumeCard = ({resume: {id, companyName, jobTitle, imagePath, feedback}}: {resume: Resume}): JSX.Element => {

  const  {fs} = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
      useEffect(() => {
          const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
           let url = URL.createObjectURL(blob);
           setResumeUrl(url);
      };
          loadResume();
      }, [imagePath]);
  return (
    <Link
      to={`/resume/${id}`}
  className="resume-card animate-in fade-in duration-1000 relative overflow-hidden"
    >
      <div className="resume-card-header ">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="!text-black font-bold break-words">
              {companyName}
            </h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">
              {jobTitle}
            </h3>
          )}
          {!companyName && !jobTitle && <h2 className="!text-black font-bold break-words">Resume</h2>}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      { resumeUrl && (
      <div className="gradient-border animate-in fade-in duration-1000">
         <div className="w-full h-full ">
          <img
            src={resumeUrl}
            alt = "resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top "
          />
        </div>
      <div className="card-overlay">
        <div className="card-cta">
          <span>View details</span>
        </div>
      </div>
      </div>
      )}
    </Link>
  );
}


export default ResumeCard;
