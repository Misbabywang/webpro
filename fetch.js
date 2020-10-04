export class API {
    static parseQueryString(params = {}, mark = false) {
        // return (mark ? '?' : '') + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        return (mark ? '?' : '') + new URLSearchParams(params).toString();
    }

    static async _request(url, params, urlParams, method = 'GET', type = 'json', withToken = false) {
        const args = urlParams ? API.parseQueryString(urlParams, true) : '';

        const promise = (await fetch(BASE_URL + url + args, {
            method, body: params,
            headers: {
                ...CONTENT_TYPE_MAP[type] ? ({ 'Content-Type': CONTENT_TYPE_MAP[type] }) : {},
                ...withToken ? { Authorization: Auth.token } : {}
            }
        })).json();

        {
            const { status } = await promise;
            status === 400 && Auth.clear();
        }

        return promise;
    }

    static async get(url, urlParams) {
        return API._request(url, undefined, urlParams, undefined, null, withToken(url));
    }

    static async delete(url, urlParams) {
        return API._request(url, undefined, urlParams, 'DELETE', null, withToken(url));
    }

    static async post(url, params, urlParams) {
        return API._request(url, JSON.stringify(params), urlParams, 'POST', undefined, withToken(url));
    }

    static async postFormData(url, formData, urlParams) {
        return API._request(url, formData, urlParams, 'POST', null, withToken(url))
    }
}