# Avelis World Companion

The Avelis World Companion is a website created for CST-120: Introduction to Web Development. It is designed as a reference site for a fictional fantasy world and currently includes four functional pages with shared styling, responsive layouts, media, and interactive JavaScript features.

## Current Pages

- Home
- Characters
- World Map
- Lore Archive

## Planned Pages

The planned website will also include:

- Calendar
- Books and Stories

## How to Open the Website

To view the website locally:

1. Download or clone the project files.
2. Keep all HTML, CSS, JavaScript, font, image, audio, and video folders together in the same project directory.
3. Open `index.html` in a web browser or use a local development server such as Live Server.
4. Use the navigation menu to move between the completed pages.

## Project Files

The website uses:

- HTML for page structure and semantic content
- CSS for shared and page-specific styling
- JavaScript for interactive features
- jQuery for an interactive show-and-hide feature on the Lore Archive page
- Images for visual content and maps
- Audio for pronunciation guides
- Video for website demonstrations
- A custom handwriting font for selected World Map page elements

The shared `styles.css` file controls repeated design elements such as navigation, colors, typography, page structure, responsive navigation, and footer styling. Page-specific CSS remains within individual HTML files when the styling applies only to that page.

JavaScript is stored in external files within the `js` folder:

- `js/home.js`
- `js/characters.js`
- `js/map.js`
- `js/lore.js`

## Milestone 4 Refactoring

For Milestone 4, repeated navigation and responsive styles were moved into the shared stylesheet to reduce duplicate code. Page-specific styles were kept within their related HTML pages to make the project easier to organize and maintain.

CSS Grid and Flexbox are used to organize content and create responsive layouts. CSS variables provide consistent colors throughout the website. Reduced-motion media queries support visitors who prefer less animation.

A custom handwriting font created by Samantha Manuszak is used on the World Map page to support the visual style of the fictional world while leaving navigation and body text in more readable fonts.

## Milestone 5 JavaScript

Milestone 5 adds event-driven behavior across all four functional pages using external JavaScript files.

### Home Page

`js/home.js` controls the Begin Your Journey form.

The form uses a submit event listener with `event.preventDefault()` to validate required fields before displaying a result. A loop checks each required form control and provides inline error messages when information is missing.

After successful validation, the visitor receives a personalized greeting and a link to the selected area of the website. A `switch` statement connects the selected Characters, World Map, or Lore Archive option to the appropriate page.

### Characters Page

`js/characters.js` controls the interactive character cards and Myrrin Sylvamer information panel.

A delegated event listener is attached to the `.character-list` container rather than adding a separate click listener to every character card. Event delegation allows the same handler to manage current character cards and additional cards that may be added later.

Character cards can be flipped with a mouse or keyboard. The script also updates `aria-pressed` to reflect the current state of each card.

The Character Information button displays or hides additional information about Myrrin. The interaction updates `aria-expanded` and `aria-hidden` and manages keyboard focus when the information is opened or closed.

A loop counts the character cards currently featured on the page.

### World Map Page

`js/map.js` controls the City, Geography, and Political map selections.

Each map button uses a click event listener to send its `data-map` value to the map display function. A `switch` statement determines which map object should be displayed.

A loop updates the active state of all map buttons whenever a selection changes. The selected button receives `aria-pressed="true"` and an active visual style while the other buttons return to their inactive state.

The map image source, alternative text, and heading are updated with JavaScript template literals.

### Lore Archive Page

`js/lore.js` controls the live archive search, category count, and Archive Guide.

The search field uses an `input` event listener so results update while the visitor types. A loop checks each table row and uses selection statements to determine whether the row should remain visible. String methods such as `trim()`, `toLowerCase()`, and `includes()` support the search behavior.

A second loop counts the archive categories displayed on the page.

The Archive Guide demonstrates jQuery show-and-hide behavior. The interaction updates the guide visibility, button text, CSS class, ARIA attributes, and keyboard focus.

## jQuery

The Lore Archive uses jQuery version 3.7.1 loaded from the official jQuery CDN.

jQuery is used for the Archive Guide interaction to demonstrate:

- `.show()`
- `.hide()`
- `.attr()`
- `.prop()`
- `.addClass()`
- `.removeClass()`
- `.text()`

The rest of the website primarily uses plain JavaScript so both native JavaScript and jQuery event-driven techniques are demonstrated within the project.

## Event Handler Locations

The main interactive event handlers are located in the following files:

- `js/home.js` — form submission and validation
- `js/characters.js` — delegated character-card click and keyboard events and the Character Information button
- `js/map.js` — map selection button events
- `js/lore.js` — live search input event and jQuery Archive Guide interaction

All JavaScript events are attached unobtrusively through JavaScript rather than inline HTML event attributes.

## Accessibility

Accessibility features include:

- Semantic HTML structure
- Descriptive image alternative text
- Keyboard-accessible interactive character cards
- Native buttons for interactive controls
- `aria-expanded` for expandable content
- `aria-hidden` for hidden content
- `aria-pressed` for selectable map and character-card states
- `aria-live` for changing status information
- Inline form validation messages
- Focus management for expandable information
- User-controlled audio and video
- Written transcript alternatives for media
- Responsive layouts
- Reduced-motion support for users who prefer less animation

Interactive elements are designed so important functionality is not limited to mouse input.

## Testing

The completed pages were tested locally in a modern desktop web browser. Interactive features were checked for form validation, navigation, character-card interaction, map switching, Lore Archive searching, jQuery show-and-hide behavior, and keyboard accessibility.

Responsive CSS is included for smaller screen sizes. Additional cross-browser and physical mobile-device testing may be completed as the website continues to expand.

## Known Limitations

The Calendar and Books and Stories pages are planned but are not yet functional.

The Lore Archive currently contains a limited collection of entries and will expand as additional information about Avelis is added.

Only two characters are currently included on the Characters page, with additional character entries planned for later development.

## Repository

The current project files are available through GitHub:

https://github.com/Manusse9650/CST-120-Milestones