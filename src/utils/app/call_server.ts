const apiUrl = process.env.REACT_APP_API_URL;
const prefix = '/api/';

const serialize = (obj: any) => {
    const str: Array<string> = [];
    Object.keys(obj).map((key: string) => {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }
        return undefined;
    });
    return str.join("&");
};

class CallServerPromiseClass {
    private call_server_promise(
        api: string,
        data: any = null,
        method: string = 'post'
    ): Promise<{ success: boolean; data: any }> {
        return new Promise((resolve, eject) => {
            const controller = new AbortController();
            let responseText = '';
            const token = sessionStorage.getItem('access_token');
            fetch(apiUrl + prefix + api + (method === 'get' ? ('?' + serialize(data)) : ''), {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    charset: 'utf-8',
                    Authorization: `Bearer ${token}`
                },
                signal: controller.signal,
                ...(method === 'post' ? {body: JSON.stringify(data)} : {})
            })
                .then(async response => {
                    responseText = await response.text();
                    return JSON.parse(responseText);
                })
                .then(response => resolve(response))
                .catch(error => {
                    if (error.name === 'AbortError') {
                        resolve({success: false, data: null});
                    } else {
                        error.responseText = responseText;
                        eject(error);
                    }
                });
            setTimeout(() => {
                controller.abort();
            }, 30000);
        });
    }

    checkToken(data: object) {
        return this.call_server_promise('auth/facebook', data);
    }

    saveOrg(data: object) {
        return this.call_server_promise('org/save', data);
    }
}

export const CallServerPromise = new CallServerPromiseClass();
