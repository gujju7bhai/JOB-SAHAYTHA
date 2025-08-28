import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    // Removed local theme state, using global dark/light mode from App.js
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);

    const [CVData, setCVData] = useState({
        // Personal Information
        profilePicUrl: '',
        fullName: '',
        tagline: '',
        aboutMe: '',

        // Contact Information
        email: '',
        linkedin: '',
        github: '',
        website: '',

        // Educational Qualification
        presentEd: '',
        startYear: '',
        endYear: '',
        percentage: ''
    });

    useEffect(() => {
        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            // Handle file upload for profile picture
            const reader = new FileReader();
            reader.onload = (event) => {
                setCVData(prev => ({
                    ...prev,
                    [name]: event.target.result
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setCVData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const addProject = () => {
        const newProject = {
            id: Date.now(),
            title: '',
            description: '',
            link: '',
            imageUrl: ''
        };
        setProjects(prev => [...prev, newProject]);
    };

    const removeProject = (id) => {
        setProjects(prev => prev.filter(project => project.id !== id));
    };

    const updateProject = (id, field, value) => {
        setProjects(prev => prev.map(project =>
            project.id === id ? { ...project, [field]: value } : project
        ));
    };

    const addEducation = () => {
        const newEducation = {
            id: Date.now(),
            qualification: '',
            startYear: '',
            endYear: '',
            percentage: ''
        };
        setEducation(prev => [...prev, newEducation]);
    };

    const removeEducation = (id) => {
        setEducation(prev => prev.filter(edu => edu.id !== id));
    };

    const updateEducation = (id, field, value) => {
        setEducation(prev => prev.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    const addSkill = (skillValue, skillText) => {
        if (skillValue && !skills.find(skill => skill.value === skillValue)) {
            const newSkill = {
                id: Date.now(),
                value: skillValue,
                text: skillText
            };
            setSkills(prev => [...prev, newSkill]);
        }
    };

    const removeSkill = (id) => {
        setSkills(prev => prev.filter(skill => skill.id !== id));
    };

    const handleSkillSelect = (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;
        if (selectedValue) {
            addSkill(selectedValue, selectedText);
            e.target.value = '';
        }
    };

    const isEmailValid = (email) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isUrlValid = (url) => {
        // Simple URL regex
        return !url || /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(url);
    };

    const isProjectValid = (project) => {
        return project.title && project.description && isUrlValid(project.link);
    };

    const isEducationValid = (edu) => {
        return edu.qualification && edu.startYear && edu.endYear && edu.percentage;
    };

    const isFormValid = () => {
        // Check all required fields
        const {
            fullName, tagline, aboutMe, email, linkedin, github, website, presentEd, startYear, endYear, percentage
        } = CVData;
        if (!fullName || !tagline || !aboutMe || !email || !presentEd || !startYear || !endYear || !percentage) return false;
        if (!isEmailValid(email)) return false;
        if (linkedin && !isUrlValid(linkedin)) return false;
        if (github && !isUrlValid(github)) return false;
        if (website && !isUrlValid(website)) return false;
        if (projects.length === 0 || !projects.every(isProjectValid)) return false;
        if (education.length > 0 && !education.every(isEducationValid)) return false;
        if (skills.length === 0) return false;
        return true;
    };

    const generateCV = (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill all required fields correctly before submitting.');
            return;
        }
        const CVContent = {
            ...CVData,
            projects,
            education,
            skills
        };
        console.log('Generated CV:', CVContent);
        alert('CV generated! Check the console for details.');
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard-container">
            <header>

                <button className="logout-float-btn" onClick={handleLogout}>
                    Logout
                </button>

                <div>
                    <h1>CV Generator</h1>
                    <button onClick={openModal}>Create Your CV
                    </button>
                </div>
            </header>

            <main>
                <div id="CVOutput">
                    <div id="placeholder">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h2>Your CV Will Appear Here</h2>
                    </div>
                </div>
            </main>

            {/* CV Modal */}
            {
                isModalOpen && (
                    <div className="CVModal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>CV Details</h2>
                                <button type="button" className="closeModalBtn" onClick={closeModal}>
                                    &times;
                                </button>
                            </div>

                            <form className="CVForm" onSubmit={generateCV}>
                                <fieldset>
                                    <legend>Personal Information</legend>
                                    <div className="form-grid">
                                        <div className="form-group profilePicContainer">
                                            <label htmlFor="profilePicUrl">Profile Picture</label>
                                            <input
                                                type="file"
                                                name="profilePicUrl"
                                                id="profilePicUrl"
                                                accept="image/*"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                placeholder="Enter your Name"
                                                value={CVData.fullName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tagline">Title</label>
                                            <input
                                                type="text"
                                                id="tagline"
                                                name="tagline"
                                                placeholder="Your Job Title"
                                                value={CVData.tagline}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="aboutMe">About Me</label>
                                            <textarea
                                                id="aboutMe"
                                                name="aboutMe"
                                                rows="4"
                                                placeholder="Hobbies, or anything extra curricular"
                                                value={CVData.aboutMe}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Contact Information</legend>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={CVData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="linkedin">LinkedIn Profile URL</label>
                                            <input
                                                type="url"
                                                id="linkedin"
                                                name="linkedin"
                                                placeholder="https://linkedin.com/in/yourprofile"
                                                value={CVData.linkedin}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="github">GitHub Profile URL</label>
                                            <input
                                                type="url"
                                                id="github"
                                                name="github"
                                                placeholder="https://github.com/yourusername"
                                                value={CVData.github}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="website">Personal Website/Other Link</label>
                                            <input
                                                type="url"
                                                id="website"
                                                name="website"
                                                placeholder="https://yourwebsite.com"
                                                value={CVData.website}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Educational Qualification</legend>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="presentEd">Present Qualification</label>
                                            <input
                                                type="text"
                                                name="presentEd"
                                                id="presentEd"
                                                value={CVData.presentEd}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="startYear">Start Year</label>
                                            <input
                                                type="date"
                                                name="startYear"
                                                id="startYear"
                                                value={CVData.startYear}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="endYear">End Year</label>
                                            <input
                                                type="date"
                                                name="endYear"
                                                id="endYear"
                                                value={CVData.endYear}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="percentage">Percentage</label>
                                            <input
                                                type="number"
                                                min="20"
                                                max="100"
                                                step="0.1"
                                                id="percentage"
                                                name="percentage"
                                                value={CVData.percentage}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Additional Education Entries */}
                                    {education.map((edu, index) => (
                                        <div key={edu.id} className="education-entry">
                                            <h3>Additional Education {index + 1}</h3>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Qualification</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Degree/Course"
                                                        value={edu.qualification}
                                                        onChange={(e) => updateEducation(edu.id, 'qualification', e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Start Year</label>
                                                    <input
                                                        type="date"
                                                        value={edu.startYear}
                                                        onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>End Year</label>
                                                    <input
                                                        type="date"
                                                        value={edu.endYear}
                                                        onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Percentage/GPA</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.1"
                                                        value={edu.percentage}
                                                        onChange={(e) => updateEducation(edu.id, 'percentage', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="remove-education-btn"
                                                onClick={() => removeEducation(edu.id)}
                                            >
                                                Remove Education
                                            </button>
                                        </div>
                                    ))}

                                    <button type="button" className="addEducationBtn" onClick={addEducation}>
                                        +
                                    </button>
                                </fieldset>

                                <fieldset>
                                    <legend>Skills</legend>
                                    <div className="skillsDropdownContainer">
                                        <label htmlFor="skillsDropdown">Select Your Skills:</label>
                                        <select
                                            className="skillsDropdown"
                                            name="skills"
                                            onChange={handleSkillSelect}
                                            defaultValue=""
                                        >
                                            <option value="">-- Select Skill --</option>
                                            <option value="html">HTML</option>
                                            <option value="css">CSS</option>
                                            <option value="javascript">JavaScript</option>
                                            <option value="python">Python</option>
                                            <option value="react">React</option>
                                            <option value="nodejs">Node.js</option>
                                            <option value="php">PHP</option>
                                            <option value="java">Java</option>
                                        </select>
                                    </div>

                                    <div className="skillsListContainer">
                                        {skills.map(skill => (
                                            <span key={skill.id} className="skill-tag">
                                                {skill.text}
                                                <button
                                                    type="button"
                                                    className="remove-skill-btn"
                                                    onClick={() => removeSkill(skill.id)}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Projects</legend>
                                    <div>
                                        {projects.map((project, index) => (
                                            <div key={project.id} className="project-entry">
                                                <h4>Project {index + 1}</h4>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Project Title</label>
                                                        <input
                                                            type="text"
                                                            value={project.title}
                                                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group full-width">
                                                        <label>Description</label>
                                                        <textarea
                                                            rows="4"
                                                            value={project.description}
                                                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Project Link (URL)</label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://example.com/myproject"
                                                            value={project.link}
                                                            onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Project Image URL</label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://example.com/project-image.jpg"
                                                            value={project.imageUrl}
                                                            onChange={(e) => updateProject(project.id, 'imageUrl', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="remove-project-btn"
                                                    onClick={() => removeProject(project.id)}
                                                >
                                                    Remove Project
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" className="addProjectBtn" onClick={addProject}>
                                        Add Project
                                    </button>
                                </fieldset>

                                <div className="form-actions">
                                    <button type="button" className="cancelModalBtn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="submitBtn">
                                        Generate CV
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            <footer>
                <div>
                    <p>Project by Angshuman Paul ♥</p>
                    © 2025 JOB Sahaytha. All rights reserved.
                    <br />
                    <a href="#privacy">Privacy Policy</a> | <a href="#contact">Contact Us</a>
                    <p>☎ Tel:9796312481</p>
                    <p>📧 Email:akash297gjjuk@gmail.com</p>
                </div>
            </footer>
        </div >
    );
};

export default Dashboard;
