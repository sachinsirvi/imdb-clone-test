import React from 'react';


export default function AppLoader({ loading }) {
    if (!loading) {
        return null;
    }

    return (
        <div className="text-center py-10 text-xl font-semibold text-gray-500">
            Loading movies...
        </div>
    );
}
