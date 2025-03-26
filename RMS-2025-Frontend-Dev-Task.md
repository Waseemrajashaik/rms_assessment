# Frontend Developer Assignment

## Overview

Build a Single Page Application (SPA) that loads a public dataset containing geospatial statistical data, displays it in both an interactive plot and a data table, and demonstrates state linking between components.

Even though our tech stack includes React, TypeScript, Zustand, TanStack Query, TanStack Router, and Tailwind CSS, you are free to use any libraries or tools help you deliver the required functionality.

## Suggested Setup and Data Source

Feel free to skip the suggestions below, use your favorite project initialization method and geospatial dataset.

### Project Setup

1. Setting up the App:

   - Use Vite with React and TypeScript to scaffold your new project, e.g., with `npm create vite@latest`
   - Initialize a Git repository in your project folder.

2. Styling:
   - Any styling can be used, but Tailwind is recommended!

### Data Source

We recommend the USGS Earthquake Data from here:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv

This dataset includes information about all recorded earthquakes in the last 30 days (latitude, longitude, magnitude, place, time, etc.). Feel free to filter or extend the dataset as needed for your visualization.

## Requirements

### Application Layout

Your application should have a two-pane responsive layout targeting a laptop/desktop computer:

1. Plotting Pane:

   - Use Recharts, or any other charting library you prefer
   - Render an interactive plot (e.g., a scatter plot) where each point represents one row in the table.
   - Allow the variable plotted on each axis to vary based on a user choice, e.g., in a dropdown or similar, limit options to the number-typed fields in the dataset

2. Tabular Pane:
   - Render the header of the dataset in the top row
   - Render the loaded data in a table that can scroll to all columns and rows of the dataset.

### Data Loading and Processing

1. On app load, fetch and parse the data with appropriate placeholders, parse the data into an appropriate structure for plotting/table rendering.

### Interactivity

Allow the user to highlight a row of the table with a mouse click or hover. When a row is highlighted in the table, highlight the corresponding point in the plotting pane (e.g., change its color, size, or add a tooltip at its location).

Bonus:

- Add the inverse interaction in the plotting pane; when a user clicks or hovers on a data point, the corresponding row in the table is brought into view, highlighted and/or the table is filtered to that record.

### State Management

Implement different methods of sharing state across components.

1. Prop-Drilling:

   - Pass necessary data and handlers from a parent component down to child components using props.

2. Context API:

   - Set up a React Context to manage the currently highlighted earthquake record.
   - Use the Context Provider in a top-level component to allow nested children access to the highlighted record state.

3. Third-Party State Management (e.g., Zustand):
   - Create a global store (using Zustand, for example) to maintain state such as selected or filtered records.
   - Use this store to update the highlighted record when interacting with the table or plot.

## Submission Guidelines

- Ensure your solution is available in a Git repository.
- Use any file/folder structure that works for you.
- Include a README file with 'enough' setup instructions (installation steps, how to run the project, etc.).
- Note any external libraries used and what they provide the project.
- Note any extra features/functionality incorporated to the application and why.
- Comments in code are appreciated!
- Document how you used AI in your solution.
- Contact `rmartin@geologicai.com` when the repository is ready for a review!

Thank you for your submission!
