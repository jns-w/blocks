import * as React from "react"
import {useState, useEffect} from "react"

export const useWindowDimensions: () => { width: number; height: number } = () => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        function handleResize() {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return {
        width: width,
        height: height
    }
}
