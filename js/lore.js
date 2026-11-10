/*
    CST-120 Milestone 5 - Lore Archive JavaScript

    This file controls search behavior, category counting,
    and the jQuery Archive Guide interaction on lore.html.

    It demonstrates:
    - External JavaScript
    - Objects
    - Loops
    - Selection statements
    - String methods
    - Template literals
    - Event listeners
    - jQuery show/hide behavior
    - jQuery DOM and ARIA updates
    - Accessibility-focused interaction
*/


/*
    Search settings object.

    This object stores selectors and display values used
    by the Lore Archive search feature.
*/

const searchSettings = {
    inputId: "lore-search",
    rowSelector: ".lore-table tbody tr",
    hiddenDisplay: "none",
    visibleDisplay: ""
};


/*
    Cache frequently used page elements.
*/

const loreSearch =
    document.getElementById("lore-search");

const searchMessage =
    document.getElementById("search-message");


/*
    searchLore()

    Purpose:
    Filters the Lore Archive table as the visitor types.

    Expected outcome:
    Rows containing the visitor's search text remain visible,
    while nonmatching rows are hidden.

    Accessibility:
    The search status message uses aria-live in the HTML so
    changes can be announced by assistive technology.
*/

function searchLore() {

    /*
        trim() removes extra spaces from the beginning
        and end of the visitor's search.

        toLowerCase() makes the comparison case-insensitive.
    */

    let searchText =
        document.getElementById(searchSettings.inputId)
        .value
        .trim()
        .toLowerCase();


    let rows =
        document.querySelectorAll(searchSettings.rowSelector);


    /*
        Search loop:

        Each lore table row is checked once.

        Termination:
        The loop ends after every row in the NodeList
        has been evaluated.

        Edge case:
        If the table contains no rows, the loop performs
        zero iterations.
    */

    for (let i = 0; i < rows.length; i++) {

        let rowText =
            rows[i].textContent.toLowerCase();


        /*
            Selection statements:

            An empty search shows every row.

            includes() checks whether the text from each
            row contains the visitor's search term.
        */

        if (searchText === "") {

            rows[i].style.display =
                searchSettings.visibleDisplay;

        } else if (rowText.includes(searchText)) {

            rows[i].style.display =
                searchSettings.visibleDisplay;

        } else {

            rows[i].style.display =
                searchSettings.hiddenDisplay;
        }
    }


    /*
        Template literal:

        The visitor's search term is inserted into a
        readable status message.
    */

    if (searchText === "") {

        searchMessage.textContent =
            "All lore entries are currently displayed.";

    } else {

        searchMessage.textContent =
            `Showing results for "${searchText}".`;
    }
}


/*
    showCategoryCount()

    Purpose:
    Counts the category labels displayed above the archive.

    Loop behavior:
    The loop checks each category span once.

    Termination:
    The loop ends after the final category has been counted.

    Edge case:
    If no category spans exist, the total remains zero.
*/

function showCategoryCount() {

    let categories =
        document.querySelectorAll(".categories span");


    let totalCategories =
        0;


    for (let i = 0; i < categories.length; i++) {

        totalCategories++;
    }


    document.getElementById("category-count").textContent =
        totalCategories + " archive categories are available.";
}


/*
    Lore search input event.

    Purpose:
    Runs the archive search while the visitor types.

    Trigger:
    The value of the search field changes.

    Expected outcome:
    Matching lore entries remain visible and the search
    status message updates immediately.
*/

loreSearch.addEventListener("input", function() {

    searchLore();
});


/*
    jQuery Archive Guide interaction.

    Purpose:
    Shows and hides additional instructions for using
    the Lore Archive.

    Trigger:
    The visitor selects the Show Archive Guide or
    Hide Archive Guide button.

    Expected outcome:
    The guide opens or closes, the button text changes,
    a CSS class is added or removed, and ARIA attributes
    are updated to match the visible state.

    Accessibility:
    aria-expanded and aria-hidden communicate the current
    state to assistive technology. Focus moves to the guide
    when it opens and returns to the button when it closes.
*/


$("#archive-guide-button").on("click", function() {

    /*
        Store jQuery objects for the button and guide.
    */

    let guideButton =
        $("#archive-guide-button");

    let archiveGuide =
        $("#archive-guide");


    /*
        attr() reads the current accessibility state.
    */

    let isExpanded =
        guideButton.attr("aria-expanded") === "true";


    /*
        Selection statement:

        If the guide is currently closed, jQuery shows it
        and updates the page to the expanded state.
    */

    if (isExpanded === false) {

        /*
            Remove the HTML hidden property first so
            jQuery can display the guide.
        */

        archiveGuide.prop(
            "hidden",
            false
        );


        /*
            Required jQuery show operation.
        */

        archiveGuide.show();


        /*
            Additional jQuery DOM operations:
            attr() updates ARIA values.
            addClass() changes the visual style.
            text() changes the button label.
        */

        guideButton.attr(
            "aria-expanded",
            "true"
        );

        archiveGuide.attr(
            "aria-hidden",
            "false"
        );

        archiveGuide.addClass(
            "active-guide"
        );

        guideButton.text(
            "Hide Archive Guide"
        );


        /*
            Move focus to the newly displayed guide.
        */

        archiveGuide.trigger(
            "focus"
        );

    } else {

        /*
            Required jQuery hide operation.
        */

        archiveGuide.hide();


        /*
            Update accessibility and visual states.
        */

        guideButton.attr(
            "aria-expanded",
            "false"
        );

        archiveGuide.attr(
            "aria-hidden",
            "true"
        );

        archiveGuide.removeClass(
            "active-guide"
        );

        guideButton.text(
            "Show Archive Guide"
        );


        /*
            Restore the hidden property after jQuery
            hides the guide.
        */

        archiveGuide.prop(
            "hidden",
            true
        );


        /*
            Return keyboard focus to the button after
            the guide closes.
        */

        guideButton.trigger(
            "focus"
        );
    }
});


/*
    Initial page setup.

    These functions run once when the external JavaScript
    file loads.
*/

showCategoryCount();

searchLore();