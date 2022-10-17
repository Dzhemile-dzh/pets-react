import { PureComponent } from 'react';
import { ANALYTICS_EVENTS } from '../../../../project/analytics';

export class BasePage extends PureComponent {
    componentDidMount() {
        ANALYTICS_EVENTS.trackPage(Object.getPrototypeOf(this).constructor.displayName);
    }
}

BasePage.displayName = 'BasePage';
