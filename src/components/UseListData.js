import React from 'react';

import Api from '../Api';
import GlobalContext from './GlobalContext';
import I18n from '../config/I18n';

const defaultPaginationState = {
    currentPage: 1,
    perPage : 5,
    sort: '_id',
    sortDir: -1
};

const defaultDataState = {
    data: [],
    totalCount: 0
};

function UseListData ({ apiPath = '', history, sort }) {

    const context = React.useContext(GlobalContext);

    const [ data, setData ] = React.useState(defaultDataState);
    const [ pagination, setPagination ] = React.useState({ ...defaultPaginationState, sort });


    async function fetchData () {
        const { currentPage, perPage, sort, sortDir } = pagination;

        try {
            const queryString = `?page=${currentPage}&perPage=${perPage}&sort=${sort}&sortDir=${sortDir}`;
            const path = `${apiPath}${queryString}`;
            const { data, totalCount } = await Api.get(path);
            setData({ data, totalCount });
            history.push(`/users${queryString}`);
        } catch (error) {
            console.log(error);
            context.setNotification({ notificationType: 'error', notificationMessage: I18n.t.generic.error });
        }
        return true;
    }

    async function deleteData (id) {
        await Api.delete(`${apiPath}/${id}`);

        if (pagination.currentPage === 1)
            await fetchData();
        else
            setPagination({ ...pagination, currentPage: 1 });
        
        return true;
    }

    React.useEffect(_ => { fetchData() }, [ pagination ]);

    return [ { data, pagination }, setPagination, deleteData ];
};

export default UseListData;