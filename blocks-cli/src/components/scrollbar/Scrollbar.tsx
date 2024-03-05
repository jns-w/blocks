import * as React from "react"
import {Scrollbars} from "react-custom-scrollbars-2"

export const Scrollbar: React.FC<ScrollbarProps> = (props: any) => {
    return (
        <Scrollbars
            renderThumbVertical={({style, ...props}) =>
                <div {...props} style={{...style, backgroundColor: 'rgba(125,125,125,0.6)', width: '10px', right: '5px', opacity: '.4', borderRadius: '9px', zIndex:'20'}}/>
            }
            universal
            style={{height: props.height, width: props.width}}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
        >
            {props.children}
        </Scrollbars>
    )
}

type ScrollbarProps = {
    width: number,
    height: number
}