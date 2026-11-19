/*
    CST-120 Milestone 6
    Avelis Books & Stories JavaScript

    This script:
    - Stores book information in JavaScript objects
    - Stores Fragments of Avelis short stories
    - Creates responsive Bootstrap book cards
    - Preserves paragraph breaks in short stories
    - Opens A Hollowed Sun information in a Bootstrap modal
    - Uses delegated event handling
    - Supports accessible modal content
*/


/* =========================================================
   BOOK DATA
   ========================================================= */

const books = [

    {
        id:
            1,

        title:
            "A Hollowed Sun",

        series:
            "Book One of Avelis",

        status:
            "In Progress",

        image:
            "images/Book-Cover.PNG",

        imageAlt:
            "Book cover for A Hollowed Sun",

        tagline:
            "They say the Radiant swallowed the sun the day he was born.",

        description: [

            "Born beneath an eclipse, Prince Solarius Aldeatus has spent his life beneath the weight of an extraordinary destiny. Gifted with the rare power of Sunfire, he is raised to believe that his abilities are a blessing from the Eternal Flame and that his future holds a purpose far greater than himself.",

            "Myrrin Sylvamer has known Sorren since childhood. To her, he is more than the prince beloved by his kingdom. He is a boy with dreams of his own, a friend who has always held a special place in her heart. As the years pass, their friendship blossoms into a love that seems destined to withstand anything.",

            "The crown, however, carries expectations that extend far beyond the desires of the one who wears it. Within the palace walls, tradition, faith, and duty shape the lives of those born to rule. Every choice carries consequences, and the line between personal conviction and divine obligation is not always easily drawn.",

            "As Sorren approaches the throne, he must navigate the demands of a kingdom that looks to its monarch for far more than leadership. With the weight of generations upon his shoulders and the eyes of the Radiants seemingly fixed upon his every decision, the path before him grows increasingly uncertain."

        ],

        closingQuestion:
            "In a kingdom where the sun is sacred, can a man ever truly belong to himself?"
    }

];


/* =========================================================
   FRAGMENTS OF AVELIS
   =========================================================

   Each short story stores its paragraphs separately.

   This allows JavaScript to create actual <p> elements
   instead of displaying the entire story as one large block.
*/

const fragments = [

    /* =====================================================
       THALIA
       ===================================================== */

    {
        title:
            "Thalia",

        inspiration:
            "Sweeping flower petals, tea, rosemary.",

        paragraphs: [

            "She sat in the courtyard, the sun warming her skin as rose petals drifted from the vines, torn free by the afternoon breeze. She had always loved the way the petals covered the detailed tiles, she imagined it was a red version of the snow the mountain visitors described.",

            "Yet some thought they were messy, so she was sent to clean them up. Her fingers wrapped around the broom resting on the wall, gently sweeping flower petals from the stone paths. It was sad that so many people refused to see beauty in the wonders of nature and considered it “dirty.” They thought the only beautiful things were made by the artisans.",

            "Even so every spring she went out and helped to coax the rose roots to grow even stronger hands buried in the soil, dirt crammed under nails.",

            "After this she would go see Lady Myrrin, they were to have tea. Often on these hot days the lady would insist on the tea being cooled before they drank it sometimes even requesting ice. It was an odd thing not many did, but she was to be a princess and didn’t worry about the cost of cooling a tea.",

            "Not that Thalia ever complained it was enjoyable in the heat, it was also enjoyable to complain about the noble snobs in the castle as they did over tea every afternoon.",

            "Today they would talk about the flower petals, sipping cool tea in the bright rays. She hoped they’d have rosemary and floral tea it was always her favorite."

        ]
    },


    /* =====================================================
       YELESHA AND VALVEN DAROR
       ===================================================== */

    {
        title:
            "Yelesha and Valven Daror",

        inspiration:
            "Weaving baskets, Wedding, Lavender.",

        paragraphs: [

            "They sat together in the fading dawn, weary from the day's work. Their hands continued to weave almost absentmindedly, practiced fingers moving without thought.",

            "There was a flame binding tomorrow two young flames would join, just as Yelesa and Valven had done years before. It was tradition that the oldest joined flames attending the binding would each weave a basket for the couple.",

            "Tomorrow they will be filled with gifts fitting for two newly joined flames. They will go to their new home filled with fresh fruits-- pomegranets and blackberries which will stain their fingers for days to come. The scents of rosemary, lavender, and jasmine will possess the air. Honey and bread will fill their bellies for days, while the new flames spent a span alone in their home allowing them to celebrate the joy of their union only under the watch of the eternal flame.",

            "For Yelesha and Valven Daror this was their first time weaving baskets, it was an honor though it made them both feel quite aged. It felt like only a cycle ago that they had received the baskets, which still rested in their home, filled with tokens of joy and hope."

        ]
    },


    /* =====================================================
       BELDAREK AURELIS THERDOR
       ===================================================== */

    {
        title:
            "Beldarek Aurelis Therdor",

        inspiration:
            "Gold, Linen hanging in the sun, Envelope.",

        paragraphs: [

            "The bright light of the mid-sky Eternal Flame was softened by the temple's stained-glass windows. White marble floors reflected their colors deeper into the chamber, bathing the room in warm reds, blues, and golds.",

            "Beldarek sat at a table in the far corner, sorting through stacks of correspondence. Amid the cream and white envelopes, one of deep red sealed with golden wax caught his attention. The letter had come from the Palace Aurelis; they alone used paper of such quality.",

            "He slipped the tip of his knife beneath the wax seal and carefully unfolded the letter. It contained the information every temple would soon receive: preparations for next moon's Radiant Festival.",

            "Reaching for a sheet of pale yellow parchment, Beldarek penned the customary reply. He folded the letter, melted a pool of red wax onto the flap, and pressed it closed with the temple seal.",

            "Swinging the great doors wide, he stepped from the cool sanctuary into the waiting warmth beyond. Sunlight spilled across the aisle as he crossed the courtyard toward the correspondence box, where lengths of cream linen hung drying beneath the afternoon sun."

        ]
    }

];


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const booksContainer =
    document.getElementById(
        "books-container"
    );


const fragmentsContainer =
    document.getElementById(
        "fragments-container"
    );


/* =========================================================
   BUILD BOOK CARDS
   ========================================================= */

function buildBookCards() {

    if (
        booksContainer === null
    ) {

        return;

    }


    booksContainer.textContent =
        "";


    /* =====================================================
       EXISTING BOOKS
       ===================================================== */

    for (
        let i = 0;
        i < books.length;
        i++
    ) {

        const book =
            books[i];


        /*
            Responsive Bootstrap column.
        */

        const column =
            document.createElement(
                "div"
            );


        column.className =
            "col-12 col-md-6 col-lg-5";


        /*
            Bootstrap card.
        */

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "card story-card h-100 shadow-sm";


        /* =================================================
           BOOK COVER
           ================================================= */

        const image =
            document.createElement(
                "img"
            );


        image.src =
            book.image;


        image.alt =
            book.imageAlt;


        image.className =
            "card-img-top book-cover";


        /* =================================================
           CARD BODY
           ================================================= */

        const cardBody =
            document.createElement(
                "div"
            );


        cardBody.className =
            "card-body d-flex flex-column";


        /*
            Series name.
        */

        const series =
            document.createElement(
                "p"
            );


        series.className =
            "book-series";


        series.textContent =
            book.series;


        /*
            Book title.
        */

        const title =
            document.createElement(
                "h2"
            );


        title.className =
            "card-title h3";


        title.textContent =
            book.title;


        /*
            Status badge.
        */

        const status =
            document.createElement(
                "span"
            );


        status.className =
            "badge text-bg-secondary align-self-start mb-3";


        status.textContent =
            book.status;


        /*
            Tagline.
        */

        const tagline =
            document.createElement(
                "p"
            );


        tagline.className =
            "card-text book-tagline";


        tagline.textContent =
            book.tagline;


        /*
            Details button.

            Bootstrap uses the data attributes to
            open the modal.
        */

        const detailsButton =
            document.createElement(
                "button"
            );


        detailsButton.type =
            "button";


        detailsButton.className =
            "btn btn-primary mt-auto book-details-button";


        detailsButton.setAttribute(
            "data-book-id",
            book.id
        );


        detailsButton.setAttribute(
            "data-bs-toggle",
            "modal"
        );


        detailsButton.setAttribute(
            "data-bs-target",
            "#bookDetailsModal"
        );


        detailsButton.textContent =
            "View Book Summary";


        /*
            Assemble card body.
        */

        cardBody.appendChild(
            series
        );


        cardBody.appendChild(
            title
        );


        cardBody.appendChild(
            status
        );


        cardBody.appendChild(
            tagline
        );


        cardBody.appendChild(
            detailsButton
        );


        /*
            Assemble complete card.
        */

        card.appendChild(
            image
        );


        card.appendChild(
            cardBody
        );


        column.appendChild(
            card
        );


        booksContainer.appendChild(
            column
        );

    }


    /* =====================================================
       FUTURE BOOK CARD
       =====================================================

       The original wireframe contains two book spaces.

       This placeholder keeps that layout without inventing
       another title or story.
    */

    const futureColumn =
        document.createElement(
            "div"
        );


    futureColumn.className =
        "col-12 col-md-6 col-lg-5";


    const futureCard =
        document.createElement(
            "article"
        );


    futureCard.className =
        "card story-card coming-soon-card h-100";


    /*
        Placeholder cover.
    */

    const futureCover =
        document.createElement(
            "div"
        );


    futureCover.className =
        "coming-soon-cover";


    const futureCoverText =
        document.createElement(
            "span"
        );


    futureCoverText.textContent =
        "Future Avelis Story";


    futureCover.appendChild(
        futureCoverText
    );


    /*
        Placeholder body.
    */

    const futureBody =
        document.createElement(
            "div"
        );


    futureBody.className =
        "card-body";


    const futureSeries =
        document.createElement(
            "p"
        );


    futureSeries.className =
        "book-series";


    futureSeries.textContent =
        "Avelis";


    const futureTitle =
        document.createElement(
            "h2"
        );


    futureTitle.className =
        "card-title h3";


    futureTitle.textContent =
        "Coming Soon";


    const futureText =
        document.createElement(
            "p"
        );


    futureText.className =
        "card-text";


    futureText.textContent =
        "Additional stories from the world of Avelis will be added as the series develops.";


    futureBody.appendChild(
        futureSeries
    );


    futureBody.appendChild(
        futureTitle
    );


    futureBody.appendChild(
        futureText
    );


    futureCard.appendChild(
        futureCover
    );


    futureCard.appendChild(
        futureBody
    );


    futureColumn.appendChild(
        futureCard
    );


    booksContainer.appendChild(
        futureColumn
    );

}


/* =========================================================
   BUILD FRAGMENTS OF AVELIS
   ========================================================= */

function buildFragments() {

    if (
        fragmentsContainer === null
    ) {

        return;

    }


    fragmentsContainer.textContent =
        "";


    /*
        Create one story entry for every fragment.
    */

    for (
        let i = 0;
        i < fragments.length;
        i++
    ) {

        const fragment =
            fragments[i];


        /*
            Main story article.
        */

        const article =
            document.createElement(
                "article"
            );


        article.className =
            "fragment-entry";


        /* =================================================
           STORY TITLE
           ================================================= */

        const heading =
            document.createElement(
                "h3"
            );


        heading.textContent =
            fragment.title;


        /* =================================================
           STORY PROMPT
           ================================================= */

        const inspiration =
            document.createElement(
                "p"
            );


        inspiration.className =
            "fragment-inspiration";


        const inspirationLabel =
            document.createElement(
                "strong"
            );


        inspirationLabel.textContent =
            "Prompt: ";


        inspiration.appendChild(
            inspirationLabel
        );


        inspiration.appendChild(
            document.createTextNode(
                fragment.inspiration
            )
        );


        /* =================================================
           STORY TEXT
           ================================================= */

        const storyContainer =
            document.createElement(
                "div"
            );


        storyContainer.className =
            "fragment-story";


        /*
            Create one <p> element for every paragraph
            stored in the story data.

            This preserves the intended paragraph breaks.
        */

        for (
            let j = 0;
            j < fragment.paragraphs.length;
            j++
        ) {

            const paragraph =
                document.createElement(
                    "p"
                );


            paragraph.textContent =
                fragment.paragraphs[j];


            storyContainer.appendChild(
                paragraph
            );

        }


        /*
            Assemble story entry.
        */

        article.appendChild(
            heading
        );


        article.appendChild(
            inspiration
        );


        article.appendChild(
            storyContainer
        );


        fragmentsContainer.appendChild(
            article
        );

    }

}


/* =========================================================
   FIND BOOK BY ID
   ========================================================= */

function findBookById(
    bookId
) {

    for (
        let i = 0;
        i < books.length;
        i++
    ) {

        if (
            books[i].id === bookId
        ) {

            return books[i];

        }

    }


    return null;

}


/* =========================================================
   SHOW BOOK DETAILS
   ========================================================= */

function showBookDetails(
    bookId
) {

    const book =
        findBookById(
            bookId
        );


    if (
        book === null
    ) {

        return;

    }


    const modalTitle =
        document.getElementById(
            "bookDetailsModalLabel"
        );


    const modalBody =
        document.getElementById(
            "book-modal-body"
        );


    if (
        modalTitle === null ||
        modalBody === null
    ) {

        return;

    }


    /*
        Update modal heading.
    */

    modalTitle.textContent =
        book.title;


    /*
        Remove previous information.
    */

    modalBody.textContent =
        "";


    /* =====================================================
       SERIES
       ===================================================== */

    const seriesParagraph =
        document.createElement(
            "p"
        );


    const seriesText =
        document.createElement(
            "em"
        );


    seriesText.textContent =
        book.series;


    seriesParagraph.appendChild(
        seriesText
    );


    modalBody.appendChild(
        seriesParagraph
    );


    /* =====================================================
       OPENING TAGLINE
       ===================================================== */

    const taglineParagraph =
        document.createElement(
            "p"
        );


    const taglineText =
        document.createElement(
            "strong"
        );


    taglineText.textContent =
        book.tagline;


    taglineParagraph.appendChild(
        taglineText
    );


    modalBody.appendChild(
        taglineParagraph
    );


    /* =====================================================
       DESCRIPTION PARAGRAPHS
       ===================================================== */

    for (
        let i = 0;
        i < book.description.length;
        i++
    ) {

        const descriptionParagraph =
            document.createElement(
                "p"
            );


        descriptionParagraph.textContent =
            book.description[i];


        modalBody.appendChild(
            descriptionParagraph
        );

    }


    /* =====================================================
       CLOSING QUESTION
       ===================================================== */

    const closingParagraph =
        document.createElement(
            "p"
        );


    closingParagraph.className =
        "book-closing-question";


    const closingText =
        document.createElement(
            "strong"
        );


    closingText.textContent =
        book.closingQuestion;


    closingParagraph.appendChild(
        closingText
    );


    modalBody.appendChild(
        closingParagraph
    );

}


/* =========================================================
   BOOK EVENTS
   ========================================================= */

function addBookEvents() {

    if (
        booksContainer === null
    ) {

        return;

    }


    /*
        Event delegation.

        One event listener handles every current
        and future book-details button.
    */

    booksContainer.addEventListener(
        "click",
        function(
            event
        ) {

            const detailsButton =
                event.target.closest(
                    ".book-details-button"
                );


            if (
                detailsButton === null
            ) {

                return;

            }


            const bookId =
                Number(
                    detailsButton.getAttribute(
                        "data-book-id"
                    )
                );


            showBookDetails(
                bookId
            );

        }
    );

}


/* =========================================================
   INITIALIZE BOOKS & STORIES PAGE
   ========================================================= */

buildBookCards();

buildFragments();

addBookEvents();


/* =========================================================
   MILESTONE 6 - AOS ANIMATION LIBRARY
   =========================================================

   Animate On Scroll (AOS) is used as the additional
   JavaScript library for Milestone 6.

   AOS adds subtle movement when selected page sections
   enter the visitor's screen.

   The library is initialized after the dynamically created
   book cards and story fragments have been added to the page.
*/

if (
    typeof AOS !==
    "undefined"
) {

    AOS.init({

        duration:
            600,

        once:
            true,

        offset:
            50

    });

}