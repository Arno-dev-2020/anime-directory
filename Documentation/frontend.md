# Frontend Documentation

## 1. Frontend Architecture

- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## 2. UI Components

### Navbar

- Fixed at the top.
- Contains logo and navigation links.
- Transparent background that becomes solid on scroll.

### Hero Section

- Full-width section with a background image.
- Gradient overlay for text visibility.
- Displays featured anime title, description, and a "Watch Trailer" button.

### Anime Grid

- Responsive grid layout (4 columns on desktop, 2 on mobile).
- Each anime displayed as a card with a cover image and title.

### Anime Details Page

- Displays detailed information about a selected anime.
- Includes cover image, title, description, genre, rating, and trailer.

## 3. State Management

- **Local State**: React’s `useState`.
- **Global State**: React Context or Zustand.

## 4. Styling

- **Tailwind CSS**: Utility-first CSS framework.
- **Custom Styles**: Added in a `styles` folder if needed.

## 5. Responsiveness

- Fully responsive design:
  - Desktop: 4-column grid.
  - Tablet: 3-column grid.
  - Mobile: 2-column grid.
