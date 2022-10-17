import propTypes from 'prop-types';
import classnames from 'classnames'
import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ className, children: message }) => {
    return (
        <div className = {classnames(styles['error-message'], className)}>
            {message}
        </div>
    );
}

ErrorMessage.propTypes = {
    children: propTypes.node.isRequired,
    className: propTypes.string,
}
