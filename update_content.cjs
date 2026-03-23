const fs = require('fs');
const path = './src/data/mockData.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const templates = {
  nursery: `A nursery curriculum is meticulously designed to provide a rich and stimulating learning environment that fosters the holistic development of young children. Its primary goal is to lay strong foundations for lifelong learning and ensure children are well-prepared for their eventual transition to primary school.

At its core, the curriculum embraces play-based learning, recognizing that children learn best through active engagement and exploration. This approach integrates both child-initiated play, where curiosity leads discovery, and adult-guided activities, offering structured opportunities for skill development.

Through various forms of play—including imaginative, constructive, and physical—children develop critical cognitive, social, emotional, physical, and creative capacities. Further key areas involve Literacy, cultivating a love for books, sounds, and early writing; Mathematics, developing an understanding of numbers, shapes, and measurement; and Understanding the World, encouraging curiosity about people, cultures, technology, and the natural environment. Expressive Arts and Design nurture creativity through art, music, dance, and role-play.`,
  primary: `The Primary School curriculum focuses on building a solid academic foundation while nurturing the natural curiosity and creativity of students. During these formative years, the emphasis shifts toward structured learning across core subjects like English, Mathematics, Science, and Social Studies, while maintaining a strong pulse on emotional and social growth.

Students are encouraged to engage in hands-on activities, projects, and collaborative learning that go beyond textbooks. The curriculum is designed to develop critical thinking, problem-solving skills, and a love for reading. Technology integration becomes more prominent, introducing students to digital literacy in a safe and guided environment.

Physical education, visual arts, and performing arts remain integral parts of the weekly schedule, ensuring a well-rounded educational experience. We aim to create confident learners who can express themselves clearly, work well with others, and understand the basic principles of the world around them. Regular assessments are conceptual rather than just rote-based, focusing on the child's true understanding of the subject matter.`,
  middle: `The Middle School years represent a crucial transition period as students move from foundational learning to more complex, specialized subjects. The curriculum is designed to provide greater depth in core disciplines while introducing elective options that allow students to explore their unique interests and talents.

Analytical thinking and independent research become key components of the learning process. Students are challenged with interdisciplinary projects that require them to apply knowledge from different fields to solve real-world problems. This stage also places a high priority on personal development, helping students navigate the challenges of adolescence with resilience and empathy.

Laboratory work in sciences, advanced mathematical concepts, and in-depth historical and geographical studies prepare students for the rigors of high school. We also emphasize soft skills such as effective communication, leadership, and time management. Extracurricular activities, from competitive sports to debate clubs, provide ample opportunities for students to build character and explore their passions.`,
  secondary: `Secondary School (Grades 9-10) is a high-stakes period focused on academic excellence and preparation for board examinations. The curriculum becomes more rigorous, with a clear focus on mastering core subjects such as Advanced Mathematics, Physics, Chemistry, Biology, and Social Sciences.

Students are trained in disciplined study habits, exam techniques, and advanced critical analysis. However, the approach remains holistic, ensuring that students also focus on career planning, personality development, and physical fitness. This stage is designed to help students identify their academic strengths and interests as they prepare to choose specialized streams for their higher secondary education.

We provide extensive support through remedial classes, mock tests, and personalized counseling. The goal is not just to achieve high scores but to develop a deep understanding of the subjects that will serve as a foundation for future professional studies. Innovation and project-based learning continue to be encouraged to bridge the gap between theoretical knowledge and practical application.`,
  higherSecondary: `Higher Secondary School (Grades 11-12) is the final bridge to university education. Students choose specialized streams—Science, Commerce, or Humanities—based on their career aspirations. The curriculum is intensive, aligned with national standards, and focuses on deep specialization in chosen subjects.

This period is marked by advanced laboratory work, complex mathematical modeling, and in-depth theoretical studies. Students are provided with comprehensive career guidance and university entrance exam coaching. We aim to produce self-driven individuals who are ready to excel in competitive higher education environments worldwide.

Beyond academics, students take on leadership roles in school committees and community service projects. We foster an environment of intellectual independence where students are encouraged to challenge ideas, conduct independent research, and prepare for the professional world. Our graduates leave with not only strong academic credentials but also the character and skills needed to thrive in a global society.`,
  bsc_cs: `The Bachelor of Science in Computer Science (B.Sc. CS) is a comprehensive three-year undergraduate program designed to provide students with a deep understanding of computer systems and software development. The curriculum blends theoretical foundations with practical expertise, covering essential areas like programming, algorithms, data structures, and database management.

In the first year, students focus on core concepts such as Computer Architecture, Programming in C, and Discrete Mathematics. As the program progresses, the focus shifts toward advanced topics including Operating Systems, Software Engineering, Computer Networks, and Web Development. Students gain hands-on experience through regular lab sessions and real-world projects.

The final year often includes specialization electives such as Artificial Intelligence, Data Mining, or Mobile App Development, alongside a major capstone project. This program is ideal for those looking to build a career in software engineering, systems analysis, or research. Graduates are well-equipped to handle the evolving challenges of the global tech industry.`,
  bca: `The Bachelor of Computer Applications (BCA) is a professional undergraduate degree program that focuses on the practical application of computer technology in the business world. Unlike pure science degrees, BCA emphasizes software development, database management systems, and web design with a strong lean toward industry requirements.

The curriculum is structured to bridge the gap between theoretical knowledge and industry practices. Students learn about Programming Languages (Java, Python, C++), Data Communication, Networking, and Information Security. Management-related subjects such as Business Communication and Management Information Systems (MIS) are also included to provide a professional edge.

Practical training through internships and live projects is a core part of the BCA experience. The program aims to create skilled professionals who can design, develop, and manage complex software applications. With the rapid digitization of all business sectors, BCA graduates are in high demand for roles such as Web Developers, Software Testers, and Technical Support Engineers.`,
  mba: `The Master of Business Administration (MBA) is a prestigious two-year postgraduate program designed to develop advanced leadership and management skills. The curriculum is intensive and case-study driven, providing students with a 360-degree view of the business world, from finance and marketing to operations and human resources.

In the first year, students cover core management disciplines, building a solid foundation in Organizational Behavior, Managerial Economics, Financial Accounting, and Strategic Management. The second year allows for deep specialization in areas such as International Business, Data Analytics, Entrepreneurship, or Supply Chain Management.

Corporate interactions, guest lectures from industry leaders, and a mandatory summer internship provide students with invaluable practical exposure. The program focuses on enhancing critical thinking, negotiation skills, and strategic decision-making. MBA graduates are prepared to take on senior management roles and drive innovation in diverse organizational settings globally.`,
};

data.institutions.forEach(inst => {
  inst.courses.forEach(course => {
    const slug = course.slug.toLowerCase();
    
    if (slug.includes('nursery')) course.description = templates.nursery;
    else if (slug.includes('ukg') || slug.includes('kindergarten')) course.description = templates.nursery; // Similar enough for mock
    else if (slug.includes('primary')) course.description = templates.primary;
    else if (slug.includes('middle')) course.description = templates.middle;
    else if (slug.includes('secondary-school-grade-9-10')) course.description = templates.secondary;
    else if (slug.includes('higher-secondary')) course.description = templates.higherSecondary;
    else if (slug.includes('bsc-computer-science') || slug.includes('bsc-cs')) course.description = templates.bsc_cs;
    else if (slug.includes('bca')) course.description = templates.bca;
    else if (slug.includes('mba')) course.description = templates.mba;
    
    // Fallback if no specific template but needs extension
    if (course.description.length < 100) {
        course.description = course.description + " This comprehensive program is designed to provide students with the necessary skills and knowledge to excel in their chosen field. Through a combination of theoretical learning and practical application, students will gain a deep understanding of the core concepts and stay updated with the latest industry trends. The curriculum is regularly updated to meet evolving standards and ensure that graduates are well-prepared for the professional world. We focus on holistic development, encouraging students to participate in various co-curricular activities and build a strong professional network. Join us to embark on a journey of academic excellence and career success.";
    }
  });
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Updated course descriptions in mockData.json");
