import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer — Full Stack</h4>
                <h5>Aiman Healthcare</h5>
              </div>
            </div>
            <p>
              Solely architected and deployed a production-grade full-stack healthcare platform,
              owning frontend, backend, and database systems. Built secure admin workflows, client
              booking systems, and Razorpay payment integration using React, Node.js, Express,
              Supabase, and MongoDB. Achieved <strong>98 performance &amp; 100 SEO</strong> scores on Google PageSpeed Insights.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Sankalp Sewa Sansthan</h5>
              </div>
            </div>
            <p>
              Developed and deployed a production-ready NGO platform enabling secure online
              donations with real-time transaction processing. Implemented Razorpay integration,
              authentication, REST APIs, analytics dashboards, and donor transparency systems
              using React, Node.js, and Supabase.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineering Intern</h4>
                <h5>WebArcLight</h5>
              </div>
            </div>
            <p>
              Delivered client-facing production websites end-to-end, handling development,
              deployment, and hosting. Improved SEO and performance metrics, and collaborated
              directly with clients to scope requirements and ensure successful delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
