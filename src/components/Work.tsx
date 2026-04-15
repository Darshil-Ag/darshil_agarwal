import { useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Work = () => {
  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">

          {/* Project 1 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>
                    <a href="https://www.aimanhealth.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
                      Aiman Healthcare
                    </a>
                  </h4>
                  <p>Full-Stack / Healthcare</p>
                </div>
              </div>
              <h4>Tools &amp; Technologies</h4>
              <p>React, Node.js, Express, Supabase, MongoDB, Razorpay</p>
              <p style={{ marginTop: "10px", color: "white" }}>
                <strong>Achieved 100 SEO &amp; 98 Performance!</strong>
              </p>
            </div>
            <WorkImage image="/images/aiman.png" alt="Aiman Healthcare Platform" />
          </div>

          {/* Project 2 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>
                    <a href="https://www.sankalpsewasansthan.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
                      Sankalp Sewa Sansthan
                    </a>
                  </h4>
                  <p>Full-Stack / NGO</p>
                </div>
              </div>
              <h4>Tools &amp; Technologies</h4>
              <p>React, Node.js, Supabase, Razorpay</p>
            </div>
            <WorkImage image="/images/sankalp.png" alt="Sankalp Sewa NGO Platform" />
          </div>

          {/* Project 3 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Darshil-Ag/cultural_bias" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
                      Multilingual LLM Bias Reduction
                    </a>
                  </h4>
                  <p>AI / NLP</p>
                </div>
              </div>
              <h4>Tools &amp; Technologies</h4>
              <p>Python, XLM-RoBERTa, ML Pipelines</p>
            </div>
            <WorkImage image="/images/02.png" alt="Multilingual LLM Bias Reduction System" />
          </div>

          {/* Project 4 */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Darshil-Ag/pfi" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
                      Predictive Financial Identity
                    </a>
                  </h4>
                  <p>AI + Blockchain</p>
                </div>
              </div>
              <h4>Tools &amp; Technologies</h4>
              <p>Polygon, SHA-256, Random Forest, Python</p>
            </div>
            <WorkImage image="/images/PFI.png" alt="Predictive Financial Identity System" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Work;
