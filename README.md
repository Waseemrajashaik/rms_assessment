# Earthquake Data Visualization Dashboard

A modern, interactive dashboard for visualizing and analyzing USGS earthquake data. Built with Next.js, TypeScript, and D3.js.

## Features

- 📊 Interactive scatter plot visualization with customizable axes
- 📋 Sortable and filterable data table with column selection
- 🔄 Real-time data synchronization between plot and table
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔍 Advanced filtering and search capabilities
- 📱 Mobile-friendly design

## Tech Stack

- **Framework**: Next.js 15.2.4 with TypeScript
- **Styling**: Tailwind CSS
- **Data Visualization**: D3.js
- **State Management**: 
  - Zustand for global state
  - React Context for component-level state
- **Data Fetching**: TanStack Query
- **Data Processing**: CSV parsing and transformation
- **Type Safety**: TypeScript with strict mode

## External Libraries

- `@tanstack/react-query`: Data fetching and caching
- `d3`: Data visualization and manipulation
- `csvtojson`: CSV data parsing
- `zustand`: State management
- `lodash`: Utility functions
- `axios`: HTTP client

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:Waseemrajashaik/rms_assessment.git
cd rms_assessment
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Commands

The following commands are available in the project:

```bash
# Start the development server with Turbopack
pnpm dev

# Build the application for production
pnpm build

# Start the production server
pnpm start

# Format code using Prettier
pnpm format

# Check code formatting
pnpm format:check

# Run ESLint
pnpm lint
```

## Project Structure

```
rms_assessment_2/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── wrapper/          # Component wrappers
├── constants/            # Constants and configurations
├── hooks/               # Custom React hooks
├── providers/           # Context providers
├── public/              # Static assets
│   └── earthquakes/     # Processed earthquake data
├── store/               # Zustand store
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Data Processing

The earthquake data is processed using a Jupyter notebook (`data_processing.ipynb` - Environment Setup using Anaconda or VirtualEnv) that performs the following steps:

The application uses the USGS Earthquake Data feed:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv

1. **Data Loading and Initial Processing**
   - Loads raw CSV data from USGS feed
   - Converts timestamp columns to datetime format
   - Handles missing values and data cleaning

2. **Data Validation and Schema Enforcement**
   - Implements a strict schema for earthquake data
   - Ensures all required columns are present
   - Sets default values for missing columns
   - Validates data types for each column

3. **Data Transformation**
   - Reorders columns according to the defined schema
   - Removes rows with critical missing values
   - Formats numeric values for consistency
   - Adds missing columns with appropriate default values

4. **Output Generation**
   - Saves processed data to `public/earthquakes/processed_all_month.csv`
   - Maintains data integrity and type safety
   - Optimizes data for frontend consumption


The data is processed and stored in `public/earthquakes/processed_all_month.csv` with the following features:
- Proper type conversion
- Missing value handling
- Data validation
- Schema enforcement

## Extra Features

1. **Advanced Data Processing**
   - Automatic data type conversion
   - Missing value handling
   - Data validation and schema enforcement

2. **Enhanced Visualization**
   - Customizable axis selection
   - Interactive tooltips
   - Responsive plot sizing
   - Grid lines and axis labels

3. **Improved User Experience**
   - Column selection for table view
   - Real-time data synchronization
   - Loading states and error handling
   - Responsive design for all screen sizes

4. **Developer Experience**
   - TypeScript for type safety
   - ESLint and Prettier for code quality
   - Modular component architecture
   - Comprehensive error handling

5. **Deployed Experience**
   - Github

## AI Usage in Development

This project utilized AI assistance in the following areas:

1. **Code Generation and Refactoring**
   - Initial project structure setup
   - TypeScript type definitions
   - Utility function implementations

2. **Problem Solving**
   - Data processing pipeline optimization
   - Error handling strategies

3. **Documentation**
   - README content generation
   - Code comments and documentation

4. **Code Review**
   - Identifying potential bugs
   - Test cases writing

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
