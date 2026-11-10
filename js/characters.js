/*
    CST-120 Milestone 5 - Characters Page JavaScript

    This file controls interactive behavior on characters.html.

    It demonstrates:
    - External JavaScript
    - Character objects
    - Template literals
    - String methods
    - Selection statements
    - Loops
    - Delegated event listeners
    - Click and keyboard interaction
    - ARIA attribute updates
    - Focus management
*/


/*
    Character object.

    This object stores information about Myrrin that is used
    when the visitor opens the Character Information section.
*/

const myrrin = {
    name: "Myrrin Sylvamer",
    world: "Avelis",
    role: "Main Character",
    hasPronunciation: true
};


/*
    Cache page elements that are used more than once.
*/

const characterList =
    document.querySelector(".character-list");

const myrrinInfoButton =
    document.getElementById("myrrin-info-button");

const myrrinInfoBox =
    document.getElementById("myrrin-info");


/*
    showMyrrinInfo()

    Purpose:
    Opens or closes Myrrin's additional character information.

    Trigger:
    The visitor activates the Character Information button.

    Expected outcome:
    Character details appear when closed and disappear when open.

    Accessibility:
    aria-expanded and aria-hidden are updated to communicate
    the current state to assistive technology. Focus moves to
    the information when it opens and returns to the button
    when it closes.
*/

function showMyrrinInfo() {

    /*
        Selection statement:

        aria-expanded tells the script whether the
        information is currently open or closed.
    */

    let isExpanded =
        myrrinInfoButton.getAttribute("aria-expanded") === "true";


    if (isExpanded === false) {

        /*
            String Example:
            A template literal combines object values
            into a complete readable sentence.
        */

        let characterSummary =
            `<p><strong>${myrrin.name}</strong> is the ${myrrin.role} in the world of ${myrrin.world}.</p>`;


        /*
            String Method Example:
            toUpperCase() makes the role label stand out
            clearly in the information panel.
        */

        let formattedRole =
            myrrin.role.toUpperCase();


        /*
            Multiline template literal:
            Several pieces of character information are
            organized into readable HTML.
        */

        let characterDetails = `
            <p><strong>Name:</strong> ${myrrin.name}</p>
            <p><strong>World:</strong> ${myrrin.world}</p>
            <p><strong>Role:</strong> ${formattedRole}</p>
            <p>This character includes an audio pronunciation guide.</p>
        `;


        myrrinInfoBox.innerHTML =
            characterSummary + characterDetails;


        /*
            Make the information visible.
        */

        myrrinInfoBox.hidden =
            false;


        /*
            Update ARIA states so assistive technology
            knows the information is now visible.
        */

        myrrinInfoButton.setAttribute(
            "aria-expanded",
            "true"
        );

        myrrinInfoBox.setAttribute(
            "aria-hidden",
            "false"
        );


        myrrinInfoButton.textContent =
            "Hide Character Information";


        /*
            Move keyboard focus to the newly displayed
            information so users can locate it immediately.
        */

        myrrinInfoBox.focus();

    } else {

        /*
            Hide the information and clear its contents.
        */

        myrrinInfoBox.hidden =
            true;

        myrrinInfoBox.innerHTML =
            "";


        /*
            Restore the closed ARIA states.
        */

        myrrinInfoButton.setAttribute(
            "aria-expanded",
            "false"
        );

        myrrinInfoBox.setAttribute(
            "aria-hidden",
            "true"
        );


        myrrinInfoButton.textContent =
            "Character Information";


        /*
            Return focus to the button after the information
            closes so keyboard users remain oriented.
        */

        myrrinInfoButton.focus();
    }
}


/*
    flipCard()

    Purpose:
    Changes a character card between its front and back sides.

    Expected outcome:
    The flipped class is added or removed and aria-pressed
    reflects the card's current visual state.
*/

function flipCard(card) {

    card.classList.toggle("flipped");


    /*
        Selection statement:

        Check whether the flipped class is currently present
        and update aria-pressed to match the visual state.
    */

    if (card.classList.contains("flipped")) {

        card.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        card.setAttribute(
            "aria-pressed",
            "false"
        );
    }
}


/*
    showCharacterCount()

    Purpose:
    Counts the character cards currently displayed on the page.

    Loop behavior:
    The loop begins with the first character card and ends
    after each card in the NodeList has been counted once.

    Edge case:
    If no character cards exist, the loop performs zero
    iterations and the displayed total remains zero.
*/

function showCharacterCount() {

    let characterCards =
        document.querySelectorAll(".character-card");


    let totalCharacters =
        0;


    for (let i = 0; i < characterCards.length; i++) {

        totalCharacters++;
    }


    document.getElementById("character-count").textContent =
        totalCharacters + " characters are currently featured.";
}


/*
    Delegated character card click event.

    Purpose:
    Allows one listener on the character-list container to
    control every current or future .flip-card inside it.

    Trigger:
    A visitor clicks a character card.

    Expected outcome:
    Only the selected card flips.

    Accessibility:
    Keyboard behavior is handled separately below so the
    same feature is available without a mouse.
*/

characterList.addEventListener("click", function(event) {

    let selectedCard =
        event.target.closest(".flip-card");


    /*
        Selection statement:

        Only call flipCard() when the click occurred
        inside an actual character card.
    */

    if (selectedCard) {

        flipCard(selectedCard);
    }
});


/*
    Delegated character card keyboard event.

    Purpose:
    Provides keyboard access to the same card-flipping behavior.

    Trigger:
    A focused character card receives Enter or Space.

    Expected outcome:
    The selected card flips without requiring a mouse.

    Accessibility:
    preventDefault() stops the Space key from scrolling the
    page while it is being used to activate the card.
*/

characterList.addEventListener("keydown", function(event) {

    let selectedCard =
        event.target.closest(".flip-card");


    if (
        selectedCard &&
        (
            event.key === "Enter" ||
            event.key === " "
        )
    ) {

        event.preventDefault();

        flipCard(selectedCard);
    }
});


/*
    Myrrin information button event.

    Purpose:
    Opens and closes the accessible character information panel.

    Trigger:
    The visitor activates the Character Information button.

    Expected outcome:
    Myrrin's information is shown or hidden while ARIA
    attributes and keyboard focus are updated.
*/

myrrinInfoButton.addEventListener("click", function() {

    showMyrrinInfo();
});


/*
    Display the current number of character cards
    when the script loads.
*/

showCharacterCount();