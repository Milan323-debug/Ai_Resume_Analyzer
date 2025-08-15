import { prepareInstructions, AIResponseFormat } from '../../constants';
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'
import { convertPdfToImage } from '~/lib/pdftoimage';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/utils';

const upload = () => {
    const { auth, fs, isLoading, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
      setFile(file);
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription }: { companyName: string; jobTitle: string; jobDescription: string; }) => {
      setIsProcessing(true);
      setStatusText('Processing...');
      if (!file) {
        setStatusText('No file selected. Please upload a file.');
        setIsProcessing(false);
        return;
      }
      const uploadFile = await fs.upload([file]);
      if (!uploadFile) return setStatusText('File upload failed. Please try again.');

      setStatusText('Analyzing resume...');
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file) return setStatusText('Image conversion failed. Please try again.');

      setStatusText("Uploading image...");
      const uploadImage = await fs.upload([imageFile.file]);
      if (!uploadImage) return setStatusText('Image upload failed. Please try again.');

      setStatusText('Preparing the data...');
      const uuid = generateUUID();
      const data: {
        id: string;
        resumePath: string;
        imagePath: string;
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        feedback?: any;
      } = {
        id: uuid,
        resumePath: uploadFile.path,
        imagePath: uploadImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText('Generating feedback...');
      const feedback = await ai.feedback(
        uploadFile.path,
        prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
      )

      if (!feedback) {
        setStatusText('Feedback generation failed. Please try again.');
        setIsProcessing(false);
        return;
      }
      const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

      data.feedback = JSON.parse(feedbackText);
      await kv.set(`feedback:${uuid}`, JSON.stringify(data));

      setStatusText('Feedback generated successfully!');
      console.log('Feedback Data:', data);
      navigate(`/resume/${uuid}`);
  }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (!form) return;
      const formData = new FormData(form);

      const companyName= formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        if (!file) return;

        handleAnalyze({ companyName: companyName as string, jobTitle: jobTitle as string, jobDescription: jobDescription as string });
    }


  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
      <Navbar />
      <section className = 'main-section'>
        <div className = 'page-heading py-16'>
            <h1>Smart feedback for your dream job</h1>
            {isProcessing ? (
                <>
                <h2>{statusText}</h2>
                <img src='/images/resume-scan.gif 'className='w-full'/>
                </>
            ) : (
                <>
                <h2>Upload your resume for ATS score</h2>
                </>
            )}
            {!isProcessing ? (
                <form id = 'upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='form-div'>
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name="company-name" placeholder="company-name" id= "company-name" />
                    </div>
                    <div className='form-div'>
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text" name="job-title" placeholder="job Title" id= "job-title" />
                    </div>
                    <div className='form-div'>
                        <label htmlFor="job-description">Job Description</label>
                        <textarea rows={5} name="job-description" placeholder="job Description" id= "job-description" />
                    </div>
                    <div className='form-div'>
                        <label htmlFor="uploader">Uploader</label>
                        <FileUploader onFileSelect={handleFileSelect}/>
                    </div>
                    <button type='submit' className='primary-button'>Analyze Resume</button>
                </form>
            ) : null}
        </div>
      </section>
    </main>
  )
}

export default upload