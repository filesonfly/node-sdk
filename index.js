// Import necessary modules
const fetch = require('node-fetch');
const FormData = require('form-data');

class FilesOnFlySDK {
    constructor(baseURL) {
        if (!baseURL) throw new Error('Base URL is required');
        this.baseURL = baseURL;
        this.authToken = null;
    }

    async connect(authToken) {
        if (!authToken) throw new Error('Authentication token is required');
        this.authToken = authToken;

        // Example token validation (pseudo-code, adjust according to your auth system)
        try {
            const response = await fetch(`${this.baseURL}/validate-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to validate token');
            }
        } catch (error) {
            throw new FoF_Exception('Token validation failed: ' + error.message);
        }
    }

    async sendFile(fileName, fileBuffer) {
        if (typeof fileName !== 'string' || !fileName.length) throw new FoF_Exception('File name must be a non-empty string');
        if (!(fileBuffer instanceof Buffer)) throw new FoF_Exception('File content must be a buffer');

        const formData = new FormData();
        formData.append('file', fileBuffer, fileName);

        const response = await fetch(`${this.baseURL}/file/upload`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.authToken}`,
                // 'Content-Type': 'multipart/form-data' is set automatically by FormData
            },
            body: formData
        });

        if (!response.ok) {
            throw new FoF_Exception('Failed to upload file');
        }

        return response.json();
    }

    async getFile(identifier) {
        if (!(typeof identifier === 'string' || typeof identifier === 'number')) {
            throw new FoF_Exception('Identifier must be a string or number');
        }

        const response = await fetch(`${this.baseURL}/file/${identifier}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.authToken}`,
            }
        });

        if (!response.ok) {
            throw new FoF_Exception('Failed to get file information');
        }

        return response.json();
    }
}

class FoF_Exception extends Error {
    constructor(message) {
        super(message);
        this.name = "FoF_Exception";
    }
}

module.exports = FilesOnFlySDK;
