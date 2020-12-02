'use strict'

import http from '@/api';

/*  */
export const userLogin = async (params = {}) => {
    let res = await http.get('http://114.67.105.33:8123/page/getPageContent', params);
    res = res['data'] || [];
    return res
}
