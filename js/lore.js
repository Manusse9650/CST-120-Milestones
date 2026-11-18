/*
    CST-120 Milestone 6 - Lore Archive JavaScript

    This file controls the Lore Archive on lore.html.

    Archive data is stored separately in:
    data/Lore-Archive.csv

    The CSV contains four meaningful columns:

    - Category
    - System
    - Details
    - Cultural Notes

    Any blank spreadsheet columns or completely blank rows
    are ignored when the archive loads.

    Features:
    - Loads external CSV data
    - Creates JavaScript objects from spreadsheet rows
    - Builds category buttons from the CSV
    - Sorts entries alphabetically A-Z by System
    - Displays 20 entries per page
    - Previous and Next pagination
    - Live archive search
    - Category filtering
    - Search and category filters work together
    - Displays Cultural Notes
    - Updates result counts and page information
    - Preserves the jQuery Archive Guide interaction
    - Includes accessibility-focused ARIA updates
*/


/*
    Archive settings object.

    This object stores settings that may need to be
    changed later without rewriting the rest of the script.
*/

const archiveSettings = {

    csvFile:
        "data/Lore-Archive.csv",

    entriesPerPage:
        20
};


/*
    ARCHIVE DATA

    loreEntries:
    Stores every valid entry loaded from the CSV.

    filteredLoreEntries:
    Stores only the entries that match the current
    search and selected category.
*/

let loreEntries =
    [];


let filteredLoreEntries =
    [];


/*
    Default category.

    "all" means every category is shown.
*/

let selectedCategory =
    "all";


/*
    Pagination begins on Page 1.
*/

let currentPage =
    1;


/*
    CACHE PAGE ELEMENTS
*/

const loreSearch =
    document.getElementById(
        "lore-search"
    );


const loreTableBody =
    document.getElementById(
        "lore-table-body"
    );


const archiveStatus =
    document.getElementById(
        "archive-status"
    );


const categoryContainer =
    document.getElementById(
        "archive-categories"
    );


/*
    Pagination elements will be created by JavaScript
    if they are not already present in the HTML.
*/

let previousPageButton =
    document.getElementById(
        "previous-page"
    );


let nextPageButton =
    document.getElementById(
        "next-page"
    );


let pageIndicator =
    document.getElementById(
        "page-indicator"
    );


/*
    ensureTableStructure()

    Purpose:
    Makes sure the Lore Archive table has four columns:

    Category
    Entry
    Details
    Cultural Notes

    If Cultural Notes is not already in lore.html,
    JavaScript adds it automatically.
*/

function ensureTableStructure() {

    const table =
        document.querySelector(
            ".lore-table"
        );


    if (
        table === null
    ) {

        return;
    }


    const headerRow =
        table.querySelector(
            "thead tr"
        );


    if (
        headerRow === null
    ) {

        return;
    }


    /*
        Check whether Cultural Notes already exists.
    */

    let headers =
        headerRow.querySelectorAll(
            "th"
        );


    if (
        headers.length < 4
    ) {

        const culturalNotesHeader =
            document.createElement(
                "th"
            );


        culturalNotesHeader.scope =
            "col";


        culturalNotesHeader.textContent =
            "Cultural Notes";


        headerRow.appendChild(
            culturalNotesHeader
        );
    }


    /*
        If the loading row exists, make sure it
        spans all four table columns.
    */

    const loadingCell =
        loreTableBody.querySelector(
            "td[colspan]"
        );


    if (
        loadingCell !== null
    ) {

        loadingCell.colSpan =
            4;
    }
}


/*
    createPagination()

    Purpose:
    Creates Previous and Next page controls
    if they are not already in lore.html.
*/

function createPagination() {

    /*
        If pagination already exists,
        use the existing controls.
    */

    if (
        previousPageButton !== null &&
        nextPageButton !== null &&
        pageIndicator !== null
    ) {

        return;
    }


    /*
        Find the table wrapper so pagination
        can be placed directly underneath it.
    */

    const tableWrapper =
        document.querySelector(
            ".table-wrapper"
        );


    if (
        tableWrapper === null
    ) {

        return;
    }


    /*
        Create pagination container.
    */

    const pagination =
        document.createElement(
            "nav"
        );


    pagination.className =
        "archive-pagination";


    pagination.setAttribute(
        "aria-label",
        "Lore Archive pages"
    );


    /*
        Previous button.
    */

    previousPageButton =
        document.createElement(
            "button"
        );


    previousPageButton.type =
        "button";


    previousPageButton.id =
        "previous-page";


    previousPageButton.className =
        "pagination-button";


    previousPageButton.textContent =
        "Previous";


    previousPageButton.disabled =
        true;


    /*
        Page indicator.
    */

    pageIndicator =
        document.createElement(
            "span"
        );


    pageIndicator.id =
        "page-indicator";


    pageIndicator.className =
        "page-indicator";


    pageIndicator.setAttribute(
        "aria-live",
        "polite"
    );


    pageIndicator.textContent =
        "Page 1 of 1";


    /*
        Next button.
    */

    nextPageButton =
        document.createElement(
            "button"
        );


    nextPageButton.type =
        "button";


    nextPageButton.id =
        "next-page";


    nextPageButton.className =
        "pagination-button";


    nextPageButton.textContent =
        "Next";


    nextPageButton.disabled =
        true;


    /*
        Add controls to the pagination area.
    */

    pagination.appendChild(
        previousPageButton
    );


    pagination.appendChild(
        pageIndicator
    );


    pagination.appendChild(
        nextPageButton
    );


    /*
        Place pagination after the table.
    */

    tableWrapper.insertAdjacentElement(
        "afterend",
        pagination
    );


    /*
        Attach pagination events.
    */

    addPaginationEvents();
}


/*
    addPaginationStyles()

    Purpose:
    Adds a small amount of styling for pagination.

    This allows the controls to work even before
    pagination styles are moved into the main CSS.
*/

function addPaginationStyles() {

    /*
        Do not add the style twice.
    */

    if (
        document.getElementById(
            "archive-pagination-styles"
        ) !== null
    ) {

        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "archive-pagination-styles";


    style.textContent = `

        .archive-pagination {
            max-width: 600px;
            margin: 25px auto 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }

        .pagination-button {
            padding: 8px 16px;
            font-family: "Times New Roman", serif;
            font-size: 16px;
            color: #3e2d20;
            background-color: #e2c99d;
            border: 1px solid #8f8064;
            border-radius: 4px;
            cursor: pointer;
        }

        .pagination-button:hover:not(:disabled),
        .pagination-button:focus:not(:disabled) {
            background-color: #d3b47b;
        }

        .pagination-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .page-indicator {
            min-width: 110px;
            font-weight: bold;
            text-align: center;
        }

    `;


    document.head.appendChild(
        style
    );
}


/*
    parseCSV()

    Purpose:
    Converts the text from Lore-Archive.csv
    into an array of spreadsheet rows.

    The parser supports:
    - Commas inside quotation marks
    - Quotation marks inside descriptions
    - Windows line endings
    - UTF-8 CSV files exported from Excel
*/

function parseCSV(csvText) {

    /*
        Excel may place a UTF-8 BOM character
        at the beginning of the file.

        Remove it before parsing.
    */

    csvText =
        csvText.replace(
            /^\uFEFF/,
            ""
        );


    let rows =
        [];


    let currentRow =
        [];


    let currentValue =
        "";


    let insideQuotes =
        false;


    /*
        Read each character in the CSV once.
    */

    for (
        let i = 0;
        i < csvText.length;
        i++
    ) {

        let character =
            csvText.charAt(i);


        /*
            QUOTATION MARK
        */

        if (
            character === '"'
        ) {

            /*
                Two quotation marks inside quoted text
                represent one quotation mark.
            */

            if (
                insideQuotes === true &&
                csvText.charAt(i + 1) === '"'
            ) {

                currentValue +=
                    '"';


                i++;

            } else {

                insideQuotes =
                    !insideQuotes;
            }


        /*
            COMMA
        */

        } else if (
            character === "," &&
            insideQuotes === false
        ) {

            /*
                A comma outside quotation marks
                ends the current cell.
            */

            currentRow.push(
                currentValue
            );


            currentValue =
                "";


        /*
            LINE BREAK
        */

        } else if (
            (
                character === "\n" ||
                character === "\r"
            ) &&
            insideQuotes === false
        ) {

            /*
                Handle Windows \r\n line endings.
            */

            if (
                character === "\r" &&
                csvText.charAt(i + 1) === "\n"
            ) {

                i++;
            }


            /*
                Add the final value in the row.
            */

            currentRow.push(
                currentValue
            );


            /*
                Check whether the row contains
                any actual information.
            */

            let rowHasContent =
                false;


            for (
                let j = 0;
                j < currentRow.length;
                j++
            ) {

                if (
                    currentRow[j]
                    .trim() !== ""
                ) {

                    rowHasContent =
                        true;


                    break;
                }
            }


            /*
                Ignore blank Excel rows.
            */

            if (
                rowHasContent === true
            ) {

                rows.push(
                    currentRow
                );
            }


            /*
                Begin a new CSV row.
            */

            currentRow =
                [];


            currentValue =
                "";


        } else {

            /*
                Add normal characters to
                the current value.
            */

            currentValue +=
                character;
        }
    }


    /*
        Add the final row if the CSV
        does not end with a line break.
    */

    if (
        currentValue !== "" ||
        currentRow.length > 0
    ) {

        currentRow.push(
            currentValue
        );


        let finalRowHasContent =
            false;


        for (
            let i = 0;
            i < currentRow.length;
            i++
        ) {

            if (
                currentRow[i]
                .trim() !== ""
            ) {

                finalRowHasContent =
                    true;


                break;
            }
        }


        if (
            finalRowHasContent === true
        ) {

            rows.push(
                currentRow
            );
        }
    }


    return rows;
}


/*
    convertRowsToEntries()

    Purpose:
    Converts spreadsheet rows into
    JavaScript archive objects.

    The revised Lore Archive CSV uses:

    Column 0 = Category
    Column 1 = System
    Column 2 = Details
    Column 3 = Cultural Notes

    Any columns after Column 3 are ignored.
*/

function convertRowsToEntries(rows) {

    let entries =
        [];


    /*
        Start at row 1.

        Row 0 contains the CSV headings.
    */

    for (
        let i = 1;
        i < rows.length;
        i++
    ) {

        let row =
            rows[i];


        /*
            Read only the four meaningful columns.
        */

        let category =
            row[0] || "";


        let system =
            row[1] || "";


        let details =
            row[2] || "";


        let culturalNotes =
            row[3] || "";


        /*
            Remove extra spaces around each value.
        */

        category =
            category.trim();


        system =
            system.trim();


        details =
            details.trim();


        culturalNotes =
            culturalNotes.trim();


        /*
            Ignore completely blank rows.
        */

        if (
            category !== "" ||
            system !== "" ||
            details !== "" ||
            culturalNotes !== ""
        ) {

            let entry = {

                category:
                    category,

                system:
                    system,

                details:
                    details,

                culturalNotes:
                    culturalNotes
            };


            entries.push(
                entry
            );
        }
    }


    return entries;
}


/*
    sortLoreAlphabetically()

    Purpose:
    Sorts entries alphabetically A-Z
    using the System column.
*/

function sortLoreAlphabetically(
    entries
) {

    entries.sort(
        function(
            firstEntry,
            secondEntry
        ) {

            return firstEntry.system.localeCompare(
                secondEntry.system,
                undefined,
                {
                    sensitivity:
                        "base"
                }
            );
        }
    );


    return entries;
}


/*
    getArchiveCategories()

    Purpose:
    Finds every unique category in the CSV.

    This means the website does not have to maintain
    a separate category list manually.
*/

function getArchiveCategories() {

    let categories =
        [];


    /*
        Check every archive entry once.
    */

    for (
        let i = 0;
        i < loreEntries.length;
        i++
    ) {

        let category =
            loreEntries[i].category;


        /*
            Ignore blank categories.
        */

        if (
            category === ""
        ) {

            continue;
        }


        /*
            Add the category only if it
            has not already been found.
        */

        if (
            categories.includes(
                category
            ) === false
        ) {

            categories.push(
                category
            );
        }
    }


    /*
        Sort category names alphabetically.
    */

    categories.sort(
        function(
            firstCategory,
            secondCategory
        ) {

            return firstCategory.localeCompare(
                secondCategory,
                undefined,
                {
                    sensitivity:
                        "base"
                }
            );
        }
    );


    return categories;
}


/*
    buildCategoryButtons()

    Purpose:
    Builds category buttons directly from
    the categories found in Lore-Archive.csv.

    This automatically includes Government
    and any future category added to the spreadsheet.
*/

function buildCategoryButtons() {

    if (
        categoryContainer === null
    ) {

        return;
    }


    /*
        Remove the old hard-coded category buttons.
    */

    categoryContainer.textContent =
        "";


    /*
        Create All Categories button.
    */

    const allButton =
        document.createElement(
            "button"
        );


    allButton.type =
        "button";


    allButton.className =
        "category-button active-category";


    allButton.setAttribute(
        "data-category",
        "all"
    );


    allButton.setAttribute(
        "aria-pressed",
        "true"
    );


    allButton.textContent =
        "All Categories";


    categoryContainer.appendChild(
        allButton
    );


    /*
        Find every category in the CSV.
    */

    let categories =
        getArchiveCategories();


    /*
        Create one button for each category.
    */

    for (
        let i = 0;
        i < categories.length;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "category-button";


        button.setAttribute(
            "data-category",
            categories[i]
        );


        button.setAttribute(
            "aria-pressed",
            "false"
        );


        button.textContent =
            categories[i];


        categoryContainer.appendChild(
            button
        );
    }
}


/*
    createLoreRow()

    Purpose:
    Creates one visible table row
    from one CSV archive entry.
*/

function createLoreRow(entry) {

    const row =
        document.createElement(
            "tr"
        );


    /*
        CATEGORY CELL
    */

    const categoryCell =
        document.createElement(
            "td"
        );


    categoryCell.textContent =
        entry.category;


    /*
        SYSTEM / ENTRY CELL
    */

    const systemCell =
        document.createElement(
            "td"
        );


    const systemName =
        document.createElement(
            "strong"
        );


    systemName.textContent =
        entry.system;


    systemCell.appendChild(
        systemName
    );


    /*
        DETAILS CELL
    */

    const detailsCell =
        document.createElement(
            "td"
        );


    detailsCell.textContent =
        entry.details;


    /*
        CULTURAL NOTES CELL
    */

    const culturalNotesCell =
        document.createElement(
            "td"
        );


    /*
        Use an em dash if no Cultural Notes
        information exists for the entry.
    */

    if (
        entry.culturalNotes === ""
    ) {

        culturalNotesCell.textContent =
            "—";

    } else {

        culturalNotesCell.textContent =
            entry.culturalNotes;
    }


    /*
        Add all four cells to the row.
    */

    row.appendChild(
        categoryCell
    );


    row.appendChild(
        systemCell
    );


    row.appendChild(
        detailsCell
    );


    row.appendChild(
        culturalNotesCell
    );


    return row;
}


/*
    showArchiveMessage()

    Purpose:
    Displays a message inside the archive table.

    Used when:
    - No entries match a filter
    - The CSV fails to load
*/

function showArchiveMessage(
    message
) {

    loreTableBody.textContent =
        "";


    const row =
        document.createElement(
            "tr"
        );


    row.className =
        "archive-message-row";


    const cell =
        document.createElement(
            "td"
        );


    cell.colSpan =
        4;


    cell.textContent =
        message;


    row.appendChild(
        cell
    );


    loreTableBody.appendChild(
        row
    );
}


/*
    getTotalPages()

    Purpose:
    Determines how many pages are needed
    for the current filtered results.

    20 entries are displayed per page.
*/

function getTotalPages() {

    if (
        filteredLoreEntries.length === 0
    ) {

        return 1;
    }


    return Math.ceil(
        filteredLoreEntries.length /
        archiveSettings.entriesPerPage
    );
}


/*
    displayCurrentPage()

    Purpose:
    Displays only the entries that belong
    to the current page.

    Example with 20 entries per page:

    Page 1 = entries 1-20
    Page 2 = entries 21-40
    Page 3 = entries 41-60
*/

function displayCurrentPage() {

    /*
        Clear previously displayed entries.
    */

    loreTableBody.textContent =
        "";


    /*
        No matching entries.
    */

    if (
        filteredLoreEntries.length === 0
    ) {

        showArchiveMessage(
            "No archive entries match the current search or category."
        );


        updatePagination();


        return;
    }


    /*
        Calculate the first entry
        belonging to this page.
    */

    let startIndex =
        (
            currentPage - 1
        ) *
        archiveSettings.entriesPerPage;


    /*
        Calculate the ending array position.
    */

    let endIndex =
        startIndex +
        archiveSettings.entriesPerPage;


    /*
        Create an array containing only
        this page's entries.
    */

    let pageEntries =
        filteredLoreEntries.slice(
            startIndex,
            endIndex
        );


    /*
        Create a table row for each entry.
    */

    for (
        let i = 0;
        i < pageEntries.length;
        i++
    ) {

        let row =
            createLoreRow(
                pageEntries[i]
            );


        loreTableBody.appendChild(
            row
        );
    }


    updatePagination();
}


/*
    updatePagination()

    Purpose:
    Updates:
    - Page indicator
    - Previous button state
    - Next button state
*/

function updatePagination() {

    let totalPages =
        getTotalPages();


    /*
        Protect against invalid page numbers.
    */

    if (
        currentPage > totalPages
    ) {

        currentPage =
            totalPages;
    }


    /*
        Display current page.
    */

    if (
        pageIndicator !== null
    ) {

        pageIndicator.textContent =
            `Page ${currentPage} of ${totalPages}`;
    }


    /*
        Disable Previous on Page 1.
    */

    if (
        previousPageButton !== null
    ) {

        previousPageButton.disabled =
            currentPage === 1;
    }


    /*
        Disable Next on the final page.
    */

    if (
        nextPageButton !== null
    ) {

        nextPageButton.disabled =
            currentPage === totalPages;
    }
}


/*
    updateArchiveStatus()

    Purpose:
    Displays:
    - Number of matching entries
    - Current category
    - Search term when present
    - Current page
*/

function updateArchiveStatus(
    searchText
) {

    let categoryText;


    if (
        selectedCategory === "all"
    ) {

        categoryText =
            "all categories";

    } else {

        categoryText =
            selectedCategory;
    }


    let totalPages =
        getTotalPages();


    /*
        No active search.
    */

    if (
        searchText === ""
    ) {

        archiveStatus.textContent =
            `${filteredLoreEntries.length} archive entries found in ${categoryText}. Page ${currentPage} of ${totalPages}.`;

    } else {

        /*
            Search is active.
        */

        archiveStatus.textContent =
            `${filteredLoreEntries.length} archive entries match "${searchText}" in ${categoryText}. Page ${currentPage} of ${totalPages}.`;
    }
}


/*
    filterLore()

    Purpose:
    Applies:
    - Category filtering
    - Live text searching
    - Alphabetical sorting
    - Pagination

    Search and category filtering work together.
*/

function filterLore() {

    /*
        String Method Example:
        trim() removes spaces at the beginning
        and end of the visitor's search.

        String Method Example:
        toLowerCase() makes searching
        case-insensitive.
    */

    let searchText =
        loreSearch.value
        .trim()
        .toLowerCase();


    filteredLoreEntries =
        [];


    /*
        Search every archive entry once.
    */

    for (
        let i = 0;
        i < loreEntries.length;
        i++
    ) {

        let entry =
            loreEntries[i];


        /*
            Combine all searchable fields.

            Cultural Notes are included in search results.
        */

        let searchableText =
            (
                entry.category +
                " " +
                entry.system +
                " " +
                entry.details +
                " " +
                entry.culturalNotes
            )
            .toLowerCase();


        /*
            CATEGORY CONDITION

            All Categories allows every category.

            Otherwise the entry category must exactly
            match the selected button.
        */

        let categoryMatches =
            selectedCategory === "all" ||
            entry.category.toLowerCase() ===
            selectedCategory.toLowerCase();


        /*
            SEARCH CONDITION

            String Method Example:
            includes() checks whether the visitor's
            search appears anywhere in the entry.
        */

        let searchMatches =
            searchText === "" ||
            searchableText.includes(
                searchText
            );


        /*
            The entry must satisfy both conditions.
        */

        if (
            categoryMatches === true &&
            searchMatches === true
        ) {

            filteredLoreEntries.push(
                entry
            );
        }
    }


    /*
        Sort current results alphabetically A-Z.
    */

    sortLoreAlphabetically(
        filteredLoreEntries
    );


    /*
        Display only the current page.
    */

    displayCurrentPage();


    /*
        Update result information.
    */

    updateArchiveStatus(
        searchText
    );
}


/*
    updateCategoryButtons()

    Purpose:
    Updates visual and accessibility states
    after a category is selected.
*/

function updateCategoryButtons(
    selectedButton
) {

    const buttons =
        document.querySelectorAll(
            ".category-button"
        );


    /*
        Reset every button.
    */

    for (
        let i = 0;
        i < buttons.length;
        i++
    ) {

        buttons[i]
            .classList
            .remove(
                "active-category"
            );


        buttons[i]
            .setAttribute(
                "aria-pressed",
                "false"
            );
    }


    /*
        Mark the selected category active.
    */

    selectedButton
        .classList
        .add(
            "active-category"
        );


    selectedButton
        .setAttribute(
            "aria-pressed",
            "true"
        );
}


/*
    CATEGORY CLICK EVENT

    Event delegation allows the category buttons
    to be created dynamically from the CSV.
*/

categoryContainer.addEventListener(
    "click",
    function(event) {

        /*
            Ignore clicks that are not
            category buttons.
        */

        if (
            event.target.classList
            .contains(
                "category-button"
            ) === false
        ) {

            return;
        }


        let selectedButton =
            event.target;


        /*
            Read the selected category.
        */

        selectedCategory =
            selectedButton.getAttribute(
                "data-category"
            );


        /*
            A new category always begins
            on Page 1.
        */

        currentPage =
            1;


        /*
            Update category button states.
        */

        updateCategoryButtons(
            selectedButton
        );


        /*
            Apply the category filter.
        */

        filterLore();
    }
);


/*
    LIVE SEARCH EVENT

    The archive updates as the visitor types.
*/

loreSearch.addEventListener(
    "input",
    function() {

        /*
            Every new search begins
            on Page 1.
        */

        currentPage =
            1;


        filterLore();
    }
);


/*
    addPaginationEvents()

    Purpose:
    Attaches Previous and Next behavior
    to the pagination controls.
*/

function addPaginationEvents() {

    /*
        PREVIOUS PAGE
    */

    previousPageButton.addEventListener(
        "click",
        function() {

            if (
                currentPage > 1
            ) {

                currentPage--;


                displayCurrentPage();


                updateArchiveStatus(
                    loreSearch.value
                    .trim()
                    .toLowerCase()
                );


                /*
                    Move back to the beginning
                    of the table after changing pages.
                */

                document.querySelector(
                    ".table-wrapper"
                )
                .scrollIntoView(
                    {
                        behavior:
                            "smooth",

                        block:
                            "start"
                    }
                );
            }
        }
    );


    /*
        NEXT PAGE
    */

    nextPageButton.addEventListener(
        "click",
        function() {

            let totalPages =
                getTotalPages();


            if (
                currentPage < totalPages
            ) {

                currentPage++;


                displayCurrentPage();


                updateArchiveStatus(
                    loreSearch.value
                    .trim()
                    .toLowerCase()
                );


                /*
                    Return to the beginning
                    of the table.
                */

                document.querySelector(
                    ".table-wrapper"
                )
                .scrollIntoView(
                    {
                        behavior:
                            "smooth",

                        block:
                            "start"
                    }
                );
            }
        }
    );
}


/*
    loadLoreArchive()

    Purpose:
    Loads the Lore Archive when the page opens.

    Process:
    1. Fetch Lore-Archive.csv
    2. Parse the CSV
    3. Convert rows into archive objects
    4. Ignore blank rows and extra columns
    5. Sort entries alphabetically
    6. Build category buttons
    7. Display Page 1
*/

function loadLoreArchive() {

    archiveStatus.textContent =
        "Loading the Avelis Lore Archive...";


    /*
        Load the CSV file.
    */

    fetch(
        archiveSettings.csvFile
    )


    .then(
        function(response) {

            /*
                Confirm that the CSV
                loaded successfully.
            */

            if (
                response.ok === false
            ) {

                throw new Error(
                    "Lore Archive CSV could not be loaded."
                );
            }


            return response.text();
        }
    )


    .then(
        function(csvText) {

            /*
                Convert CSV text into rows.
            */

            let rows =
                parseCSV(
                    csvText
                );


            /*
                Convert valid rows into
                archive objects.
            */

            loreEntries =
                convertRowsToEntries(
                    rows
                );


            /*
                Sort the complete archive A-Z.
            */

            sortLoreAlphabetically(
                loreEntries
            );


            /*
                Create category buttons directly
                from the CSV data.
            */

            buildCategoryButtons();


            /*
                Return to All Categories.
            */

            selectedCategory =
                "all";


            /*
                Begin at Page 1.
            */

            currentPage =
                1;


            /*
                Display the first page.
            */

            filterLore();
        }
    )


    .catch(
        function(error) {

            /*
                Technical error for debugging.
            */

            console.error(
                error
            );


            /*
                Readable page message.
            */

            archiveStatus.textContent =
                "The Lore Archive could not be loaded.";


            showArchiveMessage(
                "The archive data could not be loaded. Please check data/Lore-Archive.csv."
            );


            updatePagination();
        }
    );
}


/*
    JQUERY ARCHIVE GUIDE

    Purpose:
    Shows and hides additional instructions
    for using the Lore Archive.

    This preserves the jQuery example created
    during the previous milestone.

    Accessibility:
    - aria-expanded updates on the button
    - aria-hidden updates on the guide
    - Focus moves into the guide when opened
    - Focus returns to the button when closed
*/

$("#archive-guide-button").on(
    "click",
    function() {

        /*
            Store jQuery objects.
        */

        let guideButton =
            $("#archive-guide-button");


        let archiveGuide =
            $("#archive-guide");


        /*
            Read current state.
        */

        let isExpanded =
            guideButton.attr(
                "aria-expanded"
            ) === "true";


        /*
            OPEN GUIDE
        */

        if (
            isExpanded === false
        ) {

            /*
                Remove the HTML hidden property.
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
                Update ARIA states.
            */

            guideButton.attr(
                "aria-expanded",
                "true"
            );


            archiveGuide.attr(
                "aria-hidden",
                "false"
            );


            /*
                Add active styling.
            */

            archiveGuide.addClass(
                "active-guide"
            );


            /*
                Update button text.
            */

            guideButton.text(
                "Hide Archive Guide"
            );


            /*
                Move focus into the guide.
            */

            archiveGuide.trigger(
                "focus"
            );


        /*
            CLOSE GUIDE
        */

        } else {

            /*
                Required jQuery hide operation.
            */

            archiveGuide.hide();


            /*
                Update ARIA states.
            */

            guideButton.attr(
                "aria-expanded",
                "false"
            );


            archiveGuide.attr(
                "aria-hidden",
                "true"
            );


            /*
                Remove active styling.
            */

            archiveGuide.removeClass(
                "active-guide"
            );


            /*
                Restore button text.
            */

            guideButton.text(
                "Show Archive Guide"
            );


            /*
                Restore the HTML hidden property.
            */

            archiveGuide.prop(
                "hidden",
                true
            );


            /*
                Return focus to the button.
            */

            guideButton.trigger(
                "focus"
            );
        }
    }
);


/*
    INITIAL PAGE SETUP
*/


/*
    Make sure the table contains
    the Cultural Notes column.
*/

ensureTableStructure();


/*
    Add pagination styling.
*/

addPaginationStyles();


/*
    Create pagination controls.
*/

createPagination();


/*
    If pagination already existed in the HTML,
    attach its event listeners now.
*/

if (
    previousPageButton !== null &&
    nextPageButton !== null &&
    previousPageButton.dataset.eventsAdded !== "true"
) {

    /*
        Mark these controls so the events
        are not accidentally attached twice.
    */

    previousPageButton.dataset.eventsAdded =
        "true";


    nextPageButton.dataset.eventsAdded =
        "true";


    addPaginationEvents();
}


/*
    Load and display the Lore Archive.
*/

loadLoreArchive();