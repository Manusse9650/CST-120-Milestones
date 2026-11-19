/*
    CST-120 Milestone 6
    AOS - Animate On Scroll Initialization

    AOS is an additional JavaScript library used to add
    subtle scroll-based animation to selected sections
    of the Avelis World Companion.

    Library:
    Animate On Scroll (AOS)

    License:
    MIT
*/


document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
            Check that the AOS library loaded successfully
            before attempting to initialize it.
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
                    60

            });

        }

    }
);