# FilesOnFly Node.js SDK

[![Unit Tests](https://github.com/filesonfly/node-sdk/actions/workflows/unittests.js.yml/badge.svg)](https://github.com/filesonfly/node-sdk/actions/workflows/unittests.js.yml)

The `@filesonfly/node-sdk` is a Node.js client library for interacting with the [FilesOnFly](https://filesonfly.com) API, allowing you to easily upload, retrieve, and manage files in your Node.js applications.

## Features

- Authenticate and connect to the FilesOnFly API
- Upload files to the FilesOnFly storage
- Retrieve file information by file name or ID

## Installation

Install the SDK with npm:

```bash
npm install @filesonfly/node-sdk
```

Or with yarn:

```bash
yarn add @filesonfly/node-sdk
```

## Usage

### Initializing the SDK

First, require and initialize the `FilesOnFlySDK`:

```javascript
const FilesOnFlySDK = require('@filesonfly/node-sdk');

const fof = new FilesOnFlySDK('https://api.filesonfly.com');
```

### Connecting to the API

To use the SDK, you must first connect to the API with your authentication token:

```javascript
const authToken = 'your-auth-token';
await fof.connect(authToken);
```

### Uploading a File

Upload a file using the `sendFile` method:

```javascript
const fs = require('fs');

const fileName = 'example.png';
const fileBuffer = fs.readFileSync('/path/to/your/file.png');

await fof.sendFile(fileName, fileBuffer);
```

### Retrieving File Information

Get file information using the `getFile` method by file name or ID:

```javascript
// Get by file name
const fileInfoByName = await fof.getFile('example.png');

// Get by file ID
const fileInfoById = await fof.getFile(1);
```

## Error Handling

The SDK throws `FoF_Exception` errors when API requests fail or validation errors occur. Use try-catch blocks to handle these exceptions:

```javascript
try {
    await fof.sendFile('file_name', fileBuffer);
} catch (error) {
    if (error instanceof FoF_Exception) {
        console.error('FilesOnFly error:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}
```

## Contributing

We welcome contributions to the `@filesonfly/node-sdk`. If you have suggestions or improvements, please fork the repository and submit a pull request.
