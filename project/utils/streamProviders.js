import React from 'react';

export const getStreamProviders = (liveOn) => {
    const MAX_STREAMERS_COUNT = 2;

    return {
        value: liveOn && (
            liveOn.slice(0, MAX_STREAMERS_COUNT).map(
                (liveLogoName) => renderStreamProviders(liveLogoName),
            )
        ),
        label: 'live on',
    }
}

const renderStreamProviders = (logoName) => {
    return (
        <div
            key = {logoName}
            className = "detail__img-container"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src = {`/images/${logoName}.png`}
                className = "detail__live-img"
                alt = {logoName}
            />
        </div>
    );
}
