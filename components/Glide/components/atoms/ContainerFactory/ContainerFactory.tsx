import { FC } from 'react';
import { ArticleBodyInterface } from '@store/state/types';
import { getContainer } from './utils';

interface ContainerFactoryInterface extends ArticleBodyInterface {
    index: number;
}

export const ContainerFactory: FC<ContainerFactoryInterface> = ({
    children,
    content,
    index,
    style,
    tag,
}) => {
    const Container = getContainer(tag);

    if (!Container) {
        return null;
    }

    return (content || children.length > 0) && (
        <Container
            content = {content}
            index = {index}
            style = {style}
        >
            {
                children.length > 0 &&
                children.map((child, childIndex) => (
                    <ContainerFactory
                        key = {`${index}${childIndex + 1}`}
                        index = {`${index}${childIndex + 1}`}
                        {...child}
                    />
                ))
            }
        </Container>
    );
}
