/* eslint-disable max-len */
import propTypes from 'prop-types';
import styles from './RacingPostLogo.module.scss';

export const RacingPostLogo = ({ height, width }) => {
    return (
        <svg
            className = {styles['racing-post-logo']}
            enableBackground = "new 0 0 350 40"
            version = "1.1"
            viewBox = "0 0 350 40"
            style = {{ height, width }}
            role = "img"
            data-testid = "Icon__RacingPostLogo"
        >
            <circle
                className = {styles['racing-post-logo__letter--white']}
                cx = "267.6"
                cy = "19.3"
                r = "13.4"
            />
            <path className = {styles['racing-post-logo__letter--black']} d = "m20.6 37.7l-6-12.1-5.1-0.1v12.1h-9.5v-36.7h18.4c8.2 0 12.8 5.4 12.8 12.3 0 6.3-3.3 10-7.1 11.5l7.2 13h-10.7zm1.1-24.5c0-2.5-2.1-4.1-4.6-4.1h-7.5v8.3h7.5c2.8 0 4.6-1.6 4.6-4.2z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m61.6 37.7l-2.4-7.2-13.4-0.1-2.3 7.2h-10.8l13.9-36.8h11.9l13.9 36.8-10.8 0.1zm-9.1-27.5l-4.1 12.1h8.2l-4.1-12.1z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m108.1 37.7v-36.8h9.5v36.8h-9.5z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m148.2 37.7l-15.6-21.3v21.3h-9.5v-36.8h9.8l14.9 20.3v-20.3h9.5v36.8h-9.1z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m161.2 19.2c-0.2-11.7 9.1-19.1 19.7-19.1 6.8 0 11.2 2.4 14.7 6.2l-6.3 5.9c-2.8-3-4.4-3.5-8-3.6-5.4-0.2-10.3 4.6-10.3 10.4 0 6 4.4 10.6 10.2 10.6 3 0 4.8-0.8 6.5-2.1v-2.8h-5.5v-8.4h15v13.6c-4.3 5.8-9.8 8.1-16 8.2-9.3 0.1-19.8-6.1-20-18.9z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m214.9 37.7v-36.8h18.4c8.3 0 12.8 5.8 12.8 12.5 0 6.6-4.5 12.2-12.8 12.2h-8.9v12.1h-9.5zm21.6-24.4c0-2.5-1.9-4.2-4.4-4.2h-7.7v8.4h7.7c2.5 0 4.4-1.7 4.4-4.2z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m330.3 37.7v-28.6h-10.3v-8.3h30.1v8.3h-10.3v28.5l-9.5 0.1z" />
            <path className = {styles['racing-post-logo__letter--red']} d = "m267.6 0.2c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19zm0 29.1c-2.6 0-4.9-0.9-6.7-2.5-2.1-1.9-3.5-4.6-3.5-7.6 0-5.4 4.3-9.9 9.6-10.1h0.5c0.6 0 1.1 0 1.7 0.1 0.3 0.1 0.7 0.1 1 0.2 0.4 0.1 0.7 0.2 1.1 0.4 0.1 0 0.1 0 0.2 0.1 3.6 1.5 6.2 5.1 6.2 9.4 0.1 5.5-4.5 10-10.1 10z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m104.8 31.9c-1.9-1.8-6.2-5.9-6.2-5.9-1.8 2.2-4.6 3.7-8.1 3.7-6 0-10.3-5.4-10.3-10.7 0-6.6 5.6-10.9 10.9-10.5 3.6 0.3 5.7 1.7 7.4 3.6 0 0 6.2-5.9 6.3-6-1.4-1.4-5.4-6.1-14.1-6.1-11.6-0.1-20.3 7.8-20.3 18.8 0 11.4 9 19.3 20 19.3 8 0 12-3.6 14.4-6.2z" />
            <path className = {styles['racing-post-logo__letter--black']} d = "m287.7 31.9l6.3-5.9c3.1 2.8 6.7 4 10.8 4 3.3 0 5.1-1.2 5.1-3 0-5-20.9-0.9-20.9-15 0-6.2 5.3-11.9 14.7-11.9 7.7 0 12.5 3.7 13.1 4l-6.4 6c-2.4-1.2-5-1.8-7.7-1.8-2.8 0-3.9 1.1-3.9 2.7 0 4.6 20.8 0.9 20.8 14.9 0 7.4-5.8 12.2-15.4 12.2-7.3 0-12.5-2.6-16.5-6.2z" />
        </svg>
    );
}
RacingPostLogo.displayName = 'RacingPostLogo'

RacingPostLogo.propTypes = {
    height: propTypes.string,
    width: propTypes.string,
}
