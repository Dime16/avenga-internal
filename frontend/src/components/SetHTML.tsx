// TeachContent.tsx
'use client';

import {JSX} from "react";

export default function SetHTML({html, classes}: { html: string, classes?: string }): JSX.Element {
    return (
        <div className={classes}>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </div>
    );
}