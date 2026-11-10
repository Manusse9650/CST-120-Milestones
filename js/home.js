/*
    CST-120 Milestone 5 - Home Page JavaScript

    This file controls the Begin Your Journey form on index.html.

    It demonstrates:
    - External JavaScript
    - Unobtrusive event handling
    - Form submit interception
    - event.preventDefault()
    - Validation with a loop
    - Selection statements
    - String methods
    - Template literals
    - Inline user feedback
    - Accessibility-focused feedback
*/


/*
    Student information object.

    This object stores information about the website creator
    that will be displayed after the visitor successfully
    completes the form.
*/

const studentInfo = {
    name: "Samantha Manuszak",
    educationLevel: "Sophomore",
    major: "Biomedical Engineering",
    classDesignation: "CST-120 Introduction to Web Development",
    anticipatedOccupation: "Biomedical Engineer"
};


/*
    Cache the form and output elements.

    These selectors are stored once so the same elements
    do not need to be searched for repeatedly.
*/

const studentForm =
    document.getElementById("student-form");

const studentOutput =
    document.getElementById("student-output");


/*
    showStudentInfo()

    Purpose:
    Formats the visitor's name, identifies the page connected
    to their selected interest, and displays a personalized
    link that helps them continue exploring Avelis.

    Expected outcome:
    The visitor sees a greeting, their selected destination,
    a link to that page, and information about the website creator.
*/

function showStudentInfo() {

    /*
        trim() removes spaces from the beginning and end
        of the visitor's entered name.
    */

    let visitorName =
        document.getElementById("visitor-name")
        .value
        .trim();


    /*
        charAt() selects the first character of the name.
        toUpperCase() formats that character consistently.
    */

    let firstLetter =
        visitorName.charAt(0).toUpperCase();


    /*
        slice() selects the remaining characters.
        toLowerCase() creates consistent name formatting.
    */

    let remainingLetters =
        visitorName.slice(1).toLowerCase();


    let formattedName =
        firstLetter + remainingLetters;


    let visitorInterest =
        document.getElementById("visitor-interest").value;


    /*
        Selection statement:

        The switch statement connects each dropdown choice
        with the matching webpage.

        The default provides a safe fallback to the Home page
        if an unexpected value is received.
    */

    let interestLink;

    switch (visitorInterest) {

        case "Characters":
            interestLink = "characters.html";
            break;

        case "World Map":
            interestLink = "map.html";
            break;

        case "Lore Archive":
            interestLink = "lore.html";
            break;

        default:
            interestLink = "index.html";
    }


    /*
        A multiline template literal keeps the result organized
        and allows the selected destination and webpage link
        to be inserted directly into the message.
    */

    let studentMessage = `
        <p>
            <strong>Hello, ${formattedName}! Welcome to Avelis.</strong>
        </p>

        <p>
            You selected that you would like to explore the
            <strong>${visitorInterest}</strong>.
            Begin your journey below.
        </p>

        <p>
            <a
                href="${interestLink}"
                class="explore-link"
            >
                Explore the ${visitorInterest}
            </a>
        </p>

        <p>
            <strong>Website Creator:</strong>
            ${studentInfo.name}
        </p>

        <p>
            <strong>Education Level:</strong>
            ${studentInfo.educationLevel}
        </p>

        <p>
            <strong>Major:</strong>
            ${studentInfo.major}
        </p>

        <p>
            <strong>Class Designation:</strong>
            ${studentInfo.classDesignation}
        </p>

        <p>
            <strong>Anticipated Occupation:</strong>
            ${studentInfo.anticipatedOccupation}
        </p>
    `;


    studentOutput.innerHTML =
        studentMessage;
}


/*
    Begin Your Journey form submit event.

    Purpose:
    Validates every required form control before displaying
    the visitor's personalized destination.

    Trigger:
    The visitor selects the Begin Journey button or
    submits the form with the keyboard.

    Expected outcome:
    Invalid fields receive inline feedback. If every field
    is valid, a personalized destination link is displayed.

    Accessibility:
    Errors are connected to their controls through
    aria-describedby in the HTML. aria-invalid is updated
    so assistive technology can identify invalid fields.
    The first invalid field receives focus to reduce
    navigation difficulty.
*/

studentForm.addEventListener("submit", function(event) {

    /*
        Stop the browser's normal form submission so
        JavaScript can validate the form first.
    */

    event.preventDefault();


    /*
        Select every required form control.

        The loop ends after every required control has
        been checked once. If there are no required
        controls, the loop performs zero iterations.
    */

    const requiredFields =
        studentForm.querySelectorAll("[required]");


    let formIsValid = true;

    let firstInvalidField = null;


    /*
        Validation loop:

        Each required field is checked once.
        Empty fields are marked invalid while valid fields
        have previous error messages removed.
    */

    for (let i = 0; i < requiredFields.length; i++) {

        let field =
            requiredFields[i];


        /*
            trim() allows text fields containing only spaces
            to be treated as empty.
        */

        let fieldValue =
            field.value.trim();


        let errorElement =
            document.getElementById(
                field.getAttribute("aria-describedby")
            );


        /*
            Selection statement:

            Empty fields are marked invalid and receive
            a clear inline message.
        */

        if (fieldValue === "") {

            formIsValid = false;

            field.classList.add("input-error");

            field.setAttribute(
                "aria-invalid",
                "true"
            );


            /*
                The error message changes based on which
                required control needs attention.
            */

            if (field.id === "visitor-name") {

                errorElement.textContent =
                    "Please enter your name.";

            } else if (field.id === "visitor-interest") {

                errorElement.textContent =
                    "Please select an area of Avelis to explore.";
            }


            /*
                Store only the first invalid control so
                focus can move there after validation.
            */

            if (firstInvalidField === null) {
                firstInvalidField = field;
            }

        } else {

            /*
                Valid controls have previous error styles,
                messages, and ARIA error states removed.
            */

            field.classList.remove("input-error");

            field.setAttribute(
                "aria-invalid",
                "false"
            );

            errorElement.textContent =
                "";
        }
    }


    /*
        Selection statement:

        Only display the personalized journey information
        when every required field passes validation.
    */

    if (formIsValid) {

        studentOutput.innerHTML =
            "";

        showStudentInfo();

    } else {

        /*
            Clear any previous successful output so it does
            not conflict with current validation feedback.
        */

        studentOutput.innerHTML =
            "<p>Please correct the form fields above.</p>";


        /*
            Moving focus to the first invalid field helps
            keyboard and screen-reader users locate the
            problem efficiently.
        */

        if (firstInvalidField !== null) {
            firstInvalidField.focus();
        }
    }
});