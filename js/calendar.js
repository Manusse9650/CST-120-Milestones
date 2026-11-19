/*
    CST-120 Milestone 6
    Avelis Calendar JavaScript

    Calendar System:
    1 Cycle   = 1 day
    1 Span    = 10 Cycles
    1 Moon    = 4 Spans = 40 Cycles
    1 Solturn = 10 Moons = 40 Spans = 400 Cycles

    The story begins during Solturn 950, so Solturn 950
    is used as the current calendar year.

    This script:
    - Builds a visual calendar chart
    - Displays one Moon at a time
    - Creates 4 Spans with 10 Cycles each
    - Numbers each Moon from Cycle 1 through Cycle 40
    - Displays important holidays
    - Displays character birth dates
    - Allows visitors to move through all 10 Moons
    - Provides a Cycle converter for Solturn 950
*/


/* =========================================================
   CALENDAR SETTINGS
   ========================================================= */

const calendarSettings = {

    cyclesPerSpan:
        10,

    spansPerMoon:
        4,

    moonsPerSolturn:
        10,

    currentSolturn:
        950

};


calendarSettings.cyclesPerMoon =
    calendarSettings.cyclesPerSpan *
    calendarSettings.spansPerMoon;


calendarSettings.spansPerSolturn =
    calendarSettings.spansPerMoon *
    calendarSettings.moonsPerSolturn;


calendarSettings.cyclesPerSolturn =
    calendarSettings.cyclesPerMoon *
    calendarSettings.moonsPerSolturn;


/* =========================================================
   MOON LABELS
   ========================================================= */

const moonNames = [

    "Moon 1",
    "Moon 2",
    "Moon 3",
    "Moon 4",
    "Moon 5",
    "Moon 6",
    "Moon 7",
    "Moon 8",
    "Moon 9",
    "Moon 10"

];


/* =========================================================
   IMPORTANT CALENDAR DATES
   ========================================================= */

/*
    Holidays are stored using their Cycle number
    within a Solturn.

    Character birth dates also include the Solturn
    in which the character was born.
*/

const calendarEvents = [

    /* =====================================================
       HOLIDAYS
       ===================================================== */

    {
        name:
            "Festival of Growth",

        type:
            "Holiday",

        cycle:
            1
    },


    {
        name:
            "Celebration of Warmth",

        type:
            "Holiday",

        cycle:
            81
    },


    {
        name:
            "Day of the Sun",

        type:
            "Holiday",

        cycle:
            161
    },


    {
        name:
            "Celebration of the Harvest",

        type:
            "Holiday",

        cycle:
            281
    },


    {
        name:
            "The Great Quiet",

        type:
            "Holiday",

        cycle:
            321
    },


    /* =====================================================
       CHARACTER BIRTH DATES
       ===================================================== */

    {
        name:
            "Solarius Aldeatus ",

        type:
            "Birth",

        birthSolturn:
            950,

        cycle:
            161
    },


    {
        name:
            "Myrrin Sylvamer ",

        type:
            "Birth",

        birthSolturn:
            948,

        cycle:
            295
    }

];


/* =========================================================
   CURRENT MOON
   ========================================================= */

let selectedMoon =
    1;


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const moonTitle =
    document.getElementById(
        "moon-title"
    );


const moonRange =
    document.getElementById(
        "moon-range"
    );


const calendarBody =
    document.getElementById(
        "calendar-body"
    );


const moonSelect =
    document.getElementById(
        "moon-select"
    );


const previousMoonButton =
    document.getElementById(
        "previous-moon"
    );


const nextMoonButton =
    document.getElementById(
        "next-moon"
    );


const cycleInput =
    document.getElementById(
        "cycle-number"
    );


const cycleResult =
    document.getElementById(
        "cycle-result"
    );


/* =========================================================
   BUILD MOON SELECTOR
   ========================================================= */

function buildMoonSelector() {

    if (
        moonSelect === null
    ) {

        return;

    }


    moonSelect.textContent =
        "";


    for (
        let i = 0;
        i < moonNames.length;
        i++
    ) {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            i + 1;


        option.textContent =
            moonNames[i];


        moonSelect.appendChild(
            option
        );

    }


    moonSelect.value =
        selectedMoon;

}


/* =========================================================
   GET MOON CYCLE RANGE
   ========================================================= */

function getMoonRange(
    moonNumber
) {

    const firstCycle =
        (
            moonNumber - 1
        ) *
        calendarSettings.cyclesPerMoon +
        1;


    const lastCycle =
        moonNumber *
        calendarSettings.cyclesPerMoon;


    return {

        firstCycle:
            firstCycle,

        lastCycle:
            lastCycle

    };

}


/* =========================================================
   GET EVENTS FOR DATE
   ========================================================= */

function getEventsForDate(
    moonNumber,
    cycleInMoon
) {

    const matchingEvents =
        [];


    const cycleInSolturn =
        (
            moonNumber - 1
        ) *
        calendarSettings.cyclesPerMoon +
        cycleInMoon;


    for (
        let i = 0;
        i < calendarEvents.length;
        i++
    ) {

        const calendarEvent =
            calendarEvents[i];


        if (
            calendarEvent.cycle ===
            cycleInSolturn
        ) {

            matchingEvents.push(
                calendarEvent
            );

        }

    }


    return matchingEvents;

}


/* =========================================================
   CREATE EVENT LABEL
   ========================================================= */

/*
    Holidays display the holiday name.

    Character dates display the character name
    followed by the word "Birth."
*/

function createCalendarEvent(
    calendarEvent
) {

    const eventElement =
        document.createElement(
            "div"
        );


    eventElement.className =
        "calendar-event";


    /* =====================================================
       HOLIDAY
       ===================================================== */

    if (
        calendarEvent.type ===
        "Holiday"
    ) {

        const eventName =
            document.createElement(
                "strong"
            );


        eventName.className =
            "calendar-event-name";


        eventName.textContent =
            calendarEvent.name;


        eventElement.appendChild(
            eventName
        );

    }


    /* =====================================================
       CHARACTER BIRTH
       ===================================================== */

    else if (
        calendarEvent.type ===
        "Birth"
    ) {

        const eventName =
            document.createElement(
                "strong"
            );


        eventName.className =
            "calendar-event-name";


        eventName.textContent =
            calendarEvent.name;


        const birthLabel =
            document.createElement(
                "span"
            );


        birthLabel.className =
            "calendar-event-label";


        birthLabel.textContent =
            "Birth";


        eventElement.appendChild(
            eventName
        );


        eventElement.appendChild(
            birthLabel
        );

    }


    return eventElement;

}


/* =========================================================
   BUILD CALENDAR CHART
   ========================================================= */

function buildCalendarChart(
    moonNumber
) {

    if (
        calendarBody === null
    ) {

        return;

    }


    calendarBody.textContent =
        "";


    const moonCycleRange =
        getMoonRange(
            moonNumber
        );


    /* =====================================================
       UPDATE CALENDAR HEADING
       ===================================================== */

    if (
        moonTitle !== null
    ) {

        moonTitle.textContent =
            "Solturn " +
            calendarSettings.currentSolturn +
            " — " +
            moonNames[
                moonNumber - 1
            ];

    }


    if (
        moonRange !== null
    ) {

        moonRange.textContent =
            "Cycles " +
            moonCycleRange.firstCycle +
            "–" +
            moonCycleRange.lastCycle +
            " of Solturn " +
            calendarSettings.currentSolturn;

    }


    /* =====================================================
       CREATE FOUR SPANS
       ===================================================== */

    for (
        let span = 1;
        span <= calendarSettings.spansPerMoon;
        span++
    ) {

        const row =
            document.createElement(
                "tr"
            );


        /* =================================================
           SPAN NUMBER
           ================================================= */

        const spanCell =
            document.createElement(
                "th"
            );


        spanCell.scope =
            "row";


        spanCell.className =
            "span-heading";


        spanCell.textContent =
            span;


        spanCell.setAttribute(
            "aria-label",
            "Span " + span
        );


        row.appendChild(
            spanCell
        );


        /* =================================================
           CREATE TEN DATES
           ================================================= */

        for (
            let cycle = 1;
            cycle <= calendarSettings.cyclesPerSpan;
            cycle++
        ) {

            const cell =
                document.createElement(
                    "td"
                );


            cell.className =
                "cycle-cell";


            const cycleInMoon =
                (
                    span - 1
                ) *
                calendarSettings.cyclesPerSpan +
                cycle;


            /* =================================================
               DATE NUMBER
               ================================================= */

            const dateNumber =
                document.createElement(
                    "span"
                );


            dateNumber.className =
                "calendar-date-number";


            dateNumber.textContent =
                cycleInMoon;


            cell.appendChild(
                dateNumber
            );


            /* =================================================
               DATE CONTENT
               ================================================= */

            const dateContent =
                document.createElement(
                    "div"
                );


            dateContent.className =
                "calendar-date-content";


            const dateEvents =
                getEventsForDate(
                    moonNumber,
                    cycleInMoon
                );


            for (
                let eventIndex = 0;
                eventIndex < dateEvents.length;
                eventIndex++
            ) {

                const calendarEvent =
                    createCalendarEvent(
                        dateEvents[
                            eventIndex
                        ]
                    );


                dateContent.appendChild(
                    calendarEvent
                );

            }


            cell.appendChild(
                dateContent
            );


            /* =================================================
               ACCESSIBLE DESCRIPTION
               ================================================= */

            let accessibleLabel =
                moonNames[
                    moonNumber - 1
                ] +
                ", Span " +
                span +
                ", Cycle " +
                cycleInMoon;


            if (
                dateEvents.length > 0
            ) {

                accessibleLabel +=
                    ". Important date: ";


                for (
                    let eventIndex = 0;
                    eventIndex < dateEvents.length;
                    eventIndex++
                ) {

                    accessibleLabel +=
                        dateEvents[
                            eventIndex
                        ].name;


                    if (
                        eventIndex <
                        dateEvents.length - 1
                    ) {

                        accessibleLabel +=
                            ", ";

                    }

                }

            }


            cell.setAttribute(
                "aria-label",
                accessibleLabel
            );


            row.appendChild(
                cell
            );

        }


        calendarBody.appendChild(
            row
        );

    }

}


/* =========================================================
   CHANGE SELECTED MOON
   ========================================================= */

function changeMoon(
    moonNumber
) {

    if (
        moonNumber < 1
    ) {

        moonNumber =
            calendarSettings.moonsPerSolturn;

    }


    if (
        moonNumber >
        calendarSettings.moonsPerSolturn
    ) {

        moonNumber =
            1;

    }


    selectedMoon =
        moonNumber;


    if (
        moonSelect !== null
    ) {

        moonSelect.value =
            selectedMoon;

    }


    buildCalendarChart(
        selectedMoon
    );

}


/* =========================================================
   CALCULATE CYCLE POSITION
   ========================================================= */

function calculateCyclePosition(
    cycleInSolturn
) {

    const moon =
        Math.floor(
            (
                cycleInSolturn - 1
            ) /
            calendarSettings.cyclesPerMoon
        ) + 1;


    const cycleInMoon =
        (
            (
                cycleInSolturn - 1
            ) %
            calendarSettings.cyclesPerMoon
        ) + 1;


    const span =
        Math.floor(
            (
                cycleInMoon - 1
            ) /
            calendarSettings.cyclesPerSpan
        ) + 1;


    const cycleInSpan =
        (
            (
                cycleInMoon - 1
            ) %
            calendarSettings.cyclesPerSpan
        ) + 1;


    return {

        solturn:
            calendarSettings.currentSolturn,

        moon:
            moon,

        span:
            span,

        cycle:
            cycleInSpan,

        cycleInMoon:
            cycleInMoon,

        cycleInSolturn:
            cycleInSolturn

    };

}


/* =========================================================
   DISPLAY CYCLE RESULT
   ========================================================= */

function displayCycleResult() {

    if (
        cycleInput === null ||
        cycleResult === null
    ) {

        return;

    }


    const cycleValue =
        Number(
            cycleInput.value
        );


    if (
        Number.isInteger(
            cycleValue
        ) === false ||
        cycleValue < 1 ||
        cycleValue >
        calendarSettings.cyclesPerSolturn
    ) {

        cycleResult.textContent =
            "Enter a whole Cycle number from 1 through 400.";


        cycleInput.focus();


        return;

    }


    const result =
        calculateCyclePosition(
            cycleValue
        );


    cycleResult.textContent =
        "Cycle " +
        cycleValue +
        " of Solturn " +
        result.solturn +
        " falls in Moon " +
        result.moon +
        ", Span " +
        result.span +
        ", Cycle " +
        result.cycleInMoon +
        " of the Moon.";


    changeMoon(
        result.moon
    );

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

function addCalendarEvents() {


    /* Previous Moon */

    if (
        previousMoonButton !== null
    ) {

        previousMoonButton.addEventListener(
            "click",
            function() {

                changeMoon(
                    selectedMoon - 1
                );

            }
        );

    }


    /* Next Moon */

    if (
        nextMoonButton !== null
    ) {

        nextMoonButton.addEventListener(
            "click",
            function() {

                changeMoon(
                    selectedMoon + 1
                );

            }
        );

    }


    /* Moon selection menu */

    if (
        moonSelect !== null
    ) {

        moonSelect.addEventListener(
            "change",
            function() {

                changeMoon(
                    Number(
                        moonSelect.value
                    )
                );

            }
        );

    }


    /* Cycle converter button */

    const calculateButton =
        document.getElementById(
            "calculate-cycle"
        );


    if (
        calculateButton !== null
    ) {

        calculateButton.addEventListener(
            "click",
            function() {

                displayCycleResult();

            }
        );

    }


    /* Enter key */

    if (
        cycleInput !== null
    ) {

        cycleInput.addEventListener(
            "keydown",
            function(
                event
            ) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    displayCycleResult();

                }

            }
        );

    }

}


/* =========================================================
   INITIALIZE CALENDAR
   ========================================================= */

buildMoonSelector();


buildCalendarChart(
    selectedMoon
);


addCalendarEvents();


/* =========================================================
   MILESTONE 6 - AOS ANIMATION LIBRARY
   =========================================================

   Animate On Scroll (AOS) is used as the additional
   JavaScript library for Milestone 6.

   AOS provides subtle scroll-based animation for selected
   sections of the Calendar page.

   It is initialized after the calendar has been created.
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