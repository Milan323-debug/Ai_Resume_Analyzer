import {  useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import Summary from '~/components/Summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => ([
    { title: "Resume Analyzer | Review" },
    { name: "description", content: "Detailed feedback for your Resume" },
])

const Resume = () => {
    const {auth, isLoading, fs, kv} = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading]);

    useEffect(() => {
      const loadResume = async () => {
        let resumeData = await kv.get(`resume:${id}`);
        let feedbackData = await kv.get(`feedback:${id}`);
        console.log('Raw feedback data:', feedbackData);
        let Data = resumeData ? JSON.parse(resumeData) : null;
        if (feedbackData) {
          const feedbackObj = JSON.parse(feedbackData);
          console.log('Parsed feedback object:', feedbackObj);
          if (feedbackObj.feedback) {
            Data = { ...Data, feedback: feedbackObj.feedback };
          }
        }
        console.log('Final Data object:', Data);
        if (!Data) return;
        const resumeBlob = await fs.read(Data.resumePath);
        if (!resumeBlob) return;

        const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);

        const imageBlob = await fs.read(Data.imagePath);
        if (!imageBlob) return;

        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);
        console.log('Setting feedback with data:', Data.feedback);
        if (Data.feedback && typeof Data.feedback === 'object') {
          setFeedback(Data.feedback);
        } else {
          console.error('Invalid feedback data:', Data.feedback);
          return;
        }
        console.log({resumeUrl, imageUrl, feedback: Data.feedback });
      };
      loadResume();
    }, [id]);
  return (
    <main className='!pt-0'>
      <nav className='resume-nav'>
        <Link to="/" className='back-button'>
         <img src="/icons/back.svg" alt="logo" className='w-2.5 h-2.5' />
            <span className='text-gray-800 text-sm font-semibold'>Back to Home</span>
        </Link>
      </nav>
      <div className='flex flex-row w-full max-lg:flex-col-reverse'>
            <section className='feedback-section bg-[url("/images/bg-small.svg")] bg-cover h-screen sticky top-0 flex items-center justify-center p-8 min-w-[50%]'>
                {imageUrl && resumeUrl && (
                    <div className='animate-in fade-in duration-1000 gradient-border p-4 w-full max-w-4xl mx-auto h-[90vh]'>
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className='w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-2xl'>
                        <img src={imageUrl} className='w-full h-full max-h-[85vh] object-contain rounded-2xl shadow-lg hover:scale-[1.02] transition-transform' 
                        title='resume'/>
                      </a>
                    </div>
                )}
            </section>
            <section className='feedback-section'>
                <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                { feedback && feedback.ATS ? (
                    <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
                       <Summary feedback={feedback} />
                       <ATS 
                         score={feedback.ATS.score} 
                         tips={feedback.ATS.tips}
                       />
                       <Details feedback={feedback} />
                    </div>
                    ):(
                      <img src="/images/resume-scan-2.gif" className='w-full '/>
                    )}
            </section>
      </div>
    </main>
  )
}

export default Resume