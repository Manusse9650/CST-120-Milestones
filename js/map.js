/*
    CST-120 Milestone 5 - Map Page JavaScript

    This file controls the interactive map selection on map.html.

    It demonstrates:
    - External JavaScript
    - Objects
    - Selection statements
    - Template literals
    - Loops
    - Event listeners
    - ARIA updates
    - Visual state changes
*/


/*
    Wait until the HTML document has completely loaded
    before selecting elements or attaching event listeners.
*/

document.addEventListener("DOMContentLoaded", function() {


    /*
        Map data object.

        Each property stores the image filename and display
        name for one map option.
    */

    const mapData = {

        city: {
            file: "City-Map.jpeg",
            name: "City Map"
        },

        geography: {
            file: "Geography-Map.jpeg",
            name: "Geography Map"
        },

        political: {
            file: "Political-Map.jpeg",
            name: "Political Map"
        }
    };


    /*
        Store the map image, title, and buttons.
    */

    const mapImage =
        document.getElementById("map-image");

    const mapTitle =
        document.getElementById("map-title");

    const mapButtons =
        document.querySelectorAll(".map-buttons button");


    /*
        showMap()

        Purpose:
        Changes the displayed image based on the map
        selected by the visitor.

        Expected outcome:
        The image, alternative text, heading, button style,
        and ARIA state all update.
    */

    function showMap(mapType) {

        let selectedMap;


        /*
            Selection statement:

            The switch statement determines which map
            object should be displayed.
        */

        switch (mapType) {

            case "city":
                selectedMap = mapData.city;
                break;

            case "geography":
                selectedMap = mapData.geography;
                break;

            case "political":
                selectedMap = mapData.political;
                break;

            default:
                selectedMap = mapData.city;
        }


        /*
            Template literals create the image path,
            alternative text, and heading.
        */

        let mapImageSource =
            `images/${selectedMap.file}`;

        let mapAltText =
            `${selectedMap.name} of Avelis`;

        let mapHeading =
            `Viewing: ${selectedMap.name}`;


        /*
            Update the displayed map.
        */

        mapImage.src =
            mapImageSource;

        mapImage.alt =
            mapAltText;

        mapTitle.textContent =
            mapHeading;


        /*
            Loop through all map buttons.

            The loop ends after every button has been
            checked once.

            The selected button receives the active style
            and aria-pressed="true".
        */

        for (let i = 0; i < mapButtons.length; i++) {

            let buttonMapType =
                mapButtons[i].getAttribute("data-map");


            if (buttonMapType === mapType) {

                mapButtons[i].classList.add(
                    "active-map"
                );

                mapButtons[i].setAttribute(
                    "aria-pressed",
                    "true"
                );

            } else {

                mapButtons[i].classList.remove(
                    "active-map"
                );

                mapButtons[i].setAttribute(
                    "aria-pressed",
                    "false"
                );
            }
        }
    }


    /*
        Map button event listeners.

        Purpose:
        Each button sends its data-map value to showMap().

        Trigger:
        The visitor clicks one of the map buttons.

        Expected outcome:
        The selected map appears immediately.

        Accessibility:
        Native button elements support both mouse and
        keyboard activation.
    */

    for (let i = 0; i < mapButtons.length; i++) {

        mapButtons[i].addEventListener(
            "click",
            function(event) {

                let mapType =
                    event.currentTarget.getAttribute(
                        "data-map"
                    );

                showMap(mapType);
            }
        );
    }


    /*
        Set the initial map state when the page loads.
    */

    showMap("city");

});