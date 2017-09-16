# Developer Documentation

This application is composed of sub applications, all self contained within their own folders; They all have their own independet `package.json` dependency management. 

This allows for better deployment of the sub applications as servers/services across virtual machines and clusters without needing to copy the entire source code.

Eventually, this may be refactored such that every sub application is its own github repository with its own version and tracking.

# File Architecture

## File Naming

#### Suffixes

**Directories:**

- `-server`: All client-facing back-end APIs
- `-server`: All non-client-facing back-end APIs

**Files:**

- `.test.js`: All test files to be recognized by Jest
