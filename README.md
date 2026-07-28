# Month Manager

A responsive personal-finance dashboard for recording income and expenses, reviewing a monthly cash-flow summary, and keeping each month’s records separate in the browser.

Built as a focused React application, Month Manager prioritizes a fast, low-friction workflow: select a month, add transactions, and immediately see income, spending, and remaining balance.

## Highlights

- Tracks income and expenses independently with amount and category validation.
- Presents monthly income, expenses, and net balance in a concise summary dashboard.
- Keeps transaction data isolated by month and year, so switching periods does not overwrite existing records.
- Persists data locally in the browser, allowing the app to work without an account or backend.
- Provides responsive, accessible UI controls with labeled inputs, keyboard-friendly forms, and descriptive delete actions.

## Engineering notes

The application uses a month-keyed data model in `localStorage`. Rather than saving the currently rendered transaction list during every month change, updates are applied directly to the selected month’s collection and then persisted. This avoids a common synchronization bug where data from the previously selected month can overwrite the newly selected month before its records load.

The UI is organized into small, focused React components for period selection, transaction entry, lists, and the financial summary. TypeScript defines the transaction contract and makes the data flow between these components explicit.

## Tech stack

- React 18
- TypeScript
- Vite
- Browser `localStorage`
- CSS (responsive layout and design system)

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Install and run locally

```bash
git clone https://github.com/GuillermoBarreto/Month-Manager-App.git
cd Month-Manager-App
npm install
npm run dev
```

1. Open the repository URL shown by Vite in your browser (typically `http://localhost:5173`).
2. Keep the development server running while you make changes; Vite will refresh the browser automatically.
3. Press `Ctrl+C` in the terminal when you are finished.

If `npm` is not available, install the current LTS version of [Node.js](https://nodejs.org/) first, then reopen your terminal and repeat the commands above.

### Create a production build

```bash
npm run build
npm run preview
```

## How to use Month Manager

1. Choose the budget period using the month and year controls in the upper-right corner.
2. In **Add income**, enter a positive amount and a category such as `Salary`, `Freelance`, or `Interest`, then select **Add income**.
3. In **Add expense**, enter a positive amount and a category such as `Rent`, `Groceries`, or `Transport`, then select **Add expense**.
4. Review the summary cards to see the selected period's total income, total expenses, and remaining balance.
5. Review the lists to see the transactions for the selected month. Select the **×** button next to an entry to remove it.
6. Switch to another month or year at any time. Each period maintains its own transactions.

All data is saved in the browser’s local storage automatically. It remains on the same browser and device between sessions, but clearing browser site data or using a different browser/device will remove or isolate those records.

## Project structure

```text
src/
├── components/       # Dashboard, form, list, and period-selector UI
├── types/            # Shared TypeScript transaction model
├── utils/            # Local persistence and month-key utilities
├── App.tsx           # Application state and component composition
└── index.css         # Responsive visual system
```

## Future opportunities

- Add editable transactions and transaction dates.
- Add category-level spending insights and trends.
- Support import/export or authenticated cloud synchronization.
- Add automated component and persistence tests.
