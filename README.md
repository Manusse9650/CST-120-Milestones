# Avelis World Companion

The Avelis World Companion is a website created for CST-120: Introduction to Web Development. It is designed as a reference site for a fictional fantasy world and includes six functional pages with shared styling, responsive layouts, media, JavaScript interactions, Bootstrap components, jQuery features, and Animate On Scroll (AOS) animations.

## Current Pages

- Home
- Characters
- World Map
- Calendar
- Lore Archive
- Books and Stories

## How to Open the Website

To view the website locally:

1. Download or clone the project files.
2. Keep all HTML, CSS, JavaScript, font, image, audio, video, and data folders together in the same project directory.
3. Open `index.html` using a local development server such as Live Server.
4. Use the navigation menu to move between the six completed pages.

A local development server is recommended so files such as the Lore Archive CSV can be loaded correctly.

## Project Files

The website uses:

- HTML for page structure and semantic content
- CSS for shared and page-specific styling
- JavaScript for interactive features and dynamic content
- jQuery for accessible show-and-hide interactions
- Bootstrap 5 for responsive grids, cards, buttons, forms, utilities, and modal components
- Animate On Scroll (AOS) for subtle scroll-based animation
- CSV data for the Lore Archive
- Images for character artwork, maps, book artwork, and visual content
- Audio for pronunciation guides
- Video for website demonstrations
- A custom handwriting font for selected World Map page elements

The shared `styles.css` file controls repeated design elements such as navigation, colors, typography, page structure, responsive behavior, Bootstrap customization, and footer styling. Page-specific CSS remains within individual HTML files when the styling applies only to that page.

JavaScript is stored in external files within the `js` folder:

- `js/home.js`
- `js/characters.js`
- `js/map.js`
- `js/calendar.js`
- `js/lore.js`
- `js/books&stories.js`

The Lore Archive also loads its worldbuilding content from:

- `data/Lore-Archive.csv`

## Milestone 4 Refactoring

For Milestone 4, repeated navigation and responsive styles were moved into the shared stylesheet to reduce duplicate code. Page-specific styles were kept within their related HTML pages to make the project easier to organize and maintain.

CSS Grid and Flexbox are used throughout the website to organize content and create responsive layouts. CSS variables provide consistent colors throughout the project. Reduced-motion media queries support visitors who prefer less animation.

A custom handwriting font created by Samantha Manuszak is used on the World Map page to support the visual style of the fictional world while leaving navigation and body text in more readable fonts.

## Milestone 5 JavaScript

Milestone 5 introduced event-driven behavior using external JavaScript files. These interactions continue into Milestone 6 and have been expanded as the website developed.

### Home Page

`js/home.js` controls the Begin Your Journey form and additional Home page interactions.

The form uses a submit event listener with `event.preventDefault()` to validate required fields before displaying a result. A loop checks each required form control and provides inline validation when information is missing.

After successful validation, the visitor receives a personalized greeting and a direct link to the selected area of the website. A `switch` statement connects the visitor's selection to Characters, World Map, Lore Archive, Calendar, or Books and Stories.

The Home page also includes a jQuery-controlled Creator Note interaction.

### Characters Page

`js/characters.js` controls the interactive character cards and expandable character information.

A delegated event listener is attached to the `.character-list` container rather than adding a separate click listener to every character card. Event delegation allows the same handler to manage current character cards and additional cards that may be added later.

Character cards can be flipped with a mouse or keyboard. The script also updates `aria-pressed` to reflect the current state of each card.

Character information can be displayed or hidden without leaving the page. The interaction updates accessibility states and manages keyboard focus.

A loop also counts the character cards currently featured on the page.

### World Map Page

`js/map.js` controls the City, Geography, and Political map selections.

Map buttons send their `data-map` value to the map display function. The script determines which map should be shown and updates the selected image, heading, description, alternative text, active styling, and accessibility state.

A loop updates the active state of all map buttons whenever a new view is selected. The selected button receives `aria-pressed="true"` while the others return to their inactive state.

### Calendar Page

`js/calendar.js` creates and controls the interactive Avelis calendar.

The script defines the custom timekeeping structure:

- 1 Cycle = 1 day
- 1 Span = 10 Cycles
- 1 Moon = 4 Spans = 40 Cycles
- 1 Solturn = 10 Moons = 400 Cycles

JavaScript dynamically builds the calendar table for each Moon and displays important holidays and character birth dates. Visitors can move between Moons using Previous and Next buttons or select a Moon from a dropdown menu.

The Cycle converter allows visitors to enter a Cycle number from 1 through 400 and calculates its location within the current Solturn.

The page also uses Bootstrap cards, responsive grid classes, buttons, and form controls.

### Lore Archive Page

`js/lore.js` controls the Lore Archive search, filtering, dynamic table content, archive status information, and Archive Guide.

The archive loads its information from `data/Lore-Archive.csv`, allowing worldbuilding content to remain separate from the HTML page.

Visitors can search the archive while typing and filter entries by category. JavaScript updates the displayed entries and status information without requiring the page to reload.

The Archive Guide demonstrates jQuery show-and-hide behavior and updates visibility, button text, CSS classes, ARIA attributes, and keyboard focus.

### Books and Stories Page

`js/books&stories.js` controls dynamically generated book content and the Fragments of Avelis section.

JavaScript objects and arrays store book information and short story content. The script creates responsive Bootstrap cards and inserts the book information into the page.

A Bootstrap modal displays additional information about *A Hollowed Sun* without requiring visitors to navigate to another page.

The Fragments of Avelis section is also generated through JavaScript. Each story stores its paragraphs separately so the intended paragraph structure is preserved when the content is displayed.

Delegated event handling is used for book interaction.

## Milestone 6 Bootstrap

Bootstrap 5 is incorporated into the website to provide responsive components and layout utilities.

Bootstrap features used throughout the project include:

- Responsive grid layouts
- Cards
- Buttons
- Form controls
- Badges
- Spacing utilities
- Responsive column sizing
- Bootstrap modal interaction

Custom CSS in `styles.css` modifies Bootstrap components so they remain visually consistent with the established Avelis design.

The Bootstrap CSS and JavaScript bundle are loaded through a CDN.

## jQuery

The project uses jQuery version 3.7.1 loaded from the official jQuery CDN.

jQuery is used for interactive show-and-hide features, including the Lore Archive Guide and the Home page Creator Note.

jQuery methods demonstrated include:

- `.show()`
- `.hide()`
- `.attr()`
- `.prop()`
- `.addClass()`
- `.removeClass()`
- `.text()`

The rest of the website primarily uses plain JavaScript so both native JavaScript and jQuery techniques are demonstrated within the project.

## Animate On Scroll (AOS)

Animate On Scroll, or AOS, is used as the additional JavaScript library for Milestone 6.

AOS adds subtle scroll-based animation to selected sections of the website. It is used to improve visual flow without changing the site's main navigation or functionality.

Selected sections use attributes such as:

`data-aos="fade-up"`

The AOS stylesheet and JavaScript library are loaded through a CDN. AOS is initialized after the page content and dynamically generated elements are created.

The project uses AOS version 2.3.4.

## Event Handler Locations

The main interactive event handlers are located in the following files:

- `js/home.js` — form submission, validation, navigation, and Home page interaction
- `js/characters.js` — delegated character-card click and keyboard events and expandable character information
- `js/map.js` — map selection button events
- `js/calendar.js` — Moon navigation, Moon selection, Cycle conversion, and keyboard events
- `js/lore.js` — archive searching, filtering, category interaction, and jQuery Archive Guide
- `js/books&stories.js` — delegated book interaction and Bootstrap modal content

JavaScript events are attached unobtrusively through external JavaScript rather than inline HTML event attributes.

## Accessibility

Accessibility features include:

- Semantic HTML structure
- Descriptive image alternative text
- Keyboard-accessible interactive character cards
- Native buttons for interactive controls
- `aria-expanded` for expandable content
- `aria-hidden` for hidden content
- `aria-pressed` for selectable states
- `aria-live` for changing status and result information
- Inline form validation messages
- Focus management for expandable information
- User-controlled audio and video
- Written transcript alternatives for pronunciation media
- Accessible Bootstrap modal controls
- Descriptive form labels
- Responsive layouts
- Reduced-motion support for visitors who prefer less animation

Interactive elements are designed so important functionality is not limited to mouse input.

## Responsive Design

The Avelis World Companion is designed to adapt to different screen sizes.

Responsive techniques include:

- CSS media queries
- Flexbox
- CSS Grid
- Bootstrap responsive grid classes
- Responsive Bootstrap utilities
- Flexible images and media
- Horizontally scrollable calendar and archive content when necessary
- Navigation and page layouts that adjust for smaller screens

## Testing

The completed website was tested locally using a modern desktop web browser and Live Server.

Testing included:

- Navigation between all six pages
- Home page form validation
- Home page destination links
- Character-card mouse interaction
- Character-card keyboard interaction
- Character information controls
- Pronunciation audio
- World Map switching
- Map ARIA state updates
- Calendar Moon navigation
- Calendar Moon selection
- Holiday and character birth-date display
- Cycle converter calculations
- Lore Archive CSV loading
- Lore Archive search and category filtering
- jQuery show-and-hide interactions
- Bootstrap card and form layouts
- Bootstrap modal behavior
- Books and Stories dynamic content
- AOS scroll animation
- Responsive layout behavior
- Keyboard accessibility

The project also includes reduced-motion support so visitors who prefer less movement can use the site more comfortably.

## Known Limitations

The Avelis World Companion is designed as an expandable reference website, so its content will continue to grow as the fictional world develops.

The Characters page currently features a limited number of characters, with additional entries planned for future development.

The Lore Archive contains a growing collection of worldbuilding information and can be expanded by adding additional records to the CSV data file.

The Books and Stories page currently includes one featured book and several short story fragments, with additional works planned as the Avelis series develops.

## Repository

The current project files are available through GitHub:

https://github.com/Manusse9650/CST-120-Milestones