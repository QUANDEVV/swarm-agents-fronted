"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "monospace",
});

interface MermaidProps {
    chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && chart) {
            // Clean the chart string
            const cleanChart = chart.replace(/```mermaid\n?|```/g, "").trim();

            ref.current.removeAttribute("data-processed");
            mermaid.contentLoaded();

            try {
                mermaid.render("mermaid-svg-" + Math.random().toString(36).substr(2, 9), cleanChart).then(({ svg }: { svg: string }) => {
                    if (ref.current) {
                        ref.current.innerHTML = svg;
                    }
                });
            } catch (error) {
                console.error("Mermaid Render Error:", error);
            }
        }
    }, [chart]);

    return <div ref={ref} className="mermaid flex justify-center w-full" />;
};

export default Mermaid;
