const FilesOnFlySDK = require('../index');
const nock = require('nock');

describe('FilesOnFlySDK', () => {
    const baseURL = 'http://localhost:3000'; // Adjust to your API's base URL
    let fof;

    beforeEach(() => {
        fof = new FilesOnFlySDK(baseURL);

        nock(baseURL)
                .post('/validate-token')
                .reply(200);
    });

    describe('connect', () => {
        it('should throw an error if token is not provided', async () => {
            await expect(fof.connect()).rejects.toThrow('Authentication token is required');
        });

        it('should set the auth token', async () => {
            const token = 'test-token';


            await fof.connect(token);
            expect(fof.authToken).toBe(token);
        });
    });

    describe('sendFile', () => {
        it('should throw an error if file name is not provided', async () => {
            await expect(fof.sendFile()).rejects.toThrow('File name must be a non-empty string');
        });

        it('should upload a file successfully', async () => {
            const token = 'test-token';
            const fileName = 'test.png';
            const fileContent = Buffer.from('file content');

            nock(baseURL, {
                reqheaders: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .put('/file/upload')
                .reply(200, { status: true, file_id: 1 });

            await fof.connect(token);
            const response = await fof.sendFile(fileName, fileContent);

            expect(response).toEqual({ status: true, file_id: 1 });
        });
    });

    describe('getFile', () => {
        it('should throw an error if identifier is not provided', async () => {
            await expect(fof.getFile()).rejects.toThrow('Identifier must be a string or number');
        });

        it('should retrieve file information successfully', async () => {
            const token = 'test-token';
            const fileId = 1;

            nock(baseURL, {
                reqheaders: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .get(`/file/${fileId}`)
                .reply(200, { id: fileId, name: 'test.png' });

            await fof.connect(token);
            const response = await fof.getFile(fileId);

            expect(response).toEqual({ id: fileId, name: 'test.png' });
        });
    });
});
