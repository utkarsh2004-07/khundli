// PDF and document parsing utilities
export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  
  if (fileType === 'application/pdf') {
    return extractTextFromPDF(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractTextFromDocx(file);
  } else if (fileType === 'text/plain') {
    return file.text();
  } else {
    throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Try PDF.js first (most reliable)
    const { extractPDFTextAdvanced } = await import('./pdfjs-parser.js');
    return await extractPDFTextAdvanced(file);
  } catch (error) {
    console.log('PDF.js failed, trying fallback method');
    try {
      // Fallback to basic extraction
      const { extractPDFText } = await import('./pdfParser.js');
      return await extractPDFText(file);
    } catch (fallbackError) {
      throw new Error('Could not extract text from PDF. Please copy and paste the text instead.');
    }
  }
}

async function extractTextFromDocx(file: File): Promise<string> {
  try {
    // For DOCX files, we'll need to use mammoth.js or similar
    // For now, we'll throw an error and ask user to convert
    throw new Error('DOCX parsing not yet implemented. Please convert to PDF or copy-paste the text.');
  } catch (error) {
    throw new Error('Failed to parse DOCX file. Please convert to PDF or copy-paste the text.');
  }
}

// Extract structured resume information in the exact format required
export function extractStructuredInfo(text: string) {
  const lines = text.split('\n').filter(line => line.trim());
  const lowerText = text.toLowerCase();
  
  const result = {
    profile: {
      profileName: '',
      fullName: '',
      email: '',
      phone: '',
      professionalSummary: ''
    },
    experienceLevel: '',
    skills: [] as string[],
    workExperience: [] as any[],
    education: [] as any[],
    projects: [] as any[]
  };

  // 1. Extract Profile Information
  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    result.profile.email = emailMatch[0];
  }

  // Extract phone (multiple patterns)
  const phonePatterns = [
    /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
    /\b\d{10}\b/,
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
  ];
  
  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.profile.phone = match[0];
      break;
    }
  }

  // Extract name (first meaningful line that looks like a name)
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim();
    const words = trimmed.split(' ');
    if (words.length >= 2 && words.length <= 4 && 
        /^[a-zA-Z\s.]+$/.test(trimmed) && 
        !trimmed.includes('@') && 
        !trimmed.includes('http') &&
        trimmed.length > 5) {
      result.profile.fullName = trimmed;
      result.profile.profileName = trimmed;
      break;
    }
  }

  // Extract professional summary
  const summaryPatterns = [
    /(?:SUMMARY|PROFILE|OBJECTIVE|ABOUT ME|CAREER OBJECTIVE)[:\s]*([\s\S]*?)(?=\n\s*(?:EXPERIENCE|EDUCATION|SKILLS|PROJECTS|WORK|EMPLOYMENT|$))/i,
    /(?:^|\n)\s*([A-Z][^\n]{80,400}[.!])(?=\n)/m
  ];
  
  for (const pattern of summaryPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.profile.professionalSummary = match[1].trim().replace(/\s+/g, ' ');
      break;
    }
  }

  // 2. Determine Experience Level
  if (lowerText.includes('fresher') || lowerText.includes('recent graduate') || 
      lowerText.includes('entry level') || lowerText.includes('new graduate')) {
    result.experienceLevel = 'Fresher';
  } else if (lowerText.includes('senior') || lowerText.includes('lead') || 
             lowerText.includes('manager') || lowerText.includes('architect') ||
             lowerText.includes('principal') || lowerText.includes('director')) {
    result.experienceLevel = 'Experienced';
  } else {
    result.experienceLevel = 'Professional';
  }

  // 3. Extract Skills
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
    'React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js',
    'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'Rails',
    'HTML', 'CSS', 'SCSS', 'Sass', 'Less', 'Bootstrap', 'Tailwind CSS', 'Material-UI',
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch',
    'AWS', 'Azure', 'GCP', 'Firebase', 'Heroku', 'Vercel', 'Netlify',
    'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'GitHub Actions',
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN',
    'REST API', 'GraphQL', 'gRPC', 'WebSocket', 'Microservices',
    'Linux', 'Ubuntu', 'Windows', 'macOS', 'Shell Scripting',
    'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'Trello',
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
    'Jest', 'Cypress', 'Selenium', 'Mocha', 'Chai', 'Testing',
    'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier',
    'Machine Learning', 'AI', 'Data Science', 'TensorFlow', 'PyTorch'
  ];
  
  // Extract skills from dedicated skills section first
  const skillsSection = text.match(/(?:SKILLS|TECHNICAL SKILLS|TECHNOLOGIES)[:\s]*([\s\S]*?)(?=\n\s*(?:EXPERIENCE|EDUCATION|PROJECTS|WORK|$))/i);
  if (skillsSection) {
    const skillsText = skillsSection[1];
    skillKeywords.forEach(skill => {
      if (skillsText.toLowerCase().includes(skill.toLowerCase())) {
        result.skills.push(skill);
      }
    });
  }
  
  // Also check entire document for skills
  skillKeywords.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase()) && !result.skills.includes(skill)) {
      result.skills.push(skill);
    }
  });

  // 4. Extract Work Experience
  const experienceSection = text.match(/(?:EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT|PROFESSIONAL EXPERIENCE)[:\s]*([\s\S]*?)(?=\n\s*(?:EDUCATION|SKILLS|PROJECTS|CERTIFICATIONS|$))/i);
  if (experienceSection) {
    const expText = experienceSection[1];
    const expLines = expText.split('\n').filter(line => line.trim());
    
    let currentExp: any = null;
    
    for (let i = 0; i < expLines.length; i++) {
      const line = expLines[i].trim();
      
      // Look for date patterns (start of new experience)
      const dateMatch = line.match(/(\d{1,2}\/\d{4}|\d{4}|\w+\s+\d{4})\s*[-–—]\s*(\d{1,2}\/\d{4}|\d{4}|\w+\s+\d{4}|present|current)/i);
      
      if (dateMatch) {
        // Save previous experience if exists
        if (currentExp) {
          result.workExperience.push(currentExp);
        }
        
        // Find company and role from previous lines
        let company = '';
        let role = '';
        
        for (let j = Math.max(0, i - 3); j < i; j++) {
          const prevLine = expLines[j]?.trim();
          if (prevLine && !prevLine.match(/\d{4}/) && prevLine.length > 2) {
            if (!company) company = prevLine;
            else if (!role && prevLine !== company) role = prevLine;
          }
        }
        
        currentExp = {
          company: company || 'Company Name',
          role: role || 'Position Title',
          startDate: dateMatch[1],
          endDate: dateMatch[2],
          keyAchievements: []
        };
      } else if (currentExp && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
        // Add achievement bullet point
        currentExp.keyAchievements.push(line.replace(/^[•\-*]\s*/, ''));
      } else if (currentExp && line.length > 20 && !line.includes('Company') && !line.includes('Position')) {
        // Add as achievement if it's a substantial line
        currentExp.keyAchievements.push(line);
      }
    }
    
    // Add the last experience
    if (currentExp) {
      result.workExperience.push(currentExp);
    }
  }

  // 5. Extract Education
  const educationSection = text.match(/(?:EDUCATION|ACADEMIC|QUALIFICATIONS?)[:\s]*([\s\S]*?)(?=\n\s*(?:EXPERIENCE|SKILLS|PROJECTS|CERTIFICATIONS|$))/i);
  if (educationSection) {
    const eduText = educationSection[1];
    const eduLines = eduText.split('\n').filter(line => line.trim());
    
    let currentEdu: any = null;
    
    for (const line of eduLines) {
      const trimmed = line.trim();
      
      // Look for degree patterns
      const degreeMatch = trimmed.match(/(bachelor|master|phd|doctorate|diploma|certificate|b\.?tech|m\.?tech|b\.?sc|m\.?sc|mba|bba|b\.?e|m\.?e|b\.?com|m\.?com)/i);
      
      if (degreeMatch) {
        if (currentEdu) {
          result.education.push(currentEdu);
        }
        
        currentEdu = {
          institution: '',
          degree: trimmed,
          graduationDate: ''
        };
        
        // Look for year in the same line or nearby
        const yearMatch = trimmed.match(/(20\d{2}|19\d{2})/);
        if (yearMatch) {
          currentEdu.graduationDate = yearMatch[0];
        }
      } else if (currentEdu && (trimmed.includes('University') || trimmed.includes('College') || trimmed.includes('Institute') || trimmed.includes('School'))) {
        currentEdu.institution = trimmed;
      } else if (currentEdu && !currentEdu.graduationDate) {
        const yearMatch = trimmed.match(/(20\d{2}|19\d{2})/);
        if (yearMatch) {
          currentEdu.graduationDate = yearMatch[0];
        }
      }
    }
    
    if (currentEdu) {
      result.education.push(currentEdu);
    }
  }

  // 6. Extract Projects
  const projectSection = text.match(/(?:PROJECTS?|PROJECT EXPERIENCE|PERSONAL PROJECTS?)[:\s]*([\s\S]*?)(?=\n\s*(?:EDUCATION|EXPERIENCE|SKILLS|CERTIFICATIONS|$))/i);
  if (projectSection) {
    const projText = projectSection[1];
    const projLines = projText.split('\n').filter(line => line.trim());
    
    let currentProject: any = null;
    
    for (const line of projLines) {
      const trimmed = line.trim();
      
      // Project name (usually a standalone line or starts with bullet)
      if (trimmed && !trimmed.startsWith('•') && !trimmed.startsWith('-') && 
          !trimmed.startsWith('*') && !trimmed.toLowerCase().includes('technologies') &&
          trimmed.length > 3 && trimmed.length < 100) {
        
        if (currentProject) {
          result.projects.push(currentProject);
        }
        
        const urlMatch = trimmed.match(/(https?:\/\/[^\s]+)/);
        
        currentProject = {
          projectName: trimmed.replace(/(https?:\/\/[^\s]+)/g, '').trim(),
          link: urlMatch?.[0] || '',
          description: '',
          technologies: []
        };
      } else if (currentProject && (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*'))) {
        // Description bullet point
        const desc = trimmed.replace(/^[•\-*]\s*/, '');
        if (currentProject.description) {
          currentProject.description += ' ' + desc;
        } else {
          currentProject.description = desc;
        }
      } else if (currentProject && trimmed.toLowerCase().includes('tech')) {
        // Extract technologies from this line
        const techLine = trimmed.replace(/technologies?[:\s]*/i, '');
        const techs = techLine.split(/[,;|]/).map(t => t.trim()).filter(t => t.length > 1);
        currentProject.technologies.push(...techs);
      }
    }
    
    if (currentProject) {
      result.projects.push(currentProject);
    }
  }

  // Clean up empty fields
  result.workExperience = result.workExperience.filter(exp => exp.company && exp.role);
  result.education = result.education.filter(edu => edu.degree || edu.institution);
  result.projects = result.projects.filter(proj => proj.projectName);

  return result;
}

// Keep original function for backward compatibility
export function extractPersonalInfo(text: string) {
  const structured = extractStructuredInfo(text);
  
  // Extract additional info not in main structure
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  const locationMatch = text.match(/(?:Address|Location)[:\s]*([^\n]+)/i) || 
                       text.match(/\b([A-Z][a-z]+,\s*[A-Z]{2}|[A-Z][a-z]+\s*\d{5})\b/);
  
  return {
    name: structured.profile.fullName,
    email: structured.profile.email,
    phone: structured.profile.phone,
    location: locationMatch?.[1]?.trim() || '',
    linkedin: linkedinMatch?.[0] || '',
    github: githubMatch?.[0] || ''
  };
}

// Extract skills from resume text
export function extractSkills(text: string): string[] {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'HTML', 'CSS', 'Angular', 'Vue.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Linux', 'REST', 'GraphQL',
    'Redux', 'Next.js', 'Tailwind', 'Bootstrap', 'Sass', 'Webpack', 'Babel',
    'Jest', 'Cypress', 'Selenium', 'Jenkins', 'CI/CD', 'Agile', 'Scrum',
    'VS Code', 'Mongoose', 'Antd', 'Mocha', 'bcrypt', 'JWT'
  ];

  // Clean text - remove instruction content
  const cleanText = text
    .replace(/Instruction:|💼|📈|🛠️|🏢|Button:|Options:|Listed Skills:/g, '')
    .replace(/List your technical and soft skills[^\n]*/g, '')
    .replace(/\+ Add[^\n]*/g, '');

  const foundSkills: string[] = [];
  const lowerText = cleanText.toLowerCase();

  commonSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  // Also look for skills in bullet points or listed format
  const lines = cleanText.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.includes('Instruction') && !trimmed.includes('Button')) {
      commonSkills.forEach(skill => {
        if (trimmed.toLowerCase() === skill.toLowerCase()) {
          foundSkills.push(skill);
        }
      });
    }
  });

  return Array.from(new Set(foundSkills)); // Remove duplicates
}

// Analyze keyword density and missing keywords
export function analyzeKeywords(resumeText: string, jobDescription: string = '') {
  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jobWords = jobDescription.toLowerCase().split(/\s+/);
  
  const techKeywords = [
    'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'docker',
    'kubernetes', 'aws', 'azure', 'mongodb', 'postgresql', 'redis', 'graphql',
    'rest', 'api', 'microservices', 'system design', 'agile', 'scrum', 'ci/cd',
    'git', 'linux', 'html', 'css', 'angular', 'vue', 'express', 'next.js'
  ];

  const presentKeywords = techKeywords.filter(keyword => 
    resumeWords.some(word => word.includes(keyword.replace('.', '')))
  );

  const jobKeywords = jobDescription ? 
    techKeywords.filter(keyword => 
      jobWords.some(word => word.includes(keyword.replace('.', '')))
    ) : [];

  const missingKeywords = jobKeywords.filter(keyword => 
    !presentKeywords.includes(keyword)
  );

  return {
    present: presentKeywords,
    missing: missingKeywords.length > 0 ? missingKeywords : 
      techKeywords.filter(k => !presentKeywords.includes(k)).slice(0, 5),
    suggestions: [
      'Add cloud technologies (AWS, Azure, Docker)',
      'Include DevOps tools (CI/CD, Kubernetes)',
      'Mention system design and architecture',
      'Add testing frameworks and methodologies'
    ]
  };
}