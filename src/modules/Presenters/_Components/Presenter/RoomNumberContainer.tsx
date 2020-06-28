import React from 'react';

const RoomNumberContainer = (props: any) => {

    const total_count = 34;
    const current_count = 12;
    const numbersByRoom = [
        {id: 1, count: 3},
        {id: 2, count: 5},
        {id: 3, count: 6},
        {id: 4, count: 9},
        {id: 5, count: 2},
        {id: 6, count: 10}
    ];
    return (
        <>
            <h2 className="mt-5">Audience:{total_count} / {current_count}</h2>

        </>
    )
};
export default RoomNumberContainer;
