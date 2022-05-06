import axios from 'axios';

async function makeGetCall(url, type) {
    try {
        await axios(url, { responseType : type})
    } catch (error) {
        console.log(error);
    }
}

const get = (url, type) => {
    return makeGetCall(url, type);
}

export const HTTPClient = { get };

