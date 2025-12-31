/**
* Companionem Linguae - ADHD Assesment Module
* Style:&nbsp;Defensive Programming &&nbsp;Clean Logic
 */

// 1. Referenzen auf die HTML-Elemente holen (z. B. Selects oder Radio-Groups)

const surveyForm = document.getElementById('adhd_survey_form');
const resultDisplay = document.getElementById('subtype_display');
const moduleSuggestions = document.getElementById('module_suggestions');
const analyzeBtn = document.getElementById('btn_analyze');

// 2. Event Listener for Assesment Logic

if (analyzeBtn) {
    analyzeBtn.addEventListener('click', function() {
        // Extract values from inputs (q1-q3: Inattention | q4-q6: Hyperactivity/Impulsivity)

        const scores = [
            parseInt(document.getElementById('q1').value),
            parseInt(document.getElementById('q2').value),
            parseInt(document.getElementById('q3').value),
            parseInt(document.getElementById('q4').value),
            parseInt(document.getElementById('q5').value),
            parseInt(document.getElementById('q6').value)
        ];

        let inattentionScore = scores[0] + scores[1] + scores[2];
        let hyperactivityScore = scores[3] + scores[4] + scores[5];
        let adhdSubtype = "";

        // --- VALIDATION AND ERROR HANDLING ---

        // Check 1: Ensure all questions are answered (NaN Check)

        if (scores.some(isNaN)) {
            resultDisplay.innerText = "Error: Please answer all questions!";
            resultDisplay.style.color = "red";
            return;
        }

        // --- LOGIC: SUBTYPE IDENTIFICATION ---

        // Threshold set to 6 points per category for initial assessment

        const threshold = 6;

        if (inattentionScore >= threshold && hyperactivityScore >= threshold) {
            adhdSubtype = "Combined";
        }
        else if (inattentionScore >= threshold) {
            adhdSubtype = "Predominantly Inattentive";
        }
        else if (hyperactivityScore >= threshold) {
            adhdSubtype = "Predominantly Hyperactive-Impulsive";
        }
        else {
            adhdSubtype = "No significant ADHD symptoms detected in these areas.";
        }

        // --- OUTPUT AND MODULAR SUGGESTIONS ---

        // Clean visualization using template literals

        resultDisplay.innerText = `Identified Subtype: ${adhdSubtype}`;
        resultDisplay.style.color = "green";

        // generate module suggestions based on specific scores

        let suggestions = [];
        if (inattentionScore >= threshold) {
            suggestions.push("Working Memory Relief", "Focus Timer");
        }
        if (hyperactivityScore >= threshold) {
            suggestions.push("Sensory Overload Log", "Impulse Control Module");
        }

        // Render list to the DOM

        if (suggestions.length > 0) {
            moduleSuggestions.innerHTML = `
                <p>Recommended Modules: </p>
                <ul>${suggestions.map(m => `<li>${m}</li>`).join('')}</ul>
            `;
        } else {
            moduleSuggestions.innerHTML = "<p>Standard modules enabled.</p>";
        }
    });

    // Quick Ghost Mode Toggle (Press 'G' key)

    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'g') {
            document.body.classList.toggle('ghost-mode');
            console.log("System Monitoring Mode Toggled.");
        }
    });
}
