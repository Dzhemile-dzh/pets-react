import React, { ReactElement } from 'react';

import Window from '../../../base/Window';
import Loader from '../../../base/Loader';
import Layout from '../../../base/Layout';

interface WindowMyBetsHistoryInterface {
    onClose?: () => void;
    url: string;
}

export const WindowMyBetsHistory = ({
    onClose,
    url,
}: WindowMyBetsHistoryInterface): ReactElement => (
    <>
        <Window
            url = {url}
            onUnload = {onClose}
            targetName = "MyBetsHistory"
        />
        <Layout.CenterItems>
            <Loader />
        </Layout.CenterItems>
    </>
)
