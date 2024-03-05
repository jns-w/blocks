import React, {useRef} from 'react';
import {useIsomorphicLayoutEffect} from "./useIsomorphicLayoutEffect";


export const useInterval = (callback: () => void, delay: number | null) => {
    const callbackRef = useRef(callback);

    useIsomorphicLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useIsomorphicLayoutEffect(() => {
        if (!delay && delay !== 0) {
            return
        }
        const id = setInterval(()=> callbackRef.current(), delay)

        return () => clearInterval(id)
    }, [delay]);
}