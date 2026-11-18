/*
    CST-120 Milestone 6 - Home Page JavaScript

    This file controls the Begin Your Journey form
    and the Creator Note jQuery interaction on index.html.

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
    - jQuery show/hide interaction
    - jQuery attribute and text updates
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
        Clear any previous successful output.
    */

    studentOutput.textContent =
        "";


    /*
        Create the greeting with textContent so the visitor's
        typed name is treated only as text rather than HTML.
    */

    const greeting =
        document.createElement("p");

    const greetingStrong =
        document.createElement("strong");

    greetingStrong.textContent =
        `Hello, ${formattedName}! Welcome to Avelis.`;

    greeting.appendChild(greetingStrong);

    studentOutput.appendChild(greeting);


    /*
        Create the destination message.
    */

    const destinationMessage =
        document.createElement("p");

    destinationMessage.append(
        "You selected that you would like to explore the "
    );

    const destinationStrong =
        document.createElement("strong");

    destinationStrong.textContent =
        visitorInterest;

    destinationMessage.appendChild(
        destinationStrong
    );

    destinationMessage.append(
        ". Begin your journey below."
    );

    studentOutput.appendChild(
        destinationMessage
    );


    /*
        Create the destination link.
    */

    const linkParagraph =
        document.createElement("p");

    const exploreLink =
        document.createElement("a");

    exploreLink.href =
        interestLink;

    exploreLink.className =
        "explore-link";

    exploreLink.textContent =
        `Explore the ${visitorInterest}`;

    linkParagraph.appendChild(
        exploreLink
    );

    studentOutput.appendChild(
        linkParagraph
    );


    /*
        Helper function for creator information.

        This keeps each information row consistent.
    */

    function addCreatorInfo(label, value) {

        const infoParagraph =
            document.createElement("p");

        const infoLabel =
            document.createElement("strong");

        infoLabel.textContent =
            label + ": ";

        infoParagraph.appendChild(
            infoLabel
        );

        infoParagraph.append(
            value
        );

        studentOutput.appendChild(
            infoParagraph
        );
    }


    addCreatorInfo(
        "Website Creator",
        studentInfo.name
    );

    addCreatorInfo(
        "Education Level",
        studentInfo.educationLevel
    );

    addCreatorInfo(
        "Major",
        studentInfo.major
    );

    addCreatorInfo(
        "Class Designation",
        studentInfo.classDesignation
    );

    addCreatorInfo(
        "Anticipated Occupation",
        studentInfo.anticipatedOccupation
    );
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
    The first invalid field receives focus.
*/

studentForm.addEventListener(
    "submit",
    function(event) {

        /*
            Stop the browser's normal form submission so
            JavaScript can validate the form first.
        */

        event.preventDefault();


        /*
            Select every required form control.

            The loop ends after every required control has
            been checked once.
        */

        const requiredFields =
            studentForm.querySelectorAll(
                "[required]"
            );


        let formIsValid =
            true;

        let firstInvalidField =
            null;


        /*
            Validation loop:

            Each required field is checked once.
            Empty fields are marked invalid while valid fields
            have previous error messages removed.
        */

        for (
            let i = 0;
            i < requiredFields.length;
            i++
        ) {

            let field =
                requiredFields[i];


            /*
                trim() allows fields containing only spaces
                to be treated as empty.
            */

            let fieldValue =
                field.value.trim();


            let errorElement =
                document.getElementById(
                    field.getAttribute(
                        "aria-describedby"
                    )
                );


            /*
                Empty fields receive an error state
                and an inline message.
            */

            if (fieldValue === "") {

                formIsValid =
                    false;

                field.classList.add(
                    "input-error"
                );

                field.setAttribute(
                    "aria-invalid",
                    "true"
                );


                if (
                    field.id ===
                    "visitor-name"
                ) {

                    errorElement.textContent =
                        "Please enter your name.";

                } else if (
                    field.id ===
                    "visitor-interest"
                ) {

                    errorElement.textContent =
                        "Please select an area of Avelis to explore.";
                }


                /*
                    Store only the first invalid field
                    for focus management.
                */

                if (
                    firstInvalidField ===
                    null
                ) {

                    firstInvalidField =
                        field;
                }

            } else {

                /*
                    Clear previous error states
                    from valid fields.
                */

                field.classList.remove(
                    "input-error"
                );

                field.setAttribute(
                    "aria-invalid",
                    "false"
                );

                errorElement.textContent =
                    "";
            }
        }


        /*
            Only display the personalized result
            when every required field is valid.
        */

        if (formIsValid) {

            studentOutput.textContent =
                "";

            showStudentInfo();

        } else {

            /*
                Clear previous successful output.
            */

            studentOutput.textContent =
                "Please correct the form fields above.";


            /*
                Move focus to the first invalid field.
            */

            if (
                firstInvalidField !==
                null
            ) {

                firstInvalidField.focus();
            }
        }
    }
);


/*
    Activity 6 jQuery Example 2:
    Creator Note interaction.

    Purpose:
    Shows and hides additional information about
    the creator of the website.

    Trigger:
    The visitor selects the Show Creator Note button.

    Expected outcome:
    The note appears or disappears and the button text
    changes to reflect the current state.

    Accessibility:
    aria-expanded and aria-hidden are updated so assistive
    technology can determine whether the note is open.
*/


$("#creator-note-button").on(
    "click",
    function() {

        let creatorNote =
            $("#creator-note");

        let creatorButton =
            $("#creator-note-button");


        /*
            Read the current accessibility state.
        */

        let isExpanded =
            creatorButton.attr(
                "aria-expanded"
            ) === "true";


        /*
            If the note is currently closed,
            display it using jQuery fadeIn().
        */

        if (isExpanded === false) {

            creatorNote.prop(
                "hidden",
                false
            );


            creatorNote.fadeIn();


            creatorButton
                .attr(
                    "aria-expanded",
                    "true"
                )
                .text(
                    "Hide Creator Note"
                );


            creatorNote.attr(
                "aria-hidden",
                "false"
            );


            /*
                Move focus to the newly revealed note.
            */

            creatorNote.trigger(
                "focus"
            );

        } else {

            /*
                Fade the note out.
            */

            creatorNote.fadeOut(
                function() {

                    creatorNote
                        .prop(
                            "hidden",
                            true
                        )
                        .attr(
                            "aria-hidden",
                            "true"
                        );
                }
            );


            creatorButton
                .attr(
                    "aria-expanded",
                    "false"
                )
                .text(
                    "Show Creator Note"
                );


            /*
                Return focus to the button.
            */

            creatorButton.trigger(
                "focus"
            );
        }
    }
);