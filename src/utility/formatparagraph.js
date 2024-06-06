export const formatTextParagraph = (vital = {}, patientBio = {}, idgSummary = []) => {
    let paragraphData = "";
    const generateLabelValuePair = (label, value) => { return `${label.toUpperCase()}:${typeof (value) === 'number' ? value : value?.toUpperCase()}\n\n` };
    paragraphData += generateLabelValuePair(patientBio?.persons_age, vital?.persons_age);
    paragraphData += generateLabelValuePair(patientBio?.gender, vital?.gender);
    paragraphData += generateLabelValuePair(patientBio?.diagnosis, vital?.diagnosis);
    paragraphData += generateLabelValuePair(patientBio?.benefit_period, vital?.benefit_period);
    idgSummary.forEach((summarySection) => {
        paragraphData += `${summarySection.title.toUpperCase()}:\n`;
        summarySection.sections.forEach((subsection, index) => {
            paragraphData += `\t${index + 1}. ${subsection.label.toUpperCase()}${(typeof (subsection.label) === "string" && !(subsection?.label?.endsWith('?'))) ? '?' : ""} ${subsection.solutions.join(". ").toUpperCase()}\n`;
        });
    });
    return paragraphData;
}