# Web Crawler

A lightweight and efficient web crawler built with JavaScript and Jest for testing. This tool systematically browses and indexes web pages, starting from a given base URL.

## What is a Web Crawler?

A web crawler (also known as a spider or web robot) is an automated program that systematically browses web pages to collect information. It works by:

1. Starting from a base URL (seed page)
2. Downloading and parsing the page content
3. Identifying all links on that page
4. Following these links to new pages
5. Repeating the process for each new page discovered

Think of it like a librarian who starts with one book, reads all the references in that book, then gets those referenced books, and continues this process to map out connections between different works.

## Features

- Single-domain crawling
- Command-line interface
- Link count reporting
- Efficient URL normalization
- Duplicate URL detection
- Error handling for invalid URLs
- Jest-based test suite

## Installation

```bash
# Clone the repository
git clone https://github.com/diegoddie/webcrawlerhttp

# Install dependencies
npm install
```

## Usage

```bash
# Run the crawler from the command line by providing a base URL:
npm start https://wagslane.dev
```

## How It Works

1. The program accepts a base URL as a command-line argument
2. It validates the input and initializes the crawling process
3. For each page:
    - Downloads the HTML content
    - Extracts all URLs
    - Normalizes and filters URLs
    - Tracks link counts

4. Finally, generates a report of all discovered pages and their frequencies

## Error Handling

The crawler handles several types of errors:

- Invalid URLs
- Network failures
- Missing command line arguments
- Invalid page content

## Testing
Tests are written using Jest. Run the test suite with:

```bash
npm test
```

