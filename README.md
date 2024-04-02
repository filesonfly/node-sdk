# FilesOnFly SDK

This is a NodeJS SDK for interacting with the FilesOnFly API, specifically covering operations related to Storage and File management.

## Installation

To use the FilesOnFly SDK in your project, you need to install it via npm or yarn:

```bash
npm install filesonfly-sdk
or
yarn add filesonfly-sdk

## Usage
First, import and initialize the SDK in your Node.js application:

const FilesOnFlySDK = require('filesonfly-sdk');
const sdk = new FilesOnFlySDK('https://api.filesonfly.com');

## Storage Operations
Get Storage

```
sdk.getStorage(storageId, showHistory)
  .then(storage => console.log('Storage Details:', storage))
  .catch(error => console.error('Error Fetching Storage:', error));

```