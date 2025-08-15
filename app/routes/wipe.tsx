import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [deleting, setDeleting] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete all your resume data? This action cannot be undone.")) {
            return;
        }
        
        setDeleting(true);
        
        try {
            for (const file of files) {
                await fs.delete(file.path);
            }
            await kv.flush();
            navigate("/");
        } catch (error) {
            console.error('Error deleting files:', error);
            setDeleting(false);
        }
    };

    if (isLoading || deleting) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
                <div className="flex flex-col items-center justify-center h-screen">
                    <img src="/images/resume-scan-2.gif" alt="loading" className="w-[200px]" />
                    <h2 className="text-xl mt-4">{deleting ? 'Deleting all data...' : 'Loading...'}</h2>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        <h2 className="text-xl font-bold">Error</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span>Back to Home</span>
                </Link>
            </nav>
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Wipe All Data</h1>
                    <h2 className="text-red-600">This action will permanently delete all your resumes and feedback</h2>
                    
                    <div className="mt-8 bg-white/10 backdrop-blur rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4">Files to be deleted ({files.length})</h3>
                        <div className="space-y-2 mb-6">
                            {files.map((file) => (
                                <div key={file.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                                    <span className="text-gray-700">{file.name}</span>
                                </div>
                            ))}
                            {files.length === 0 && (
                                <p className="text-gray-500 text-center py-4">No files found</p>
                            )}
                        </div>
                        
                        <div className="flex gap-4 justify-end">
                            <Link to="/" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors">
                                Cancel
                            </Link>
                            <button
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                                onClick={handleDelete}
                                disabled={files.length === 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Delete All Data
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};


export default WipeApp;