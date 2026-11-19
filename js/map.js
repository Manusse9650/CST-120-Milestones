/*
    CST-120 Milestone 6
    Avelis Map Page JavaScript

    This file controls the interactive map selection on map.html.

    Features:
    - External JavaScript
    - JavaScript objects
    - Selection statements
    - Template literals
    - Event delegation
    - ARIA accessibility updates
    - Visual active states
    - Responsive-friendly interaction
*/


/* =========================================================
   WAIT FOR PAGE TO LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* =====================================================
           MAP DATA
           =====================================================

           Each map contains:
           - Image filename
           - Display name
           - Alternative text
           - Short description
        */

        const mapData = {

            city: {

                file:
                    "City-Map.jpeg",

                name:
                    "City Map",

                alt:
                    "City map of Avelis",

                description:
                    "View important cities, settlements, and developed areas throughout Avelis."

            },


            geography: {

                file:
                    "Geography-Map.jpeg",

                name:
                    "Geography Map",

                alt:
                    "Geographic map of Avelis",

                description:
                    "Explore the physical geography of Avelis, including major landforms and natural regions."

            },


            political: {

                file:
                    "Political-Map.jpeg",

                name:
                    "Political Map",

                alt:
                    "Political map of Avelis",

                description:
                    "View the kingdoms, borders, and political regions that shape the world of Avelis."

            }

        };


        /* =====================================================
           PAGE ELEMENTS
           ===================================================== */

        const mapImage =
            document.getElementById(
                "map-image"
            );


        const mapTitle =
            document.getElementById(
                "map-title"
            );


        const mapDescription =
            document.getElementById(
                "map-description"
            );


        const mapButtonContainer =
            document.querySelector(
                ".map-buttons"
            );


        /*
            Stop safely if the required elements
            do not exist on the page.
        */

        if (
            mapImage === null ||
            mapTitle === null ||
            mapButtonContainer === null
        ) {

            return;

        }


        /* =====================================================
           SHOW MAP
           ===================================================== */

        function showMap(
            mapType
        ) {

            let selectedMap;


            /*
                Selection statement.

                The switch determines which map object
                should be displayed.
            */

            switch (
                mapType
            ) {

                case "city":

                    selectedMap =
                        mapData.city;

                    break;


                case "geography":

                    selectedMap =
                        mapData.geography;

                    break;


                case "political":

                    selectedMap =
                        mapData.political;

                    break;


                default:

                    selectedMap =
                        mapData.city;

                    mapType =
                        "city";

            }


            /* =================================================
               UPDATE MAP IMAGE
               ================================================= */

            const mapImageSource =
                `images/${selectedMap.file}`;


            mapImage.src =
                mapImageSource;


            mapImage.alt =
                selectedMap.alt;


            /* =================================================
               UPDATE MAP HEADING
               ================================================= */

            mapTitle.textContent =
                `Viewing: ${selectedMap.name}`;


            /* =================================================
               UPDATE DESCRIPTION
               ================================================= */

            if (
                mapDescription !== null
            ) {

                mapDescription.textContent =
                    selectedMap.description;

            }


            /* =================================================
               UPDATE BUTTON STATES
               ================================================= */

            const mapButtons =
                mapButtonContainer.querySelectorAll(
                    "button[data-map]"
                );


            for (
                let i = 0;
                i < mapButtons.length;
                i++
            ) {

                const button =
                    mapButtons[i];


                const buttonMapType =
                    button.getAttribute(
                        "data-map"
                    );


                if (
                    buttonMapType === mapType
                ) {

                    button.classList.add(
                        "active-map"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                } else {

                    button.classList.remove(
                        "active-map"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                }

            }

        }


        /* =====================================================
           MAP BUTTON EVENTS
           =====================================================

           Event delegation allows one listener to control
           all current and future map buttons.
        */

        mapButtonContainer.addEventListener(
            "click",
            function(
                event
            ) {

                const selectedButton =
                    event.target.closest(
                        "button[data-map]"
                    );


                if (
                    selectedButton === null
                ) {

                    return;

                }


                const mapType =
                    selectedButton.getAttribute(
                        "data-map"
                    );


                showMap(
                    mapType
                );

            }
        );


        /* =====================================================
           INITIAL MAP
           ===================================================== */

        showMap(
            "city"
        );

    }
);