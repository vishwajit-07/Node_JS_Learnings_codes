const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const home = [
    {
      id: 1,
      name: "Vishwajit",
      title: "Full Stack Developer",
      tagline: "Building scalable web applications with modern technologies.",
      description:
        "Passionate developer with experience in MERN Stack and Node.js applications. I love solving real-world problems through code.",
      skills: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "React.js",
        "EJS",
      ],
      buttonText: "View My Projects",
      buttonLink: "/projects",
    },
  ];
  res.render("home.ejs", { home });
});

app.get("/project", (req, res) => {
  const projects = [
    {
      id: 1,
      title: "Community Connect",
      image: "/images/community.jpg",
      description:
        "A platform that connects people within a community to share updates, events, and resources.",
      technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    },
    {
      id: 2,
      title: "Job Portal",
      image: "/images/jobportal.jpg",
      description:
        "An online job portal where employers can post jobs and candidates can apply for them.",
      technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "CSS"],
    },
    {
      id: 3,
      title: "Appointment Management System",
      image: "/images/appointment.jpg",
      description:
        "A system for booking and managing appointments between users and service providers.",
      technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    },
  ];

  res.render("project.ejs", { projects });
});

app.get("/education", (req, res) => {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science (BSc CS)",
      college: "ASP College",
      location: "Devrukh",
      year: "2019 - 2022",
      description:
        "Completed graduation in Computer Science with strong foundation in programming, databases, and web development.",
      cgpa: 9.79,
    },
    {
      id: 2,
      degree: "Master of Computer Applications (MCA)",
      college: "FAMT College",
      location: "Ratnagiri",
      year: "2022 - 2024",
      description:
        "Postgraduate degree focused on advanced software development, full-stack development, and system design.",
      cgpa: 8.36,
    },
  ];

  res.render("education.ejs", { education });
});

app.get("/contact", (req, res) => {
  const contact = {
    contact: 7741839179,
    email: "vishwajitmavalankar54339@gmail.com",
    likdin: "vishwajit-mavalankar-406206240/",
  };
  res.render("contact.ejs", { contact });
});

app.get("/about", (req,res) => {
  const about = [
    {
      id: 1,
      heading: "About Me",
      intro:
        "I am a passionate Full Stack Developer with strong problem-solving skills.",
      description:
        "I have completed BSc in Computer Science and MCA. I specialize in backend development using Node.js and Express, and I build complete web applications with database integration.",
      strengths: [
        "Strong Programming Fundamentals",
        "Quick Learner",
        "Team Player",
        "Problem Solving",
        "Project Development Experience",
      ],
      hobbies: [
        "Learning New Technologies",
        "Building Side Projects",
        "Reading Tech Blogs",
        "Exploring AI & ML",
      ],
    },
  ];

  res.render("about.ejs", { about });
});

app.use((req,res)=>{
    res.render('not_found.ejs');
})
const PORT = 3000;
const HOST = '127.0.0.1'
app.listen(PORT,HOST,()=>{
    console.log(`Server is upp on http://${HOST}:${PORT}`);
})