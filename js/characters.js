/*
    CST-120 Milestone 6
    Avelis Characters Page JavaScript

    Features:
    - Character card flipping
    - Mouse and keyboard interaction
    - ARIA accessibility updates
    - Character information toggle
    - Character count
    - Automatically applies completed character card backs
    - Uses delegated event listeners so future cards can
      use the same interaction without additional listeners
*/


/*
    =========================================================
    CHARACTER DATA
    =========================================================
*/

const characters = {

    myrrin: {

        name:
            "Myrrin Sylvamer",

        world:
            "Avelis",

        role:
            "Main Character",

        hasPronunciation:
            true

    },


    sorren: {

        name:
            "Sorren",

        world:
            "Avelis",

        role:
            "Character",

        hasPronunciation:
            false

    }

};


/*
    =========================================================
    COMPLETED CARD BACKS
    =========================================================

    Only characters with completed card-back artwork
    need to be listed here.

    Other cards keep the existing back image already
    provided in characters.html.
*/

const characterCardBacks = {

    "Myrrin Sylvamer":
        "images/Myrrin-Card-Back.png",

    "Solarius Aldeatus":
        "images/Sorren-Card-Back.png"

    };



/*
    =========================================================
    APPLY CARD BACK IMAGES
    =========================================================

    This function checks the name shown in each character
    card and replaces the reverse-side image when completed
    artwork exists for that character.
*/

function applyCardBackImages() {

    const characterCards =
        document.querySelectorAll(
            ".character-card"
        );


    for (
        let i = 0;
        i < characterCards.length;
        i++
    ) {

        const card =
            characterCards[i];


        const nameElement =
            card.querySelector(
                ".character-name"
            );


        const backImage =
            card.querySelector(
                ".flip-card-back img"
            );


        /*
            Skip cards that do not contain the expected
            name or reverse-side image.
        */

        if (
            nameElement === null ||
            backImage === null
        ) {

            continue;

        }


        const characterName =
            nameElement.textContent.trim();


        /*
            Check whether completed artwork exists.
        */

        if (
            characterCardBacks[
                characterName
            ]
        ) {

            backImage.src =
                characterCardBacks[
                    characterName
                ];


            backImage.alt =
                "Back of " +
                characterName +
                "'s character card";

        }

    }

}


/*
    =========================================================
    FLIP CARD
    =========================================================

    Cards can be activated with:
    - Mouse click
    - Enter
    - Space

    aria-pressed communicates the front/back state
    to assistive technology.
*/

function flipCard(
    card
) {

    if (
        card === null
    ) {

        return;

    }


    card.classList.toggle(
        "flipped"
    );


    const isFlipped =
        card.classList.contains(
            "flipped"
        );


    /*
        Accessibility state.
    */

    card.setAttribute(
        "aria-pressed",
        isFlipped.toString()
    );


    /*
        Find the character name for a more useful
        accessible label.
    */

    const characterArticle =
        card.closest(
            ".character-card"
        );


    let characterName =
        "character";


    if (
        characterArticle !== null
    ) {

        const nameElement =
            characterArticle.querySelector(
                ".character-name"
            );


        if (
            nameElement !== null
        ) {

            characterName =
                nameElement.textContent.trim();

        }

    }


    /*
        Update the accessible description depending
        on which side is currently visible.
    */

    if (
        isFlipped
    ) {

        card.setAttribute(
            "aria-label",
            characterName +
            " card. Reverse side shown. Press Enter or Space to show the front."
        );

    } else {

        card.setAttribute(
            "aria-label",
            characterName +
            " card. Front side shown. Press Enter or Space to show the reverse."
        );

    }

}


/*
    =========================================================
    PREPARE FLIP CARDS
    =========================================================

    Makes the custom card controls keyboard accessible.
*/

function prepareFlipCards() {

    const flipCards =
        document.querySelectorAll(
            ".flip-card"
        );


    for (
        let i = 0;
        i < flipCards.length;
        i++
    ) {

        const card =
            flipCards[i];


        /*
            A div is not normally keyboard accessible.

            tabindex allows keyboard focus and role="button"
            communicates that it behaves like a control.
        */

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.setAttribute(
            "role",
            "button"
        );


        card.setAttribute(
            "aria-pressed",
            "false"
        );


        /*
            Find the character name.
        */

        const characterArticle =
            card.closest(
                ".character-card"
            );


        let characterName =
            "Character";


        if (
            characterArticle !== null
        ) {

            const nameElement =
                characterArticle.querySelector(
                    ".character-name"
                );


            if (
                nameElement !== null
            ) {

                characterName =
                    nameElement.textContent.trim();

            }

        }


        card.setAttribute(
            "aria-label",
            characterName +
            " card. Front side shown. Press Enter or Space to show the reverse."
        );

    }

}


/*
    =========================================================
    MYRRIN INFORMATION
    =========================================================

    The information panel is retained from the earlier
    milestone but now uses DOM methods instead of placing
    character data directly into innerHTML.

    ARIA states are updated when the panel opens/closes.
*/

function showMyrrinInfo() {

    const infoBox =
        document.getElementById(
            "myrrin-info"
        );


    const infoButton =
        document.getElementById(
            "myrrin-info-button"
        );


    /*
        If the page does not currently contain these
        elements, safely stop the function.
    */

    if (
        infoBox === null ||
        infoButton === null
    ) {

        return;

    }


    const isExpanded =
        infoButton.getAttribute(
            "aria-expanded"
        ) === "true";


    /*
        =====================================================
        OPEN INFORMATION
        =====================================================
    */

    if (
        isExpanded === false
    ) {

        /*
            Clear any older content.
        */

        infoBox.textContent =
            "";


        /*
            Character summary.
        */

        const summary =
            document.createElement(
                "p"
            );


        const summaryName =
            document.createElement(
                "strong"
            );


        summaryName.textContent =
            characters.myrrin.name;


        summary.appendChild(
            summaryName
        );


        summary.appendChild(
            document.createTextNode(
                " is a " +
                characters.myrrin.role +
                " in the world of " +
                characters.myrrin.world +
                "."
            )
        );


        /*
            Name information.
        */

        const nameParagraph =
            document.createElement(
                "p"
            );


        const nameLabel =
            document.createElement(
                "strong"
            );


        nameLabel.textContent =
            "Name: ";


        nameParagraph.appendChild(
            nameLabel
        );


        nameParagraph.appendChild(
            document.createTextNode(
                characters.myrrin.name
            )
        );


        /*
            World information.
        */

        const worldParagraph =
            document.createElement(
                "p"
            );


        const worldLabel =
            document.createElement(
                "strong"
            );


        worldLabel.textContent =
            "World: ";


        worldParagraph.appendChild(
            worldLabel
        );


        worldParagraph.appendChild(
            document.createTextNode(
                characters.myrrin.world
            )
        );


        /*
            Role information.
        */

        const roleParagraph =
            document.createElement(
                "p"
            );


        const roleLabel =
            document.createElement(
                "strong"
            );


        roleLabel.textContent =
            "Role: ";


        roleParagraph.appendChild(
            roleLabel
        );


        roleParagraph.appendChild(
            document.createTextNode(
                characters.myrrin.role
            )
        );


        /*
            Pronunciation information.
        */

        const pronunciationParagraph =
            document.createElement(
                "p"
            );


        pronunciationParagraph.textContent =
            "This character includes an audio pronunciation guide.";


        /*
            Add all information to the panel.
        */

        infoBox.appendChild(
            summary
        );


        infoBox.appendChild(
            nameParagraph
        );


        infoBox.appendChild(
            worldParagraph
        );


        infoBox.appendChild(
            roleParagraph
        );


        infoBox.appendChild(
            pronunciationParagraph
        );


        /*
            Show the information panel.
        */

        infoBox.hidden =
            false;


        /*
            Accessibility updates.
        */

        infoButton.setAttribute(
            "aria-expanded",
            "true"
        );


        infoBox.setAttribute(
            "aria-hidden",
            "false"
        );


        infoButton.textContent =
            "Hide Character Information";


    /*
        =====================================================
        CLOSE INFORMATION
        =====================================================
    */

    } else {

        infoBox.textContent =
            "";


        infoBox.hidden =
            true;


        infoButton.setAttribute(
            "aria-expanded",
            "false"
        );


        infoBox.setAttribute(
            "aria-hidden",
            "true"
        );


        infoButton.textContent =
            "Character Information";

    }

}


/*
    =========================================================
    CHARACTER COUNT
    =========================================================

    Uses the NodeList length directly instead of counting
    manually through a loop.
*/

function showCharacterCount() {

    const characterCards =
        document.querySelectorAll(
            ".character-card"
        );


    const characterCount =
        document.getElementById(
            "character-count"
        );


    if (
        characterCount === null
    ) {

        return;

    }


    const totalCharacters =
        characterCards.length;


    if (
        totalCharacters === 1
    ) {

        characterCount.textContent =
            "1 character is currently featured.";

    } else {

        characterCount.textContent =
            totalCharacters +
            " characters are currently featured.";

    }

}


/*
    =========================================================
    CHARACTER LIST EVENTS
    =========================================================

    One delegated event listener handles all character
    cards. This keeps the code reusable if additional
    characters are added later.
*/

function addCharacterEvents() {

    const characterList =
        document.querySelector(
            ".character-list"
        );


    if (
        characterList === null
    ) {

        return;

    }


    /*
        MOUSE / POINTER EVENT
    */

    characterList.addEventListener(
        "click",
        function(
            event
        ) {

            /*
                Do not flip a card when the visitor is
                interacting with an audio player or another
                button inside the character entry.
            */

            if (
                event.target.closest(
                    "audio, button, a"
                ) !== null
            ) {

                return;

            }


            const selectedCard =
                event.target.closest(
                    ".flip-card"
                );


            if (
                selectedCard !== null
            ) {

                flipCard(
                    selectedCard
                );

            }

        }
    );


    /*
        KEYBOARD EVENT

        Enter and Space activate the same card interaction
        available to mouse users.
    */

    characterList.addEventListener(
        "keydown",
        function(
            event
        ) {

            const selectedCard =
                event.target.closest(
                    ".flip-card"
                );


            if (
                selectedCard === null
            ) {

                return;

            }


            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                /*
                    Prevent Space from scrolling the page.
                */

                event.preventDefault();


                flipCard(
                    selectedCard
                );

            }

        }
    );

}


/*
    =========================================================
    MYRRIN INFORMATION BUTTON EVENT
    =========================================================
*/

function prepareMyrrinInfo() {

    const infoButton =
        document.getElementById(
            "myrrin-info-button"
        );


    const infoBox =
        document.getElementById(
            "myrrin-info"
        );


    if (
        infoButton === null ||
        infoBox === null
    ) {

        return;

    }


    /*
        Initial accessibility state.
    */

    infoButton.setAttribute(
        "aria-expanded",
        "false"
    );


    infoButton.setAttribute(
        "aria-controls",
        "myrrin-info"
    );


    infoBox.setAttribute(
        "aria-hidden",
        "true"
    );


    infoBox.hidden =
        true;


    /*
        Avoid inline onclick attributes.
        Milestone 6 asks for unobtrusive JavaScript.
    */

    infoButton.addEventListener(
        "click",
        function() {

            showMyrrinInfo();

        }
    );

}


/*
    =========================================================
    INITIALIZE CHARACTERS PAGE
    =========================================================
*/

prepareFlipCards();

applyCardBackImages();

prepareMyrrinInfo();

addCharacterEvents();

showCharacterCount();