const form = document.getElementById('resume-form');
const generateButton = document.getElementById('generate-resume');
const downloadButton = document.getElementById('download-pdf');

form.addEventListener('input', function () {
    const allFieldsValid = [...form.elements].every(element => {
        return !element.hasAttribute('required') || element.validity.valid;
    });

    generateButton.disabled = !allFieldsValid;
    downloadButton.disabled = !allFieldsValid;
});




document.querySelectorAll('.add-section-btn').forEach(button => {
    button.addEventListener('click', function () {
        const section = this.parentNode;
        const sectionId = section.id;
        let newFields;

        switch (sectionId) {
            case 'education-section':
                newFields = `
                    <div class="new-section">
                        <div class="d-flex justify-content-between">
                            <div class="me-4">
                                <span>Institute Name</span>
                                <input type="text" name="instituteName" placeholder="Enter Institute Name">
                            </div>
                            <div>
                                <span>Period</span>
                                <input type="text" name="educationPeriod" placeholder="Enter Period">
                            </div>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <div class="me-4">
                                <span>Percentage/CGPA</span>
                                <input type="text" name="marks" placeholder="90% or 9.2 CGPA">
                            </div>
                            <div>
                                <span>Subject/Stream</span>
                                <input type="text" name="stream" placeholder="B.Tech. in Computer Science">
                            </div>
                        </div>
                        <button type="button" class="btn btn-danger mt-2 btn-sm delete-btn">Delete Section</button>
                    </div>
                `;
                break;
            case 'experience-section':
                newFields = `
                    <div class="new-section">
                        <div class="d-flex justify-content-between">
                            <div class="me-4">
                                <span>Job Title</span>
                                <input type="text" name="jobTitle" placeholder="Enter Job Title">
                            </div>
                            <div>
                                <span>Company</span>
                                <input type="text" name="company" placeholder="Enter Company" autocomplete="on">
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="me-4">
                                <span>Period</span>
                                <input type="text" name="jobPeriod" placeholder="Enter Period">
                            </div>
                            <div>
                                <span>Location</span>
                                <input type="text" name="location" placeholder="Enter Location">
                            </div>
                        </div>
                        <div>
                            <span>Description</span>
                            <textarea name="experienceSummary" rows="4" 
                                placeholder="Enter Summary"></textarea>
                        </div>
                        <button type="button" class="btn btn-danger mt-2 btn-sm delete-btn">Delete Section</button>
                    </div>
                `;
                break;
            case 'projects-section':
                newFields = `
                    <div class="new-section">
                        <div class="d-flex justify-content-between">
                            <div class="me-4">
                                <span>Heading</span>
                                <input type="text" name="projectHeading" placeholder="Enter Heading">
                            </div>
                            <div>
                                <span>Time Period</span>
                                <input type="text" name="projectPeriod" placeholder="Enter Time Period">
                            </div>
                        </div>
                        <div>
                            <span>Description</span>
                            <textarea name="projectSummary" rows="4" 
                                placeholder="Enter Summary"></textarea>
                        </div>
                        <button type="button" class="btn btn-danger mt-2 btn-sm delete-btn">Delete Section</button>
                    </div>
                `;
                break;
            case 'certificates-section':
                newFields = `
                    <div class="new-section">
                        <div class="d-flex justify-content-between">
                            <div class="me-4">
                                <span>Heading</span>
                                <input type="text" name="heading" placeholder="Enter Heading">
                            </div>
                            <div>
                                <span>Link</span>
                                <input type="text" name="link" placeholder="Enter Link">
                            </div>
                        </div>
                        <div>
                            <span>Description</span>
                            <textarea name="certificationSummary" rows="4" 
                                placeholder="Enter Summary"></textarea>
                        </div>
                        <button type="button" class="btn btn-danger mt-2 btn-sm delete-btn">Delete Section</button>
                    </div>
                `;
                break;
            case 'skills-section':
                newFields = `
                    <div class="new-section d-flex">
                        <div>
                            <input type="text" name="skills">
                        </div>
                        <div>
                            <button type="button" class="btn btn-danger btn-sm ms-2 delete-btn mt-0">Delete Skill</button>
                        </div>
                    </div>
                `;
                break;
            default:
                newFields = '';
                break;
        }

        const newSection = document.createElement('div');
        newSection.innerHTML = newFields;

        section.insertBefore(newSection, this);

        // Add delete functionality to the new delete button
        newSection.querySelector('.delete-btn').addEventListener('click', function () {
            newSection.remove();
        });
    });
});

let profilePhotoSrc = "";
let resumeData = {};

function loadFile(event) {
    let output = document.getElementById('uploaded-image');
    const reader = new FileReader();
    reader.onload = function () {
        output.src = reader.result;
        profilePhotoSrc = reader.result; // Store the Data URL in profilePhotoSrc
    };
    reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('generate-resume').addEventListener('click', function () {
    const form = document.getElementById('resume-form');
    const formData = new FormData(form);
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        if (!jsonData[key]) {
            jsonData[key] = [];
        }
        jsonData[key].push(value);
    }

    // console.log(JSON.stringify(jsonData, null, 2));
    resumeData = jsonData;

    populateResumeContent(resumeData, profilePhotoSrc);
});

function populateResumeContent(data, photo) {
    const resumeContent = document.getElementById('resume-content');
    resumeContent.innerHTML = `
        <div class="header">
            <div class="header-left">
                <h1>${data.firstName} ${data.middleName} ${data.lastName}</h1>
                <div>
                    <span class="me-2">${data.emailId}</span> | <span class="mx-2">${data.phoneNumber}</span> | <span class="mx-2">${data.linkedInProfile}</span>
                </div>
            </div>
            <div class="header-right">
                <div class="profile-photo-container">
                    <img src="${profilePhotoSrc}" alt="Profile Photo">
                </div>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <div class="me-4">
                <section class="mb-2">
                    <h2>PROFESSIONAL SUMMARY</h2>
                    <p> ${data.professionalSummary} </p>
                </section>
                <section class="mb-2">
                    <h2>PROFESSIONAL EXPERIENCE</h2>
                    ${data.jobTitle.map((title, index) => `
                        <div>
                            <h3 class="mb-1 mt-2">${title}</h3>
                            <h4 class="mb-1">${data.company[index]}</h4>
                            <div class="mb-1 d-flex justify-content-around">
                                <div class="text-start"> <h6>${data.jobPeriod[index]}</h6> </div>
                                <div class="text-end"> <h6>${data.location[index]}</h6> </div>
                            </div>
                            <hr style="border-top: dotted 2px;" />
                            <p>${data.experienceSummary[index]}</p>
                        </div>
                    `).join('')}
                </section>
                <section class="mb-2">
                    <h2 class="mb-2">EDUCATION</h2>
                    ${data.instituteName.map((institute, index) => `
                        <div>
                            <h4 class="mb-1 mt-2">${institute}</h4>
                            <div class="d-flex justify-content-around">
                                <div class="text-start"> <h6 style="font-weight: bold;">${data.stream[index]}</h6> </div>
                                <div class="text-end"> <h6>${data.educationPeriod[index]}</h6> </div>
                            </div>
                            <p>Percentage/CGPA: ${data.marks[index]}</p>
                        </div>
                    `).join('')}
                </section>
            </div>
            <div>
                <section class="mb-2">
                    <h2 class="mb-2">SKILLS</h2>
                    ${data.skills.map(skill => `<span class="skill-badge badge text-bg-dark me-2"> ${skill} </span>`).join(' ')}
                </section>
                <section class="mb-2">
                    <h2>PROJECTS</h2>
                    ${data.projectHeading.map((heading, index) => `
                        <div>
                            <h4 class="mb-1 mt-2">${heading}</h4>
                            <h6 class="mb-1">${data.projectPeriod[index]}</h6>
                            <p>${data.projectSummary[index]}</p>
                        </div>
                    `).join(`<hr style="border-top: dotted 2px;" />`)}
                </section>
                <section>
                    <h2 class="mb-2">CERTIFICATIONS</h2>
                    ${data.heading.map((certHeading, index) => `
                        <div>
                            <h4>${certHeading}</h4>
                            <h6>${data.link[index]}</h6>
                            <p>${data.certificationSummary[index]}</p>
                        </div>
                    `).join(`<hr style="border-top: dotted 2px;" />`)}
                </section>
            </div>
        </div>
    `;

    resumeContentInnerHTML = document.getElementById('resume-content');
}

function generatePDF() {
    // console.log('clicked');
    $('#resume-content').printThis({
        // importCSS: true,
        importStyle: true,
        loadCSS: "https://prajnamayeesahu.github.io/resume-generator/styles.css",
        removeInline: false,
    });
}
// function generatePDF() {
//     console.log('clicked');
//     const resumeContent = document.getElementById('resume-content');
//     let opt = {
//         margin: 0,
//         filename: 'resume.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: {
//             unit: 'cm',
//             format: 'a4',
//             orientation: 'portrait'
//         }
//     };

//     html2pdf().set(opt).from(resumeContent).save();
// }

// function generatePDF() {
//     const resumeContent = document.getElementById('resume-content');

//     html2canvas(resumeContent).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
//         const imgWidth = 210;
//         const imgHeight = canvas.height * imgWidth / canvas.width;

//         pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//         pdf.save('resume.pdf');
//     }).catch(error => {
//         console.error('Error generating PDF:', error);
//     });
// }

document.getElementById('download-pdf').addEventListener('click', generatePDF);

