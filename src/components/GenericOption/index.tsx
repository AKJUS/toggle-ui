import React, { useCallback, useRef, useEffect } from 'react';
import {
    _cs,
    isNotDefined,
} from '@togglecorp/fujs';

import RawButton from '../RawButton';

import styles from './styles.css';

export interface ContentBaseProps {
    containerClassName?: string;
    title?: string;
}
export type OptionKey = string | number;

export interface GenericOptionParams<P extends ContentBaseProps, OK extends OptionKey, O> {
    optionContainerClassName?: string;
    contentRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName' | 'title'>>) => React.ReactNode;
    contentRendererParam: (key: OK, opt: O) => P;
    actionsSelector?: (props: O) => React.ReactNode;
    option: O;
    optionKey: OK;
    onClick: (optionKey: OK, option: O) => void;
    focusedKey?: { key: OK, mouse?: boolean } | undefined;
    onFocus?: (options: { key: OK, mouse?: boolean }) => void;
}
function GenericOption<P extends ContentBaseProps, OK extends OptionKey, O>({
    optionContainerClassName,
    contentRenderer,
    contentRendererParam,
    actionsSelector,
    option,
    onClick,
    onFocus,
    optionKey,
    focusedKey,
}: GenericOptionParams<P, OK, O>) {
    const params = contentRendererParam(optionKey, option);
    const {
        containerClassName,
        title,
        ...props
    } = params;

    const isFocused = focusedKey?.key === optionKey; //  && focusedKey?.mouse;

    const divRef = useRef<HTMLButtonElement>(null);
    const focusedByMouse = useRef(false);

    useEffect(
        () => {
            if (focusedKey && focusedKey.key === optionKey && !focusedKey.mouse && divRef.current) {
                divRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        },
        [optionKey, focusedKey, isFocused],
    );

    const handleClick = useCallback(
        () => {
            onClick(optionKey, option);
        },
        [optionKey, option, onClick],
    );

    const handleMouseMove = useCallback(
        () => {
            if (onFocus) {
                onFocus({ key: optionKey, mouse: true });
            }
        },
        [
            onFocus,
            optionKey,
        ],
    );

    const handleMouseLeave = useCallback(
        () => {
            focusedByMouse.current = false;
        },
        [],
    );

    if (isNotDefined(actionsSelector)) {
        return (
            <RawButton
                elementRef={divRef}
                className={_cs(styles.optionRenderer, containerClassName, optionContainerClassName)}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                title={title}
                name={optionKey}
                focused={isFocused}
            >
                {contentRenderer(props)}
            </RawButton>
        );
    }

    return (
        <div
            className={styles.optionContainer}
        >
            <RawButton
                elementRef={divRef}
                // FIXME: Need to use consistent intentional styling for this
                className={_cs(styles.optionRenderer, containerClassName, optionContainerClassName)}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                title={title}
                name={optionKey}
                focused={isFocused}
            >
                {contentRenderer(props)}
            </RawButton>
            {actionsSelector(option)}
        </div>
    );
}
export default GenericOption;
