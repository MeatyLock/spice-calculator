# Spice Melange Calculator

This project is a simple web application that calculates the resource known as spice melange based on user inputs. The application allows users to input the number of crafts and participants, and it will display the calculated totals for spice sand, melange, and residue.

## Project Structure

```
spice-calculator
├── src
│   ├── index.html      # HTML structure of the webpage
│   ├── app.js          # JavaScript logic for calculations
│   └── styles.css      # CSS styles for the webpage
├── README.md           # Documentation for the project
```

## How to Use

1. Open the `index.html` file in a web browser.
2. Enter the number of crafts in the designated input field. Each craft corresponds to 10,000 spice sand.
3. Enter the number of participants to divide the resources equally.
4. The application will automatically calculate and display the totals for:
   - Spice Sand
   - Melange
   - Residue

## Calculation Logic

- **Conversion Rates**:
  - 10,000 spice sand = 200 melange
  - 10,000 spice sand = 1,000 residue

- **Formulas**:
  - Total Spice Sand = Number of Crafts * 10,000
  - Total Melange = (Total Spice Sand / 10,000) * 200
  - Total Residue = (Total Spice Sand / 10,000) * 1,000
  - Each participant receives an equal share of the totals.

## Technologies Used

- HTML
- CSS
- JavaScript

## License

This project is open-source and available for anyone to use and modify.