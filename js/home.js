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


/* =========================================================
   WEBSITE CREATOR INFORMATION
   ========================================================= */

/*
    This object stores information about the website creator.

    The information is displayed after the visitor
    successfully completes the Begin Your Journey form.
*/

const studentInfo = {

    name:
        "Samantha Manuszak",

    educationLevel:
        "Sophomore",

    major:
        "Biomedical Engineering",

    classDesignation:
        "CST-120 Introduction to Web Development",

    anticipatedOccupation:
        "Biomedical Engineer"

};


/* =========================================================
   CACHE PAGE ELEMENTS
   ========================================================= */

const studentForm =
    document.getElementById(
        "student-form"
    );


const studentOutput =
    document.getElementById(
        "student-output"
    );


/* =========================================================
   SHOW STUDENT INFORMATION
   =========================================================

   Purpose:
   Formats the visitor's name, determines which page
   matches their selected interest, and creates a
   personalized destination link.
*/

function showStudentInfo() {


    /* =====================================================
       VISITOR NAME
       ===================================================== */

    /*
        trim() removes spaces from the beginning
        and end of the entered name.
    */

    const visitorName =
        document.getElementById(
            "visitor-name"
        )
        .value
        .trim();


    /*
        charAt() selects the first character.

        toUpperCase() formats the first character
        consistently.
    */

    const firstLetter =
        visitorName
        .charAt(0)
        .toUpperCase();


    /*
        slice() selects everything after the
        first character.

        toLowerCase() creates consistent formatting.
    */

    const remainingLetters =
        visitorName
        .slice(1)
        .toLowerCase();


    const formattedName =
        firstLetter +
        remainingLetters;


    /* =====================================================
       VISITOR INTEREST
       ===================================================== */

    const visitorInterest =
        document.getElementById(
            "visitor-interest"
        )
        .value;


    /*
        Selection statement.

        Each dropdown option connects to its
        matching Avelis webpage.
    */

    let interestLink;


    switch (
        visitorInterest
    ) {

        case "Characters":

            interestLink =
                "characters.html";

            break;


        case "World Map":

            interestLink =
                "map.html";

            break;


        case "Lore Archive":

            interestLink =
                "lore.html";

            break;


        case "Calendar":

            interestLink =
                "calendar.html";

            break;


        case "Books and Stories":

            interestLink =
                "books.html";

            break;


        default:

            /*
                Safe fallback if an unexpected
                value is received.
            */

            interestLink =
                "index.html";

    }


    /* =====================================================
       CLEAR PREVIOUS OUTPUT
       ===================================================== */

    studentOutput.textContent =
        "";


    /* =====================================================
       PERSONALIZED GREETING
       =====================================================

       textContent is used so visitor input is treated
       only as text rather than HTML.
    */

    const greeting =
        document.createElement(
            "p"
        );


    const greetingStrong =
        document.createElement(
            "strong"
        );


    greetingStrong.textContent =
        `Hello, ${formattedName}! Welcome to Avelis.`;


    greeting.appendChild(
        greetingStrong
    );


    studentOutput.appendChild(
        greeting
    );


    /* =====================================================
       DESTINATION MESSAGE
       ===================================================== */

    const destinationMessage =
        document.createElement(
            "p"
        );


    destinationMessage.append(
        "You selected that you would like to explore the "
    );


    const destinationStrong =
        document.createElement(
            "strong"
        );


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


    /* =====================================================
       DESTINATION LINK
       ===================================================== */

    const linkParagraph =
        document.createElement(
            "p"
        );


    const exploreLink =
        document.createElement(
            "a"
        );


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


    /* =====================================================
       CREATOR INFORMATION HELPER
       =====================================================

       This helper creates each creator-information row
       using safe DOM methods.
    */

    function addCreatorInfo(
        label,
        value
    ) {

        const infoParagraph =
            document.createElement(
                "p"
            );


        const infoLabel =
            document.createElement(
                "strong"
            );


        infoLabel.textContent =
            label +
            ": ";


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


    /* =====================================================
       DISPLAY CREATOR INFORMATION
       ===================================================== */

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


/* =========================================================
   BEGIN YOUR JOURNEY FORM VALIDATION
   =========================================================

   Purpose:
   Validates every required control before displaying
   the personalized destination.

   Accessibility:
   - aria-describedby connects errors to inputs
   - aria-invalid identifies invalid controls
   - Focus moves to the first invalid control
*/

if (
    studentForm !== null
) {

    studentForm.addEventListener(
        "submit",
        function(
            event
        ) {


            /*
                Stop normal browser form submission.
            */

            event.preventDefault();


            /*
                Select all required form controls.
            */

            const requiredFields =
                studentForm.querySelectorAll(
                    "[required]"
                );


            let formIsValid =
                true;


            let firstInvalidField =
                null;


            /* =================================================
               VALIDATION LOOP
               ================================================= */

            for (
                let i = 0;
                i < requiredFields.length;
                i++
            ) {

                const field =
                    requiredFields[i];


                /*
                    trim() means spaces alone do not count
                    as valid input.
                */

                const fieldValue =
                    field.value.trim();


                const errorElement =
                    document.getElementById(
                        field.getAttribute(
                            "aria-describedby"
                        )
                    );


                /*
                    Required field is empty.
                */

                if (
                    fieldValue === ""
                ) {

                    formIsValid =
                        false;


                    field.classList.add(
                        "input-error"
                    );


                    field.setAttribute(
                        "aria-invalid",
                        "true"
                    );


                    /*
                        Specific feedback for each field.
                    */

                    if (
                        errorElement !== null
                    ) {

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

                    }


                    /*
                        Save the first invalid field
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
                        Clear previous error state.
                    */

                    field.classList.remove(
                        "input-error"
                    );


                    field.setAttribute(
                        "aria-invalid",
                        "false"
                    );


                    if (
                        errorElement !== null
                    ) {

                        errorElement.textContent =
                            "";

                    }

                }

            }


            /* =================================================
               SUCCESS
               ================================================= */

            if (
                formIsValid
            ) {

                studentOutput.textContent =
                    "";


                showStudentInfo();


            /* =================================================
               ERROR
               ================================================= */

            } else {

                studentOutput.textContent =
                    "Please correct the form fields above.";


                /*
                    Move keyboard focus to the first
                    invalid field.
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

}


/* =========================================================
   ACTIVITY 6 JQUERY CREATOR NOTE
   =========================================================

   Purpose:
   Uses jQuery to show and hide information about
   the website creator.

   Accessibility:
   - aria-expanded tracks button state
   - aria-hidden tracks note visibility
   - Focus moves to revealed content
   - Focus returns to button when closed
*/

$("#creator-note-button").on(
    "click",
    function() {


        const creatorNote =
            $("#creator-note");


        const creatorButton =
            $("#creator-note-button");


        /*
            Read current accessibility state.
        */

        const isExpanded =
            creatorButton.attr(
                "aria-expanded"
            ) === "true";


        /* =====================================================
           OPEN CREATOR NOTE
           ===================================================== */

        if (
            isExpanded === false
        ) {


            /*
                Remove the hidden property before
                beginning the fade animation.
            */

            creatorNote.prop(
                "hidden",
                false
            );


            /*
                Show the note with jQuery.
            */

            creatorNote.fadeIn();


            /*
                Update button accessibility state
                and visible text.
            */

            creatorButton
                .attr(
                    "aria-expanded",
                    "true"
                )
                .text(
                    "Hide Creator Note"
                );


            /*
                Tell assistive technology that
                the note is now visible.
            */

            creatorNote.attr(
                "aria-hidden",
                "false"
            );


            /*
                Move focus to the revealed content.
            */

            creatorNote.trigger(
                "focus"
            );


        /* =====================================================
           CLOSE CREATOR NOTE
           ===================================================== */

        } else {


            /*
                Fade the note out.
            */

            creatorNote.fadeOut(
                function() {


                    /*
                        Apply hidden only after
                        the animation completes.
                    */

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


            /*
                Restore original button state.
            */

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