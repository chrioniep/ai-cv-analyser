import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Deatils from "~/components/Deatils";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "HireMatch | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];
const Resume = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  const { auth, isLoading, fs, kv } = usePuterStore();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!loadResume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlog = await fs.read(data.imagePath);
      if (!imageBlog) return;
      const imageUrl = URL.createObjectURL(imageBlog);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log(resumeUrl, imageUrl, data);
    };
    loadResume();
  }, [id]);
  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link
          to="/"
          className="back-button"
        >
          <img
            src="/icons/back.svg"
            alt="back"
            className="w-2.5 h-2.5"
          />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={imageUrl}
                  alt="resume"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animage-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Deatils feedback={feedback} />
            </div>
          ) : (
            <img
              src="/images/resume-scan-2.gif"
              className="w-full"
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
