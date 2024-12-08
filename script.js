// Hide result and feedback sections initially
document.getElementById("loadingSpinner").style.display = "none";
document.getElementById("resultBox").style.display = "none";
document.getElementById("feedbackForm").style.display = "none";

// Helper function to map income slab to numerical range
function getIncomeRange(slab) {
    switch (slab) {
        case "less5":
            return { min: 0, max: 500000 };
        case "5to10":
            return { min: 500001, max: 1000000 };
        case "10to15":
            return { min: 1000001, max: 1500000 };
        case "15to25":
            return { min: 1500001, max: 2500000 };
        case "more25":
            return { min: 2500001, max: Infinity };
        default:
            return null;
    }
}

// Handle predict button click
document.getElementById("predictButton").addEventListener("click", function () {
    const age = parseInt(document.getElementById("age").value);
    const employment = document.getElementById("employment").value;
    const incomeSlab = document.getElementById("income").value;
    const gender = document.getElementById("gender").value;
    const preference = document.getElementById("preference").value;

    if (!age || !employment || !incomeSlab || !gender || !preference) {
        alert("Please fill out all fields.");
        return;
    }

    // Map income slab to numerical range
    const incomeRange = getIncomeRange(incomeSlab);
    if (!incomeRange) {
        alert("Invalid income selection.");
        return;
    }

    // Hide the form and show loading spinner
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("loadingSpinner").style.display = "block";

    // Simulate a delay for prediction processing
    setTimeout(() => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("resultBox").style.display = "block";

        let result = "General Savings Account";

        // Apply account prediction conditions
        if (age < 18) {
            const parentIncome = parseInt(prompt("Enter parent's income (in INR):"));
            if (!isNaN(parentIncome)) {
                result = parentIncome > 1000000 ? "Super Kids Account" : "Kids Savings Account";
            } else {
                alert("Invalid input for parent's income.");
                document.getElementById("formContainer").style.display = "block";
                document.getElementById("resultBox").style.display = "none";
                return;
            }
        } else if (employment === "retired" && age > 18) {
            result = incomeRange.max > 1000000 ? "Speciale Senior Citizen Account" : "Senior Citizen Account";
        } else if (preference === "freelancer") {
            result = "Giga Savings Account";
        } else if (gender === "female" && age > 18) {
            result = incomeRange.max > 1000000 ? "Speciale Women's Account" : "Women's Advantage Account";
        } else if (employment === "salaried") {
            result =
                incomeRange.max > 1500000
                    ? "Speciale Platinum Account"
                    : incomeRange.max > 1200000
                    ? "Speciale Gold Account"
                    : "Savings Max Account";
        } else if (employment === "self-employed") {
            const transactions = parseInt(prompt("Enter monthly number of transactions:"));
            if (!isNaN(transactions)) {
                if (incomeRange.max > 1000000 && transactions > 30) {
                    result = "Max Advantage CA";
                } else if (incomeRange.max > 500000 && transactions > 10) {
                    result = "Active CA";
                } else {
                    result = "Ascent CA";
                }
            } else {
                alert("Invalid input for number of transactions.");
                document.getElementById("formContainer").style.display = "block";
                document.getElementById("resultBox").style.display = "none";
                return;
            }
        }

        // Display prediction result
        document.getElementById("resultText").innerText = `Your recommended HDFC product is: ${result}`;
    }, 5000); // 5-second delay
});

// Handle close button click in the result box
document.getElementById("closeResult").addEventListener("click", function () {
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("feedbackForm").style.display = "block";
});

// Handle feedback form submission
document.getElementById("submitFeedback").addEventListener("click", function () {
    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value;

    if (!rating || !feedback) {
        alert("Please provide both a rating and feedback.");
        return;
    }

    // Create the content for the file
    const feedbackData = `Rating: ${rating}\nFeedback: ${feedback}\n\n`;

    // Create a Blob and a link to download the data
    const blob = new Blob([feedbackData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback.txt";

    // Simulate a click to download the file
    link.click();

    alert("Thank you for your feedback! It has been saved to a file.");

    // Reset feedback form and show the main form
    document.getElementById("feedbackForm").style.display = "none";
    document.getElementById("formContainer").style.display = "block";

    // Clear form fields
    document.getElementById("predictForm").reset();
    document.getElementById("rating").value = "";
    document.getElementById("feedback").value = "";
});
